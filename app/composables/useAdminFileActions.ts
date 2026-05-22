export const useAdminFileActions = () => {
  const { t } = useI18n()

  const selectedReason = ref('')
  const activeAction = ref<Action>(null)

  const setAction = (action: Action) => {
    activeAction.value = action
  }

  const close = () => {
    activeAction.value = null
    selectedReason.value = ''
  }

  const title = computed(() => {
    if (activeAction.value === 'unblock') return t('ui.dialog.unblock.file.title')
    if (activeAction.value === 'block') return t('ui.dialog.block.file.title')
    if (activeAction.value === 'delete') return t('ui.dialog.delete.file.title')
  })

  const description = computed(() => {
    if (activeAction.value === 'unblock') return t('ui.dialog.unblock.file.description')
    if (activeAction.value === 'block') return t('ui.dialog.block.file.description')
    if (activeAction.value === 'delete') return t('ui.dialog.delete.file.description')
  })

  const isConfirmDisabled = computed(() => {
    if (activeAction.value === 'unblock') return false
    return selectedReason.value === ''
  })

  return { selectedReason, activeAction, title, description, isConfirmDisabled, setAction, close }
}
