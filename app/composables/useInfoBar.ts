export const useInfoBar = () => {
  const isOpen = ref(true)

  const toggle = () => {
    isOpen.value = !isOpen.value
  }

  return { isOpen, toggle }
}
