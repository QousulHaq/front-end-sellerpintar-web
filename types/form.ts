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
export const createArticlesSchema = z.object({
    title: z.string().nonempty(),
    content: z.string().nonempty(),
    categoryId: z.string().nonempty(),
    imageUrl: z.string().nonempty(),
})
export const createCategorySchema = z.object({
    category: z.string().nonempty(),
    id: z.string().optional(),
})

export type LoginFormTypes = z.infer<typeof loginSchema>
export type RegsiterFormTypes = z.infer<typeof registerSchema>
export type CreateArticlesTypes = z.infer<typeof createArticlesSchema>
export type CreateCategoryTypes = z.infer<typeof createCategorySchema>