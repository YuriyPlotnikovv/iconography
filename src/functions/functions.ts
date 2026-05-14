import DOMPurify from 'isomorphic-dompurify'

export const convertDateToLocale = (dateString: string, locale: string = 'ru-RU'): string => {
  const date = new Date(dateString)

  return date.toLocaleDateString(locale, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
}

export function createSanitizedHTML(htmlString: string | null | undefined): { __html: string } {
  const sanitized = DOMPurify.sanitize(htmlString || '')
  return { __html: sanitized }
}

export function normalizePhone(phone: string): string {
  return phone.replace(/[^+0-9]+/g, '').replace(/^[78]/, '+7')
}

export function createEmailLink(email: string): string {
  return 'mailto:' + email
}

export function createPhoneLink(phone: string): string {
  return 'tel:' + normalizePhone(phone)
}

export function createTelegramLink(telegram: string): string {
  return 'https://t.me/' + telegram
}

export function createWhatsappLink(whatsapp: string): string {
  return 'https://wa.me/' + normalizePhone(whatsapp)
}

export function createVkLink(vk: string): string {
  return 'https://vk.ru/' + vk
}

export function createMaxLink(max: string): string {
  return 'https://max.ru/' + max
}

export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').trim()
}

export function formatPrice(price: string | number): string {
  const num = typeof price === 'number' ? price : parseFloat(price)
  if (isNaN(num)) return String(price)
  return (
    new Intl.NumberFormat('ru-RU', {
      maximumFractionDigits: 0,
    }).format(num) + '\u00a0₽'
  )
}
