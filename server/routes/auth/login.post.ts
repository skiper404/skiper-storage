import { verify } from 'argon2'

export default defineEventHandler(async (event) => {
	const body = await readBody(event)

	const user = await prisma.user.findUnique({ where: { email: body.email } })

	if (!user || !user.password) {
		throw createError({
			statusCode: 401,
			statusMessage: 'Error Credentials',
			message: 'Wrong password or email',
		})
	}

	const isValidPassword = await verify(user.password!, body.password)

	if (!isValidPassword) {
		throw createError({
			statusCode: 401,
			statusMessage: 'Error Credentials',
			message: 'Wrong password or email',
		})
	}

	await setUserSession(event, {
		user: {
			id: user.id,
			email: user.email,
			name: user.name,
			image: user.image,
			role: user.role,
			plan: user.plan,
		},
	})
	return sendRedirect(event, '/')
})
