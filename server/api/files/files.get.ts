import { computed } from 'vue'

export default defineEventHandler(async event => {
  const session = await requireUserSession(event)
  const query = getQuery(event)

  const category = computed(() => query.category ?? null)

  // const files = await prisma.file.findMany({
  //   where: { userId: session.user.id }
  // })

  const files = [
    {
      id: 1,
      userId: 1,
      url: 'url-1',
      pathname: 'pathmame-1',
      originalName: 'audio-file-1',
      mimeType: 'audio',
      size: 15 * 1000 * 1000,
      category: 'audio'
    },
    {
      id: 2,
      userId: 1,
      url: 'url-2',
      pathname: 'pathmame-1',
      originalName: 'audio-file-2',
      mimeType: 'audio',
      size: 15 * 1000 * 1000,
      category: 'audio'
    },
    {
      id: 1,
      userId: 1,
      url: 'url-1',
      pathname: 'pathmame-1',
      originalName: 'image-file-1',
      mimeType: 'image',
      size: 10 * 1000 * 1000,
      category: 'image'
    },
    {
      id: 1,
      userId: 1,
      url: 'url-1',
      pathname: 'pathmame-1',
      originalName: 'image-file-2',
      mimeType: 'image',
      size: 10 * 1000 * 1000,
      category: 'image'
    },
    {
      id: 1,
      userId: 1,
      url: 'url-1',
      pathname: 'pathmame-1',
      originalName: 'video-file-1',
      mimeType: 'video',
      size: 50 * 1000 * 1000,
      category: 'video'
    },
    {
      id: 1,
      userId: 1,
      url: 'url-1',
      pathname: 'pathmame-1',
      originalName: 'video-file-2',
      mimeType: 'video',
      size: 50 * 1000 * 1000,
      category: 'video'
    }
  ]

  return category.value
    ? files.filter(file => file.category === query.category)
    : files
})
