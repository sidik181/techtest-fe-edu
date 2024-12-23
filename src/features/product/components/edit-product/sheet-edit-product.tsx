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
import FormProduct from "../form-product";
import { useToast } from "@/hooks/use-toast";
import { editDataProduct, Product } from "../../services";
import { ProductFormData } from "../../schemas";

interface EditProductSheetProps {
  onClose: () => void;
  product: Product;
  onProductUpdated: () => void;
}

export default function EditProductSheet({
  onClose,
  product,
  onProductUpdated,
}: EditProductSheetProps) {
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

  const handleSaveProduct = async (values: ProductFormData) => {
    setLoading(true);
    try {
      const data = await editDataProduct(product._id, values);
      if (data.success) {
        toast({
          title: data.message,
          description: `Produk ${data.data.pd_name} berhasil diubah.`,
        });
        onClose();
        onProductUpdated();
      } else {
        toast({
          title: "Gagal mengubah produk",
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
          <SheetTitle>Ubah Produk</SheetTitle>
          <SheetDescription>
            Perbarui informasi produk berikut. Klik &quot;
            <span className="font-semibold">Simpan Perubahan</span>&quot; untuk
            menyimpan perubahan.
          </SheetDescription>
        </SheetHeader>
        <FormProduct
          mode="edit"
          loading={loading}
          onClose={onClose}
          defaultValues={product}
          categories={categories}
          onSubmit={handleSaveProduct}
        />
      </SheetContent>
    </Sheet>
  );
}
