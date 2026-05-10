export default defineEventHandler(async event => {
  const session = await requireUserSession(event)
  const body = await readBody(event)

  await prisma.file.create({
    data: {
      userId: session.user.id,
      key: body.key,
      fileName: body.fileName,
      type: body.type,
      size: body.size,
      category: getCategory(body.type)
    }
  })

  return true
})
