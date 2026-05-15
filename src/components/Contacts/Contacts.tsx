import { JSX } from 'react'
import contactsStyles from './Contacts.module.scss'
import clsx from 'clsx'
import { MainInfoFromServer } from '@/types/types'
import { fetchSingleton } from '@/lib/api-client'
import { createEmailLink, createPhoneLink } from '@/functions/functions'

type ContactsProps = {
  addClass: string
}

export default async function Contacts({ addClass }: ContactsProps): Promise<JSX.Element | null> {
  const mainInfo: MainInfoFromServer | null = await fetchSingleton<MainInfoFromServer>('maininfo')

  if (!mainInfo) {
    return null
  }

  const email = mainInfo.email
  const phone = mainInfo.phone

  if (!email && !phone) {
    return null
  }

  return (
    <ul className={clsx(addClass, contactsStyles['contacts'])}>
      {email && (
        <li className={contactsStyles['contacts__item']}>
          <a className={contactsStyles['contacts__link']} href={createEmailLink(email)}>
            <span className={contactsStyles['contacts__link-value']}>{email}</span>
          </a>
        </li>
      )}
      {phone && (
        <li className={contactsStyles['contacts__item']}>
          <a className={contactsStyles['contacts__link']} href={createPhoneLink(phone)}>
            <span className={contactsStyles['contacts__link-value']}>{phone}</span>
          </a>
        </li>
      )}
    </ul>
  )
}
