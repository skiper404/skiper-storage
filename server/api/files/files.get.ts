import { computed } from 'vue'

export default defineEventHandler(async event => {
  const session = await requireUserSession(event)
  const query = getQuery(event)

  const category = computed(() => query.category ?? null)

  const files = session.user.id
    ? await prisma.file.findMany({
        where: { userId: session.user.id }
      })
    : []

  return category.value
    ? files.filter(file => file.category === query.category)
    : files
})
