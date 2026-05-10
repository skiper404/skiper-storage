import { GetObjectCommand } from '@aws-sdk/client-s3'

export default defineEventHandler(async event => {
  const session = await requireUserSession(event)
  const id = getRouterParam(event, 'id')

  if (!id) {
    throw createError({ status: 400, message: 'File id not provided' })
  }

  const file = await prisma.file.findUnique({
    where: { id, userId: session.user.id }
  })

  if (!file) {
    throw createError({ status: 404, message: 'Fiel not found' })
  }

  if (file.userId !== session.user.id) {
    throw createError({ status: 403, message: 'Forbidden' })
  }

  const response = await s3.send(
    new GetObjectCommand({ Bucket: 'image-storage', Key: file.key })
  )

  if (!response.Body) {
    throw createError({ status: 404, message: 'Sile missing' })
  }

  setHeader(event, 'Content-Type', file.type)

  setHeader(
    event,
    'Content-Disposition',
    `attachment; filename=${encodeURIComponent(file.fileName)}`
  )

  return sendStream(event, response.Body as any)
})
