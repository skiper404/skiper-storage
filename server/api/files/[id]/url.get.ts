import { GetObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

export default defineEventHandler(async event => {
  const session = await requireUserSession(event)
  const id = getRouterParam(event, 'id')

  const file = await prisma.file.findFirst({
    where: { id }
  })

  if (!file) {
    throw createError({
      statusCode: 404,
      statusMessage: 'File not found'
    })
  }

  const isAdmin = session.user.role === 'ADMIN'

  if (file.isBlocked && !isAdmin) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Forbidden access'
    })
  }

  const command = new GetObjectCommand({
    Bucket: 'image-storage',
    Key: file.key
  })

  const url = await getSignedUrl(s3, command, {
    expiresIn: 3
  })

  return { url }
})
