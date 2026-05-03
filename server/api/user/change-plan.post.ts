export default defineEventHandler(async event => {
  const session = await requireUserSession(event)
  const body = await readBody(event)

  const plan = await prisma.user.update({
    where: { id: session.user.id },
    data: { plan: body.plan }
  })

  return plan
})
