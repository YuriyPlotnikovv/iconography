import {JSX} from 'react';
import clsx from 'clsx';

import {CardItem, NewsFromServer} from '@/types/types';
import NewsSlider from './NewsSlider';
import newsStyles from './News.module.scss';
import cockpit from '@/lib/CockpitAPI';

export default async function News(): Promise<JSX.Element | null> {
    const newsData: NewsFromServer[] = await cockpit.getCollection('news', {
        sort: {date: -1},
        limit: 10
    });

    if (!newsData || newsData.length === 0) {
        return null;
    }

    const newsList: CardItem[] = newsData.map((news) => ({
        id: news._id,
        title: news.title,
        description: news.description,
        href: `/news/${news._id}`,
        image: cockpit.getImageUrl(news.image._id, 400, 400),
        alt: news.image.title || news.title,
    }));

    return (
        <section className={clsx('section', newsStyles['news'])}>
            <NewsSlider newsList={newsList}/>
        </section>
    );
}