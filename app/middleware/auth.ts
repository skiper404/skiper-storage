export default defineNuxtRouteMiddleware(async to => {
  const { loggedIn, fetch } = useUserSession()
  const localePath = useLocalePath()

  await fetch()

  if (!loggedIn.value) {
    return navigateTo(localePath('/auth/login-user'))
  }
})
