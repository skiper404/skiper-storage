import { getRouterParam, setHeader } from 'h3'
import { blob } from 'hub:blob'

export default defineEventHandler(async (event) => {
	const id = getRouterParam(event, 'id')

	if (!id) {
		throw createError({
			statusCode: 404,
			statusMessage: 'File not found',
		})
	}

	const file = await prisma.file.findUnique({ where: { id } })

	if (!file) {
		throw createError({
			statusCode: 404,
			statusMessage: 'File not found',
		})
	}

	const object = await blob.get(file.pathname)

	if (!object) {
		throw createError({
			statusCode: 404,
			statusMessage: 'Blob not found',
		})
	}

	setHeader(event, 'Content-Type', file.mimeType)
	setHeader(
		event,
		'Content-Disposition',
		`attachment; filename="${encodeURIComponent(file.originalName)}"`,
	)

	return object.stream()
})
