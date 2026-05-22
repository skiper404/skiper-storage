import { User } from '#auth-utils'
import { H3Event } from '#imports'

export const setSession = async (event: H3Event, user: User) => {
  return await setUserSession(event, {
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      image: user.image,
      role: user.role,
      plan: user.plan,
      isBlocked: user.isBlocked,
      isDeleted: user.isDeleted
    }
  })
}
