import { STORAGE_PLANS } from '~~/shared/constants'
import type { UploadedFile } from '~~/shared/types/uploaded-file.type'

export const useStorage = (files: Ref<UploadedFile[]>) => {
  const { user } = useUserSession()

  const storagePlan = computed(() => user.value?.plan || 'FREE')
  const storageSpace = computed(() => STORAGE_PLANS[storagePlan.value])

  const totalSize = computed(() =>
    files.value.reduce((sum, file) => sum + file.size, 0)
  )

  const usedPercentage = computed(
    () => (totalSize.value * 100) / storageSpace.value
  )

  return {
    totalSize,
    usedPercentage,
    remainingSize: computed(() => storageSpace.value - totalSize.value)
  }
}
