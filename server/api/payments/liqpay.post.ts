import crypto from 'crypto'

import { getPlanPrice } from '~~/server/utils/getPlanPrice'

export default defineEventHandler(async event => {
  const session = await requireUserSession(event)
  const body = await readBody(event)


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
    action: 'pay',
    amount: getPlanPrice(body.plan),
    currency: 'UAH',
    description: `Upgrade to ${body.plan} Plan`,
    order_id,
    result_url: `${config.public.appUrl}/payment/success`,
    server_url: `https://myron-unfrequentable-digna.ngrok-free.dev/api/payments/callback`
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
