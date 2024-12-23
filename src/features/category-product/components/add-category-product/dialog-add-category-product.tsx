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
import { CategoryFormData } from "../../schemas";
import { useToast } from "@/hooks/use-toast";
import { addDataCategory } from "../../services";

interface DialogAddCategoryProductProps {
  onClose: () => void;
  onCategoryUpdated: () => void;
}

export function DialogAddCategoryProduct({
  onClose,
  onCategoryUpdated,
}: DialogAddCategoryProductProps) {
  const [loading, setLoading] = useState<boolean>(false);

  const { toast } = useToast();

  const handleAddCategory = async (values: CategoryFormData) => {
    setLoading(true);
    try {
      const data = await addDataCategory(values);
      if (data.success) {
        toast({
          title: data.message,
          description: `Kategori ${data.data.ct_name} berhasil ditambahkan.`,
        });
        onClose();
        onCategoryUpdated();
      } else {
        toast({
          title: "Gagal menambahkan kategori",
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
          <DialogTitle>Tambah Kategori</DialogTitle>
          <DialogDescription>
            Klik &quot;
            <span className="font-semibold">Tambah Kategori</span>&quot; untuk
            menyimpan kategori baru.
          </DialogDescription>
        </DialogHeader>
        <FormCategory
          mode={"add"}
          loading={loading}
          onSubmit={handleAddCategory}
        />
      </DialogContent>
    </Dialog>
  );
}
