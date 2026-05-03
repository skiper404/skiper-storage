import z from 'zod'

export const paymentSchema = z.object({
  action: z.string(),
  amount: z.number(),
  currency: z.string(),
  description: z.string()
})
