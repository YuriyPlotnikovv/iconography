import { z } from 'zod'

const PHONE_REGEX = /^(\+?\d{1,4}?[\s\-]?)?(\(?\d{1,4}?\)?[\s\-]?)?[\d\s\-]{6,20}$/

const phoneField = z
  .string()
  .refine((val) => !val || PHONE_REGEX.test(val), 'Некорректный формат телефона')

const agreementField = z.literal(true, 'Необходимо согласие на обработку данных')

// Отзывы
export const reviewFormSchema = z.object({
  name: z.string().min(2, 'Имя должно содержать минимум 2 символа'),
  phone: phoneField,
  email: z
    .string()
    .min(1, 'Email обязателен для заполнения')
    .check(z.email('Некорректный формат email')),
  review: z.string().min(50, 'Отзыв должен содержать минимум 50 символов'),
  stars: z
    .number()
    .min(1, 'Пожалуйста, укажите оценку от 1 до 5')
    .max(5, 'Пожалуйста, укажите оценку от 1 до 5'),
  agreement: agreementField,
})

export type ReviewFormData = z.infer<typeof reviewFormSchema>

// Контакты
export const applicationFormSchema = z.object({
  name: z.string().min(2, 'Имя должно содержать минимум 2 символа'),
  phone: phoneField,
  email: z
    .string()
    .min(1, 'Email обязателен для заполнения')
    .check(z.email('Некорректный формат email')),
  message: z.string().optional(),
  agreement: agreementField,
})

export type ApplicationFormData = z.infer<typeof applicationFormSchema>

// ошибки Zod → плоский Record
export function zodErrors(error: z.ZodError): Record<string, string> {
  const flat = z.flattenError(error).fieldErrors as Record<string, string[] | undefined>
  return Object.fromEntries(
    Object.entries(flat)
      .filter(([, messages]) => Array.isArray(messages) && messages.length > 0)
      .map(([key, messages]) => [key, (messages as string[])[0]]),
  )
}

// валидация одного поля на клиенте
export function validateFormField(
  schema: z.ZodObject<z.ZodRawShape>,
  field: string,
  value: unknown,
): string {
  const fieldSchema = (schema.shape as Record<string, z.ZodTypeAny>)[field]
  if (!fieldSchema) return ''
  const result = fieldSchema.safeParse(value)
  return result.success ? '' : (result.error.issues[0]?.message ?? '')
}
