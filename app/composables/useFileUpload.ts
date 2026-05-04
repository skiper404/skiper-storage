import type { SelectedFile } from '~~/shared/types/selected-file.type'

import { getCategory } from '~/lib/getCategory'

export const useFileUpload = (selectedFiles: Ref<SelectedFile[]>) => {
  const { t } = useI18n()
  const { remainingStorageSize } = useStorage()

  const isUploading = ref(false)

  const getFilesSize = (files: SelectedFile[]) =>
    files.reduce((acc, f) => acc + f.file.size, 0)

  const upload = useMultipartUpload(`/api/files/multipart`, {
    partSize: 1 * 1024 * 1024,
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

      await $fetch('/api/files/save-file', {
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
    if (getFilesSize(selectedFiles.value) > remainingStorageSize.value) {
      throw createError({ message: 'STORAGE_ERROR' })
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
