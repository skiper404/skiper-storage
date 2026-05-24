export const useAdminApi = (type: 'file' | 'user') => {
  const unblock = async (id: string) => {
    return await $fetch(`/api/admin/${type}`, {
      method: 'PATCH',
      body: { id, isBlocked: false }
    })
  }

  const block = async (id: string, reason: string) => {
    return await $fetch(`/api/admin/${type}`, {
      method: 'PATCH',
      body: { id, reason, isBlocked: true }
    })
  }

  const remove = async (id: string, reason: string) => {
    return await $fetch(`/api/admin/${type}`, {
      method: 'DELETE',
      body: { id, reason }
    })
  }

  return { unblock, block, remove }
}
