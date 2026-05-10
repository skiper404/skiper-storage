import { PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

export default defineEventHandler(async event => {
  const session = await requireUserSession(event)

  const { file } = await readBody(event)

  if (!file) {
    throw createError({ statusCode: 400, message: 'Invalid data' })
  }

  const key = `${session.user.id}/${crypto.randomUUID()}-${file.fileName}`

  const command = new PutObjectCommand({
    Bucket: 'image-storage',
    Key: key,
    ContentType: file.fileType
  })

  const uploadUrl = await getSignedUrl(s3, command, { expiresIn: 60 })
  console.log(uploadUrl)

  return { uploadUrl, key }
})
