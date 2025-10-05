export type MenuItem = {
    label: string;
    href: string;
}

export type CardItem = {
    id: number;
    title: string;
    text: string;
    href: string;
    image: string;
    alt: string;
}

export type AdvantageItem = {
    id: number;
    title: string;
    text: string;
}

export type ProcessItem = {
    id: number;
    title: string;
    text: string;
    image: string;
    alt: string;
}

export type GalleryItem = {
    id: number;
    title: string;
    text: string;
    image: string;
    alt: string;
}

export type ReviewItem = {
    id: number;
    date: string;
    stars: number;
    name: string;
    text: string;
}

export type FaqItem = {
    id: number;
    question: string;
    answer: string;
}

export type SlideItem = {
    id: number;
    image: string;
    alt: string;
    href: string;
}

export type BreadcrumbItem = {
    title: string;
    url?: string;
};
