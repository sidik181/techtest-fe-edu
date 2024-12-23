import { z } from "zod";

export const CategorySchema = z.object({
	ct_code: z
		.string({
			required_error: "Kode produk harus diisi.",
			invalid_type_error: "Kode produk harus berupa teks.",
		})
		.min(3, "Kode produk minimal 3 karakter"),
	ct_name: z.string().min(3, "Nama produk minimal 3 karakter"),
});

export type CategoryFormData = z.infer<typeof CategorySchema>;