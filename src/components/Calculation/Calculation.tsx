import {JSX} from 'react';
import clsx from 'clsx';
import calculationStyles from './Calculation.module.scss';

export default function Calculation(): JSX.Element {
    return (
        <section className={clsx('section', calculationStyles['calculation'])} id="calculation">
            <div className="container">
                <h2 className="section__title">
                    Расчёт стоимости
                </h2>

                <form className="form form--calculation" action="#">
                    <fieldset className="form__fieldset">
                        <legend className="form__legend">
                            Заголовок группы
                        </legend>

                        <label className="form__label">
                            <span className="form__label-text">Ваше имя</span>

                            <input className="form__input" type="text" placeholder="Имя"/>
                        </label>

                        <label className="form__label">
                            <span className="form__label-text">Телефон</span>

                            <input className="form__input" type="tel" placeholder="Телефон"/>
                        </label>

                        <label className="form__label">
                            <span className="form__label-text">Email</span>

                            <input className="form__input" type="email" placeholder="Email"/>
                        </label>
                    </fieldset>

                    <div className="form__buttons-wrapper">
                        <button className="form__button button button--clear" type="reset">Очистить форму</button>

                        <button className="form__button button button--accent" type="submit">Рассчитать стоимость
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
}