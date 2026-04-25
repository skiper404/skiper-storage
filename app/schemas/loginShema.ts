import { toTypedSchema } from '@vee-validate/zod'
import z from 'zod'

export const loginSchema = toTypedSchema(
  z.object({
    email: z.string().trim().email('invalidEmail').nonempty('emptyField'),
    password: z
      .string()
      .trim()
      .regex(/[A-Z]/, 'uppercaseRequired')
      .regex(/[a-z]/, 'lowercaseRequired')
      .regex(/[0-9]/, 'digitRequired')
      .min(8, 'minLength')
      .max(30, 'maxLength')
  })
)
