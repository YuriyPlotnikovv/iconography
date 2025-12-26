import {JSX} from 'react';
import clsx from 'clsx';
import {SlideItem} from '@/types/types';
import {createSanitizedHTML} from '@/functions/functions';
import SliderDetail from '@/components/SliderDetail/SliderDetail';
import detailStyles from './Detail.module.scss';

type DetailProps = {
    title: string;
    description: string;
    slidesList: SlideItem[];
}

export default function Detail({slidesList, title, description}: DetailProps): JSX.Element {
    return (
        <section className={clsx('section', detailStyles['detail'])}>
            <div className={clsx('container', detailStyles['detail__container'])}>
                <div className={detailStyles['detail__content']}>
                    <h2 className="section__title">
                        {title}
                    </h2>

                    <div className={detailStyles['detail__text']} dangerouslySetInnerHTML={createSanitizedHTML(description)}/>

                </div>

                <div className={detailStyles['detail__slider']}>
                    <SliderDetail items={slidesList}/>
                </div>
            </div>
        </section>
    );
}