import { JSX } from 'react'
import formStyles from '../../../styles/modules/form.module.scss'
import clsx from 'clsx'

export default function FormReviews(): JSX.Element {
  return (
    <form className={clsx(formStyles['form'], formStyles['form--reviews'])} action="#">
      <label className={formStyles['form__label']}>
        <span className="visually-hidden">Ваше имя:</span>

        <input
          className={formStyles['form__input']}
          type="text"
          name="name"
          autoComplete="on"
          placeholder="Имя"
          required
        />
      </label>

      <label className={formStyles['form__label']}>
        <span className="visually-hidden">Телефон:</span>

        <input
          className={formStyles['form__input']}
          type="tel"
          name="phone"
          autoComplete="on"
          placeholder="Телефон"
          pattern="^(\+?\d{1,4}?[\s\-]?)?(\(?\d{1,4}?\)?[\s\-]?)?[\d\s\-]{6,20}$"
        />
      </label>

      <label className={formStyles['form__label']}>
        <span className="visually-hidden">Email:</span>

        <input
          className={formStyles['form__input']}
          type="email"
          name="email"
          autoComplete="on"
          placeholder="Email"
          required
        />
      </label>

      <label className={formStyles['form__label']}>
        <span className="visually-hidden">Введите ваш отзыв:</span>

        <textarea
          className={formStyles['form__input']}
          name="message"
          rows={5}
          minLength={100}
          placeholder="Ваш отзыв"
          autoComplete="off"
          required
        ></textarea>
      </label>

      <label className={clsx(formStyles['form__label'], formStyles['form__label--checkbox'])}>
        <span className={formStyles['form__label-text']}>
          <a className={formStyles['form__label-link']} href="#">
            Я согласен
          </a>{' '}
          на обработку персональных данных в соответствии с условиями{' '}
          <a className={formStyles['form__label-link']} href="#">
            Политикой обработки данных
          </a>
        </span>

        <input className="visually-hidden" type="checkbox" autoComplete="off" required />
      </label>

      <button
        className={clsx(formStyles['form__button'], 'button', 'button--accent')}
        type="submit"
      >
        Отправить сообщение
      </button>
    </form>
  )
}
