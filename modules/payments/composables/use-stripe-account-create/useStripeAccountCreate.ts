export function useStripeAccountCreate() {
  const services = useServices()
  const { logAndTrack } = useLogger()
  const loading = ref(false)

  const create = async (email: string) => {
    loading.value = true
    try {
      const response = await services.payment.createPayoutAccount(email)
      return response
    }
    catch (error) {
      logAndTrack('[useStripeAccountCreate]', error)
    }
    finally {
      loading.value = false
    }
  }

  return {
    create,
    loading,
  }
}
