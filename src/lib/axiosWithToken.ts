"use client";

import { useToast } from "@/hooks/use-toast";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";

const getToken = () => localStorage.getItem("auth");

const axiosWithToken = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URI,
});

axiosWithToken.interceptors.request.use(
  (config) => {
    const token = getToken();
    console.log("token", token);

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosWithToken.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    const router = useRouter();
    const { toast } = useToast();
    if (error.response?.status === 401 || error.response?.status === 403) {
			toast({
				title: "Token tidak valid/kadaluarsa",
			})
      router.push("/login");
    }

    return Promise.reject(error);
  }
);

export default axiosWithToken;
