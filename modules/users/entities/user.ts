import type { Address } from './address'

export interface User {
  id: string
  username: string
  name: string
  email: string
  avatarUrl: string
  phone?: string
  site?: string
  bio?: string
  address?: Address
  paymentConnectedAccount: string
  createdAt: Date
}
