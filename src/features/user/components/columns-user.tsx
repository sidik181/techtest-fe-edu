"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { formatDateToId } from "@/utils";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { User } from "../services";
import ActionsCellUser from "./action-cell-user";

export type UserColumnProps = {
  setEditingUser: (user: User) => void;
  onDeleteUser: (user: User) => void;
};

export const getColumns = ({
  onDeleteUser,
  setEditingUser,
}: UserColumnProps): ColumnDef<User>[] => [
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
    accessorKey: "us_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nama
          <ArrowUpDown />
        </Button>
      );
    },
  },
  {
    accessorKey: "us_email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown />
        </Button>
      );
    },
  },
  {
    accessorKey: "us_phone_number",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nomor Handphone
          <ArrowUpDown />
        </Button>
      );
    },
  },
  {
    accessorKey: "us_address",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Alamat
          <ArrowUpDown />
        </Button>
      );
    },
  },
  {
    accessorKey: "us_created_at",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tanggal Dibuat
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      const formattedDate = formatDateToId(row.getValue("us_created_at"));
      return <span>{formattedDate}</span>;
    },
  },
  {
    accessorKey: "us_updated_at",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tanggal Perubahan
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      const formattedDate = formatDateToId(row.getValue("us_updated_at"));
      return <span>{formattedDate}</span>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => (
      <ActionsCellUser
        onDeleteUser={onDeleteUser}
        setEditingUser={setEditingUser}
        user={row.original}
      />
    ),
  },
];
