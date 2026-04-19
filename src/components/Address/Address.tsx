import { JSX } from 'react'
import addressStyles from './Address.module.scss'
import { MainInfo } from '@/types/types'
import cockpit from '@/lib/CockpitAPI'

export default async function Address(): Promise<JSX.Element | null> {
  const mainInfo: MainInfo | null = await cockpit.getSingleItem('maininfo')

  if (!mainInfo || !mainInfo.address) {
    return null
  }

  const address = mainInfo.address

  return (
    <address className={addressStyles['address']}>
      <p>{address}</p>
    </address>
  )
}
