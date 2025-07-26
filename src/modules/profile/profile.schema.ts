"use client"

import { z } from "zod"
export const formProfileSchema = z.object({
  fullname: z.string().min(1, { message: 'required' }).optional(),
  email: z.string().email().optional(),
  category: z.string().optional(),
})