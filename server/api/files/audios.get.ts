export default defineEventHandler(async event => {
  const session = await requireUserSession(event)

  const files = await prisma.file.findMany({
    where: { userId: session.user.id, category: 'audio' }
  })

  return files
})
