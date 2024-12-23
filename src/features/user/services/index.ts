import axios, { AxiosError } from "axios";

export const initialUserForm = {
  us_name: "",
  us_password: "",
  us_email: "",
  us_phone_number: "",
  us_address: "",
};

export type UserRequest = {
  us_name: string;
  us_password: string;
  us_email: string;
  us_phone_number: string;
  us_address: string;
};

export type User = UserRequest & {
  _id: string;
  us_id: string;
  us_name: string;
  us_email: string;
  us_phone_number: string;
  us_address: string;
  us_created_at: Date;
  us_updated_at: Date;
};

const API_URI = process.env.NEXT_PUBLIC_API_URI!;
const token = localStorage.getItem("auth");

export async function getDataUsers() {
  try {
    const { data } = await axios.get(`${API_URI}/api/users`, {
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

export async function getDataUser(idUser: string) {
  try {
    const { data } = await axios.get(`${API_URI}/api/users/${idUser}`, {
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

export async function addDataUser(values: UserRequest) {
  try {
    const { data } = await axios.post(`${API_URI}/api/users`, values, {
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

export async function editDataUser(idUser: string, values: UserRequest) {
  try {
    const { data } = await axios.patch(
      `${API_URI}/api/users/${idUser}`,
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

export async function deleteSelectedUser(ids: string[]) {
  try {
    const { data } = await axios.delete(`${API_URI}/api/users`, {
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

export async function deleteUser(idUser: string) {
  try {
    const { data } = await axios.delete(`${API_URI}/api/users/${idUser}`, {
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
