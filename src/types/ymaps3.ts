declare global {
  const ymaps3: {
    ready: Promise<void>
    import: (module: string) => Promise<Record<string, unknown>>
  }
}

export {}
