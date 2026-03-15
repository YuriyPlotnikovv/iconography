import {JSX} from 'react';
import clsx from 'clsx';

import {CardItem, MasterFromServer} from '@/types/types';
import MastersSlider from './MastersSlider';
import mastersStyles from './Masters.module.scss';
import cockpit from '@/lib/CockpitAPI';

export default async function Masters(): Promise<JSX.Element | null> {
    const mastersData: MasterFromServer[] = await cockpit.getCollection('masters');

    if (!mastersData || mastersData.length === 0) {
        return null;
    }

    const mastersList: CardItem[] = mastersData.map((master) => ({
        id: master._id,
        title: master.name,
        description: master.description,
        href: '',
        image: cockpit.getImageUrl(master.image._id, 400, 400),
        alt: master.image.title || master.name,
    }));

    return (
        <section className={clsx('section', mastersStyles['masters'])} id="masters">
            <MastersSlider mastersList={mastersList}/>
        </section>
    );
}