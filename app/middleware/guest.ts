export default defineNuxtRouteMiddleware(async to => {
  const { loggedIn, fetch } = useUserSession()

  await fetch()

  if (loggedIn.value && to.path !== '/') {
    return navigateTo('/')
  }
})
