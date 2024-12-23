"use client";

import { useCallback, useEffect, useState } from "react";
import {
  deleteProduct,
  deleteSelectedProduct,
  getDataProducts,
  Product,
} from "../services";
import { getColumns } from "./columns-product";
import { DataTable } from "@/components/organisms/tables/data-table";
import EditProductSheet from "./edit-product/sheet-edit-product";
import { AlertDialogDemo } from "@/components/organisms/alert/dialog-alert";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import SheetAddProduct from "./add-product/sheet-add-product";

export default function DataTableProduct() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isDeletingMultiple, setIsDeletingMultiple] = useState<boolean>(false);
  const [isAddingProduct, setIsAddingProduct] = useState<boolean>(false);
  const [loadingFetchProducts, setLoadingFetchProducts] =
    useState<boolean>(false);
  const [loadingDelete, setLoadingDelete] = useState<boolean>(false);

  const { toast } = useToast();

  const handleDeleteProduct = (product: Product) => {
    setDeletingProduct(product);
  };

  const handleOpenDeleteMultipleDialog = (ids: string[]) => {
    setSelectedIds(ids);
    setIsDeletingMultiple(true);
  };

  const columns = getColumns({
    setEditingProduct,
    onDeleteProduct: handleDeleteProduct,
  });

  const handleDeleteSelectedProduct = async (ids: string[]) => {
    if (ids.length === 0) return;

    setLoadingDelete(true);
    try {
      const data = await deleteSelectedProduct(ids);
      if (data.success) {
        toast({
          title: data.message,
          description: `Berhasil menghapus ${ids.length} produk`,
        });
        fetchDataProductsCallback();
      } else {
        toast({
          title: "Gagal menghapus produk",
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
    if (deletingProduct) {
      setLoadingDelete(true);
      try {
        const data = await deleteProduct(deletingProduct?._id);
        if (data.success) {
          toast({
            title: data.message,
            description: `Produk ${deletingProduct?.pd_name} berhasil dihapus`,
          });
        } else {
          toast({
            title: `Produk ${deletingProduct?.pd_name} gagal dihapus`,
            description: `Error: ${data.message}`,
          });
          fetchDataProductsCallback();
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
        setDeletingProduct(null);
      }
    }
  };

  const fetchDataProducts = async () => {
    setLoadingFetchProducts(true);
    try {
      const data = await getDataProducts();
      if (data.success) {
        setProducts(data.data);
      } else {
        toast({
          title: `Gagal mengambil data produk`,
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
      setLoadingFetchProducts(false);
    }
  };

  const fetchDataProductsCallback = useCallback(fetchDataProducts, [toast]);

  useEffect(() => {
    fetchDataProductsCallback();
  }, [fetchDataProductsCallback]);

  return (
    <div className="space-y-2">
      <Button
        onClick={() => setIsAddingProduct(true)}
        className="text-base px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-800 text-white"
      >
        Tambah Produk
      </Button>
      <DataTable
        columns={columns}
        data={products}
        loading={loadingFetchProducts}
        onDelete={(ids) => handleOpenDeleteMultipleDialog(ids)}
        placeholder={"Cari nama produk"}
        searchKey={"pd_name"}
      />
      <AlertDialogDemo
        title={"Apakah anda yakin ingin menghapus beberapa produk?"}
        description={`Data ${selectedIds.length} produk akan dihapus dan tidak dapat dikembalikan.`}
        isOpen={isDeletingMultiple}
        loading={loadingDelete}
        onClose={() => setIsDeletingMultiple(false)}
        onConfirm={() => handleDeleteSelectedProduct(selectedIds)}
      />
      {editingProduct && (
        <EditProductSheet
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          onProductUpdated={fetchDataProducts}
        />
      )}
      <AlertDialogDemo
        title={"Apakah anda yakin ingin menghapus produk?"}
        description={`Data produk ${deletingProduct?.pd_name} akan dihapus dan tidak dapat dikembalikan.`}
        isOpen={!!deletingProduct}
        loading={loadingDelete}
        onClose={() => setDeletingProduct(null)}
        onConfirm={confirmDelete}
      />
      {isAddingProduct && (
        <SheetAddProduct
          onClose={() => setIsAddingProduct(false)}
          onProductUpdated={fetchDataProducts}
        />
      )}
    </div>
  );
}
