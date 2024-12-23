import axios, { AxiosError } from "axios";

export type ProductItem = {
  product_id: string;
  qty: number;
};

export type OrderRequest = {
  productItems: ProductItem[];
};

const API_URI = process.env.NEXT_PUBLIC_API_URI!;
const token = localStorage.getItem("auth");

export async function addDataOrder(values: OrderRequest) {
  try {
    const { data } = await axios.post(`${API_URI}/api/orders`, values, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data?.data;
    }
    throw new Error("Unexpected error occurred.");
  }
}
