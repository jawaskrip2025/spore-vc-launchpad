// import { z } from "zod"

// export const formTokenSchema = z.object({
//   name: z.string().min(2).max(100),
//   symbol: z.string().min(2).max(100),
//   chain: z.string().min(2).max(100),
//   category: z.string().min(2).max(100),
//   description: z.string().max(200),
//   supply: z.coerce.string().min(1, "Supply is required"),
//   allocations: z.array(z.object({
//     allocation: z.string().min(1, "Name is required"),
//     supply: z.coerce.number().min(0, "Amount must be greater than or equal to 0"),
//     vesting: z.coerce.number().min(0, "Vesting (in months) must be greater than or equal to 0"),
//   }))
// })

import { z } from "zod"

export const formTokenSchema = z.object({
  name: z.string().min(1),
  symbol: z.string().min(1),
  chain: z.string().min(1),
  category: z.string().min(1),
  description: z.string().optional(),
  supply: z.coerce.number().min(1),
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
  })
})
