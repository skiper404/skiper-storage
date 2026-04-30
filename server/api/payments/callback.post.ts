import crypto from 'crypto'

export default defineEventHandler(async event => {
  const config = useRuntimeConfig()
  const body = await readBody(event)

  const rawData = Buffer.from(body.data, 'base64').toString()
  const data = JSON.parse(rawData)

  // сравниваю сигнатуру
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

  const successStatuses = ['success', 'sandbox']

  if (!successStatuses.includes(data.status)) {
    return { ok: true, status: data.status }
  }

  // раскодирую
  const { userId, plan, timestamp } = JSON.parse(
    Buffer.from(data.order_id, 'base64').toString()
  )

  if (!userId || !plan) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid order_id format'
    })
  }

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

  return { ok: true }
})
