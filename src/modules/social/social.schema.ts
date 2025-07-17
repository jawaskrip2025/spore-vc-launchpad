"use client"

import { z } from "zod"
export const formSocialSchema = z.object({
  name: z.string().min(1, {
    message: 'required'
  }),
  logo: z.string().optional(),
  ticker: z.string(),
  type: z.string(),
  urlScanner: z.string().optional(),
})