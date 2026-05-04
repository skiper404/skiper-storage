export const useFetchedFiles = (category = '') => {
  const { data, execute } = useFetch<UploadedFile[]>(
    () => `/api/files/files?category=${category}`
  )
  const files = computed(() => data.value ?? [])

  return { files, execute }
}
