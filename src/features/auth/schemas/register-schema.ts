import { z } from "zod";

export const RegisterSchema = z.object({
  fullname: z.string().min(3, "Nama minimal 3 karakter"),
  email: z.string().email("Email tidak valid"),
  password: z.string().min(8, "Password minimal 8 karakter"),
  phone_number: z
    .string()
    .min(10, "Nomor telepon minimal 10 karakter")
    .max(13, "Nomor telepon maksimal 13 karakter"),
  address: z.string().min(10, "Alamat minimal 10 karakter"),
});

export type RegisterFormData = z.infer<typeof RegisterSchema>;
