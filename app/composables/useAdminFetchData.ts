export const useAdminFetchData = () => {
  const { data: users, execute: executeUsers } = useFetch('/api/admin/users')
  const { data: files, execute: executeFiles } = useFetch('/api/admin/files')

  const adminUsers = computed(() => users.value ?? [])
  const adminFiles = computed(() => files.value ?? [])

  return { adminUsers, adminFiles, executeUsers, executeFiles }
}
