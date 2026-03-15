import {JSX} from 'react';
import advantagesStyles from './Advantages.module.scss';
import {AdvantageItem} from '@/types/types';
import clsx from 'clsx';
import cockpit from '@/lib/CockpitAPI';
import Image from 'next/image';
import logoStyles from '@/components/Logo/Logo.module.scss';

export default async function Advantages(): Promise<JSX.Element> {
    const advantagesList: AdvantageItem[] = await cockpit.getCollection('advantages');

    return (
        <section className={clsx('section', advantagesStyles['advantages'])}>
            <div className="container">
                <h2 className="section__title">
                    Преимущества заказа у нас
                </h2>

                <ul className={advantagesStyles['advantages__list']}>
                    {
                        advantagesList.map(item => {
                            const title = item.title;
                            const description = item.description;
                            const icon = cockpit.getImageUrl(item.icon._id, 100, 100);

                            return (
                                <li className={advantagesStyles['advantages__item']} key={item._id}>
                                    <Image className={logoStyles['logo__image']}
                                           src={icon}
                                           width="100"
                                           height="100"
                                           unoptimized
                                           alt="Иконописная мастерская"
                                    />

                                    <h3 className={advantagesStyles['advantages__item-title']}>
                                        {title}
                                    </h3>

                                    {
                                        description && (
                                            <div className={advantagesStyles['advantages__item-text']}>
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