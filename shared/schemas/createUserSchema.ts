import z from 'zod'

import { emailSchema } from './emailSchema'
import { passwordSchema } from './passwordSchema'

export const createUserSchema = z.object({
  email: emailSchema,
  password: passwordSchema
})
