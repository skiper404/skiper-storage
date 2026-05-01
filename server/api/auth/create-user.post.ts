import { hash } from 'argon2'

import { prisma } from '~~/server/utils/db'
import { setSession } from '~~/server/utils/setUserSession'
import { createUserSchema } from '~~/shared/schemas/createUserSchema'

export default defineEventHandler(async event => {
  const body = await readBody(event)

  const validatedBody = createUserSchema.safeParse(body)

  if (!validatedBody.success) {
    throw createError({
      statusCode: 400,
      data: validatedBody.error.flatten().fieldErrors
    })
  }

  const { email, password } = validatedBody.data

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
      email: email,
      password: await hash(body.password)
    }
  })

  await setSession(event, newUser)

  await setUserSession(event, {
    user: {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      image: newUser.image,
      role: newUser.role,
      plan: newUser.plan
    }
  })

  return true
})
