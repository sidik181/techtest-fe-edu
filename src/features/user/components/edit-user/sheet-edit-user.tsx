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
import FormUser from "../form-user";
import { editDataUser, User } from "../../services";
import { UserFormData } from "../../schemas";

interface EditUserSheetProps {
  onClose: () => void;
  user: User;
  onUserUpdated: () => void;
}

export default function SheetEdiitUser({
  onClose,
  user,
  onUserUpdated,
}: EditUserSheetProps) {
  const [loading, setLoading] = useState<boolean>(false);

  const { toast } = useToast();

  const handleSaveUser = async (values: UserFormData) => {
    setLoading(true);
    try {
      const data = await editDataUser(user._id, values);
      if (data.success) {
        toast({
          title: data.message,
          description: `Pengguna ${data.data.us_name} berhasil diubah.`,
        });
        onClose();
        onUserUpdated();
      } else {
        toast({
          title: "Gagal mengubah pengguna",
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
          <SheetTitle>Ubah Pengguna</SheetTitle>
          <SheetDescription>
            Perbarui informasi pengguna berikut. Klik &quot;
            <span className="font-semibold">Simpan Perubahan</span>&quot; untuk
            menyimpan perubahan.
          </SheetDescription>
        </SheetHeader>
        <FormUser
          mode="edit"
          loading={loading}
          onClose={onClose}
          defaultValues={user}
          onSubmit={handleSaveUser}
        />
      </SheetContent>
    </Sheet>
  );
}
