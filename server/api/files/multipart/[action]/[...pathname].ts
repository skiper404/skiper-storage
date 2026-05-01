import { blob } from 'hub:blob'

export default eventHandler(async event => {
  const session = await requireUserSession(event)

  return blob.handleMultipartUpload(event, {
    addRandomSuffix: true,
    prefix: `userId_${session.user.id}/`
  })
})
