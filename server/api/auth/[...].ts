import { NuxtAuthHandler } from '#auth'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { verify } from 'argon2'

export default NuxtAuthHandler({
	secret: process.env.AUTH_SECRET,
	adapter: PrismaAdapter(prisma),
	session: { strategy: 'jwt' },
	pages: { signIn: '/auth/login' },
	providers: [
		//@ts-expect-error
		GithubProvider.default({
			clientId: process.env.GITHUB_CLIENT_ID,
			clientSecret: process.env.GITHUB_CLIENT_SECRET,
		}),
		// @ts-expect-error
		GoogleProvider.default({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
		// @ts-expect-error
		CredentialsProvider.default({
			name: 'Credentials',

			async authorize(credentials: any) {
				if (!credentials?.email || !credentials?.password) return null

				const user = await prisma.user.findUnique({
					where: { email: credentials.email as string },
				})

				if (!user?.password) return null

				const isValid = await verify(user.password, credentials.password)

				if (!isValid) return null

				return {
					id: user.id,
					email: user.email,
					name: user.name,
					image: user.image,
				}
			},
		}),
	],
	callbacks: {
		async session({ session, token }) {
			if (session.user) {
				//@ts-expect-error
				session.user.id = token.id as string
			}

			return session
		},

		async jwt({ token, user }) {
			if (user) {
				token.id = user.id as string
			}

			return token
		},
	},
})
