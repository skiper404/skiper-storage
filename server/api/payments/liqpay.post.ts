import crypto from 'crypto'

import { paymentSchema } from '~~/shared/schemas/paymentSchema'

export default defineEventHandler(async event => {
  const session = await requireUserSession(event)
  const body = await readBody(event)

  const validatedBody = paymentSchema.safeParse(body)

  if (!validatedBody.success) {
    console.log(validatedBody.error.flatten().fieldErrors)

    throw createError({
      statusCode: 400,
      data: validatedBody.error.flatten().fieldErrors
    })
  }

  const { action, amount, currency, description } = validatedBody.data

  // декодирую для удобства потом буду через базу
  const order_id = Buffer.from(
    JSON.stringify({
      userId: session.user.id,
      plan: body.plan,
      timestamp: Date.now()
    })
  ).toString('base64')

  const config = useRuntimeConfig()

  const params = {
    public_key: config.liqpayPublicKey,
    version: 3,
    sandbox: 1,
    action: action,
    amount: amount,
    currency: currency,
    description: description,
    order_id,
    result_url: `${config.public.appUrl}/payment/success`,
    server_url: `${config.public.appUrl}/api/payments/callback`
  }

  const data = Buffer.from(JSON.stringify(params)).toString('base64')

  const signature = crypto
    .createHash('sha1')
    .update(config.liqpayPrivateKey + data + config.liqpayPrivateKey)
    .digest('base64')

  return {
    data,
    signature
  }
})
