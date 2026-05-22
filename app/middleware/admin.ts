export default defineNuxtRouteMiddleware(async to => {
  const { loggedIn, fetch, user } = useUserSession()

  await fetch()

  if (!loggedIn.value) {
    return navigateTo('/auth/login-user')
  }

  if (user.value?.role !== 'ADMIN') {
    return navigateTo('/')
  }
})
