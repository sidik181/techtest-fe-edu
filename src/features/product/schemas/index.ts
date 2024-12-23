import { z } from "zod";

export const ProductSchema = z.object({
  pd_code: z
    .string({
      required_error: "Kode produk harus diisi.",
      invalid_type_error: "Kode produk harus berupa teks.",
    })
    .min(3, "Kode produk minimal 3 karakter"),
  pd_ct_id: z.string({
    required_error: "Kode produk harus diisi.",
    invalid_type_error: "Kode produk harus berupa teks.",
  }),
  pd_name: z.string().min(3, "Nama produk minimal 3 karakter"),
  pd_price: z
    .number({
      required_error: "Harga produk harus diisi.",
      invalid_type_error: "Harga produk harus berupa angka.",
    })
    .min(1000, "Harga produk minimal 1000 rupiah"),
});

export type ProductFormData = z.infer<typeof ProductSchema>;
