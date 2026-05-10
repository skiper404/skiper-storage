import { TokenType, User } from '~~/prisma/generated/client'

export const generateToken = async (type: TokenType, user: User) => {
  await prisma.token.deleteMany({
    where: { userId: user.id, type }
  })

  const token = await prisma.token.create({
    data: {
      token: crypto.randomUUID(),
      expiresIn: new Date(new Date().getTime() + 5 * 60 * 1000), // +5 min
      type,
      userId: user.id
    }
  })

  return token
}
