# Cookie Consent — документация

## Обзор

Система управления согласием на использование cookie. Хранит выбор пользователя в одной куке `cookie-consent` (JSON), читает её на сервере через Next.js `cookies()`, не мерцает при загрузке.

| Файл                                                 | Роль                               |
| ---------------------------------------------------- | ---------------------------------- |
| `src/context/CookieConsentContext.tsx`               | Провайдер и хук `useCookieConsent` |
| `src/components/CookieBanner/CookieBanner.tsx`       | Server-обёртка баннера             |
| `src/components/CookieBanner/CookieBannerClient.tsx` | UI баннера (клиент)                |
| `src/components/ServicesInit/ServicesInit.tsx`       | Регистрация колбеков сервисов      |
| `src/app/layout.tsx`                                 | Инициализация провайдера           |

---

## Категории cookie

Категории `COOKIE_CATEGORIES` — в `src/const/const.ts`.  
Типы `CookieCategoryId` и `CookieConsent` — в `src/types/types.ts`.

| id            | Название                       | Обязательные |
| ------------- | ------------------------------ | :----------: |
| `necessary`   | Строго необходимые cookies     |    ✅ да     |
| `performance` | Cookies производительности     |    ❌ нет    |
| `functional`  | Функциональные cookies         |    ❌ нет    |
| `targeting`   | Целевые и аналитические cookies|    ❌ нет    |

```typescript
// src/types/types.ts
export type CookieCategoryId = 'necessary' | 'performance' | 'functional' | 'targeting'
export type CookieConsent = Record<CookieCategoryId, boolean>
```

---

## Как работает инициализация

```
SSR: layout.tsx читает куку cookie-consent из заголовков запроса
        ↓
Передаёт initialConsent в <CookieConsentProvider initialConsent={...}>
        ↓
Провайдер сразу знает состояние — баннер либо скрыт, либо показан с первого рендера
```

- Кука есть → `initialConsent = { necessary: true, performance: true, ... }` → баннер не рендерится
- Куки нет → `initialConsent = null` → баннер показывается сразу

---

## API контекста

```typescript
const {
  consent, // CookieConsent — текущее состояние согласия
  saveConsent, // (c: CookieConsent) => void — сохранить выбор в куку
  registerCallback, // (type: CookieCategoryId, fn: () => void) => void
  isBannerVisible, // boolean — показывать ли баннер
  openBanner, // () => void — открыть баннер повторно
} = useCookieConsent()
```

> Хук `useCookieConsent` можно использовать только внутри `CookieConsentProvider`.

---

## Сценарии использования

### 1. Проверить согласие в компоненте

Показывать блок только при наличии согласия:

```tsx
'use client'
import { useCookieConsent } from '@/context/CookieConsentContext'

export default function AdBlock() {
  const { consent } = useCookieConsent()

  if (!consent.targeting) return null

  return <div>Реклама</div>
}
```

---

### 2. Зарегистрировать колбек на принятие куки

Основной способ подключения внешних сервисов. Логика `registerCallback`:

- согласие **уже есть** при регистрации → `fn()` вызывается немедленно
- согласия **нет** → `fn()` вызовется автоматически когда пользователь примет этот тип

```tsx
'use client'
import { useEffect } from 'react'
import { useCookieConsent } from '@/context/CookieConsentContext'

export default function MyAnalytics() {
  const { registerCallback } = useCookieConsent()

  useEffect(() => {
    registerCallback('performance', () => {
      console.log('Загружаем метрику...')
    })

    registerCallback('targeting', () => {
      console.log('Загружаем VK Pixel...')
    })
  }, [registerCallback])

  return null
}
```

> `registerCallback` обёрнут в `useCallback([])` в провайдере — ссылка никогда не меняется, поэтому `[registerCallback]` в зависимостях безопасен и удовлетворяет правилу `exhaustive-deps`.

---

### 3. Открыть баннер повторно

Например, кнопка «Настройки cookie» в футере:

```tsx
'use client'
import { useCookieConsent } from '@/context/CookieConsentContext'

export default function CookieSettingsButton() {
  const { openBanner } = useCookieConsent()

  return <button onClick={openBanner}>Настройки cookie</button>
}
```

---

## Добавление нового сервиса

Всё делается в `src/components/ServicesInit/ServicesInit.tsx`:

```tsx
useEffect(() => {
  // Яндекс.Метрика (performance)
  registerCallback('performance', () => {
    const counterId = process.env.NEXT_PUBLIC_METRIKA_ID
    if (!counterId || (window as any).ym) return
    const script = document.createElement('script')
    // ... код метрики
    document.head.appendChild(script)
  })

  // VK Pixel или Google Ads (targeting)
  registerCallback('targeting', () => {
    // вставить скрипт пикселя
  })

  // Чат-виджет или сохранение настроек темы (functional)
  registerCallback('functional', () => {
    // загрузить виджет
  })
}, [registerCallback])
```

---

## Схема жизненного цикла

```
Пользователь открыл сайт
  → layout читает куку (SSR)
  → CookieConsentProvider(initialConsent)
  → ServicesInit монтируется: registerCallback('performance', fn), ...
       ├─ consent.performance = true  → fn() вызывается сразу
       └─ consent.performance = false → fn() ждёт

Пользователь нажал «Принять все»
  → saveConsent({ necessary:true, performance:true, functional:true, targeting:true })
  → document.cookie = 'cookie-consent=...' (max-age 1 год, SameSite=Lax)
  → setConsent(...) → useEffect в провайдере срабатывает
  → все зарегистрированные колбеки для принятых типов вызываются
  → баннер скрывается
```

---

## Кука

```
Имя:     cookie-consent
Формат:  URL-encoded JSON
Пример:  %7B%22necessary%22%3Atrue%2C%22functional%22%3Afalse%2C%22statistical%22%3Atrue%2C%22marketing%22%3Afalse%7D
Декод.:  {"necessary":true,"performance":false,"functional":true,"targeting":false}
Срок:    1 год (max-age=31536000)
Флаги:   path=/; SameSite=Lax
```

Поле `necessary` всегда `true` — принудительно выставляется в `saveConsent`.
