"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Category,
  deleteCategory,
  deleteSelectedCategory,
  getDataCategories,
} from "../services";
import { DataTable } from "@/components/organisms/tables/data-table";
import { AlertDialogDemo } from "@/components/organisms/alert/dialog-alert";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { getColumns } from "./columns-category";
import { DialogAddCategoryProduct } from "./add-category-product/dialog-add-category-product";
import { DialogEditCategoryProduct } from "./edit-category-product/dialog-edit-category-product";

export default function DataTableCategory() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [deletingCategory, setDeletingCategory] = useState<Category | null>(
    null
  );
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isDeletingMultiple, setIsDeletingMultiple] = useState<boolean>(false);
  const [isAddingCategory, setIsAddingCategory] = useState<boolean>(false);
  const [loadingFetchCategories, setLoadingFetchCategories] =
    useState<boolean>(false);
  const [loadingDelete, setLoadingDelete] = useState<boolean>(false);

  const { toast } = useToast();

  const handleDeleteCategory = (category: Category) => {
    setDeletingCategory(category);
  };

  const handleOpenDeleteMultipleDialog = (ids: string[]) => {
    setSelectedIds(ids);
    setIsDeletingMultiple(true);
  };

  const columns = getColumns({
    setEditingCategory,
    onDeleteCategory: handleDeleteCategory,
  });

  const handleDeleteSelectedCategory = async (ids: string[]) => {
    if (ids.length === 0) return;

    setLoadingDelete(true);
    try {
      const data = await deleteSelectedCategory(ids);
      if (data.success) {
        toast({
          title: data.message,
          description: `Berhasil menghapus ${ids.length} kategori`,
        });
        fetchDataCategoriesCallback();
      } else {
        toast({
          title: "Gagal menghapus kategori",
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
      setLoadingDelete(false);
      setIsDeletingMultiple(false);
      setSelectedIds([]);
    }
  };

  const confirmDelete = async () => {
    if (deletingCategory) {
      setLoadingDelete(true);
      try {
        const data = await deleteCategory(deletingCategory?._id);
        if (data.success) {
          toast({
            title: data.message,
            description: `Kategori ${deletingCategory?.ct_name} berhasil dihapus`,
          });
          fetchDataCategoriesCallback();
        } else {
          toast({
            title: `Kategori ${deletingCategory?.ct_name} gagal dihapus`,
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
        setLoadingDelete(false);
        setDeletingCategory(null);
      }
    }
  };

  const fetchDataCategories = async () => {
    setLoadingFetchCategories(true);
    try {
      const data = await getDataCategories();
      if (data.success) {
        setCategories(data.data);
      } else {
        toast({
          title: `Gagal mengambil data kategori`,
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
      setLoadingFetchCategories(false);
    }
  };

  const fetchDataCategoriesCallback = useCallback(fetchDataCategories, [toast]);

  useEffect(() => {
    fetchDataCategoriesCallback();
  }, [fetchDataCategoriesCallback]);

  return (
    <div className="space-y-2">
      <Button
        onClick={() => setIsAddingCategory(true)}
        className="text-base px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-800 text-white"
      >
        Tambah Kategori
      </Button>
      <DataTable
        columns={columns}
        data={categories}
        loading={loadingFetchCategories}
        onDelete={(ids) => handleOpenDeleteMultipleDialog(ids)}
        placeholder={"Cari nama kategori"}
        searchKey={"ct_name"}
      />
      <AlertDialogDemo
        title={"Apakah anda yakin ingin menghapus beberapa kategori?"}
        description={`Data ${selectedIds.length} kategori akan dihapus dan tidak dapat dikembalikan.`}
        isOpen={isDeletingMultiple}
        loading={loadingDelete}
        onClose={() => setIsDeletingMultiple(false)}
        onConfirm={() => handleDeleteSelectedCategory(selectedIds)}
      />
      {editingCategory && (
        <DialogEditCategoryProduct
          category={editingCategory}
          onCategoryUpdated={fetchDataCategories}
          onClose={() => setEditingCategory(null)}
        />
      )}
      <AlertDialogDemo
        title={"Apakah anda yakin ingin menghapus kategori?"}
        description={`Data kategori ${deletingCategory?.ct_name} akan dihapus dan tidak dapat dikembalikan.`}
        isOpen={!!deletingCategory}
        loading={loadingDelete}
        onClose={() => setDeletingCategory(null)}
        onConfirm={confirmDelete}
      />
      {isAddingCategory && (
        <DialogAddCategoryProduct
          onCategoryUpdated={fetchDataCategories}
          onClose={() => setIsAddingCategory(false)}
        />
      )}
    </div>
  );
}
