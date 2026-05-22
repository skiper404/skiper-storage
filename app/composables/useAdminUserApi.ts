export const useAdminUserApi = () => {
  const unblockUser = (id: string) => {
    try {
      $fetch('/api/admin/user', {
        method: 'PATCH',
        body: { id, isBlocked: false }
      })
    } catch (e) {
      console.log(e)
    }
  }

  const blockUser = (id: string, reason: string) => {
    try {
      $fetch('/api/admin/user', {
        method: 'PATCH',
        body: { id, reason, isBlocked: true }
      })
    } catch (e) {
      console.log(e)
    }
  }

  const deleteUser = (id: string, reason: string) => {
    try {
      $fetch('/api/admin/user', {
        method: 'DELETE',
        body: { id, reason }
      })
    } catch (e) {
      console.log(e)
    }
  }

  return { unblockUser, blockUser, deleteUser }
}
