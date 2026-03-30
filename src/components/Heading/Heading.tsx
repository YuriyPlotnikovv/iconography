import {JSX} from 'react';
import headingStyles from './Heading.module.scss';
import clsx from 'clsx';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';
import {BreadcrumbItem} from '@/types/types';
import {createSanitizedHTML} from '@/functions/functions';

type HeadingProps = {
    title?: string,
    description?: string,
    breadcrumbsList: BreadcrumbItem[],
}

export default function Heading({title, description, breadcrumbsList}: HeadingProps): JSX.Element {
    return (
        <section className={clsx('section', headingStyles['heading'])}>
            <div className={clsx('container', headingStyles['heading__container'])}>
                <Breadcrumbs breadcrumbsList={breadcrumbsList}/>

                {
                    title && (
                        <h1 className="section__title">
                            {title}
                        </h1>
                    )
                }

                {
                    description && (
                        <div className={clsx('block-html', 'section__description')}
                             dangerouslySetInnerHTML={createSanitizedHTML(description)}
                        />
                    )
                }
            </div>
        </section>
    );
}