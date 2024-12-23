"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ComboboxCategory from "@/components/organisms/form/combobox-category";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Category } from "@/features/category-product/services";
import { ProductFormData, ProductSchema } from "../schemas";

interface FormProdukProps {
  mode: "add" | "edit";
  loading: boolean;
  defaultValues?: ProductFormData;
  categories: Category[];
  onClose: () => void;
  onSubmit: (values: ProductFormData) => void;
}

export default function FormProduct({
  mode,
  loading,
  defaultValues,
  categories,
  onClose,
  onSubmit,
}: FormProdukProps) {
  const form = useForm<ProductFormData>({
    resolver: zodResolver(ProductSchema),
    defaultValues: defaultValues || {
      pd_code: "",
      pd_ct_id: "",
      pd_name: "",
      pd_price: 0,
    },
  });

  const handleSubmitForm = (values: ProductFormData) => {
    onSubmit(values);
  };

  return (
    <Form {...form}>
      <form
        className="space-y-2"
        onSubmit={form.handleSubmit(handleSubmitForm)}
      >
        <FormField
          control={form.control}
          name="pd_code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kode Produk:</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Masukkan kode produk."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="pd_ct_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kategori Produk:</FormLabel>
              <FormControl>
                <ComboboxCategory
                  field={field}
                  categories={categories}
                  placeholder="Pilih Kategori"
                  emptyData="Kategori tidak ada"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="pd_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama Produk:</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Masukkan nama produk."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="pd_price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Harga Produk:</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Masukkan harga produk min 1.000 rupiah."
                  {...field}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    field.onChange(value ? parseInt(value, 10) : 0);
                  }}
                  value={field.value || ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end space-x-2">
          <Button
            variant="secondary"
            type="button"
            onClick={onClose}
          >
            Batal
          </Button>
          <Button
            type="submit"
            disabled={loading}
          >
            {loading
              ? mode === "edit"
                ? "Menyimpan..."
                : "Menambah..."
              : mode === "edit"
              ? "Simpan Perubahan"
              : "Tambah Produk"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
