import axios from 'axios'

export const useUpload = () => {
  const isUploading = ref(false)
  const selectedFiles = ref<SelectedFile[]>([])

  const selectedFilesSize = computed(() =>
    selectedFiles.value.reduce((total, file) => total + file.size, 0)
  )

  const clearSelectedFiles = () => {
    selectedFiles.value = []
  }

  const removeFile = (file: SelectedFile) => {
    selectedFiles.value = selectedFiles.value.filter(f => f.id !== file.id)
  }

  const addFiles = (files: FileList) => {
    const newFiles: SelectedFile[] = Array.from(files).map(file => ({
      id: crypto.randomUUID(),
      raw: file,
      name: file.name,
      size: file.size,
      type: file.type,
      progress: 0,
      preview: generatePreview(file)
    }))

    selectedFiles.value.push(...newFiles)
  }

  const upload = async () => {
    isUploading.value = true
    try {
      for (const file of selectedFiles.value) {
        const { uploadUrl, key } = await $fetch('/api/files/sign', {
          method: 'POST',
          body: { file }
        })

        await axios.put(uploadUrl, file.raw, {
          headers: { 'Content-Type': file.type },
          onUploadProgress(progressEvent) {
            if (!progressEvent.total) return
            file.progress = Math.floor(
              (progressEvent.loaded * 100) / progressEvent.total
            )
          }
        })

        await $fetch('/api/files/save', {
          method: 'POST',
          body: {
            key,
            fileName: file.name,
            type: file.type,
            size: file.size
          }
        })
      }
    } finally {
      isUploading.value = false
    }
  }

  return {
    isUploading,
    selectedFiles,
    selectedFilesSize,
    addFiles,
    upload,
    clearSelectedFiles,
    removeFile
  }
}
