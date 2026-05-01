import z from 'zod'

import { emailSchema } from './emailSchema'

export const forgotPasswordSchema = z.object({
  email: emailSchema
})
