import {JSX} from 'react';
import clsx from 'clsx';

import {CardItem, GalleryFromServer} from '@/types/types';
import GallerySlider from './GallerySlider';
import galleryStyles from './Gallery.module.scss';
import cockpit from '@/lib/CockpitAPI';

export default async function Gallery(): Promise<JSX.Element | null> {
    const galleryData: GalleryFromServer[] = await cockpit.getCollection('gallery', {
        limit: 10,
        sort: {sort: 1}
    });

    if (!galleryData || galleryData.length === 0) {
        return null;
    }

    const galleryList: CardItem[] = galleryData.map((item) => ({
        id: item._id,
        title: item.title,
        description: item.description,
        href: '/gallery',
        image: cockpit.getImageUrl(item.image._id, 400, 400),
        alt: item.image.title || item.title,
    }));

    return (
        <section className={clsx('section', galleryStyles['gallery'])}>
            <GallerySlider galleryList={galleryList}/>
        </section>
    );
}