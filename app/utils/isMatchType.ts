import type { SelectedFile } from '~~/shared/types/selected-file'

export const isMatchType = (file: SelectedFile, type: FileType) => {
  return file.type.startsWith(type)
}
