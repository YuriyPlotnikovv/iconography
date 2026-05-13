'use client'

import { JSX, SubmitEvent, useEffect, useActionState, useRef, useState, useTransition } from 'react'
import formStyles from '../../../styles/modules/form.module.scss'
import clsx from 'clsx'
import { submitMessage } from '@/actions/forms'
import { messageFormSchema, validateFormField } from '@/lib/schemas'
import { z } from 'zod'

type Props = {
  agreementUrl: string
  policyUrl: string
}

export default function FormContactsClient({ agreementUrl, policyUrl }: Props): JSX.Element {
  const [state, formAction] = useActionState(submitMessage, null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [clientErrors, setClientErrors] = useState<Record<string, string>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})

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
        widgetIdRef.current = window.smartCaptcha.render('captcha-container-contacts', {
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

  const getError = (field: string): string =>
    touched[field] ? clientErrors[field] || '' : state?.errors?.[field] || ''

  const handleBlur = (field: string, value: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
    setClientErrors((prev) => ({
      ...prev,
      [field]: validateFormField(messageFormSchema, field, value),
    }))
  }

  const handleAgreementChange = (checked: boolean) => {
    setTouched((prev) => ({ ...prev, agreement: true }))
    setClientErrors((prev) => ({
      ...prev,
      agreement: validateFormField(messageFormSchema, 'agreement', checked || undefined),
    }))
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
    const messageVal = (formEl?.elements.namedItem('message') as HTMLTextAreaElement)?.value || ''
    const agreementChecked =
      (formEl?.elements.namedItem('agreement') as HTMLInputElement)?.checked || false

    const parseResult = messageFormSchema.safeParse({
      name: nameVal,
      phone: phoneVal,
      email: emailVal,
      message: messageVal,
      agreement: agreementChecked || undefined,
    })

    const allTouched = Object.fromEntries(
      Object.keys(messageFormSchema.shape).map((key) => [key, true]),
    )
    setTouched(allTouched)

    if (!parseResult.success) {
      const flat = z.flattenError(parseResult.error).fieldErrors as Record<
        string,
        string[] | undefined
      >
      setClientErrors(
        Object.fromEntries(
          Object.keys(messageFormSchema.shape).map((key) => [key, flat[key]?.[0] ?? '']),
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

  return (
    <form
      ref={formRef}
      className={clsx(formStyles['form'], formStyles['form--contacts'])}
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

          <label className={clsx(formStyles['form__label'], formStyles['form__label--message'])}>
            <span className="visually-hidden">Введите ваше сообщение:</span>

            <textarea
              className={formStyles['form__input']}
              name="message"
              rows={5}
              placeholder="Сообщение *"
              autoComplete="off"
              required
              onBlur={(evt) => handleBlur('message', evt.target.value)}
            ></textarea>

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
              {isPending || isSubmitting ? 'Отправка...' : 'Отправить сообщение'}
            </button>
          </div>
        </>
      )}

      <div
        ref={captchaContainerRef}
        id="captcha-container-contacts"
        style={{ display: 'none' }}
      ></div>
    </form>
  )
}
