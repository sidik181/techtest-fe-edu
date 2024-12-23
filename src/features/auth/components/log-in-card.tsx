"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormData, LoginSchema } from "../schemas/login-schema";
import { Input } from "@/components/ui/input";
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
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { login } from "../services";

export function LoginCard() {
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmitLogin(values: LoginFormData) {
    setLoading(true);
    try {
      const data = await login(values);
      if (data.success) {
        toast({
          title: "Berhasil masuk",
        });
        localStorage.setItem("auth", data.data.token);
        router.push("/");
      } else {
        toast({
          title: "Gagal masuk",
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
          Login to E-Commerce Edu
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            className="space-y-4"
            onSubmit={form.handleSubmit(onSubmitLogin)}
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email:</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Contoh: inibudi@gmail.com"
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
                      placeholder="**********"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="w-full bg-indigo-500 hover:bg-indigo-700"
              type="submit"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Loading...
                </>
              ) : (
                "Masuk"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-center text-sm text-gray-500">
        <p>
          Belum punya akun?{" "}
          <Link
            href="/register"
            className="text-blue-600 hover:underline"
          >
            Daftar
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
