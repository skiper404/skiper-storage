import { DeleteObjectCommand } from '@aws-sdk/client-s3'

import { prisma } from '~~/server/utils/db-client'

export default defineEventHandler(async event => {
  const session = await requireUserSession(event)

  const userId = session.user.id

  const files = await prisma.file.findMany({
    where: { userId },
    select: {
      key: true
    }
  })

  for (const file of files) {
    const res = await s3.send(
      new DeleteObjectCommand({
        Bucket: process.env.S3_BUCKET_NAME!,
        Key: file.key
      })
    )
  }

  await prisma.file.deleteMany({ where: { userId } })
  await prisma.account.deleteMany({ where: { userId } })

  await prisma.user.delete({
    where: { id: userId }
  })

  return {
    success: true,
    deletedFiles: files.length
  }
})
