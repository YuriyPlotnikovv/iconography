import {JSX} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';

import {RestorationFromServer} from '@/types/types';
import restorationStyles from './Restoration.module.scss';
import cockpit from '@/lib/CockpitAPI';

export default async function Restoration(): Promise<JSX.Element | null> {
    const restorationData: RestorationFromServer[] = await cockpit.getCollection('restoration', {
        limit: 1
    });

    if (!restorationData || restorationData.length === 0) {
        return null;
    }

    const restoration = restorationData[0];

    return (
        <section className={clsx('section', restorationStyles['restoration'])} id="restoration">
            <div className="container">
                <h2 className="section__title">
                    {restoration.title || 'Реставрация икон'}
                </h2>

                <div className={restorationStyles['restoration__wrapper']}>
                    <Image className={restorationStyles['restoration__image']}
                           src={cockpit.getImageUrl(restoration.image._id, 600, 600)}
                           width={600}
                           height={600}
                           alt={restoration.image.title || restoration.title}/>

                    <div className={restorationStyles['restoration__content']}>
                        <p className={restorationStyles['restoration__text']}>
                            {restoration.description}
                        </p>

                        <Link className="button button--accent" href="/restoration">
                            Подробнее
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}