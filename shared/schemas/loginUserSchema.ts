import z from 'zod'

import { emailSchema } from './emailSchema'
import { passwordSchema } from './passwordSchema'

export const loginUserSchema = z.object({
  email: emailSchema,
  password: passwordSchema
})
