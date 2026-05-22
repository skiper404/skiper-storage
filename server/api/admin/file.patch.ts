import { blockFileTemplate } from '~~/server/utils/email/templates/blockFile'
import { unblockFileTemplate } from '~~/server/utils/email/templates/unblockFile'

type BlockFile = { id: string; reason?: string; isBlocked: boolean }

export default defineEventHandler(async event => {
  const { sendMail } = useNodeMailer()
  const body = await readBody<BlockFile>(event)
  const { id, reason, isBlocked } = body

  const file = await prisma.file.update({ where: { id }, data: { isBlocked }, include: { user: true } })

  const fileToSend = { fileName: file.fileName, userEmail: file.user.email, userName: file.user.username }

  await sendMail({
    subject: isBlocked ? `Skiper Storage | Block File` : `Skiper Storage | Unblock File`,
    html: isBlocked ? blockFileTemplate(fileToSend, reason!) : unblockFileTemplate(fileToSend),
    to: file.user.email
  })

  return true
})
