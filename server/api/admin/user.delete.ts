import { deleteUserTemplate } from '~~/server/utils/email/templates/deleteUser'

type DeleteUser = { id: string; reason?: string; isDeleted: boolean }

export default defineEventHandler(async event => {
  const body = await readBody<DeleteUser>(event)
  const { sendMail } = useNodeMailer()

  const { id, reason, isDeleted } = body

  const user = await prisma.user.delete({ where: { id } })

  await sendMail({
    subject: `Skiper Storage | Delete User`,
    html: deleteUserTemplate(user, reason!),
    to: user.email
  })

  console.log('delete user')

  return true
})
