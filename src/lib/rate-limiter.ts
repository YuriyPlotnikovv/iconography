/**
 * Rate Limiter
 */

type RateLimitEntry = {
  timestamps: number[]
}

class RateLimiter {
  private requests: Map<string, RateLimitEntry>
  private readonly maxRequests: number
  private readonly windowMs: number

  constructor(maxRequests = 3, windowMinutes = 15) {
    this.requests = new Map()
    this.maxRequests = maxRequests
    this.windowMs = windowMinutes * 60 * 1000
  }

  /**
   * Проверка, может ли идентификатор выполнить запрос
   * @param identifier
   * @returns true, если запрос разрешен, иначе false
   *
   * @example
   * if (formRateLimiter.check(userIp)) {
   *   // Разрешить отправку формы
   * } else {
   *   // Блокировать и показать сообщение об ошибке
   * }
   */
  check(identifier: string): boolean {
    const now = Date.now()
    const entry = this.requests.get(identifier)

    if (!entry) {
      this.requests.set(identifier, { timestamps: [now] })
      return true
    }

    const validTimestamps = entry.timestamps.filter((timestamp) => now - timestamp < this.windowMs)

    if (validTimestamps.length < this.maxRequests) {
      validTimestamps.push(now)
      this.requests.set(identifier, { timestamps: validTimestamps })
      return true
    }

    this.requests.set(identifier, { timestamps: validTimestamps })
    return false
  }

  /**
   * Очистка устаревших записей из памяти
   *
   * @example
   * formRateLimiter.cleanup()
   */
  cleanup(): void {
    const now = Date.now()
    for (const [identifier, entry] of this.requests.entries()) {
      const validTimestamps = entry.timestamps.filter(
        (timestamp) => now - timestamp < this.windowMs,
      )
      if (validTimestamps.length === 0) {
        this.requests.delete(identifier)
      } else {
        this.requests.set(identifier, { timestamps: validTimestamps })
      }
    }
  }

  /**
   * Получение времени ограничения
   * @param identifier
   * @returns Время в секундах, сколько осталось до снятия ограничения
   *
   * @example
   * const retryAfter = formRateLimiter.getRetryAfter(userIp)
   * if (retryAfter > 0) {
   *   // Показать сообщение о том, сколько осталось до следующей попытки
   * }
   */
  getRetryAfter(identifier: string): number {
    const entry = this.requests.get(identifier)
    if (!entry || entry.timestamps.length === 0) return 0

    const now = Date.now()
    const oldestTimestamp = Math.min(...entry.timestamps)
    const timeUntilExpiry = this.windowMs - (now - oldestTimestamp)

    return Math.ceil(timeUntilExpiry / 1000)
  }
}

export const formRateLimiter = new RateLimiter(3, 15)

if (typeof setInterval !== 'undefined') {
  setInterval(
    () => {
      formRateLimiter.cleanup()
    },
    30 * 60 * 1000,
  )
}
