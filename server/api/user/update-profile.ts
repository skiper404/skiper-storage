import { z } from 'zod'

import { prisma } from '~~/server/utils/db-client'
import { setSession } from '~~/server/utils/set-session'

const schema = z.object({
  username: z.string().min(3).max(30).optional(),
  email: z.string().email().optional()
})

export default defineEventHandler(async event => {
  const session = await requireUserSession(event)
  const body = await readBody(event)

  const parsed = schema.safeParse(body)

  if (!parsed.success) {
    throw createError({
      statusCode: 400,
      data: parsed.error.flatten().fieldErrors
    })
  }

  const { username, email } = parsed.data

  if (!username && !email) {
    throw createError({
      statusCode: 400,
      message: 'noDataProvided'
    })
  }

  if (email) {
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser && existingUser.id !== session.user.id) {
      throw createError({
        statusCode: 409,
        message: 'emailAlreadyInUse'
      })
    }
  }

  const updatedUser = await prisma.user.update({
    where: { id: session.user.id },
    data: {
      ...(username !== undefined && { username }),
      ...(email !== undefined && { email })
    }
  })

  await setSession(event, updatedUser)

  return true
})
