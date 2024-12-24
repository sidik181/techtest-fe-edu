import axiosWithToken from "@/lib/axiosWithToken";
import { AxiosError } from "axios";

export type ProductItem = {
  product_id: string;
  qty: number;
};

export type OrderRequest = {
  productItems: ProductItem[];
};

const API_URI = process.env.NEXT_PUBLIC_API_URI!;

export async function addDataOrder(values: OrderRequest) {
  try {
    const { data } = await axiosWithToken.post(`${API_URI}/api/orders`, values);
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data?.data;
    }
    throw new Error("Unexpected error occurred.");
  }
}
