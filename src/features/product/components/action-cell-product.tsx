"use client";

import { Product } from "../services";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { ProductColumnProps } from "./columns-product";

type ActionsCellProductProps = ProductColumnProps & {
  product: Product;
};

export default function ActionsCellProduct({
  setEditingProduct,
  onDeleteProduct,
  product,
}: ActionsCellProductProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-8 w-8 p-0"
        >
          <span className="sr-only">Open menu</span>
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Aksi</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => setEditingProduct(product)}>
          Ubah
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onDeleteProduct(product)}>
          Hapus
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
