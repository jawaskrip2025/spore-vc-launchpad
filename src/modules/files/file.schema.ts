import z from "zod";

export const uploadFileSchema = z.object({
  file: z
    .instanceof(File)
    .refine(file => file.size <= 5 * 1024 * 1024, {
      message: "Max file size is 5MB"
    })
    .refine(file => ["image/jpeg", "image/png", "application/pdf"].includes(file.type), {
      message: "Only JPEG, PNG, or PDF files are allowed"
    })
})