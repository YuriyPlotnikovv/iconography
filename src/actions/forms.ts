'use server'

import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'
import cockpit from '@/lib/CockpitAPI'
import { verifyCaptcha } from '@/lib/captcha'
import { formRateLimiter } from '@/lib/rate-limiter'

export type FormState = {
  success: boolean
  message: string
  errors?: Record<string, string>
}

/**
 * Получение IP адреса
 */
async function getClientIp(): Promise<string> {
  const headersList = await headers()
  const forwarded = headersList.get('x-forwarded-for')
  const realIp = headersList.get('x-real-ip')

  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }

  return realIp || 'unknown'
}

/**
 * Валидация Email
 */
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Валидация номера телефона
 */
function isValidPhone(phone: string): boolean {
  const phoneRegex = /^(\+?\d{1,4}?[\s\-]?)?(\(?\d{1,4}?\)?[\s\-]?)?[\d\s\-]{6,20}$/
  return phoneRegex.test(phone)
}

/**
 * Отправка формы отзывов
 */
export async function submitReview(
  prevState: FormState | null,
  formData: FormData,
): Promise<FormState> {
  const clientIp = await getClientIp()

  if (!formRateLimiter.check(clientIp)) {
    const retryAfter = formRateLimiter.getRetryAfter(clientIp)
    return {
      success: false,
      message: `Слишком много запросов. Попробуйте через ${Math.ceil(retryAfter / 60)} минут.`,
    }
  }

  const name = formData.get('name')?.toString().trim() || ''
  const phone = formData.get('phone')?.toString().trim() || ''
  const email = formData.get('email')?.toString().trim() || ''
  const review = formData.get('review')?.toString().trim() || ''
  const captchaToken = formData.get('smart-token')?.toString() || ''
  const agreed = formData.get('agreement') === 'on'

  const errors: Record<string, string> = {}

  if (!name || name.length < 2) {
    errors.name = 'Имя должно содержать минимум 2 символа'
  }

  if (phone && !isValidPhone(phone)) {
    errors.phone = 'Некорректный формат телефона'
  }

  if (!email) {
    errors.email = 'Email обязателен для заполнения'
  } else if (!isValidEmail(email)) {
    errors.email = 'Некорректный формат email'
  }

  if (!review || review.length < 50) {
    errors.message = 'Отзыв должен содержать минимум 50 символов'
  }

  if (!agreed) {
    errors.agreement = 'Необходимо согласие на обработку данных'
  }

  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      message: 'Пожалуйста, исправьте ошибки в форме',
      errors,
    }
  }

  const captchaValid = await verifyCaptcha(captchaToken, clientIp)
  if (!captchaValid) {
    return {
      success: false,
      message: 'Ошибка проверки капчи. Попробуйте еще раз.',
    }
  }

  const result = await cockpit.createItem('reviews', {
    name,
    phone: phone || null,
    email,
    review,
    _state: false,
    ip: clientIp,
  })

  if (!result) {
    return {
      success: false,
      message: 'Ошибка при сохранении отзыва. Попробуйте позже.',
    }
  }

  revalidatePath('/reviews')

  return {
    success: true,
    message: 'Спасибо за ваш отзыв! Он будет опубликован после модерации.',
  }
}

/**
 * Отправка формы обратной связи
 */
export async function submitApplication(
  prevState: FormState | null,
  formData: FormData,
): Promise<FormState> {
  const clientIp = await getClientIp()

  if (!formRateLimiter.check(clientIp)) {
    const retryAfter = formRateLimiter.getRetryAfter(clientIp)
    return {
      success: false,
      message: `Слишком много запросов. Попробуйте через ${Math.ceil(retryAfter / 60)} минут.`,
    }
  }

  const name = formData.get('name')?.toString().trim() || ''
  const phone = formData.get('phone')?.toString().trim() || ''
  const email = formData.get('email')?.toString().trim() || ''
  const message = formData.get('message')?.toString().trim() || ''
  const captchaToken = formData.get('smart-token')?.toString() || ''
  const agreed = formData.get('agreement') === 'on'

  const errors: Record<string, string> = {}

  if (!name || name.length < 2) {
    errors.name = 'Имя должно содержать минимум 2 символа'
  }

  if (phone && !isValidPhone(phone)) {
    errors.phone = 'Некорректный формат телефона'
  }

  if (!email) {
    errors.email = 'Email обязателен для заполнения'
  } else if (!isValidEmail(email)) {
    errors.email = 'Некорректный формат email'
  }

  if (!agreed) {
    errors.agreement = 'Необходимо согласие на обработку данных'
  }

  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      message: 'Пожалуйста, исправьте ошибки в форме',
      errors,
    }
  }

  const captchaValid = await verifyCaptcha(captchaToken, clientIp)
  if (!captchaValid) {
    return {
      success: false,
      message: 'Ошибка проверки капчи. Попробуйте еще раз.',
    }
  }

  const result = await cockpit.createItem('applications', {
    name,
    phone: phone || null,
    email,
    message: message || null,
    _state: false,
    ip: clientIp,
  })

  if (!result) {
    return {
      success: false,
      message: 'Ошибка при отправке заявки. Попробуйте позже.',
    }
  }

  return {
    success: true,
    message: 'Спасибо за обращение! Мы свяжемся с вами в ближайшее время.',
  }
}
