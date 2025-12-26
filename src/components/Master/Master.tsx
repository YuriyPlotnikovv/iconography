import {JSX} from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import masterStyles from './Master.module.scss';

export default function Master(): JSX.Element {
    return (
        <section className={clsx('section', masterStyles['master'])}>
            <div className={clsx('container', masterStyles['master__container'])}>
                <h2 className={clsx('section__title', masterStyles['master__title'])}>
                    Информация о мастере-художнике
                </h2>

                <Image className={masterStyles['master__image']} src="/img/cover.jpg" alt="" width={500} height={500}/>

                <div className={masterStyles['master__info']}>
                    <p>Информация о мастере</p>
                </div>
            </div>
        </section>
    );
}