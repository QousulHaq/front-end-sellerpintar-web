import { z } from 'zod'

export const loginSchema = z.object({
    username: z.string().nonempty(),
    password: z.string().min(8)
})
export const registerSchema = z.object({
    username: z.string().nonempty(),
    password: z.string().min(8),
    role: z.enum(["User", "Admin"], { message: "Role harus dipilih" })
})

export type LoginFormTypes = z.infer<typeof loginSchema>
export type RegsiterFormTypes = z.infer<typeof registerSchema>