export default defineEventHandler(async event => {
  const session = await requireUserSession(event)

  if (session.user.role !== 'ADMIN') {
    throw createError({ statusCode: 403 })
  }

  return prisma.file.findMany({
    include: {
      user: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  })
})
