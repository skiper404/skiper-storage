export const useAdminFileApi = () => {
  const unblockFile = (id: string) => {
    try {
      $fetch('/api/admin/file', {
        method: 'PATCH',
        body: { id, isBlocked: false }
      })
    } catch (e) {
      console.log(e)
    }
  }

  const blockFile = (id: string, reason: string) => {
    try {
      $fetch('/api/admin/file', {
        method: 'PATCH',
        body: { id, reason, isBlocked: true }
      })
    } catch (e) {
      console.log(e)
    }
  }

  const deleteFile = (id: string, reason: string) => {
    try {
      $fetch('/api/admin/file', {
        method: 'DELETE',
        body: { id, reason }
      })
    } catch (e) {
      console.log(e)
    }
  }

  return { unblockFile, blockFile, deleteFile }
}
