import {JSX} from 'react';
import Image from 'next/image';
import clsx from 'clsx';

import {RestorationFromServer} from '@/types/types';
import restorationStyles from './Restoration.module.scss';
import cockpit from '@/lib/CockpitAPI';
import {createSanitizedHTML} from '@/functions/functions';

export default async function Restoration(): Promise<JSX.Element | null> {
    const restorationData: RestorationFromServer = await cockpit.getSingleItem('restoration');

    if (!restorationData) {
        return null;
    }

    const title = restorationData.title;
    const description = restorationData.description;
    const image = cockpit.getImageUrl(restorationData.image._id, 800, 500);
    const alt = restorationData.image.alt ?? title;

    return (
        <section className={clsx('section', restorationStyles['restoration'])} id="restoration">
            <div className={clsx('container', restorationStyles['restoration__container'])}>
                <h2 className={restorationStyles['restoration__title']}>
                    {title}
                </h2>

                <div className={restorationStyles['restoration__image-wrapper']}>
                    <Image className={restorationStyles['restoration__image']}
                           src={image}
                           sizes="(max-width: 768px) 100vw, 40vw"
                           alt={alt}
                           fill
                    />
                </div>

                <div className={clsx('block-html', restorationStyles['restoration__text'])}
                     dangerouslySetInnerHTML={createSanitizedHTML(description)}
                />
            </div>
        </section>
    );
}