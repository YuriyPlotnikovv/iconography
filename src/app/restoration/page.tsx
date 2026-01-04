import type {Metadata} from 'next';
import {JSX} from 'react';
import {BreadcrumbItem} from '@/types/types';
import Heading from '@/components/Heading/Heading';
import Process from '@/components/Main/Process/Process';
import FormCalculation from '@/components/Forms/FormCalculation/FormCalculation';
import Payment from '@/components/Payment/Payment';

export const metadata: Metadata = {
    title: 'Реставрация | Иконописная мастерская',
    description: 'Иконописная мастерская - описание',
};

const breadcrumbsList: BreadcrumbItem[] = [
    {
        title: 'Главная',
        url: '/',
    },
    {
        title: 'Реставрация',
    },
];

export default function Page(): JSX.Element {
    return (
        <>
            <Heading title={'Реставрация'} description={'<p>Подробное описание раздела</p>'}
                     breadcrumbsList={breadcrumbsList}/>

            <Payment/>

            <section className="section">
                <div className="container">
                    <h2 className="section__title">
                        Расчёт стоимости реставрации
                    </h2>

                    <FormCalculation/>
                </div>
            </section>

            <Process/>
        </>
    );
}