export interface UseStripeAccountValidate {
}

export function useStripeAccountValidate() {
  const services = useServices()
  const { logAndTrack } = useLogger()
  const loading = ref(false)
  const isValid = ref(true)

  const validate = async (accountId?: string) => {
    loading.value = true
    if (!accountId || accountId === '') {
      isValid.value = false
      return
    }

    try {
      const response = await services.payment.isAccountValid(accountId)
      isValid.value = response.isValid
    }
    catch (error) {
      isValid.value = false
      logAndTrack('[useStripeAccountValidate]', error)
    }
    finally {
      loading.value = false
    }
  }

  return {
    validate,
    loading,
    isValid,
  }
}
