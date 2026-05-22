import z from 'zod'

import { emailSchema } from './email-schema'
import { passwordSchema } from './password-schema'
import { usernameSchema } from './username-schema';

export const createUserSchema = z.object({
  username: usernameSchema,
  email: emailSchema,
  password: passwordSchema
})
