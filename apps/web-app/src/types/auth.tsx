import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("please enter valid email").toLowerCase(),
  password: z.string().min(8, "please enter vaild password"),
});
export type LoginType = z.infer<typeof loginSchema>;

export const signupSchema = z
  .object({
    email: z.string().email("please enter valid email").toLowerCase(),
    password: z.string().min(8, "please enter vaild password"),
    confirmPassword: z.string(),
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    { message: "password dont match", path: ["confirmPassword"] }
  );
// this will add password match 
export type SignupType = z.infer<typeof signupSchema>;
