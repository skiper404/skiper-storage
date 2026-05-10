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

  return {
    isUploading,
    selectedFiles,
    selectedFilesSize,
    clearSelectedFiles,
    removeFile
  }
}
