import { z } from "zod";

export const ResetSchema = z.object({
    email: z.string().min(11, {
        message: "Email is required.",
    }),
});