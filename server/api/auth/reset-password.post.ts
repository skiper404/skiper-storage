import { hash } from 'argon2'

import { resetPasswordSchema } from '~~/shared/schemas/resetPasswordSchema'

export default defineEventHandler(async event => {
  const body = await readBody(event)

  const validatedBody = resetPasswordSchema.safeParse(body)

  if (!validatedBody.success) {
    throw createError({
      statusCode: 400,
      data: validatedBody.error.flatten().fieldErrors
    })
  }

  const { password, token } = validatedBody.data

  const resetToken = await prisma.token.findFirst({ where: { token } })

  if (!resetToken) {
    throw createError({ statusCode: 404, message: 'notFoundToken' })
  }

  const isExpires =
    new Date().getTime() > new Date(resetToken.expiresIn).getTime()

  if (isExpires) {
    throw createError({
      statusCode: 400,
      message: 'tokenExpired'
    })
  }

  await prisma.user.update({
    where: { id: resetToken.userId },
    data: {
      password: await hash(password)
    }
  })

  return true
})
