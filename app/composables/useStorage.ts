import { STORAGE_LIMIT } from '~/constants'
import type { UploadedFile } from '~/types/uploaded-file.type'

export const useStorage = (files: Ref<UploadedFile[]>) => {
  const totalSize = computed(() =>
    files.value.reduce((sum, file) => sum + file.size, 0)
  )

  const usedPercentage = computed(() => (totalSize.value * 100) / STORAGE_LIMIT)

  return {
    totalSize,
    usedPercentage,
    remainingSize: computed(() => STORAGE_LIMIT - totalSize.value)
  }
}
