import {JSX} from 'react';
import clsx from 'clsx';
import {CardItem} from '@/types/types';
import Card from '@/components/Card/Card';
import galleryPageStyles from './GalleryPage.module.scss';

type GalleryPageProps = {
    galleryList: CardItem[],
}

export default function GalleryPage({galleryList}: GalleryPageProps): JSX.Element {
    return (
        <section className={clsx('section', galleryPageStyles['gallery'])}>
            <div className="container">
                <ul className={galleryPageStyles['gallery__list']}>
                    {
                        galleryList.map(gallery => {
                            return (
                                <Card data={gallery} key={gallery.id}/>
                            );
                        })
                    }
                </ul>
            </div>
        </section>
    );
}