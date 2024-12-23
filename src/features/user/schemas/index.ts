import { z } from "zod";

export const UserSchema = z.object({
  us_name: z.string().min(3, "Nama pengguna minimal 3 karakter"),
  us_email: z.string().email("Email tidak valid"),
  us_password: z.string().min(6, "Panjang kata sandi minimal 6 karakter"),
  us_phone_number: z
    .string()
    .min(10, "Minimal nomor telepon 10 digit")
    .max(13, "Maksimal nomor telepon 13 digit"),
  us_address: z
    .string()
    .min(25, "Minimal panjang alamat minimal 25 karakter")
    .max(200, "Masimal panjang alamat 200 karakter"),
});

export type UserFormData = z.infer<typeof UserSchema>;
