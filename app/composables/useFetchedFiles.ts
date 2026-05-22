import type { File } from '~~/shared/types/file'

export const useFetchedFiles = (category = '') => {
  const { data, execute, pending } = useFetch<File[]>(() => `/api/files/files?category=${category}`)
  const files = computed(() => data.value ?? [])

  return { files, execute, pending }
}
