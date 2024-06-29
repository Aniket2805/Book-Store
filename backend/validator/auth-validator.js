import { z } from "zod";

const signupSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid email" })
    .min(5, { message: "Email is too short" })
    .max(255, { message: "Email is too long" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, { message: "Password is too short" })
    .max(255, { message: "Password is too long" }),
  name: z
    .string({ required_error: "Name is required" })
    .min(2, { message: "Name is too short" })
    .max(255, { message: "Name is too long" }),
});

const signinSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid email" })
    .min(5, { message: "Email is too short" })
    .max(255, { message: "Email is too long" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, { message: "Password is too short" })
    .max(255, { message: "Password is too long" }),
});
export { signupSchema, signinSchema };
