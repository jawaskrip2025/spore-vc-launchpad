import { uploadFileSchema } from "@/modules/files/file.schema";
import z from "zod";

export type TUploadFileSchema = z.infer<typeof uploadFileSchema>

export type TFileResponse = {
  originalname: string,
  filename: string,
  path: string,
  mimetype: string
  size: number
  storage: string
}