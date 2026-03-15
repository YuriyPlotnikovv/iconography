import {JSX} from 'react';
import addressStyles from './Address.module.scss';
import {MainInfo} from '@/types/types';
import cockpit from '@/lib/CockpitAPI';

export default async function Address(): Promise<JSX.Element> {
    const mainInfo: MainInfo = await cockpit.getSingleItem('maininfo');
    const address = mainInfo.address;

    return (
        <address className={addressStyles['address']}>
            <p>{address}</p>
        </address>
    );
}