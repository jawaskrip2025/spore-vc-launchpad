import { BaseService } from "@/services/base.service"
import { TFileResponse, TUploadFileSchema } from "@/types/file"

class FileService extends BaseService<TFileResponse, TUploadFileSchema, TFileResponse> {
  protected endpoint = 'files/upload'
}

const fileService = new FileService()
export default fileService
