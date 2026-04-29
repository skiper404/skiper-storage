import type { UploadedFile } from '~~/shared/types/uploaded-file.type'

export const useFilesStats = (files: UploadedFile[]) => {
  const filesByCategory = (category: string) =>
    files.filter(file => file.category === category)

  const categoryStats = (category: string) => {
    const list = filesByCategory(category)

    return {
      count: list.length,
      size: list.reduce((acc, file) => file.size + acc, 0)
    }
  }

  return { categoryStats }
}
