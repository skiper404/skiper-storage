import { blockUserTemplate } from '~~/server/utils/email/templates/blockUser'
import { unblockUserTemplate } from '~~/server/utils/email/templates/unblockUser'

type BlockUser = { id: string; reason?: string; isBlocked: boolean }

export default defineEventHandler(async event => {
  const { sendMail } = useNodeMailer()
  const body = await readBody<BlockUser>(event)

  const { id, reason, isBlocked } = body

  const user = await prisma.user.update({ where: { id }, data: { isBlocked } })

  await sendMail({
    subject: isBlocked ? `Skiper Storage | Block User` : `Skiper Storage | Unblock User`,
    html: isBlocked ? blockUserTemplate(user, reason!) : unblockUserTemplate(user),
    to: user.email
  })

  console.log(isBlocked ? `Skiper Storage | Block User` : `Skiper Storage | Unblock User`)

  return true
})
