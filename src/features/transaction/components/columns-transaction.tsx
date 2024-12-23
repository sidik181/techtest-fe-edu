"use client";

import { Order } from "../services";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { formatDateToId, formatPriceToIdr } from "@/utils";
import { Button } from "@/components/ui/button";

export const getColumns = (): ColumnDef<Order>[] => [
  {
    accessorKey: "or_id",
    header: "Id Pembelian",
  },
  {
    accessorKey: "or_pd_id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Produk Pembelian
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      const product = row.getValue("or_pd_id") as {
        _id: string;
        pd_name: string;
      };
      const productName = product.pd_name;
      return <span>{productName}</span>;
    },
  },
  {
    accessorKey: "or_amount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Total Harga Pembelian
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      const formattedPrice = formatPriceToIdr(row.getValue("or_amount"));
      return <span>{formattedPrice}</span>;
    },
  },
  {
    accessorKey: "or_created_at",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tanggal Pembelian
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      const formattedDate = formatDateToId(row.getValue("or_created_at"));
      return <span>{formattedDate}</span>;
    },
  },
  {
    accessorKey: "searchKey",
    header: "Pencarian",
    cell: ({ row }) => {
      const product = row.getValue("or_pd_id") as {
        pd_name: string;
      };
      return product.pd_name;
    },
  }
];
