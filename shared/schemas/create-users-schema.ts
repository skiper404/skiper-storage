import z from 'zod'

import { emailSchema } from './email-schema'
import { passwordSchema } from './password-schema'

export const createUserSchema = z.object({
  email: emailSchema,
  password: passwordSchema
})
