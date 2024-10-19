export function useLogger() {
  const config = useRuntimeConfig()

  const isProd = config.public.nodeEnv === 'production'

  const logAndTrack = (...args: any[]) => {
    if (isProd) {
      // console.log(...args);
      return
    }

    // eslint-disable-next-line no-console
    console.log(...args)
  }

  return { logAndTrack }
}
