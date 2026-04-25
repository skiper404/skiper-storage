import { STORAGE_LIMIT } from '~/constants'
import { getCategory } from '~/lib/getCategory'
import type { SelectedFile } from '~/types/selected-file.type'

STORAGE_LIMIT

export const useFileUpload = (
  selectedFiles: Ref<SelectedFile[]>,
  remainingSize: Ref<number>
) => {
  const isUploading = ref(false)

  const getFilesSize = (files: SelectedFile[]) =>
    files.reduce((acc, f) => acc + f.file.size, 0)

  const upload = useMultipartUpload(`/api/files/multipart`, {
    partSize: 5 * 1024 * 1024,
    maxRetry: 3
  })

  const uploadSingleFile = async (file: SelectedFile) => {
    file.uploading = true
    const { completed, progress: uploadProgress } = upload(file.file)

    watch(uploadProgress, value => {
      file.progress = value
    })

    try {
      const blob = await completed

      await $fetch('/api/files/save', {
        method: 'POST',
        body: {
          url: blob?.url,
          pathname: blob?.pathname,
          originalName: file.file.name,
          mimeType: file.file.type,
          size: file.file.size,
          category: getCategory(file.file)
        }
      })
      file.uploaded = true
    } finally {
      file.uploading = false
    }
  }

  const startUpload = async () => {
    if (getFilesSize(selectedFiles.value) > remainingSize.value) {
      throw new Error('Storage limit exceeded')
    }

    isUploading.value = true

    try {
      for (const file of selectedFiles.value) {
        await uploadSingleFile(file)
      }
    } finally {
      isUploading.value = false
    }
  }

  return { isUploading, startUpload }
}
