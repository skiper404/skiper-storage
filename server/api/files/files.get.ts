export default defineEventHandler(async event => {
  const session = await requireUserSession(event)

  const list = await prisma.file.findMany({
    where: { userId: session.user.id }
  })

  return list
})
