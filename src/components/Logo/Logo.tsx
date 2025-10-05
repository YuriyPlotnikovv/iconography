import {JSX} from 'react';
import logoStyles from './Logo.module.scss';
import clsx from 'clsx';
import Link from 'next/link';
import Image from 'next/image';

type LogoProps = {
    addClass: string,
}

export default function Logo({addClass}: LogoProps): JSX.Element {
    return (
        <Link className={clsx(addClass, logoStyles['logo'])} href="/">
            <Image className={logoStyles['logo__image']}
                   src="/"
                   width="100"
                   height="50"
                   unoptimized
                   alt="Иконописная мастерская"
            />
        </Link>
    );
}