export default defineEventHandler(async event => {
  const session = await requireUserSession(event)

  if (session.user.role !== 'ADMIN') {
    throw createError({ statusCode: 403, message: 'Forbidden' })
  }

  const userList = await prisma.user.findMany({
    include: { files: true, _count: { select: { files: true } } },
    orderBy: { createdAt: 'desc' }
  })

  return userList
})
