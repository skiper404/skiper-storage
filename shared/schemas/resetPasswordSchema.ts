import z from 'zod'

import { passwordSchema } from './passwordSchema'
import { tokenSchema } from './tokenSchema'

export const resetPasswordSchema = z
  .object({
    password: passwordSchema,
    repeatPassword: passwordSchema,
    token: tokenSchema
  })
  .refine(data => data.password === data.repeatPassword, {
    message: 'passwordMustMatch',
    path: ['repeatPassword']
  })
