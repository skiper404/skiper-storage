export default defineEventHandler(async event => {
  const session = await requireUserSession(event)
  const query = getQuery(event)

  const category =
    typeof query.category === 'string' ? query.category : undefined

  return prisma.file.findMany({
    where: category
      ? {
          userId: session.user.id,
          category
        }
      : { userId: session.user.id },

    orderBy: {
      createdAt: 'desc'
    }
  })
})
