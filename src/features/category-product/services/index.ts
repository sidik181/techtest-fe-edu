import axiosWithToken from "@/lib/axiosWithToken";
import { AxiosError } from "axios";

export const initialCategoryForm = {
  ct_code: "",
  ct_name: "",
};

export type CategoryRequest = {
  ct_code: string;
  ct_name: string;
};

export type Category = CategoryRequest & {
  _id: string;
  ct_id: string;
  ct_name: string;
  ct_created_at: Date;
  ct_updated_at: Date;
};

const API_URI = process.env.NEXT_PUBLIC_API_URI!;

export async function getDataCategories() {
  try {
    const { data } = await axiosWithToken.get(`${API_URI}/api/categories`);
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data?.data;
    }
    throw new Error("Unexpected error occurred.");
  }
}

export async function getDataCategory(idCategory: string) {
  try {
    const { data } = await axiosWithToken.get(`${API_URI}/api/categories/${idCategory}`);
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data?.data;
    }
    throw new Error("Unexpected error occurred.");
  }
}

export async function addDataCategory(values: CategoryRequest) {
  try {
    const { data } = await axiosWithToken.post(`${API_URI}/api/categories`, values);
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data?.data;
    }
    throw new Error("Unexpected error occurred.");
  }
}

export async function editDataCategory(
  idCategory: string,
  values: CategoryRequest
) {
  try {
    const { data } = await axiosWithToken.patch(
      `${API_URI}/api/categories/${idCategory}`,
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

export async function deleteSelectedCategory(ids: string[]) {
  try {
    const { data } = await axiosWithToken.delete(`${API_URI}/api/categories`, {
      data: { ids },
    });
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data?.data;
    }
    throw new Error("Unexpected error occurred.");
  }
}

export async function deleteCategory(idCategory: string) {
  try {
    const { data } = await axiosWithToken.delete(
      `${API_URI}/api/categories/${idCategory}`
    );
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data?.data;
    }
    throw new Error("Unexpected error occurred.");
  }
}
