import { JSX } from 'react'
import contactsPageStyles from './ContactsPage.module.scss'
import clsx from 'clsx'
import Social from '@/components/Social/Social'
import FormContacts from '@/components/Forms/FormContacts/FormContacts'
import { MainInfo } from '@/types/types'
import cockpit from '@/lib/CockpitAPI'
import { createEmailLink, createPhoneLink } from '@/functions/functions'

export default async function ContactsPage(): Promise<JSX.Element | null> {
  const contactsInfo: MainInfo | null = await cockpit.getSingleItem('maininfo')

  if (!contactsInfo) {
    return null
  }

  const address = contactsInfo.address
  const email = contactsInfo.email
  const phone = contactsInfo.phone

  return (
    <>
      <section className={clsx('section', contactsPageStyles['contacts'])}>
        <div className={clsx('container', contactsPageStyles['contacts__container'])}>
          <h2 className="visually-hidden">Контакты</h2>

          <ul className={contactsPageStyles['contacts__list']}>
            {address && (
              <li className={contactsPageStyles['contacts__item']}>
                <address className={contactsPageStyles['contacts__address']}>
                  <span className={contactsPageStyles['contacts__link-caption']}>Адрес:</span>

                  <span className={contactsPageStyles['contacts__link-value']}>{address}</span>
                </address>
              </li>
            )}

            {email && (
              <li className={contactsPageStyles['contacts__item']}>
                <a className={contactsPageStyles['contacts__link']} href={createEmailLink(email)}>
                  <span className={contactsPageStyles['contacts__link-caption']}>Email:</span>

                  <span className={contactsPageStyles['contacts__link-value']}>{email}</span>
                </a>
              </li>
            )}

            {phone && (
              <li className={contactsPageStyles['contacts__item']}>
                <a className={contactsPageStyles['contacts__link']} href={createPhoneLink(phone)}>
                  <span className={contactsPageStyles['contacts__link-caption']}>Телефон:</span>

                  <span className={contactsPageStyles['contacts__link-value']}>{phone}</span>
                </a>
              </li>
            )}
          </ul>

          <Social addClass={contactsPageStyles['contacts__social']} />

          <div className={contactsPageStyles['contacts__map']} id="map"></div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section__title">Связаться с нами</h2>

          <FormContacts />
        </div>
      </section>
    </>
  )
}
