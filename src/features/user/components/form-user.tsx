"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserFormData, UserSchema } from "../schemas";

interface FormUserProps {
  mode: "add" | "edit";
  onClose: () => void;
  loading: boolean;
  defaultValues?: UserFormData;
  onSubmit: (values: UserFormData) => void;
}

export default function FormUser({
  mode,
  onClose,
  loading,
  defaultValues,
  onSubmit,
}: FormUserProps) {
  const form = useForm<UserFormData>({
    resolver: zodResolver(UserSchema),
    defaultValues: defaultValues || {
      us_name: "",
      us_email: "",
      us_password: "",
      us_phone_number: "",
      us_address: "",
    },
  });

  const handleSubmit = (values: UserFormData) => {
    onSubmit(values);
  };

  return (
    <Form {...form}>
      <form
        className="space-y-2"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <FormField
          control={form.control}
          name="us_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama:</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Masukkan nama pengguna."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="us_email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email:</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Masukkan email pengguna."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="us_password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pasword:</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Masukkan password pengguna."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="us_phone_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>No. Handphone:</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Masukkan nomor handphone pengguna."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="us_address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Alamat:</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Masukkan alamat pengguna."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end space-x-2">
          <Button
            variant="secondary"
            type="button"
            onClick={onClose}
          >
            Batal
          </Button>
          <Button
            type="submit"
            disabled={loading}
          >
            {loading
              ? mode === "edit"
                ? "Menyimpan..."
                : "Menambah"
              : mode === "edit"
              ? "Simpan Perubahan"
              : "Tambah Pengguna"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
