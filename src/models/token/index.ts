import { z } from "zod";
import { formTokenSchema } from "./schema";

export type TFormToken = z.infer<typeof formTokenSchema>
export type TToken = {
  id: string
  file?: string
  name: string
  symbol: string
  chain: string
  category: string
  supply: number
  description?: string
  status?: string
  allocations: {
    allocation: string
    supply: number
    vesting: number
    start_date: string
  }[]
  presales?: {
    hardCap: number
    pricePerToken: number
    unit: string
    maxContribution: number
    duration: string
  }[]
  socials: {
    name: string
    url: string
  }[]
}

