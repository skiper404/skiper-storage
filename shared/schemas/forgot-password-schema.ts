import z from 'zod'

import { emailSchema } from './email-schema'

export const forgotPasswordSchema = z.object({
  email: emailSchema
})
