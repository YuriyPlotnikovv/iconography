import {JSX} from 'react';
import clsx from 'clsx';
import {CardItem, CategoryFromServer} from '@/types/types';
import Card from '@/components/Card/Card';
import categoriesStyles from './Categories.module.scss';
import cockpit from '@/lib/CockpitAPI';

export default async function Categories(): Promise<JSX.Element> {
    const categoriesData: CategoryFromServer[] = await cockpit.getCollection('category');

    const categoriesList: CardItem[] = categoriesData.map((category) => ({
        id: category._id,
        title: category.title,
        description: category.description,
        href: `/categories/${category._id}`,
        image: cockpit.getImageUrl(category.image._id, 400, 400),
        alt: category.image.title || category.title,
    }));

    return (
        <section className={clsx('section', categoriesStyles['categories'])}>
            <div className="container">
                <h2 className="visually-hidden">
                    Категории икон
                </h2>

                <ul className={categoriesStyles['categories__list']}>
                    {
                        categoriesList.map((category) => {
                            return (
                                <li className={categoriesStyles['categories__item']} key={category.id}>
                                    <Card data={category}/>
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
        </section>
    );
}