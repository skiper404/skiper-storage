import { Plan } from '~~/prisma/generated/enums'
import { GB, MB } from '~~/shared/constants'

export const useStorage = () => {
  const { user } = useUserSession()
  const { files } = useFetchedFiles()

  const STORAGE_PLANS = {
    FREE: 300 * MB,
    PRO: 500 * MB,
    PREMIUM: 1 * GB
  }

  const storagePlan = computed<Plan>(() => user.value?.plan || 'FREE')

  const storagePlanLimit = computed(() => STORAGE_PLANS[storagePlan.value])

  const totalFileSizeInBytes = computed(() =>
    files.value.reduce((sum, file) => sum + file.size, 0)
  )

  const totalFileSizeInPercentage = computed(() =>
    Math.floor((totalFileSizeInBytes.value * 100) / storagePlanLimit.value)
  )

  const remainingStorageSize = computed(
    () => storagePlanLimit.value - totalFileSizeInBytes.value
  )

  const remainingStorageSizeInPercentage = computed(() =>
    Math.floor((remainingStorageSize.value * 100) / storagePlanLimit.value)
  )

  const getFilesByCategory = (category: string) =>
    files.value.filter(file => file.category === category)

  const getFileSizeByCategory = (category: string) =>
    getFilesByCategory(category).reduce((acc, file) => file.size + acc, 0)

  return {
    storagePlan,
    storagePlanLimit,
    totalFileSizeInBytes,
    totalFileSizeInPercentage,
    remainingStorageSize,
    remainingStorageSizeInPercentage,
    getFilesByCategory,
    getFileSizeByCategory
  }
}
