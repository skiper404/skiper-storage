import { getRequiredUser } from '~~/server/utils/getRequiredUser'

import { UploadedFile } from '~/types/uploaded-file.type'

export default defineEventHandler(async event => {
  const body = await readBody<UploadedFile>(event)
  const user = await getRequiredUser(event)

  const file = await prisma.file.create({
    data: {
      userId: user.id,
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
