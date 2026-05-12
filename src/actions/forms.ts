'use server'

import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'
import cockpit from '@/lib/CockpitAPI'
import { verifyCaptcha } from '@/lib/captcha'
import { formRateLimiter } from '@/lib/rate-limiter'
import {
  reviewFormSchema,
  applicationFormSchema,
  zodErrors,
  ReviewFormData,
  ApplicationFormData,
} from '@/lib/schemas'

export type FormState = {
  success: boolean
  message: string
  errors?: Record<string, string>
}

/**
 * Получение IP адреса
 */
async function getClientIp(): Promise<string> {
  const headersList = await headers()
  const forwarded = headersList.get('x-forwarded-for')
  const realIp = headersList.get('x-real-ip')

  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }

  return realIp || 'unknown'
}

/**
 * Отправка формы отзывов
 */
export async function submitReview(
  prevState: FormState | null,
  formData: FormData,
): Promise<FormState> {
  const clientIp = await getClientIp()

  if (!formRateLimiter.check(clientIp)) {
    const retryAfter = formRateLimiter.getRetryAfter(clientIp)

    return {
      success: false,
      message: `Слишком много запросов. Попробуйте через ${Math.ceil(retryAfter / 60)} минут.`,
    }
  }

  const starsRaw = formData.get('stars')?.toString() || ''

  const parsed = reviewFormSchema.safeParse({
    name: formData.get('name')?.toString().trim() ?? '',
    phone: formData.get('phone')?.toString().trim() ?? '',
    email: formData.get('email')?.toString().trim() ?? '',
    review: formData.get('review')?.toString().trim() ?? '',
    stars: parseInt(starsRaw, 10),
    agreement: formData.get('agreement') === 'on',
  })

  if (!parsed.success) {
    return {
      success: false,
      message: 'Пожалуйста, заполните форму корректными значениями',
      errors: zodErrors(parsed.error),
    }
  }

  const { name, phone, email, review, stars }: ReviewFormData = parsed.data

  const photoFiles = formData
    .getAll('photos')
    .filter((file): file is File => file instanceof File && file.size > 0)

  if (photoFiles.length > 5) {
    return {
      success: false,
      message: 'Пожалуйста, заполните форму корректными значениями',
      errors: { photo: 'Можно загрузить не более 5 фото' },
    }
  }

  if (photoFiles.some((file) => !file.type.startsWith('image/') || file.size > 5 * 1024 * 1024)) {
    return {
      success: false,
      message: 'Пожалуйста, заполните форму корректными значениями',
      errors: { photo: 'Допустимы только изображения до 5 МБ каждое' },
    }
  }

  const captchaToken = formData.get('smart-token')?.toString() || ''
  const captchaValid = await verifyCaptcha(captchaToken, clientIp)

  if (!captchaValid) {
    return {
      success: false,
      message: 'Ошибка проверки капчи. Попробуйте еще раз.',
    }
  }

  const date = new Date().toISOString().slice(0, 10)
  const safeName = name.replace(/\s+/g, '_').replace(/[^a-zA-Zа-яёА-ЯЁ0-9_]/g, '')

  const renamedFiles = photoFiles.map((file, index) => {
    const ext = file.name.includes('.') ? file.name.split('.').pop() : 'jpg'
    const suffix = photoFiles.length > 1 ? `_${index + 1}` : ''
    const newName = `${safeName}_${date}${suffix}.${ext}`

    return new File([file], newName, { type: file.type })
  })

  const uploadedAssets = renamedFiles.length > 0 ? await cockpit.uploadAssets(renamedFiles) : []

  const result = await cockpit.createItem('reviews', {
    name,
    phone: phone || null,
    email,
    review,
    stars,
    date,
    ...(uploadedAssets.length > 0 ? { photos: uploadedAssets } : {}),
    _state: false,
    ip: clientIp,
  })

  if (!result) {
    return {
      success: false,
      message: 'Ошибка при сохранении отзыва. Попробуйте позже.',
    }
  }

  revalidatePath('/reviews')

  return {
    success: true,
    message: 'Спасибо за ваш отзыв! Он будет опубликован после модерации.',
  }
}

/**
 * Отправка формы обратной связи
 */
export async function submitApplication(
  prevState: FormState | null,
  formData: FormData,
): Promise<FormState> {
  const clientIp = await getClientIp()

  if (!formRateLimiter.check(clientIp)) {
    const retryAfter = formRateLimiter.getRetryAfter(clientIp)

    return {
      success: false,
      message: `Слишком много запросов. Попробуйте через ${Math.ceil(retryAfter / 60)} минут.`,
    }
  }

  const parsed = applicationFormSchema.safeParse({
    name: formData.get('name')?.toString().trim() ?? '',
    phone: formData.get('phone')?.toString().trim() ?? '',
    email: formData.get('email')?.toString().trim() ?? '',
    message: formData.get('message')?.toString().trim() ?? '',
    agreement: formData.get('agreement') === 'on',
  })

  if (!parsed.success) {
    return {
      success: false,
      message: 'Пожалуйста, заполните форму корректными значениями',
      errors: zodErrors(parsed.error),
    }
  }

  const { name, phone, email, message }: ApplicationFormData = parsed.data

  const captchaToken = formData.get('smart-token')?.toString() || ''
  const captchaValid = await verifyCaptcha(captchaToken, clientIp)

  if (!captchaValid) {
    return {
      success: false,
      message: 'Ошибка проверки капчи. Попробуйте еще раз.',
    }
  }

  const date = new Date().toISOString().slice(0, 10)

  const result = await cockpit.createItem('applications', {
    name,
    phone: phone || null,
    email,
    message: message || null,
    date,
    _state: false,
    ip: clientIp,
  })

  if (!result) {
    return {
      success: false,
      message: 'Ошибка при отправке заявки. Попробуйте позже.',
    }
  }

  return {
    success: true,
    message: 'Спасибо за обращение! Мы свяжемся с вами в ближайшее время.',
  }
}
