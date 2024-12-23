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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CategoryFormData, CategorySchema } from "../schemas";

interface FormCategoryProps {
  mode: "add" | "edit";
  loading: boolean;
  defaultValues?: CategoryFormData;
  onSubmit: (values: CategoryFormData) => void;
}

export default function FormCategory({
  mode,
  loading,
  defaultValues,
  onSubmit,
}: FormCategoryProps) {
  const form = useForm<CategoryFormData>({
    resolver: zodResolver(CategorySchema),
    defaultValues: defaultValues || {
      ct_code: "",
      ct_name: "",
    },
  });

  const handleSubmit = (values: CategoryFormData) => {
    onSubmit(values);
  };

  return (
    <Form {...form}>
      <form
        className="space-y-2"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <FormField
          control={form.control}
          name="ct_code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kode Kategori:</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Masukkan kode kategori."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ct_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama Kategori:</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Masukkan nama kategori."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end space-x-2">
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
              : "Tambah Kategori"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
