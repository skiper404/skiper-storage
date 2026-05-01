import { TokenType } from '~~/prisma/generated/enums'
import { resetPasswordTemplate } from '~~/server/utils/email/templates/resetPassword'
import { generateToken } from '~~/server/utils/generateToken'
import { forgotPasswordSchema } from '~~/shared/schemas/forgotPasswordSchema'

export default defineEventHandler(async event => {
  const { sendMail } = useNodeMailer()
  const body = await readBody(event)

  const validatedBody = forgotPasswordSchema.safeParse(body)

  if (!validatedBody.success) {
    throw createError({
      statusCode: 400,
      data: validatedBody.error.flatten().fieldErrors
    })
  }

  const { email } = validatedBody.data

  const user = await prisma.user.findUnique({ where: { email } })

  if (!user || !user.email) {
    throw createError({
      statusCode: 400,
      statusMessage: 'NotFound',
      message: 'notFoundEmail'
    })
  }

  const token = await generateToken(TokenType.RESET_PASSWORD, user)

  sendMail({
    subject: 'Skiper Storage | Reset password',
    html: resetPasswordTemplate(token),
    to: user.email
  })

  return true
})
