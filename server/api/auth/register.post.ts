import { hash } from 'argon2'

export default defineEventHandler(async (event) => {
	const body = await readBody(event)
	const { email, password } = body

	const existingUser = await prisma.user.findUnique({
		where: { email: body.email },
	})

	if (existingUser) {
		throw createError({
			statusCode: 409,
			statusMessage: 'conflictEmail',
		})
	}

	const newUser = await prisma.user.create({
		data: { email, password: await hash(password) },
	})

	return { newUser }
})
