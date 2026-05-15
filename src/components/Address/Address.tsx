import { JSX } from 'react'
import addressStyles from './Address.module.scss'
import { MainInfoFromServer } from '@/types/types'
import { fetchSingleton } from '@/lib/api-client'

export default async function Address(): Promise<JSX.Element | null> {
  const mainInfo: MainInfoFromServer | null = await fetchSingleton<MainInfoFromServer>('maininfo')

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
