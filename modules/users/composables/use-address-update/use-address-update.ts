import type { User } from '@/modules/users/entities/user'
import type { Address } from '@/modules/users/entities/address'


interface UseAddressUpdateOptions {
  user: Ref<User>
}

const INITIAL_ADDRESS = {
  zipCode: '',
  street: '',
  number: '',
  complement: '',
  neighborhood: '',
  city: '',
  state: ''
}

export function useAddressUpdate({ user }: UseAddressUpdateOptions) {
  const { logAndTrack } = useLogger()
  const service = useServices()
  const loading = ref(false)

  const address = ref<Address>(INITIAL_ADDRESS)

  const searchZipCode = async () => {
    if (!address.value.zipCode) {
      return
    }

    loading.value = true

    try {
      const { data } = await service.user.searchAddressByZipCode(address.value.zipCode)
      address.value = data
    } catch (error) {
      logAndTrack("useAddressUpdate", error)
    } finally {
      loading.value = false
    }
  }

  watchEffect(() => {
    if (!user.value) {
      return
    }

    address.value = user.value.address ?? INITIAL_ADDRESS
  })

  return {
    loading,
    address,
    searchZipCode,
  }

}
