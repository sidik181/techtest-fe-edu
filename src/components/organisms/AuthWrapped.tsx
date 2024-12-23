"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import Loading from "./LoadingScreen";

const API_URI = process.env.NEXT_PUBLIC_API_URI!;

const AuthWrapped = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const token = localStorage.getItem("auth");

    if (!token) {
      console.log("Displaying toast notification");
      setTimeout(() => {
        toast({
          title: "Anda belum login",
          description: "Silakan login terlebih dahulu",
        });
        router.replace("/login");
      }, 100);
      return;
    }

    const validateToken = async () => {
      try {
        const { data } = await axios.get(`${API_URI}/api/validate-token`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (data.success) {
          setIsAuthenticated(true);
        } else {
          toast({
            title: "Token kadaluarsa atau tidak valid",
            description: "Silakan login kembali",
          });
          localStorage.removeItem("auth");
          router.replace("/login");
        }
      } catch {
        localStorage.removeItem("auth");
        toast({
          title: "Validasi token gagal",
        });
        router.replace("/login");
      }
    };

    validateToken();
  }, [isMounted, router, toast]);

  if (!isAuthenticated || !isMounted) {
    return <Loading />;
  }

  return <>{children}</>;
};

export default AuthWrapped;
