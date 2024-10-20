export interface IsAccountValidResponse {
  isValid: boolean
}

export interface CreateCheckoutOptions {
  username: string
  gistId: string
}

export interface CreateCheckoutResponse {
  id: string
  checkoutUrl: string
}

export interface CreatePayoutAccountResponse {
  accountId: string
  onboardingUrl: string
}
