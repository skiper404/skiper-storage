export default defineEventHandler(async event => {
  const session = await requireUserSession(event)
  const query = getQuery(event)

  const category =
    typeof query.category === 'string' ? query.category : undefined

  const list = await prisma.file.findMany({
    where: category
      ? {
          userId: session.user.id,
          category: category ?? undefined
        }
      : { userId: session.user.id }
  })

  return list
})
