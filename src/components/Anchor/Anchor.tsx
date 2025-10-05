import {JSX} from 'react';
import anchorStyles from './Anchor.module.scss';
import {MenuItem} from '@/types/types';
import clsx from 'clsx';

const anchorLinks: MenuItem[] = [
    {
        label: 'Наши мастера',
        href: '#masters',
    },
    {
        label: 'Процесс изготовления',
        href: '#process',
    },
    {
        label: 'Категории икон',
        href: '#categories',
    },
    {
        label: 'Расчёт стоимости',
        href: '#calculation',
    },
    {
        label: 'Вопрос-ответ',
        href: '#faq',
    },
];

export default function Anchor(): JSX.Element {
    return (
        <section className={clsx('section', anchorStyles['anchor'])}>
            <h2 className="visually-hidden">
                Навигация по странице
            </h2>

            <nav className={clsx('container', anchorStyles['anchor__container'])} aria-label="По главной странице">
                <ul className={anchorStyles['anchor__list']}>
                    {
                        anchorLinks.map((link) => {
                            return (
                                <li className={anchorStyles['anchor__item']} key={link.href}>
                                    <a className={anchorStyles['anchor__link']} href={link.href}>
                                        {link.label}
                                    </a>
                                </li>
                            );
                        })
                    }
                </ul>
            </nav>
        </section>
    );
}