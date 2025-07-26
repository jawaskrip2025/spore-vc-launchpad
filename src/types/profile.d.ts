import { formProfileSchema } from "@/modules/profile/profile.schema"
import { formMemberVerificationSchema } from "@/modules/verification/verification.schema"
import z from "zod"

type VerificationStatus = {
  status: "PENDING" | "REJECTED" | "APPROVED"
}
export type TMemberVerificationLog = {
  id: string
  status: "PENDING" | "REJECTED" | "APPROVED"
  note?: string | null
  createdAt: string | null
  createdBy: string | null
}
export type TMemberVerfication = {
  idCard: string
  selfie: string
  bisnisLicense: string
  taxId: string
  submittedAt: string
  approvedAt: string
  status: boolean
  rejectionReason?: string | null
  rejectedAt?: string
  logs: TMemberVerificationLog[]
}
export type TVerificationRequirement = {
  SelfieRequired: boolean,
  IDCardRequired: boolean,
  BussinessLicenseRequired: boolean,
  TaxIdRequired: boolean,
}
export type TProfile = {
  id: string
  fullname: string | null
  email: string | null,
  status: boolean,
  type: "PUBLIC" | "INTERNAL" | "PROJECT_OWNER",
  category: "PERSONAL" | "CORPORATE" | "UNSIGNED",
  // verifications?: VerificationStatus[] | []
  verifications?: TMemberVerificationLog[] | []
  walletAddress: string | null
}
export type TVerificationLogs = {
  createdAt: string
  id: string
  note: string | null
  status: "PENDING" | "REJECTED" | "APPROVED",
}
export type TProfileDetail = TProfile & {
  verification?: TMemberVerfication
  vRequirement?: TVerificationRequirement
  lastVerification?: "PENDING" | "REJECTED" | "APPROVED",
  verificationLogs: TVerificationLogs[] | []
}

export type TFormProfile = z.infer<typeof formProfileSchema>
export type TFormMemberVerification = z.infer<ReturnType<typeof formMemberVerificationSchema>>
