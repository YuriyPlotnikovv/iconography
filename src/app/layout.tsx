import '../styles/globals.scss';
import {playfair, montserrat, cyrillicOld} from './fonts';
import {JSX} from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';

type LayoutProps = {
    children?: React.ReactNode;
}

export default function RootLayout({children}: LayoutProps): JSX.Element {
    return (
        <html lang="ru">
        <body className={`${playfair.variable} ${montserrat.variable} ${cyrillicOld.variable}`}>
        <Header/>
        <main>
            {children}
        </main>
        <Footer/>
        </body>
        </html>
    );
}
