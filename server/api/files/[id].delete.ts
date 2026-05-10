import { DeleteObjectCommand } from '@aws-sdk/client-s3'

export default defineEventHandler(async event => {
  const session = await requireUserSession(event)
  const id = getRouterParam(event, 'id')

  const file = await prisma.file.delete({
    where: { id, userId: session.user.id }
  })

  await s3.send(
    new DeleteObjectCommand({ Bucket: 'image-storage', Key: file.key })
  )

  return true
})
