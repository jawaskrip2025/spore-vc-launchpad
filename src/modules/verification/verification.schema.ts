import { TVerificationRequirement } from "@/types/profile"
import { z } from "zod"

export const formMemberVerificationSchema = (verification?: TVerificationRequirement) => {
  return z.object({
    idCard: verification?.IDCardRequired ? z.string().min(1,'ID Card Required'): z.string().optional(),
    selfie: verification?.SelfieRequired ? z.string().min(1,'Selfie Required'): z.string().optional(),
    bisnisLicense: verification?.BussinessLicenseRequired ? z.string().min(1,'Bussiness License Required'): z.string().optional(),
    taxId: verification?.TaxIdRequired ? z.string().min(1,'Tax Id Required'): z.string().optional(),
  })
}