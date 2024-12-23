"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { addDataUser } from "../../services";
import { UserFormData } from "../../schemas";
import FormUser from "../form-user";

interface SheetAddUserProps {
  onClose: () => void;
  onUserUpdated: () => void;
}

export default function SheetAddUser({
  onClose,
  onUserUpdated,
}: SheetAddUserProps) {
  const [loading, setLoading] = useState<boolean>(false);

  const { toast } = useToast();

  const handleAddUser = async (values: UserFormData) => {
    setLoading(true);
    try {
      const data = await addDataUser(values);
      if (data.success) {
        toast({
          title: data.message,
          description: `Pengguna ${data.data.us_name} berhasil ditambahkan.`,
        });
        onClose();
        onUserUpdated();
      } else {
        toast({
          title: "Gagal menambahkan pengguna",
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
    <Sheet
      open={true}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <SheetContent className="space-y-3">
        <SheetHeader>
          <SheetTitle>Tambah Pengguna</SheetTitle>
          <SheetDescription>
            Isi informasi pengguna berikut. Klik &quot;
            <span className="font-semibold">Tambah Pengguna</span>&quot; untuk
            menyimpan pengguna baru.
          </SheetDescription>
        </SheetHeader>
        <FormUser
          mode={"add"}
          loading={loading}
          onSubmit={handleAddUser}
          onClose={onClose}
        />
      </SheetContent>
    </Sheet>
  );
}
