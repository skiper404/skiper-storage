import z from 'zod'

import { passwordSchema } from './passwordSchema'

export const resetPasswordSchema = z
  .object({
    password: passwordSchema,
    repeatPassword: passwordSchema
  })
  .refine(data => data.password === data.repeatPassword, {
    message: 'passwordMustMatch',
    path: ['repeatPassword']
  })
