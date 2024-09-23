import * as z from "zod";

export const UserSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters long",
    })
    .max(20),
  email: z.string().email({
    message: "Invalid email address",
  }),
});
