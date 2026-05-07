'use client'

import { JSX, SubmitEvent, useEffect, useActionState, useRef, useState, useTransition } from 'react'
import clsx from 'clsx'
import { submitReview } from '@/actions/forms'
import formStyles from '../../../styles/modules/form.module.scss'

export default function FormReviews(): JSX.Element {
  const [state, formAction] = useActionState(submitReview, null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isPending, startTransition] = useTransition()

  const formRef = useRef<HTMLFormElement>(null)
  const captchaContainerRef = useRef<HTMLDivElement>(null)
  const widgetIdRef = useRef<number | null>(null)

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

  const handleSubmit = async (evt: SubmitEvent<HTMLFormElement>) => {
    evt.preventDefault()

    if (isSubmitting || isPending) {
      return
    }

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

  return (
    <form
      ref={formRef}
      className={clsx(formStyles['form'], formStyles['form--reviews'])}
      onSubmit={handleSubmit}
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
                [formStyles['form__input--error']]: state?.errors?.name,
              })}
              type="text"
              name="name"
              autoComplete="on"
              placeholder="Имя"
              required
            />

            {state?.errors?.name && (
              <span className={formStyles['form__error']}>{state.errors.name}</span>
            )}
          </label>
          <label className={formStyles['form__label']}>
            <span className="visually-hidden">Телефон:</span>

            <input
              className={clsx(formStyles['form__input'], {
                [formStyles['form__input--error']]: state?.errors?.phone,
              })}
              type="tel"
              name="phone"
              autoComplete="on"
              placeholder="Телефон"
              pattern="^(\+?\d{1,4}?[\s\-]?)?(\(?\d{1,4}?\)?[\s\-]?)?[\d\s\-]{6,20}$"
            />

            {state?.errors?.phone && (
              <span className={formStyles['form__error']}>{state.errors.phone}</span>
            )}
          </label>
          <label className={formStyles['form__label']}>
            <span className="visually-hidden">Email:</span>

            <input
              className={clsx(formStyles['form__input'], {
                [formStyles['form__input--error']]: state?.errors?.email,
              })}
              type="email"
              name="email"
              autoComplete="on"
              placeholder="Email"
              required
            />

            {state?.errors?.email && (
              <span className={formStyles['form__error']}>{state.errors.email}</span>
            )}
          </label>
          <label className={formStyles['form__label']}>
            <span className="visually-hidden">Введите ваш отзыв:</span>

            <textarea
              className={clsx(formStyles['form__input'], {
                [formStyles['form__input--error']]: state?.errors?.message,
              })}
              name="review"
              rows={5}
              minLength={50}
              placeholder="Ваш отзыв (минимум 50 символов)"
              autoComplete="off"
              required
            ></textarea>

            {state?.errors?.message && (
              <span className={formStyles['form__error']}>{state.errors.message}</span>
            )}
          </label>
          <label className={clsx(formStyles['form__label'], formStyles['form__label--checkbox'])}>
            <span className={formStyles['form__label-text']}>
              <a className={formStyles['form__label-link']} href="#">
                Я согласен
              </a>
              &nbsp;на обработку персональных данных в соответствии с условиями&nbsp;
              <a className={formStyles['form__label-link']} href="#">
                Политикой обработки данных
              </a>
            </span>

            <input
              className="visually-hidden"
              type="checkbox"
              name="agreement"
              autoComplete="off"
              required
            />

            {state?.errors?.agreement && (
              <span className={formStyles['form__error']}>{state.errors.agreement}</span>
            )}
          </label>
          <button
            className={clsx(formStyles['form__button'], 'button', 'button--accent')}
            type="submit"
            disabled={isPending}
          >
            {isPending ? 'Отправка...' : 'Отправить отзыв'}
          </button>
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
