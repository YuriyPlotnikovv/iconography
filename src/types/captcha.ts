declare global {
  interface Window {
    smartCaptcha?: {
      render: (
        containerId: string,
        params: {
          sitekey: string
          invisible: boolean
          hideShield: boolean
          hl: string
          callback?: (token: string) => void
        },
      ) => number
      execute: (widgetId: number) => void
      reset: (widgetId: number) => void
      getResponse: (widgetId: number) => string
    }
  }
}

export {}
