import {JSX} from 'react';
import cardStyles from './Card.module.scss';
import {CardItem} from '@/types/types';
import Link from 'next/link';
import Image from 'next/image';
import {createSanitizedHTML} from '@/functions/functions';
import clsx from 'clsx';

type CardProps = {
    data: CardItem,
}

export default function Card({data}: CardProps): JSX.Element {
    return (
        <Link className={cardStyles['card']} href={data.href}>
            <Image className={cardStyles['card__image']} src={data.image} alt={data.alt} width={400} height={400}/>

            <div className={cardStyles['card__content']}>
                <h3 className={cardStyles['card__title']}>
                    {data.title}
                </h3>

                <div className={clsx('block-html', cardStyles['card__text'])}
                     dangerouslySetInnerHTML={createSanitizedHTML(data.description)}
                />

                <div className="button button--arrow">Подробнее</div>
            </div>
        </Link>
    );
}