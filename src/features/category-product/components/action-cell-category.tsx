"use client";

import { Category } from "../services";
import { MoreHorizontal } from "lucide-react";
import { CategoryColumnProps } from "./columns-category";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

type ActionsCellCategoryProps = CategoryColumnProps & {
  category: Category;
};

export default function ActionsCellCategory({
  setEditingCategory,
  onDeleteCategory,
  category,
}: ActionsCellCategoryProps) {
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
        <DropdownMenuItem onClick={() => setEditingCategory(category)}>
          Ubah
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onDeleteCategory(category)}>
          Hapus
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
