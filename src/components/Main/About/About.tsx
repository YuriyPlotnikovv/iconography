import {JSX} from 'react';
import aboutStyles from './About.module.scss';
import clsx from 'clsx';
import Image from 'next/image';
import cockpit from '@/lib/CockpitAPI';
import {MainInfo} from '@/types/types';

export default async function About(): Promise<JSX.Element> {
    const mainInfo: MainInfo = await cockpit.getSingleItem('maininfo');

    const title = mainInfo.title;
    const description = mainInfo.description;
    const image = cockpit.getImageUrl(mainInfo.image._id, 800, 500);
    const alt = mainInfo.image.alt ?? title;

    return (
        <section className={clsx('section', aboutStyles['about'])}>
            <div className={clsx('container', aboutStyles['about__container'])}>
                <h2 className={aboutStyles['about__title']}>
                    {title}
                </h2>

                <div className={aboutStyles['about__image-wrapper']}>
                    <Image className={aboutStyles['about__image']}
                           src={image}
                           sizes="(max-width: 768px) 100vw, 40vw"
                           alt={alt}
                           fill
                    />
                </div>

                <div className={aboutStyles['about__text']}>
                    {description}
                </div>
            </div>
        </section>
    );
}