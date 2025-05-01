
import { z } from "zod"

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

export const festivalSchema = z.object({
  name: z.string().min(3, "Festival name must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  date: z.string(),
  location: z.string(),
  category: z.string(),
  price: z.number().min(0, "Price must be a positive number"),
})

export const ticketPurchaseSchema = z.object({
  festivalId: z.string(),
  ticketType: z.string(),
  quantity: z.number().min(1, "Quantity must be at least 1"),
})
