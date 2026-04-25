import generateMediaThumbnail from 'browser-thumbnail-generator'

export const generateThumbnail = async (file: File) => {
	const res = await generateMediaThumbnail({
		file,
		width: 300,
		height: 300,
		maintainAspectRatio: true,
	})

	return URL.createObjectURL(res.thumbnail)
}

export const generatePreview = async (file: File): Promise<string> => {
	if (file.type.startsWith('image/')) return generateThumbnail(file)
	if (file.type.startsWith('video/')) return generateThumbnail(file)
	if (file.type.startsWith('audio/')) return 'audio'
	return ''
}
