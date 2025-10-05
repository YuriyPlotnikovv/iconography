import {JSX} from 'react';
import aboutStyles from './About.module.scss';
import clsx from 'clsx';
import Image from 'next/image';

export default function About(): JSX.Element {
    return (
        <section className={clsx('section', aboutStyles['about'])}>
            <div className={clsx('container', aboutStyles['about__container'])}>
                <h2 className={aboutStyles['about__title']}>
                    Иконописная мастерская
                </h2>

                <div className={aboutStyles['about__image-wrapper']}>
                    <Image className={aboutStyles['about__image']}
                           src="/img/cover.jpg"
                           sizes="(max-width: 768px) 100vw, 40vw"
                           alt="Фото мастерской"
                           fill
                    />
                </div>

                <div className={aboutStyles['about__text']}>
                    Приветствие на сайте, Описание мастерской
                </div>
            </div>
        </section>
    );
}