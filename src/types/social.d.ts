
import { formSocialSchema } from "@/modules/social/social.schema"
import { z } from "zod"


export type TFormSocial = z.infer<typeof formSocialSchema>

export type TSocial = {
  id: string
  name: string
  icon: string
}
