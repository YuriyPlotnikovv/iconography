import '../styles/globals.scss';
import '../styles/blocks.scss';
import {Playfair, Montserrat, CyrillicOld} from './fonts';
import {JSX} from 'react';
import clsx from 'clsx';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';

type LayoutProps = {
    children?: React.ReactNode;
}

export default function RootLayout({children}: LayoutProps): JSX.Element {
    return (
        <html lang="ru">
        <body className={clsx(Playfair.variable, Montserrat.variable, CyrillicOld.variable)}>
        <Header/>
        <main>
            {children}
        </main>
        <Footer/>
        </body>
        </html>
    );
}
