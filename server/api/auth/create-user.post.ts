import { hash } from 'argon2'

import { prisma } from '~~/server/utils/db-client'
import { setSession } from '~~/server/utils/set-session'
import { createUserSchema } from '~~/shared/schemas/create-users-schema'

export default defineEventHandler(async event => {
  const body = await readBody(event)

  const validatedBody = createUserSchema.safeParse(body)

  if (!validatedBody.success) {
    throw createError({
      statusCode: 400,
      data: validatedBody.error.flatten().fieldErrors
    })
  }

  const { email, username } = validatedBody.data

  const existingUser = await prisma.user.findUnique({
    where: { email }
  })

  if (existingUser) {
    throw createError({
      statusCode: 409,
      statusMessage: 'Conflict',
      message: 'emailAlreadyExist'
    })
  }

  const newUser = await prisma.user.create({
    data: {
      username: username,
      email: email,
      password: await hash(body.password)
    }
  })

  await setSession(event, newUser)

  return true
})
