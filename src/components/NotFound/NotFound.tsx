import { JSX } from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import notfoundStyles from './NotFound.module.scss'

export default function NotFound(): JSX.Element {
  const stars: JSX.Element[] = []

  for (let i = 1; i <= 100; i++) {
    stars.push(<div className={notfoundStyles['not-found__star']} key={i}></div>)
  }

  return (
    <section className={clsx('section', notfoundStyles['not-found'])}>
      <div className={notfoundStyles['not-found__text-wrapper']} data-animate="fade-up">
        <h2 className={notfoundStyles['not-found__title']}>404</h2>

        <p className={notfoundStyles['not-found__text']}>Страница затерялась в космосе</p>
        <Link className="button button--accent" href="/">
          Перейти на главную
        </Link>
      </div>

      <div
        className={notfoundStyles['not-found__window-wrapper']}
        data-animate="scale-in"
        data-stagger="1"
      >
        <div className={notfoundStyles['not-found__window']}>
          <div className={notfoundStyles['not-found__stars']}>{stars}</div>
        </div>
      </div>
    </section>
  )
}
