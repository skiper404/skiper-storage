import { PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

import { toKebabCase } from '~~/server/utils/to-kebab-case'

export default defineEventHandler(async event => {
  const session = await requireUserSession(event)

  const body = await readBody(event)

  const { file } = body

  if (!file) {
    throw createError({ statusCode: 400, message: 'Invalid data' })
  }

  const key = `${session.user.id}/${crypto.randomUUID()}-${toKebabCase(file.name)}`

  const command = new PutObjectCommand({
    Bucket: 'image-storage',
    Key: key,
    ContentType: file.fileType
  })

  const uploadUrl = await getSignedUrl(s3, command, { expiresIn: 60 })

  return { uploadUrl, key }
})
