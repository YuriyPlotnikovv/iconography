'use client'

import type { JSX } from 'react'
import Link from 'next/link'
import formStyles from '../../../styles/modules/form.module.scss'
import clsx from 'clsx'

const AGREEMENT_URL = '/api/documents/agreement'
const POLICY_URL = '/api/documents/policy'

type Props = {
  error: string
  onChangeAction: (checked: boolean) => void
}

export default function FormAgreementCheckbox({ error, onChangeAction }: Props): JSX.Element {
  return (
    <label
      className={clsx(formStyles['form__label'], formStyles['form__label--checkbox'], {
        [formStyles['form__label--checkbox--error']]: error,
      })}
    >
      <input
        className="visually-hidden"
        type="checkbox"
        name="agreement"
        autoComplete="off"
        required
        onChange={(evt) => onChangeAction(evt.target.checked)}
      />

      <span className={formStyles['form__label-text']}>
        <Link
          className={formStyles['form__label-link']}
          href={AGREEMENT_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          Я согласен
        </Link>
        &nbsp;на обработку персональных данных в соответствии с условиями&nbsp;
        <Link
          className={formStyles['form__label-link']}
          href={POLICY_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          Политики обработки персональных данных
        </Link>
      </span>

      <span className={formStyles['form__error']} aria-live="polite">
        {error}
      </span>
    </label>
  )
}
