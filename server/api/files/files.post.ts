import { PutObjectCommand } from '@aws-sdk/client-s3'

import { getCategory } from '~~/server/utils/get-category'

export default defineEventHandler(async event => {
  const session = await requireUserSession(event)
  const files = await readMultipartFormData(event)

  if (!files || !files.length) throw createError({})

  for (const file of files) {
    const key = `${session.user.id}/${crypto.randomUUID()}`

    if (!file.filename)
      throw createError({ status: 400, message: 'Filename not provided' })

    if (!file.type) {
      throw createError({ status: 400, message: 'Filetype not provided' })
    }

    await s3.send(
      new PutObjectCommand({
        Bucket: 'image-storage',
        Key: key,
        Body: file.data,
        ContentType: file.type
      })
    )

    await prisma.file.create({
      data: {
        userId: session.user.id,
        key: key,
        fileName: file.filename,
        type: file.type,
        size: file.data.byteLength,
        category: getCategory(file.type)
      }
    })
  }

  return true
})
