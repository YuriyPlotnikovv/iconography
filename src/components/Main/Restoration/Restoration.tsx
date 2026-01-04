import {JSX} from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import restorationStyles from './Restoration.module.scss';

export default function Restoration(): JSX.Element {
    return (
        <section className={clsx('section', restorationStyles['restoration'])}>
            <div className="container">
                <h2 className="section__title">
                    Реставрация икон
                </h2>

                <div className={restorationStyles['restoration__content']}>
                    <div className={restorationStyles['restoration__image-wrapper']}>
                        <Image className={restorationStyles['restoration__image']}
                               src="/img/cover.jpg"
                               sizes="(max-width: 768px) 100vw, 40vw"
                               alt=""
                               fill
                        />
                    </div>

                    <div className={restorationStyles['restoration__text']}>
                        Описание услуги
                    </div>

                    <Link className={clsx(restorationStyles['restoration__button'], 'button', 'button--accent')}
                          href="/restoration">Подробнее</Link>
                </div>
            </div>
        </section>
    );
}