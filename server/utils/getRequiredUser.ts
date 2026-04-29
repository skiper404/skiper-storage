import type { H3Event } from 'h3'

import type { AuthUser } from '../../shared/types/auth-user'

export const getRequiredUser = async (event: H3Event): Promise<AuthUser> => {
  const session = await getUserSession(event)

  if (!session?.user || !('id' in session.user)) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  return session.user as AuthUser
}
