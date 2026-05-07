type CaptchaResponse = {
  status: 'ok' | 'failed'
  message?: string
  host?: string
}

/**
 * Верификация Yandex Smart Captcha token
 * @param token
 * @param ip - IP-адрес пользователя (необязательно)
 * @returns true, если верификация успешна, иначе false
 *
 * @example
 * const isValid = await verifyCaptcha(token, userIp)
 */
export async function verifyCaptcha(token: string, ip?: string): Promise<boolean> {
  const secret = process.env.CAPTCHA_SECRET

  if (!secret) {
    return false
  }

  if (!token) {
    return false
  }

  try {
    const params = new URLSearchParams({
      secret,
      token,
      ...(ip && { ip }),
    })

    const response = await fetch('https://smartcaptcha.cloud.yandex.ru/validate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    })

    if (!response.ok) {
      return false
    }

    const data: CaptchaResponse = await response.json()

    return data.status === 'ok'
  } catch {
    return false
  }
}
