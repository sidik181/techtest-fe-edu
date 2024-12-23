"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import FormCategory from "../form-category";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { CategoryFormData } from "../../schemas";
import { Category, editDataCategory } from "../../services";

interface DialogEditCategoryProductProps {
  category: Category;
  onClose: () => void;
  onCategoryUpdated: () => void;
}

export function DialogEditCategoryProduct({
  category,
  onClose,
  onCategoryUpdated,
}: DialogEditCategoryProductProps) {
  const [loading, setLoading] = useState<boolean>(false);

  const { toast } = useToast();

  const handleSaveCategory = async (values: CategoryFormData) => {
      setLoading(true);
      try {
        const data = await editDataCategory(category._id, values);
        if (data.success) {
          toast({
            title: data.message,
            description: `Kategori ${data.data.ct_name} berhasil diubah.`,
          });
          onClose();
          onCategoryUpdated();
        } else {
          toast({
            title: "Gagal mengubah kategori",
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
    <Dialog
      open={true}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Ubah Kategori</DialogTitle>
          <DialogDescription>
            Klik &quot;
            <span className="font-semibold">Simpan Perubahan</span>&quot; untuk
            mengubah kategori.
          </DialogDescription>
        </DialogHeader>
        <FormCategory
          mode={"edit"}
          loading={loading}
          defaultValues={category}
          onSubmit={handleSaveCategory}
        />
      </DialogContent>
    </Dialog>
  );
}
