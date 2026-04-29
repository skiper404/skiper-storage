import { hash } from 'argon2'
import { prisma } from '~~/server/utils/db'

export default defineEventHandler(async (event) => {
	const body = await readBody(event)

	const existingUser = await prisma.user.findUnique({
		where: { email: body.email },
	})

	if (existingUser) {
		throw createError({
			statusCode: 409,
			statusMessage: 'Conflict',
			message: 'Email already exist',
		})
	}

	const newUser = await prisma.user.create({
		data: {
			email: body.email,
			password: await hash(body.password),
			name: body.name,
		},
	})

	await setUserSession(event, {
		user: {
			id: newUser.id,
			email: newUser.email,
			name: newUser.name,
			image: newUser.image,
			role: newUser.role,
			plan: newUser.plan,
		},
	})
	return sendRedirect(event, '/')
})
