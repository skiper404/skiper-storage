import { toast } from 'vue-sonner'

import type { SelectedFile } from '~~/shared/types/selected-file.type'

import { generatePreview } from '~/lib/generatePreview'

export const useFilePicker = () => {
  const { t } = useI18n()
  const limitUploadFiles = 10
  const inputRef = ref<HTMLInputElement | null>(null)
  const selectedFiles = ref<SelectedFile[]>([])

  const onSelectedFile = async (e: Event) => {
    const target = e.target as HTMLInputElement

    if (!target.files) return

    const newFiles = Array.from(target.files)

    if (selectedFiles.value.length + newFiles.length > limitUploadFiles) {
      toast.error(t('ui.upload.errors.maxFiles'))
      return
    }

    const preparedFiles = await Promise.all(
      newFiles.map(async file => ({
        file: file,
        preview: await generatePreview(file),
        progress: 0,
        uploading: false,
        uploaded: false
      }))
    )

    selectedFiles.value.push(...preparedFiles)
    target.value = ''
  }

  const removeSelectedFile = (id: number) => {
    selectedFiles.value.splice(id, 1)
  }

  return { inputRef, selectedFiles, onSelectedFile, removeSelectedFile }
}
