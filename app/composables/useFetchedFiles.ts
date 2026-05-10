import type { File } from '~~/prisma/generated/client'

export const useFetchedFiles = (category = '') => {
  const { data, execute } = useFetch<File[]>(() => `/api/files/files`)
  const files = computed(() => data.value ?? [])

  return { files, execute }
}
