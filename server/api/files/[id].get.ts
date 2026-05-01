export default eventHandler(async event => {
  const session = await requireUserSession(event)
  const id = getRouterParam(event, 'id')

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing file id'
    })
  }

  const file = await prisma.file.findFirst({
    where: { id, userId: session.user.id }
  })

  if (!file) {
    throw createError({
      statusCode: 404,
      statusMessage: 'File not found'
    })
  }

  return file
})
