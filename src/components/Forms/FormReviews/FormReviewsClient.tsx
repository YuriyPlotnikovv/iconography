'use client'

import {
  JSX,
  KeyboardEvent,
  SubmitEvent,
  useEffect,
  useActionState,
  useRef,
  useState,
  useTransition,
} from 'react'
import clsx from 'clsx'
import { submitReview } from '@/actions/forms'
import formStyles from '../../../styles/modules/form.module.scss'
import DropZone, { DropZoneRef } from '@/components/DropZone/DropZone'
import { reviewFormSchema, validateFormField } from '@/lib/schemas'
import { z } from 'zod'
import { STARS_COUNT, MAX_PHOTOS } from '@/const/const'

type Props = {
  agreementUrl: string
  policyUrl: string
}

export default function FormReviewsClient({ agreementUrl, policyUrl }: Props): JSX.Element {
  const [state, formAction] = useActionState(submitReview, null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [selectedStars, setSelectedStars] = useState(0)
  const [hoveredStars, setHoveredStars] = useState(0)
  const [clientErrors, setClientErrors] = useState<Record<string, string>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  const formRef = useRef<HTMLFormElement>(null)
  const captchaContainerRef = useRef<HTMLDivElement>(null)
  const widgetIdRef = useRef<number | null>(null)
  const dropZoneRef = useRef<DropZoneRef>(null)
  const starRefs = useRef<(HTMLButtonElement | null)[]>([])

  useEffect(() => {
    const siteKey = process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY

    if (!siteKey) {
      console.error('Captcha key is not configured')
      return
    }

    const interval = setInterval(() => {
      if (window.smartCaptcha && captchaContainerRef.current && widgetIdRef.current === null) {
        widgetIdRef.current = window.smartCaptcha.render('captcha-container-reviews', {
          sitekey: siteKey,
          invisible: true,
          hideShield: true,
          hl: 'ru',
          callback: (token: string) => {
            if (formRef.current) {
              const formData = new FormData(formRef.current)
              formData.set('smart-token', token)

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

    return () => {
      clearInterval(interval)
    }
  }, [formAction])

  useEffect(() => {
    if (state?.success && formRef.current) {
      formRef.current.reset()
      setIsSubmitting(false)
      setSelectedStars(0)
      setHoveredStars(0)
      setClientErrors({})
      setTouched({})
      dropZoneRef.current?.reset()

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

  const getError = (field: string): string =>
    touched[field] ? clientErrors[field] || '' : state?.errors?.[field] || ''

  const handleBlur = (field: string, value: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
    setClientErrors((prev) => ({
      ...prev,
      [field]: validateFormField(reviewFormSchema, field, value),
    }))
  }

  const handleAgreementChange = (checked: boolean) => {
    setTouched((prev) => ({ ...prev, agreement: true }))
    setClientErrors((prev) => ({
      ...prev,
      agreement: validateFormField(reviewFormSchema, 'agreement', checked || undefined),
    }))
  }

  const handleStarSelect = (star: number) => {
    setSelectedStars(star)
    setTouched((prev) => ({ ...prev, stars: true }))
    setClientErrors((prev) => ({ ...prev, stars: '' }))
  }

  const handleStarKeyDown = (evt: KeyboardEvent<HTMLButtonElement>, star: number) => {
    let next: number | null = null

    if (evt.key === 'ArrowRight' || evt.key === 'ArrowUp') {
      evt.preventDefault()
      next = Math.min(star + 1, STARS_COUNT)
    } else if (evt.key === 'ArrowLeft' || evt.key === 'ArrowDown') {
      evt.preventDefault()
      next = Math.max(star - 1, 1)
    }

    if (next !== null) {
      handleStarSelect(next)
      starRefs.current[next - 1]?.focus()
    }
  }

  const handleSubmit = async (evt: SubmitEvent<HTMLFormElement>) => {
    evt.preventDefault()

    if (isSubmitting || isPending) {
      return
    }

    const formEl = formRef.current
    const nameVal = (formEl?.elements.namedItem('name') as HTMLInputElement)?.value || ''
    const phoneVal = (formEl?.elements.namedItem('phone') as HTMLInputElement)?.value || ''
    const emailVal = (formEl?.elements.namedItem('email') as HTMLInputElement)?.value || ''
    const reviewVal = (formEl?.elements.namedItem('review') as HTMLTextAreaElement)?.value || ''
    const agreementChecked =
      (formEl?.elements.namedItem('agreement') as HTMLInputElement)?.checked || false

    const parseResult = reviewFormSchema.safeParse({
      name: nameVal,
      phone: phoneVal,
      email: emailVal,
      review: reviewVal,
      stars: selectedStars,
      agreement: agreementChecked || undefined,
    })

    const allTouched = Object.fromEntries(
      Object.keys(reviewFormSchema.shape).map((key) => [key, true]),
    )
    setTouched(allTouched)

    if (!parseResult.success) {
      const flat = z.flattenError(parseResult.error).fieldErrors as Record<
        string,
        string[] | undefined
      >
      setClientErrors(
        Object.fromEntries(
          Object.keys(reviewFormSchema.shape).map((key) => [key, flat[key]?.[0] ?? '']),
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

  const activeStars = hoveredStars || selectedStars

  return (
    <form
      ref={formRef}
      className={clsx(formStyles['form'], formStyles['form--reviews'])}
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
          <label className={formStyles['form__label']}>
            <span className="visually-hidden">Ваше имя:</span>

            <input
              className={clsx(formStyles['form__input'], {
                [formStyles['form__input--error']]: getError('name'),
              })}
              type="text"
              name="name"
              autoComplete="on"
              placeholder="Имя"
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
              placeholder="Email"
              required
              onBlur={(evt) => handleBlur('email', evt.target.value)}
            />

            <span className={formStyles['form__error']} aria-live="polite">
              {getError('email')}
            </span>
          </label>

          <label className={formStyles['form__label']}>
            <span className="visually-hidden">Ваша оценка:</span>

            <div
              className={clsx(formStyles['form__stars'], {
                [formStyles['form__stars--error']]: getError('stars'),
              })}
              role="radiogroup"
              aria-label="Оценка"
              aria-required="true"
            >
              {Array.from({ length: STARS_COUNT }, (_, i) => i + 1).map((star) => (
                <button
                  key={star}
                  ref={(el) => {
                    starRefs.current[star - 1] = el
                  }}
                  type="button"
                  role="radio"
                  aria-checked={star <= selectedStars}
                  aria-label={`${star} звезд${star === 1 ? 'а' : star < 5 ? 'ы' : ''}`}
                  tabIndex={star === (selectedStars || 1) ? 0 : -1}
                  className={clsx(formStyles['form__star'], {
                    [formStyles['form__star--active']]: star <= activeStars,
                    [formStyles['form__star--hovered']]: star === hoveredStars,
                  })}
                  onClick={() => handleStarSelect(star)}
                  onKeyDown={(evt) => handleStarKeyDown(evt, star)}
                  onMouseEnter={() => setHoveredStars(star)}
                  onMouseLeave={() => setHoveredStars(0)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 25" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="m12 1.435 3.63 6.49L23 9.318l-5.133 5.39.916 7.334L12 18.925l-6.783 3.153.916-7.333L1 9.318l7.37-1.393L12 1.435Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              ))}
            </div>

            <input type="hidden" name="stars" value={selectedStars} />

            <span className={formStyles['form__error']} aria-live="polite">
              {getError('stars')}
            </span>
          </label>

          <label className={formStyles['form__label']}>
            <span className="visually-hidden">Введите ваш отзыв:</span>

            <textarea
              className={clsx(formStyles['form__input'], {
                [formStyles['form__input--error']]: getError('review'),
              })}
              name="review"
              rows={5}
              placeholder="Ваш отзыв (минимум 50 символов)"
              autoComplete="off"
              required
              onBlur={(evt) => handleBlur('review', evt.target.value)}
            ></textarea>

            <span className={formStyles['form__error']} aria-live="polite">
              {getError('review')}
            </span>
          </label>

          <DropZone
            ref={dropZoneRef}
            name="photos"
            accept="image/*"
            maxFiles={MAX_PHOTOS}
            maxSizeMB={5}
            label="Прикрепить фото к отзыву"
            hint={`JPG, PNG, WEBP · до ${MAX_PHOTOS} файлов · до 5 МБ каждый`}
            error={state?.errors?.photo}
          />

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
              {isPending || isSubmitting ? 'Отправка...' : 'Отправить отзыв'}
            </button>
          </div>
        </>
      )}

      <div
        ref={captchaContainerRef}
        id="captcha-container-reviews"
        style={{ display: 'none' }}
      ></div>
    </form>
  )
}
