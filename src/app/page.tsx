import type {Metadata} from 'next';
import Image from 'next/image';
import styles from './page.module.scss';

export const metadata: Metadata = {
    title: 'Иконописная мастерская',
    description: 'Иконописная мастерская - описание',
};

export default function Home() {
    return (
        <>
            <Image
                className={styles.logo}
                src="/next.svg"
                alt="Next.js logo"
                width={180}
                height={38}
                priority
            />
            <h1 className="visually-hidden">
                Иконописная мастерская
            </h1>
        </>
    );
}
