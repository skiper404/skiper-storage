import { blob } from '@nuxthub/blob'
import { eventHandler, getRouterParam } from 'h3'

export default eventHandler(async event => {
  const session = await requireUserSession(event)
  const pathname = getRouterParam(event, 'pathname')

  if (!pathname) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing pathname'
    })
  }

  return blob.serve(event, pathname)
})
