import {JSX} from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import masterStyles from './Master.module.scss';
import {MasterFromServer} from '@/types/types';
import cockpit from '@/lib/CockpitAPI';
import {createSanitizedHTML} from '@/functions/functions';

type MasterProps = {
    master: MasterFromServer;
}

export default function Master({master}: MasterProps): JSX.Element {
    const name = master.name;
    const description = master.description;
    const image = cockpit.getImageUrl(master.image._id, 800, 500);
    const alt = master.image.alt ?? name;

    return (
        <section className={clsx('section', masterStyles['master'])}>
            <div className={clsx('container', masterStyles['master__container'])}>
                <h2 className={clsx('section__title', masterStyles['master__title'])}>
                    Информация о мастере-художнике
                </h2>

                <div className={masterStyles['master__image-wrapper']}>
                    <Image className={masterStyles['master__image']}
                           src={image}
                           sizes="(max-width: 768px) 100vw, 40vw"
                           alt={alt}
                           fill
                    />
                </div>

                <div className={masterStyles['master__info']}>
                    <h3 className={masterStyles['master__info-name']}>
                        {name}
                    </h3>

                    <div className={clsx('block-html', masterStyles['master__info-description'])}
                         dangerouslySetInnerHTML={createSanitizedHTML(description)}
                    />
                </div>
            </div>
        </section>
    );
}