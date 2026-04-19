import { JSX } from 'react'
import clsx from 'clsx'
import calculationStyles from './Calculation.module.scss'
import FormCalculation from '@/components/Forms/FormCalculation/FormCalculation'

export default function Calculation(): JSX.Element {
  return (
    <section className={clsx('section', calculationStyles['calculation'])} id="calculation">
      <div className="container">
        <h2 className="section__title">Расчёт примерной стоимости</h2>

        <p className="section__description">
          (выполнение гравировки и ассиста рассчитывается отдельно)
        </p>

        <FormCalculation />
      </div>
    </section>
  )
}
