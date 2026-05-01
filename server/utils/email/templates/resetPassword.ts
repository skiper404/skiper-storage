import { Token } from '~~/prisma/generated/client'

const config = useRuntimeConfig()

export const resetPasswordTemplate = (token: Token) => {
  return `
          <h1 style="color:#111;">Reset password</h1>
          <p>Click the link below:</p>
          <a href="${config.public.appUrl}/auth/reset-password?token=${token.token}">Reset password</a>
        `
}
