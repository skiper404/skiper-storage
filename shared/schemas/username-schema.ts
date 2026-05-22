import z from 'zod'

export const usernameSchema = z
  .string()
  .trim()
  .nonempty('emptyField')
  .max(30, 'maxUsernameLength')
