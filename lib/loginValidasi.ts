import { z } from "zod"


export const FormSchema = z.object({
  email: z.string()
    .email('Email tidak valid')
    .min(5, 'Email terlalu pendek'),
  password: z.string()
    .min(8, 'Minimal 8 karakter')
    .regex(/[A-Z]/, 'Harus mengandung huruf besar')
    .regex(/[0-9]/, 'Harus mengandung angka')
    .regex(/[^a-zA-Z0-9]/, 'Harus mengandung simbol'),
  full_name: z.string()
    .min(3, 'Minimal 3 karakter')
    .max(50, 'Maksimal 50 karakter')
})



