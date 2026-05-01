import { UploadedFile } from '~~/shared/types/uploaded-file.type'

export default defineEventHandler(async event => {
  const body = await readBody<UploadedFile>(event)
  const session = await requireUserSession(event)

  const file = await prisma.file.create({
    data: {
      userId: session.user.id,
      url: body.url,
      pathname: body.pathname,
      originalName: body.originalName,
      mimeType: body.mimeType,
      size: body.size,
      category: body.category
    }
  })

  return file
})
