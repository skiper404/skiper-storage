import z from 'zod'

export const passwordSchema = z
  .string()
  .trim()
  .regex(/[A-Z]/, 'uppercaseRequired')
  .regex(/[a-z]/, 'lowercaseRequired')
  .regex(/[0-9]/, 'digitRequired')
  .min(8, 'minLength')
  .max(30, 'maxLength')
