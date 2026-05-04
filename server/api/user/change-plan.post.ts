export default defineEventHandler(async event => {
  const session = await requireUserSession(event)
  const body = await readBody(event)

  const updatedUser = await prisma.user.update({
    where: { id: session.user.id },
    data: { plan: body.plan }
  })

  await setSession(event, updatedUser)

  return true
})
