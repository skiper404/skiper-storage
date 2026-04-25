import { getRequiredUser } from '~~/server/utils/getRequiredUser'

export default eventHandler(async event => {
  const user = await getRequiredUser(event)
  const id = getRouterParam(event, 'id')

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing file id'
    })
  }

  const file = await prisma.file.findFirst({ where: { id, userId: user.id } })

  if (!file) {
    throw createError({
      statusCode: 404,
      statusMessage: 'File not found'
    })
  }

  return file
})
