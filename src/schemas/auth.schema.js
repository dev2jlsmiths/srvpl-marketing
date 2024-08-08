import { z } from "zod"
export const LoginSchema = z.object({
    email: z.string().email({ message: 'Incorrect email format' }),
    password: z
        .string()
        .min(8, { message: 'Your password must be atleast 8 characters long' })
        .max(64, {
            message: 'Your password can not be longer then 64 characters long',
        })
})