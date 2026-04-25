import { blob } from 'hub:blob'

import { getRequiredUser } from '~~/server/utils/getRequiredUser'

export default eventHandler(async event => {
  const user = await getRequiredUser(event)

  return blob.handleMultipartUpload(event, {
    addRandomSuffix: true,
    prefix: `userId_${user.id}/`
  })
})
