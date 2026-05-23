export const useAdminActions = (entity: 'file' | 'user') => {
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
    if (!activeAction.value) return ''

    return t(`dialogs.${entity}.${activeAction.value}.title`)
  })

  const description = computed(() => {
    if (!activeAction.value) return ''

    return t(`dialogs.${entity}.${activeAction.value}.description`)
  })

  const isConfirmDisabled = computed(() => {
    if (activeAction.value === 'unblock') return false

    return selectedReason.value === ''
  })

  return {
    selectedReason,
    activeAction,
    title,
    description,
    isConfirmDisabled,
    setAction,
    close
  }
}
