"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useEffect, useState } from "react";
import {
  Category,
  getDataCategories,
} from "@/features/category-product/services";
import { ProductFormData } from "../../schemas";
import FormProduct from "../form-product";
import { useToast } from "@/hooks/use-toast";
import { addDataProduct } from "../../services";

interface SheetAddProductProps {
  onClose: () => void;
  onProductUpdated: () => void;
}

export default function SheetAddProduct({
  onClose,
  onProductUpdated,
}: SheetAddProductProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const { toast } = useToast();

  const fetchCategories = async () => {
    const { data } = await getDataCategories();
    setCategories(data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddProduct = async (values: ProductFormData) => {
    setLoading(true);
    try {
      const data = await addDataProduct(values);
      if (data.success) {
        toast({
          title: data.message,
          description: `Produk ${data.data.pd_name} berhasil ditambahkan.`,
        });
        onClose();
        onProductUpdated();
      } else {
        toast({
          title: "Gagal menambahkan produk",
          description: `Error: ${data.message}`,
        });
      }
    } catch (error) {
      toast({
        title: "Terjadi kesalahan server",
        description: `Error: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Sheet
      open={true}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <SheetContent className="space-y-3">
        <SheetHeader>
          <SheetTitle>Tambah Produk</SheetTitle>
          <SheetDescription>
            Isi informasi produk berikut. Klik &quot;
            <span className="font-semibold">Tambah Produk</span>&quot; untuk
            menyimpan produk baru.
          </SheetDescription>
        </SheetHeader>
        <FormProduct
          mode={"add"}
          loading={loading}
          categories={categories}
          onSubmit={handleAddProduct}
          onClose={onClose}
        />
      </SheetContent>
    </Sheet>
  );
}
