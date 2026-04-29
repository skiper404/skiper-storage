import crypto from 'crypto'

export default defineEventHandler(async event => {
  console.log('Коллбек вызывается')

  const config = useRuntimeConfig()
  const body = await readBody(event)

  // достаю data от LiqPay
  const rawData = Buffer.from(body.data, 'base64').toString()
  const data = JSON.parse(rawData)

  console.log(data)

  // проверка подписи (ОБЯЗАТЕЛЬНО)
  const expectedSignature = crypto
    .createHash('sha1')
    .update(config.liqpayPrivateKey + body.data + config.liqpayPrivateKey)
    .digest('base64')

  if (expectedSignature !== body.signature) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid signature'
    })
  }

  // проверка статуса платежа
  const successStatuses = ['success', 'sandbox']

  if (!successStatuses.includes(data.status)) {
    return { ok: true, status: data.status }
  }

  // извлекаю данные заказа
  const [userId, plan] = data.order_id.split('_')

  if (!userId || !plan) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid order_id format'
    })
  }

  // защита от повторного апдейта (idempotency)
  const user = await prisma.user.findUnique({
    where: { id: userId }
  })

  if (!user) {
    throw createError({
      statusCode: 404,
      statusMessage: 'User not found'
    })
  }

  if (user.plan === plan) {
    return { ok: true, message: 'Already updated' }
  }

  await prisma.user.update({
    where: { id: userId },
    data: {
      plan
    }
  })

  console.log('план поменялся: ', data.plan)

  return { ok: true }
})
