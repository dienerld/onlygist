import type { CreateCheckoutUrlOptions } from './types'

export function useStripeCheckout() {
  const services = useServices()
  const { logAndTrack } = useLogger()
  const checkoutUrl = ref('')

  const createCheckoutUrl = async ({ gistId, username }: CreateCheckoutUrlOptions) => {
    try {
      const response = await services.payment.createCheckout({ username, gistId })
      checkoutUrl.value = response.checkoutUrl
    }
    catch (error) {
      logAndTrack('[useStripeAccountCreate]', error)
    }
  }

  return {
    createCheckoutUrl,
    checkoutUrl,
  }
}
