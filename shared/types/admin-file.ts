import { type User } from '#auth-utils'

export interface AdminFile {
  id: string
  key: string
  fileName: string
  type: string
  category: string
  size: number
  userId: string
  createdAt: string
  updatedAt: string
  isBlocked: boolean
  isDeleted: boolean
  user: User
}
