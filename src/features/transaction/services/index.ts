import axios, { AxiosError } from "axios";
import { OrderRequest } from "@/features/order/services";

export type Order = OrderRequest & {
  _id: string;
  or_id: string;
  or_pd_id: {
    _id: string;
    pd_name: string;
  };
  or_amount: number;
  or_created_at: string;
  or_updated_at: string;
};

const API_URI = process.env.NEXT_PUBLIC_API_URI!;
const token = localStorage.getItem("auth");

export async function getDataOrders() {
  try {
    const { data } = await axios.get(`${API_URI}/api/orders`, {
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

export async function getDataOrder(idOrder: string) {
  try {
    const { data } = await axios.get(`${API_URI}/api/orders/${idOrder}`, {
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
