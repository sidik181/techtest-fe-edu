import axios, { AxiosError } from "axios";

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
const token = localStorage.getItem("auth");

export async function getDataProducts() {
  try {
    const { data } = await axios.get(`${API_URI}/api/products`, {
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

export async function getDataProduct(idProduct: string) {
  try {
    const { data } = await axios.get(`${API_URI}/api/products/${idProduct}`, {
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

export async function addDataProduct(values: ProductRequest) {
  try {
    const { data } = await axios.post(`${API_URI}/api/products`, values, {
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

export async function editDataProduct(
  idProduct: string,
  values: ProductRequest
) {
  try {
    const { data } = await axios.patch(
      `${API_URI}/api/products/${idProduct}`,
      values,
      { headers: { Authorization: `Bearer ${token}` } }
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
    const { data } = await axios.delete(`${API_URI}/api/products`, {
      data: { ids },
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

export async function deleteProduct(idProduct: string) {
  try {
    const { data } = await axios.delete(
      `${API_URI}/api/products/${idProduct}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data?.data;
    }
    throw new Error("Unexpected error occurred.");
  }
}
