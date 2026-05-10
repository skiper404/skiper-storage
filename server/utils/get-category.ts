export const getCategory = (type: string) => {
  if (type.startsWith('image')) return 'image'
  if (type.startsWith('video')) return 'video'
  if (type.startsWith('audio')) return 'audio'
  return 'misc'
}
