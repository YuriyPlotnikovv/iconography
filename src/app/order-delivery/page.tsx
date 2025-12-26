import type {Metadata} from 'next';
import {JSX} from 'react';
import {BreadcrumbItem} from '@/types/types';
import Heading from '@/components/Heading/Heading';
import Process from '@/components/Main/Process/Process';
import FormCalculation from '@/components/Forms/FormCalculation/FormCalculation';
import Payment from '@/components/Payment/Payment';

export const metadata: Metadata = {
    title: 'Заказ и доставка | Иконописная мастерская',
    description: 'Иконописная мастерская - описание',
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
    return (
        <>
            <Heading title={'Заказ и доставка'} description={'<p>Подробное описание раздела</p>'}
                     breadcrumbsList={breadcrumbsList}/>

            <Process/>

            <section className="section calculation">
                <div className="container">
                    <h2 className="section__title">
                        Расчёт стоимости заказа работы
                    </h2>

                    <FormCalculation/>
                </div>
            </section>

            <Payment/>
        </>
    );
}