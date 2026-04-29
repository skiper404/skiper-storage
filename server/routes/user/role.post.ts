export default defineEventHandler(async event => {
  const session = await getUserSession(event)
  const body = await readBody(event)

  if (!session.user) {
    throw createError({ statusCode: 400, statusMessage: 'Not Found' })
  }

  const user = await prisma.user.update({
    where: { id: session.user.id },
    data: { role: body.role }
  })

  await setUserSession(event, { user })

  return true
})
