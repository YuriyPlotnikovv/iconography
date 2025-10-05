import {JSX} from 'react';
import processStyles from './Process.module.scss';
import {ProcessItem} from '@/types/types';
import Image from 'next/image';
import clsx from 'clsx';

const processList: ProcessItem[] = [
    {
        id: 1,
        title: 'Заголовок этапа',
        text: 'Описание этапа',
        image: '/img/cover.jpg',
        alt: 'Фото этапа',
    },
    {
        id: 2,
        title: 'Заголовок этапа',
        text: 'Описание этапа',
        image: '/img/cover.jpg',
        alt: 'Фото этапа',
    },
    {
        id: 3,
        title: 'Заголовок этапа',
        text: 'Описание этапа',
        image: '/img/cover.jpg',
        alt: 'Фото этапа',
    },
    {
        id: 4,
        title: 'Заголовок этапа',
        text: 'Описание этапа',
        image: '/img/cover.jpg',
        alt: 'Фото этапа',
    },
    {
        id: 5,
        title: 'Заголовок этапа',
        text: 'Описание этапа',
        image: '/img/cover.jpg',
        alt: 'Фото этапа',
    },
];

export default function Process(): JSX.Element {
    return (
        <section className={clsx('section', processStyles['process'])} id="process">
            <div className="container">
                <h2 className="section__title">
                    Процесс изготовления
                </h2>

                <ul className={processStyles['process__list']}>
                    {
                        processList.map(process => {
                            return (
                                <li className={processStyles['process__item']} key={process.id}>
                                    <Image className={processStyles['process__item-image']}
                                           src={process.image}
                                           alt={process.alt}
                                           width={500}
                                           height={500}
                                    />

                                    <h3 className={processStyles['process__item-title']}>
                                        {process.title}
                                    </h3>

                                    <div className={processStyles['process__item-text']}>
                                        {process.text}
                                    </div>
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
        </section>
    );
}