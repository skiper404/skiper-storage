export default defineNuxtRouteMiddleware(async to => {
  const { fetch, user } = useUserSession()
  const localePath = useLocalePath()

  await fetch()

  if (user.value?.isBlocked) {
    return navigateTo(localePath('/auth/blocked-user'))
  }
})
