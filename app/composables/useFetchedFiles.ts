export const useFetchedFiles = (category = '') => {
  const { data } = useFetch<UploadedFile[]>(
    () => `/api/files/files?category=${category}`
  )
  const files = computed(() => data.value ?? [])

  return { files }
}
