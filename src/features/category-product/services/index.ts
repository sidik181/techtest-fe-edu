import axios, { AxiosError } from "axios";

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
const token = localStorage.getItem("auth");

export async function getDataCategories() {
  try {
    const { data } = await axios.get(`${API_URI}/api/categories`, {
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

export async function getDataCategory(idCategory: string) {
  try {
    const { data } = await axios.get(
      `${API_URI}/api/categories/${idCategory}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
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
    const { data } = await axios.post(`${API_URI}/api/categories`, values, {
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

export async function editDataCategory(
  idCategory: string,
  values: CategoryRequest
) {
  try {
    const { data } = await axios.patch(
      `${API_URI}/api/categories/${idCategory}`,
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

export async function deleteSelectedCategory(ids: string[]) {
  try {
    const { data } = await axios.delete(`${API_URI}/api/categories`, {
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

export async function deleteCategory(idCategory: string) {
  try {
    const { data } = await axios.delete(
      `${API_URI}/api/categories/${idCategory}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data?.data;
    }
    throw new Error("Unexpected error occurred.");
  }
}
