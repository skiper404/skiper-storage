import { Plan, PrismaClient, Role } from '@prisma/client'
import { hash } from 'argon2'

const prisma = new PrismaClient()

async function main() {
  const email = 'admin@admin.com'

  const existingAdmin = await prisma.user.findUnique({
    where: { email }
  })

  if (existingAdmin) {
    console.log('Admin already exists')
    return
  }

  await prisma.user.create({
    data: {
      email,
      username: 'admin',
      password: await hash('admin123A'),
      role: Role.ADMIN,
      plan: Plan.PREMIUM
    }
  })

  console.log('Admin created')
}

main().finally(() => prisma.$disconnect())
