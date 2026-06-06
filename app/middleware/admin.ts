export default defineNuxtRouteMiddleware(async to => {
  const localePath = useLocalePath()
  const { loggedIn, fetch, user } = useUserSession()

  await fetch()

  if (!loggedIn.value) {
    return navigateTo(localePath('/auth/login-user'))
  }

  if (user.value?.role !== 'ADMIN') {
    return navigateTo(localePath('/'))
  }
})
