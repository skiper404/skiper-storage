import { DeleteObjectCommand } from '@aws-sdk/client-s3'

import { deleteFileTemplate } from '~~/server/utils/email/templates/deleteFile'

type DeleteFile = { id: string; reason?: string; isDeleted: boolean }

export default defineEventHandler(async event => {
  const body = await readBody<DeleteFile>(event)
  const { sendMail } = useNodeMailer()

  const { id, reason, isDeleted } = body

  const file = await prisma.file.findFirst({
    where: { id },
    include: { user: true }
  })

  if (!file) {
    throw createError({ statusCode: 404 })
  }

  await s3.send(
    new DeleteObjectCommand({
      Bucket: 'image-storage',
      Key: file.key
    })
  )

  await prisma.file.delete({
    where: { id }
  })

  const fileToSend = { fileName: file.fileName, userEmail: file.user.email, userName: file.user.username }

  await sendMail({
    subject: `Skiper Storage | Delete File`,
    html: deleteFileTemplate(fileToSend, reason!),
    to: file.user.email
  })

  console.log('delete file')

  return true
})
