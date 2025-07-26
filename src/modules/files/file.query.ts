import { useMutation } from "@tanstack/react-query"
import fileService from "./file.service"

export function useUploadFile() {
  return useMutation({
    mutationFn: async (file: File) => await fileService.UPLOAD(file, '/local', 'file'),
  })
}