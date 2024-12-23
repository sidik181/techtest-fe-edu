"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { formatDateToId } from "@/utils";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import ActionsCellCategory from "./action-cell-category";
import { Category } from "../services";

export type CategoryColumnProps = {
  setEditingCategory: (category: Category) => void;
  onDeleteCategory: (category: Category) => void;
};

export const getColumns = ({
  onDeleteCategory,
  setEditingCategory,
}: CategoryColumnProps): ColumnDef<Category>[] => [
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
    accessorKey: "ct_code",
    header: "Kode Kategori",
  },
  {
    accessorKey: "ct_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nama Kategori
          <ArrowUpDown />
        </Button>
      );
    },
  },
  {
    accessorKey: "ct_created_at",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Kategori Dibuat
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      const formattedDate = formatDateToId(row.getValue("ct_created_at"));
      return <span>{formattedDate}</span>;
    },
  },
  {
    accessorKey: "ct_updated_at",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Kategori Diubah
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      const formattedDate = formatDateToId(row.getValue("ct_updated_at"));
      return <span>{formattedDate}</span>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => (
      <ActionsCellCategory
        onDeleteCategory={onDeleteCategory}
        setEditingCategory={setEditingCategory}
        category={row.original}
      />
    ),
  },
];
