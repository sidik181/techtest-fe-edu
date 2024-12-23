"use client";

import { Product } from "../services";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { formatDateToId, formatPriceToIdr } from "@/utils";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import ActionsCellProduct from "./action-cell-product";

export type ProductColumnProps = {
  setEditingProduct: (product: Product) => void;
  onDeleteProduct: (product: Product) => void;
};

export const getColumns = ({
  onDeleteProduct,
  setEditingProduct,
}: ProductColumnProps): ColumnDef<Product>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "pd_code",
    header: "Kode Produk",
  },
  {
    accessorKey: "pd_ct_id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Kategori Produk
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      const category = row.getValue("pd_ct_id") as {
        _id: string;
        ct_name: string;
      };
      const categoryName = category.ct_name;
      return <span>{categoryName}</span>;
    },
  },
  {
    accessorKey: "pd_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nama Produk
          <ArrowUpDown />
        </Button>
      );
    },
  },
  {
    accessorKey: "pd_price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Harga Produk
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      const formattedPrice = formatPriceToIdr(row.getValue("pd_price"));
      return <span>{formattedPrice}</span>;
    },
  },
  {
    accessorKey: "pd_created_at",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Produk Dibuat
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      const formattedDate = formatDateToId(row.getValue("pd_created_at"));
      return <span>{formattedDate}</span>;
    },
  },
  {
    accessorKey: "pd_updated_at",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Produk Diubah
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      const formattedDate = formatDateToId(row.getValue("pd_updated_at"));
      return <span>{formattedDate}</span>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => (
      <ActionsCellProduct
        onDeleteProduct={onDeleteProduct}
        setEditingProduct={setEditingProduct}
        product={row.original}
      />
    ),
  },
];
