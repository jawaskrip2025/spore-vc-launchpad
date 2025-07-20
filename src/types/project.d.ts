import {
  allocationSchema,
  formBuyPresale,
  formCreateProjectSchema,
  formFilterProjectSchema,
  presalesSchema
} from "@/modules/project/project.schema";
import { TCategory } from "./category";
import { TSocial } from "./social";
import { TChain } from "./chain";

export type TFormProject = z.infer<typeof formCreateProjectSchema>
export type TFormProjectAllocation = z.infer<typeof allocationSchema>
export type TFormProjectPresale = z.infer<typeof presalesSchema>
export type TFormFilterProject = z.infer<typeof formFilterProjectSchema>
export type TFormBuyPresale = z.infer<typeof formBuyPresale>

type TAllocation = {
  id: string
  name: string
  supply: number,
  vesting: number
  startDate: string
  isPresale: boolean,
}
export type TPresale = {
  id: string
  hardcap: string
  price: string
  maxContribution: string
  duration: string
  unit: string
}
type TProjectOwner = {
  id: string
  fullname: string
  walletAddress: string | null,
  verifications: { status: string }[]
}

export type TProjectReviewLog = {
  id: string
  status: string
  note?: string
  createdAt: string
  createdBy: string
}
export type TProject = {
  id: string
  name: string
  slug: string
  logo: string
  banner: string
  ticker: string
  decimals: number
  totalSupply: string
  detail: string
  status: "PENDING" | "APPROVED" | "REJECTED" | "DEPLOYED",
  allocations: TAllocation[]
  socials: {
    url: string,
    social: TSocial
  }[],
  presales: TPresale,
  category: TCategory
  chains: {
    chain: TChain
  }[]
  Presales: TPresale[]
  user: TProjectOwner
  reviewLogs: TReviewLog[]
}
