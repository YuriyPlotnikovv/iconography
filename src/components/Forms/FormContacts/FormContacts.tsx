import type { JSX } from 'react'
import FormContactsClient from './FormContactsClient'

export default function FormContacts(): JSX.Element {
  return (
    <FormContactsClient agreementUrl="/api/documents/agreement" policyUrl="/api/documents/policy" />
  )
}
