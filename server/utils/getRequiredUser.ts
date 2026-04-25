import { getServerSession } from '#auth'
import type { H3Event } from 'h3'

import type { AuthUser } from '../../app/types/auth-user'

export const getRequiredUser = async (event: H3Event): Promise<AuthUser> => {
  const session = await getServerSession(event)

  if (!session?.user || !('id' in session.user)) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  return session.user as AuthUser
}
