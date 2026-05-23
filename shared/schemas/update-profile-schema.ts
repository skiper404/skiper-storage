import z from 'zod'

import { emailSchema } from './email-schema'
import { usernameSchema } from './username-schema'

export const updateProfileSchema = z.object({
  username: usernameSchema,
  email: emailSchema
})
