export default defineEventHandler(async event => {
  const session = await requireUserSession(event)

  const user = await prisma.user.findUnique({ where: { id: session.user.id } })

  if (!user) {
    throw createError({ statusCode: 401, statusMessage: 'User not found' })
  }

  await setSession(event, user)

  return user
})
