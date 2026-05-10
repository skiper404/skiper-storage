import z from 'zod'

export const paymentSchema = z.object({
  plan: z.string().nonempty(),
  action: z.string().nonempty(),
  amount: z.number(),
  currency: z.string().nonempty(),
  description: z.string().nonempty()
})
