import {JSX} from 'react';
import headingStyles from './Heading.module.scss';
import Link from 'next/link';
import clsx from 'clsx';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';
import {BreadcrumbItem} from '@/types/types';

type HeadingProps = {
    currentPageTitle: string,
    breadcrumbsList: BreadcrumbItem[],
}

export default function Heading({currentPageTitle, breadcrumbsList}: HeadingProps): JSX.Element {
    return (
        <section className={clsx('section', headingStyles['heading'])}>
            <div className={clsx('container', headingStyles['heading__container'])}>
                <Breadcrumbs breadcrumbsList={breadcrumbsList} />

                <h1 className="visually-hidden">
                    {currentPageTitle}
                </h1>
            </div>
        </section>
    );
}