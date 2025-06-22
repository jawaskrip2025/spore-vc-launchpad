import { z } from "zod"

export const formTokenSchema = z.object({
  name: z.string().min(1),
  symbol: z.string().min(1),
  chain: z.string().min(1),
  category: z.string().min(1),
  description: z.string().optional(),
  supply: z.coerce.number().min(1),
  status: z.string().optional(),
  socials: z.array(z.object({
    name: z.string().min(1),
    url: z.string().url()
  })),
  allocations: z.array(z.object({
    allocation: z.string().min(1),
    supply: z.coerce.number().min(0, "Min 0%").max(100, "Max 100%"),
    vesting: z.coerce.number().min(0),
    start_date: z.string().min(0)
  })).refine((allocs) => {
    const total = allocs.reduce((sum, a) => sum + a.supply, 0)
    return total === 100
  }, {
    message: "Total supply allocations must not exceed 100%",
    path: ["allocations"]
  }),
  presales: z.array(z.object({
    hardCap: z.coerce.number().min(1, "Hard cap required"),
    pricePerToken: z.coerce.number().min(0.00000001, "Price must be greater than 0"),
    unit: z.string().min(1, "Unit is required"),
    maxContribution: z.coerce.number().min(0, "Max contribution required"),
    duration: z.string().min(1, "Duration is required")
  })).optional(),
})
