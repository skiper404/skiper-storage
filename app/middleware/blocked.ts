export default defineNuxtRouteMiddleware(async to => {
  const { loggedIn, fetch, user } = useUserSession()

  await fetch()

  if (user.value?.isBlocked) {
    return navigateTo('/auth/blocked-user')
  }
})
