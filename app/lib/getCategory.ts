export const getCategory = (file: File) => {
	if (file.type.startsWith('image/')) return 'image'
	if (file.type.startsWith('video/')) return 'video'
	if (file.type.startsWith('audio/')) return 'audio'
	return 'misc'
}
