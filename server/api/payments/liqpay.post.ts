import crypto from 'crypto'

import { getPlanPrice } from '~~/server/utils/getPlanPrice'
import { BASE_URL } from '~~/shared/constants'

export default defineEventHandler(async event => {
  const session = await requireUserSession(event)
  const userId = session.user.id
  const body = await readBody(event)

  const config = useRuntimeConfig()

  const params = {
    public_key: config.liqpayPublicKey,
    version: 3,
    action: 'pay',
    amount: getPlanPrice(body.plan),
    currency: 'UAH',
    description: `Upgrade to ${body.plan} Plan`,
    order_id: `${userId}_${body.plan}`,
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
