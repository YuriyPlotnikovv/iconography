import localFont from 'next/font/local'

export const CyrillicOld = localFont({
  src: [
    {
      path: '../fonts/CyrillicOld.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/CyrillicOld.woff',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-decor',
  fallback: ['Times New Roman', 'serif'],
  adjustFontFallback: 'Times New Roman',
  display: 'swap',
})

export const Montserrat = localFont({
  src: [
    {
      path: '../fonts/Montserrat-Variable.ttf',
      weight: '100 900',
      style: 'normal',
    },
    {
      path: '../fonts/Montserrat-Italic-Variable.ttf',
      weight: '100 900',
      style: 'italic',
    },
  ],
  variable: '--font-text',
  fallback: ['Arial', 'sans-serif'],
  adjustFontFallback: 'Arial',
  display: 'swap',
})
