import {JSX} from 'react';
import logoStyles from './Logo.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import {MainInfo} from '@/types/types';
import cockpit from '@/lib/CockpitAPI';

export default async function Logo(): Promise<JSX.Element> {
    const mainInfo: MainInfo = await cockpit.getSingleItem('maininfo');

    const logo = cockpit.getImageUrl(mainInfo.logo._id, 60, 60);

    return (
        <Link className={logoStyles['logo']} href="/">
            <Image className={logoStyles['logo__image']}
                   src={logo}
                   width="60"
                   height="60"
                   unoptimized
                   alt="Иконописная мастерская"
            />
        </Link>
    );
}
