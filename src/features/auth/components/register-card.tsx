"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { RegisterFormData, RegisterSchema } from "../schemas/register-schema";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { register } from "../services";

export function RegisterCard() {
  const [loading, setLoading] = useState<boolean>(false);

  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      fullname: "",
      phone_number: "",
      address: "",
    },
  });

  async function onSubmitRegister(values: RegisterFormData) {
    setLoading(true);
    try {
      const data = await register(values);
      if (data.success) {
        toast({
          title: "Berhasil mendaftar",
          description: "Silahkan login untuk melanjutkan",
        });
        router.push("/login");
      } else {
        toast({
          title: "Gagal mendaftar",
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
  }
  return (
    <Card className="w-full max-w-md border border-gray-200 shadow-lg">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold">
          Daftar Akun E-Commerce Edu
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            className="space-y-4"
            onSubmit={form.handleSubmit(onSubmitRegister)}
          >
            <FormField
              control={form.control}
              name="fullname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fullname:</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Nama Lengkap"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email:</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="inibudi@gmail.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password:</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="********"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nomor Telepon:</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="081234567890"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Alamat:</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Alamat Lengkap"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="w-full"
              type="submit"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Loading...
                </>
              ) : (
                "Daftar"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-center text-sm text-gray-500">
        <p>
          Sudah punya akun?{" "}
          <Link
            href="/login"
            className="text-blue-600 hover:underline"
          >
            Login
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
