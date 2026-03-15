import {JSX} from 'react';
import processStyles from './Process.module.scss';
import {MainInfo, ProcessItem} from '@/types/types';
import Image from 'next/image';
import clsx from 'clsx';
import cockpit from '@/lib/CockpitAPI';

export default async function Process(): Promise<JSX.Element> {
    const processList: ProcessItem[] = await cockpit.getCollection('createprocess', {sort: {sort: 1}});

    return (
        <section className={clsx('section', processStyles['process'])} id="process">
            <div className="container">
                <h2 className="section__title">
                    Процесс
                </h2>

                <ul className={processStyles['process__list']}>
                    {
                        processList.map(process => {
                            const title = process.title;
                            const description = process.description;
                            const image = cockpit.getImageUrl(process.image._id, 800, 500);
                            const alt = process.alt ?? process.title;

                            return (
                                <li className={processStyles['process__item']} key={process._id}>
                                    <Image className={processStyles['process__item-image']}
                                           src={image}
                                           alt={alt}
                                           width={500}
                                           height={500}
                                    />

                                    <h3 className={processStyles['process__item-title']}>
                                        {title}
                                    </h3>

                                    {
                                        description && (
                                            <div className={processStyles['process__item-text']}>
                                                {description}
                                            </div>
                                        )
                                    }
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
        </section>
    );
}