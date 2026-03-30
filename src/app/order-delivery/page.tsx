import type {Metadata} from 'next';
import {JSX} from 'react';
import {BreadcrumbItem} from '@/types/types';
import Heading from '@/components/Heading/Heading';
import Process from '@/components/Main/Process/Process';
import FormCalculation from '@/components/Forms/FormCalculation/FormCalculation';
import Payment from '@/components/Payment/Payment';

export const metadata: Metadata = {
    title: 'Заказ и доставка | Иконописная Артель',
    description: 'Иконописная Артель - описание',
};

const breadcrumbsList: BreadcrumbItem[] = [
    {
        title: 'Главная',
        url: '/',
    },
    {
        title: 'Заказ и доставка',
    },
];

export default function Page(): JSX.Element {
    const title = 'Заказ и доставка';
    const description = '<p></p>';

    return (
        <>
            <Heading title={title}
                     description={description}
                     breadcrumbsList={breadcrumbsList}
            />
            
            <Payment/>

            <section className="section calculation">
                <div className="container">
                    <h2 className="section__title">
                        Расчёт примерной стоимости
                    </h2>

                    <p  className="section__description">
                        (выполнение гравировки и ассиста рассчитывается отдельно)
                    </p>

                    <FormCalculation/>
                </div>
            </section>

            <Process/>
        </>
    );
}