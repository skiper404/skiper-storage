export default defineEventHandler(async event => {
  const session = await requireUserSession(event)
  const id = getRouterParam(event, 'id')

  const file = await prisma.file.findFirst({
    where: { id, userId: session.user.id }
  })

  return file
})
