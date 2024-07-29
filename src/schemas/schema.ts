import { z } from "zod";

export const ResetSchema = z.object({
    email: z.string().min(11, {
        message: "Email is required.",
    }),
});
export const NewPasswordSchema = z.object({
    password: z.string().min(6, {
        message: "Minimum 6 charecter needed.",
    }),
});