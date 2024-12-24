import axiosWithToken from "@/lib/axiosWithToken";
import { AxiosError } from "axios";

export const initialProductForm = {
  pd_code: "",
  pd_name: "",
  pd_ct_id: "",
  pd_price: undefined,
};

export type ProductRequest = {
  pd_code: string;
  pd_ct_id: string;
  pd_name: string;
  pd_price: number;
};

export type Product = ProductRequest & {
  _id: string;
  pd_id: string;
  pd_ct_id: {
    _id: string;
    ct_id: string;
    ct_name: string;
  };
  pd_created_at: Date;
  pd_updated_at: Date;
};

const API_URI = process.env.NEXT_PUBLIC_API_URI!;

export async function getDataProducts() {
  try {
    const { data } = await axiosWithToken.get(`${API_URI}/api/products`);
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data?.data;
    }
    throw new Error("Unexpected error occurred.");
  }
}

export async function getDataProduct(idProduct: string) {
  try {
    const { data } = await axiosWithToken.get(`${API_URI}/api/products/${idProduct}`);
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data?.data;
    }
    throw new Error("Unexpected error occurred.");
  }
}

export async function addDataProduct(values: ProductRequest) {
  try {
    const { data } = await axiosWithToken.post(`${API_URI}/api/products`, values);
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data?.data;
    }
    throw new Error("Unexpected error occurred.");
  }
}

export async function editDataProduct(
  idProduct: string,
  values: ProductRequest
) {
  try {
    const { data } = await axiosWithToken.patch(
      `${API_URI}/api/products/${idProduct}`,
      values
    );
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data?.data;
    }
    throw new Error("Unexpected error occurred.");
  }
}

export async function deleteSelectedProduct(ids: string[]) {
  try {
    const { data } = await axiosWithToken.delete(`${API_URI}/api/products`, {
      data: { ids }
    });
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data?.data;
    }
    throw new Error("Unexpected error occurred.");
  }
}

export async function deleteProduct(idProduct: string) {
  try {
    const { data } = await axiosWithToken.delete(
      `${API_URI}/api/products/${idProduct}`
    );
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data?.data;
    }
    throw new Error("Unexpected error occurred.");
  }
}
