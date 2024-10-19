import type { Address } from './address'

export interface User {
  id: string
  username: string
  name: string
  avatarUrl: string
  phone?: string
  site?: string
  bio?: string
  address?: Address
  createdAt: Date
}
