import { getRequiredUser } from '~~/server/utils/getRequiredUser'

export default eventHandler(async event => {
  const user = await getRequiredUser(event)

  const files = await prisma.file.findMany({ where: { userId: user.id } })

  return files
})
