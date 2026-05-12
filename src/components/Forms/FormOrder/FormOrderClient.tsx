'use client'

import {
  JSX,
  PointerEvent,
  KeyboardEvent,
  SubmitEvent,
  useEffect,
  useActionState,
  useRef,
  useState,
  useTransition,
  useMemo,
} from 'react'
import clsx from 'clsx'
import { z } from 'zod'
import formStyles from '../../../styles/modules/form.module.scss'
import { submitApplication } from '@/actions/forms'
import { applicationFormSchema, validateFormField } from '@/lib/schemas'
import type { CategoryFromServer, PriceItem } from '@/types/types'
import DropZone, { DropZoneRef } from '@/components/DropZone/DropZone'

type Props = {
  categories: CategoryFromServer[]
  prices: PriceItem[]
  agreementUrl: string
  policyUrl: string
}

export default function FormOrderClient({
  categories,
  prices: initialPrices,
  agreementUrl,
  policyUrl,
}: Props): JSX.Element {
  const prices: PriceItem[] = useMemo(() => initialPrices || [], [initialPrices])

  const [state, formAction] = useActionState(submitApplication, null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [clientErrors, setClientErrors] = useState<Record<string, string>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  // Селект категории
  const [categoryOpen, setCategoryOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const categorySelectRef = useRef<HTMLDivElement | null>(null)
  const categoryOptionsRef = useRef<Array<HTMLLIElement | null>>([])

  // Селект размера
  const [sizeOpen, setSizeOpen] = useState(false)
  const [selectedSizeId, setSelectedSizeId] = useState<string>('')
  const sizeSelectRef = useRef<HTMLDivElement | null>(null)
  const sizeOptionsRef = useRef<Array<HTMLLIElement | null>>([])

  // Радио-переключатель типа золочения
  const [goldType, setGoldType] = useState<'without_gold' | 'all' | 'halo'>('without_gold')
  const radioSwitchRef = useRef<HTMLDivElement | null>(null)
  const radioLabelRefs = useRef<Array<HTMLLabelElement | null>>([])
  const radioIndicatorRef = useRef<HTMLSpanElement | null>(null)

  const formRef = useRef<HTMLFormElement>(null)
  const captchaContainerRef = useRef<HTMLDivElement>(null)
  const widgetIdRef = useRef<number | null>(null)
  const dropZoneRef = useRef<DropZoneRef>(null)

  // Категория

  const selectCategory = (title: string) => {
    setSelectedCategory(title)
    setCategoryOpen(false)
  }

  const handleCategoryToggle = (evt: PointerEvent<HTMLButtonElement>) => {
    evt.stopPropagation()
    setCategoryOpen((prev) => !prev)
  }

  const handleCategoryKeyDown = (evt: KeyboardEvent<HTMLButtonElement>) => {
    if (['Enter', ' ', 'ArrowDown', 'ArrowUp'].includes(evt.key)) {
      evt.preventDefault()
      setCategoryOpen(true)
      const idx = Math.max(
        categories.findIndex((c) => c.title === selectedCategory),
        0,
      )
      ;(categoryOptionsRef.current[idx] as HTMLElement)?.focus()
    }
    if (evt.key === 'Escape') setCategoryOpen(false)
  }

  const handleCategoryOptionKeyDown = (
    evt: KeyboardEvent<HTMLLIElement>,
    index: number,
    title: string,
  ) => {
    const total = categories.length
    switch (evt.key) {
      case 'ArrowDown':
        evt.preventDefault()
        ;(categoryOptionsRef.current[(index + 1) % total] as HTMLElement)?.focus()
        break
      case 'ArrowUp':
        evt.preventDefault()
        ;(categoryOptionsRef.current[(index - 1 + total) % total] as HTMLElement)?.focus()
        break
      case 'Home':
        ;(categoryOptionsRef.current[0] as HTMLElement)?.focus()
        break
      case 'End':
        evt.preventDefault()
        ;(categoryOptionsRef.current[total - 1] as HTMLElement)?.focus()
        break
      case 'Enter':
      case ' ':
        evt.preventDefault()
        selectCategory(title)
        break
      case 'Escape':
        setCategoryOpen(false)
        break
    }
  }

  // Размер

  const selectSize = (id: string) => {
    setSelectedSizeId(id)
    setSizeOpen(false)
  }

  const handleSizeToggle = (evt: PointerEvent<HTMLButtonElement>) => {
    evt.stopPropagation()
    setSizeOpen((prev) => !prev)
  }

  const handleSizeKeyDown = (evt: KeyboardEvent<HTMLButtonElement>) => {
    if (['Enter', ' ', 'ArrowDown', 'ArrowUp'].includes(evt.key)) {
      evt.preventDefault()
      setSizeOpen(true)
      const idx = Math.max(
        prices.findIndex((price) => price._id === selectedSizeId),
        0,
      )
      ;(sizeOptionsRef.current[idx] as HTMLElement)?.focus()
    }
    if (evt.key === 'Escape') setSizeOpen(false)
  }

  const handleSizeOptionKeyDown = (
    evt: KeyboardEvent<HTMLLIElement>,
    index: number,
    id: string,
  ) => {
    const total = prices.length
    switch (evt.key) {
      case 'ArrowDown':
        evt.preventDefault()
        ;(sizeOptionsRef.current[(index + 1) % total] as HTMLElement)?.focus()
        break
      case 'ArrowUp':
        evt.preventDefault()
        ;(sizeOptionsRef.current[(index - 1 + total) % total] as HTMLElement)?.focus()
        break
      case 'Home':
        ;(sizeOptionsRef.current[0] as HTMLElement)?.focus()
        break
      case 'End':
        evt.preventDefault()
        ;(sizeOptionsRef.current[total - 1] as HTMLElement)?.focus()
        break
      case 'Enter':
      case ' ':
        evt.preventDefault()
        selectSize(id)
        break
      case 'Escape':
        setSizeOpen(false)
        break
    }
  }

  // Закрытие селектов при клике вне

  useEffect(() => {
    const handleClickOutside = (evt: MouseEvent) => {
      const target = evt.target as Node | null
      if (!target) return
      if (categorySelectRef.current && !categorySelectRef.current.contains(target)) {
        setCategoryOpen(false)
      }
      if (sizeSelectRef.current && !sizeSelectRef.current.contains(target)) {
        setSizeOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  // Индикатор радио-переключателя

  useEffect(() => {
    const updateIndicator = () => {
      const idx = goldType === 'without_gold' ? 0 : goldType === 'all' ? 1 : 2
      const label = radioLabelRefs.current[idx]
      const container = radioSwitchRef.current
      const indicator = radioIndicatorRef.current
      if (!label || !container || !indicator) return
      const labelRect = label.getBoundingClientRect()
      const containerRect = container.getBoundingClientRect()
      indicator.style.width = `${labelRect.width}px`
      indicator.style.transform = `translateX(${labelRect.left - containerRect.left}px)`
    }
    updateIndicator()
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(updateIndicator) : null
    if (ro) radioLabelRefs.current.forEach((l) => l && ro.observe(l))
    window.addEventListener('resize', updateIndicator)
    return () => {
      if (ro) ro.disconnect()
      window.removeEventListener('resize', updateIndicator)
    }
  }, [goldType, prices])

  // Капча

  useEffect(() => {
    const siteKey = process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY
    if (!siteKey) {
      console.error('Captcha key is not configured')
      return
    }
    const interval = setInterval(() => {
      if (window.smartCaptcha && captchaContainerRef.current && widgetIdRef.current === null) {
        widgetIdRef.current = window.smartCaptcha.render('captcha-container-order', {
          sitekey: siteKey,
          invisible: true,
          hideShield: true,
          hl: 'ru',
          callback: (token: string) => {
            if (formRef.current) {
              const formData = new FormData(formRef.current)
              formData.set('smart-token', token)

              // Добавляем файлы из DropZone вручную
              const files = dropZoneRef.current?.getFiles() ?? []
              files.forEach((file) => formData.append('photos', file))

              startTransition(() => {
                formAction(formData)
              })
            }
          },
        })
        clearInterval(interval)
      }
    }, 100)
    return () => clearInterval(interval)
  }, [formAction])

  useEffect(() => {
    if (state?.success && formRef.current) {
      formRef.current.reset()
      setSelectedCategory('')
      setSelectedSizeId('')
      setGoldType('without_gold')
      dropZoneRef.current?.reset()
      setIsSubmitting(false)
      setClientErrors({})
      setTouched({})
      if (widgetIdRef.current !== null && window.smartCaptcha) {
        window.smartCaptcha.reset(widgetIdRef.current)
      }
    } else if (state && !state.success) {
      setIsSubmitting(false)
      if (widgetIdRef.current !== null && window.smartCaptcha) {
        window.smartCaptcha.reset(widgetIdRef.current)
      }
    }
  }, [state])

  // Валидация

  const getError = (field: string): string =>
    touched[field] ? clientErrors[field] || '' : state?.errors?.[field] || ''

  const handleBlur = (field: string, value: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
    setClientErrors((prev) => ({
      ...prev,
      [field]: validateFormField(applicationFormSchema, field, value),
    }))
  }

  const handleAgreementChange = (checked: boolean) => {
    setTouched((prev) => ({ ...prev, agreement: true }))
    setClientErrors((prev) => ({
      ...prev,
      agreement: validateFormField(applicationFormSchema, 'agreement', checked || undefined),
    }))
  }

  // Submit

  const handleSubmit = async (evt: SubmitEvent<HTMLFormElement>) => {
    evt.preventDefault()
    if (isSubmitting || isPending) return

    const formEl = formRef.current
    const nameVal = (formEl?.elements.namedItem('name') as HTMLInputElement)?.value || ''
    const phoneVal = (formEl?.elements.namedItem('phone') as HTMLInputElement)?.value || ''
    const emailVal = (formEl?.elements.namedItem('email') as HTMLInputElement)?.value || ''
    const messageVal = (formEl?.elements.namedItem('message') as HTMLTextAreaElement)?.value || ''
    const agreementChecked =
      (formEl?.elements.namedItem('agreement') as HTMLInputElement)?.checked || false

    const parseResult = applicationFormSchema.safeParse({
      name: nameVal,
      phone: phoneVal,
      email: emailVal,
      message: messageVal,
      category: selectedCategory || undefined,
      size: selectedSizeId
        ? prices.find((price) => price._id === selectedSizeId)?.size || undefined
        : undefined,
      goldType: goldType,
      agreement: agreementChecked || undefined,
    })

    const allTouched = Object.fromEntries(
      Object.keys(applicationFormSchema.shape).map((key) => [key, true]),
    )
    setTouched(allTouched)

    if (!parseResult.success) {
      const flat = z.flattenError(parseResult.error).fieldErrors as Record<
        string,
        string[] | undefined
      >
      setClientErrors(
        Object.fromEntries(
          Object.keys(applicationFormSchema.shape).map((key) => [key, flat[key]?.[0] ?? '']),
        ),
      )
      return
    }

    setClientErrors({})
    setIsSubmitting(true)

    if (widgetIdRef.current !== null && window.smartCaptcha) {
      try {
        window.smartCaptcha.execute(widgetIdRef.current)
      } catch {
        setIsSubmitting(false)
      }
    } else {
      setIsSubmitting(false)
    }
  }

  // SVG-стрелка для селектов

  const SelectArrow = () => (
    <svg
      className={formStyles['form__select__icon']}
      width="10"
      height="10"
      viewBox="0 0 10 10"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 3l4 4 4-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )

  const selectedSizeLabel = selectedSizeId
    ? prices.find((price) => price._id === selectedSizeId)?.size || ''
    : ''

  return (
    <form
      ref={formRef}
      className={clsx(formStyles['form'], formStyles['form--order'])}
      onSubmit={handleSubmit}
      noValidate
    >
      {state?.message && (
        <div
          className={clsx(formStyles['form__message'], {
            [formStyles['form__message--success']]: state.success,
            [formStyles['form__message--error']]: !state.success,
          })}
        >
          {state.message}
        </div>
      )}

      {(!state || !state.success) && (
        <>
          <input type="hidden" name="category" value={selectedCategory} />
          <input type="hidden" name="size" value={selectedSizeLabel} />
          <input type="hidden" name="goldType" value={goldType} />

          <div className={formStyles['form__group']}>
            <h3 className={formStyles['form__group-title']}>Вид иконы</h3>

            <div className={formStyles['form__group-fields']}>
              {categories.length > 0 && (
                <div className={formStyles['form__label']}>
                  <div
                    id="order-category"
                    ref={categorySelectRef}
                    className={formStyles['form__select']}
                  >
                    <button
                      type="button"
                      className={clsx(
                        formStyles['form__select__current'],
                        formStyles['form__input'],
                      )}
                      aria-haspopup="listbox"
                      aria-expanded={categoryOpen}
                      id="orderCategoryButton"
                      onClick={handleCategoryToggle}
                      onKeyDown={(evt) => {
                        evt.stopPropagation()
                        handleCategoryKeyDown(evt)
                      }}
                    >
                      {selectedCategory || 'Категория иконы'}
                      <SelectArrow />
                    </button>

                    <ul
                      className={formStyles['form__select__list']}
                      role="listbox"
                      tabIndex={-1}
                      aria-labelledby="orderCategoryButton"
                      hidden={!categoryOpen}
                    >
                      {categories.map((cat, index) => (
                        <li
                          key={cat._id}
                          role="option"
                          tabIndex={-1}
                          ref={(el: HTMLLIElement | null) => {
                            categoryOptionsRef.current[index] = el
                          }}
                          className={clsx(formStyles['form__select__option'], {
                            [formStyles['form__select__option--selected']]:
                              cat.title === selectedCategory,
                          })}
                          aria-selected={cat.title === selectedCategory}
                          onPointerDown={(evt) => {
                            evt.preventDefault()
                            evt.stopPropagation()
                            if (cat.title !== selectedCategory) selectCategory(cat.title)
                            else setCategoryOpen(false)
                          }}
                          onKeyDown={(evt) => handleCategoryOptionKeyDown(evt, index, cat.title)}
                        >
                          {cat.title}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {prices.length > 0 && (
                <div className={formStyles['form__label']}>
                  <div id="order-size" ref={sizeSelectRef} className={formStyles['form__select']}>
                    <button
                      type="button"
                      className={clsx(
                        formStyles['form__select__current'],
                        formStyles['form__input'],
                      )}
                      aria-haspopup="listbox"
                      aria-expanded={sizeOpen}
                      id="orderSizeButton"
                      onClick={handleSizeToggle}
                      onKeyDown={(evt) => {
                        evt.stopPropagation()
                        handleSizeKeyDown(evt)
                      }}
                    >
                      {selectedSizeLabel || 'Размер иконы'}
                      <SelectArrow />
                    </button>

                    <ul
                      className={formStyles['form__select__list']}
                      role="listbox"
                      tabIndex={-1}
                      aria-labelledby="orderSizeButton"
                      hidden={!sizeOpen}
                    >
                      {prices.map((item, index) => (
                        <li
                          key={item._id}
                          role="option"
                          tabIndex={-1}
                          ref={(el: HTMLLIElement | null) => {
                            sizeOptionsRef.current[index] = el
                          }}
                          className={clsx(formStyles['form__select__option'], {
                            [formStyles['form__select__option--selected']]:
                              item._id === selectedSizeId,
                          })}
                          aria-selected={item._id === selectedSizeId}
                          onPointerDown={(evt) => {
                            evt.preventDefault()
                            evt.stopPropagation()
                            if (item._id !== selectedSizeId) selectSize(item._id)
                            else setSizeOpen(false)
                          }}
                          onKeyDown={(evt) => handleSizeOptionKeyDown(evt, index, item._id)}
                        >
                          {item.size}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              <div className={formStyles['form__radio-group']}>
                <span>Тип золочения:</span>

                <div
                  ref={radioSwitchRef}
                  className={formStyles['form__radio-switch']}
                  role="radiogroup"
                  aria-label="Тип золочения"
                >
                  {(
                    [
                      { value: 'without_gold', label: 'Без золота' },
                      { value: 'all', label: 'Золотой фон и нимб' },
                      { value: 'halo', label: 'Только нимб' },
                    ] as const
                  ).map((opt, idx) => (
                    <label
                      key={opt.value}
                      ref={(el: HTMLLabelElement | null) => {
                        radioLabelRefs.current[idx] = el
                      }}
                      className={formStyles['form__radio-option']}
                    >
                      <input
                        className="visually-hidden"
                        type="radio"
                        name="goldTypeSwitch"
                        value={opt.value}
                        checked={goldType === opt.value}
                        onChange={() => setGoldType(opt.value)}
                      />
                      {opt.label}
                    </label>
                  ))}

                  <span
                    ref={radioIndicatorRef}
                    className={formStyles['form__radio-indicator']}
                    aria-hidden="true"
                  />
                </div>
              </div>

              <DropZone
                ref={dropZoneRef}
                name="photos"
                accept="image/*"
                maxFiles={5}
                maxSizeMB={5}
                label="Прикрепить фото иконы"
                hint="до 5 фото · до 5 МБ каждое"
                error={getError('photos')}
              />
            </div>
          </div>

          <div className={formStyles['form__group']}>
            <h3 className={formStyles['form__group-title']}>Контактные данные</h3>

            <div className={formStyles['form__group-fields']}>
              <label className={formStyles['form__label']}>
                <span className="visually-hidden">Ваше имя:</span>

                <input
                  className={clsx(formStyles['form__input'], {
                    [formStyles['form__input--error']]: getError('name'),
                  })}
                  type="text"
                  name="name"
                  autoComplete="on"
                  placeholder="Имя *"
                  required
                  onBlur={(evt) => handleBlur('name', evt.target.value)}
                />

                <span className={formStyles['form__error']} aria-live="polite">
                  {getError('name')}
                </span>
              </label>

              <label className={formStyles['form__label']}>
                <span className="visually-hidden">Телефон:</span>

                <input
                  className={clsx(formStyles['form__input'], {
                    [formStyles['form__input--error']]: getError('phone'),
                  })}
                  type="tel"
                  name="phone"
                  autoComplete="on"
                  placeholder="Телефон"
                  onBlur={(evt) => handleBlur('phone', evt.target.value)}
                />

                <span className={formStyles['form__error']} aria-live="polite">
                  {getError('phone')}
                </span>
              </label>

              <label className={formStyles['form__label']}>
                <span className="visually-hidden">Email:</span>

                <input
                  className={clsx(formStyles['form__input'], {
                    [formStyles['form__input--error']]: getError('email'),
                  })}
                  type="email"
                  name="email"
                  autoComplete="on"
                  placeholder="Email *"
                  required
                  onBlur={(evt) => handleBlur('email', evt.target.value)}
                />

                <span className={formStyles['form__error']} aria-live="polite">
                  {getError('email')}
                </span>
              </label>
            </div>
          </div>

          <label className={clsx(formStyles['form__label'], formStyles['form__label--message'])}>
            <span className="visually-hidden">Ваше сообщение:</span>

            <textarea
              className={clsx(formStyles['form__input'], {
                [formStyles['form__input--error']]: getError('message'),
              })}
              name="message"
              rows={5}
              placeholder="Сообщение *"
              autoComplete="off"
              onBlur={(evt) => handleBlur('message', evt.target.value)}
            />

            <span className={formStyles['form__error']} aria-live="polite">
              {getError('message')}
            </span>
          </label>

          <div className={formStyles['form__footer']}>
            <label
              className={clsx(formStyles['form__label'], formStyles['form__label--checkbox'], {
                [formStyles['form__label--checkbox--error']]: getError('agreement'),
              })}
            >
              <input
                className="visually-hidden"
                type="checkbox"
                name="agreement"
                autoComplete="off"
                required
                onChange={(evt) => handleAgreementChange(evt.target.checked)}
              />

              <span className={formStyles['form__label-text']}>
                <a
                  className={formStyles['form__label-link']}
                  href={agreementUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Я согласен
                </a>
                &nbsp;на обработку персональных данных в соответствии с условиями&nbsp;
                <a
                  className={formStyles['form__label-link']}
                  href={policyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Политики обработки персональных данных
                </a>
              </span>

              <span className={formStyles['form__error']} aria-live="polite">
                {getError('agreement')}
              </span>
            </label>

            <button
              className={clsx(formStyles['form__button'], 'button', 'button--accent')}
              type="submit"
              disabled={isPending || isSubmitting}
            >
              {isPending || isSubmitting ? 'Отправка...' : 'Отправить заявку'}
            </button>
          </div>
        </>
      )}

      <div ref={captchaContainerRef} id="captcha-container-order" style={{ display: 'none' }} />
    </form>
  )
}
