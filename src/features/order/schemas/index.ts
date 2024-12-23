import { z } from "zod";

export const productItemSchema = z.object({
  product_id: z
    .string({required_error: "ID produk harus berupa string dan tidak boleh kosong"}),
  qty: z
    .number()
    .int()
    .positive("Jumlah pembelian harus bilangan bulat positif"),
});

export const orderSchema = z.object({
  productItems: z
    .array(productItemSchema)
    .min(1, "Keranjang produk tidak boleh kosong"),
});
