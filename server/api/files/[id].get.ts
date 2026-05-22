export default defineEventHandler(async event => {
  const session = await requireUserSession(event)
  const id = getRouterParam(event, 'id')

  const file = await prisma.file.findFirst({
    where: { id }
  })

  if (!file) {
    throw createError({
      statusCode: 404,
      statusMessage: 'File not found'
    })
  }

  const isAdmin = session.user.role === 'ADMIN'

  if (file.isBlocked && !isAdmin) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Forbidden access'
    })
  }

  return {
    id: file.id,
    fileName: file.fileName,
    category: file.category,
    size: file.size,
    key: file.key,
    isBlocked: file.isBlocked
  }
})
