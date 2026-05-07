import { JSX } from 'react'
import emptySectionStyles from './EmptySection.module.scss'
import clsx from 'clsx'

export default function EmptySection(): JSX.Element {
  return (
    <section className="section">
      <div className={clsx('container', emptySectionStyles['empty-section'])}>
        Здесь ничего нет, но очень скоро появится :)
      </div>
    </section>
  )
}
