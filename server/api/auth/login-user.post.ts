import { verify } from 'argon2'

import { setSession } from '~~/server/utils/setUserSession'
import { loginUserSchema } from '~~/shared/schemas/loginUserSchema'

export default defineEventHandler(async event => {
  const body = await readBody(event)

  const validatedBody = loginUserSchema.safeParse(body)

  if (!validatedBody.success) {
    throw createError({
      statusCode: 400,
      data: validatedBody.error.flatten().fieldErrors
    })
  }

  const { email, password } = validatedBody.data

  const user = await prisma.user.findUnique({ where: { email: email } })

  if (!user || !user.password) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid Credentials',
      message: 'invalidCredentials'
    })
  }

  const isValidPassword = await verify(user.password, password)

  if (!isValidPassword) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid Credentials',
      message: 'invalidCredentials'
    })
  }

  await setSession(event, user)

  return true
})
