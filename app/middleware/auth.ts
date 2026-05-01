export default defineNuxtRouteMiddleware(async to => {
  const { loggedIn, fetch } = useUserSession()

  await fetch()

  if (!loggedIn.value && to.path !== '/auth/login-user') {
    return navigateTo('/auth/login-user')
  }
})
