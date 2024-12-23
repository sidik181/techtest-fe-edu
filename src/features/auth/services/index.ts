import axios, { AxiosError } from "axios";

export interface LoginInterface {
  email: string;
  password: string;
}

export interface RegisterInterface {
  fullname: string;
  email: string;
  password: string;
  phone_number: string;
  address: string;
}

const API_URI = process.env.NEXT_PUBLIC_API_URI!;

export async function login(values: LoginInterface) {
  try {
    const { data } = await axios.post(`${API_URI}/api/login`, values);
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data?.data;
    }
    throw new Error("Unexpected error occurred.");
  }
}

export async function register(values: RegisterInterface) {
  try {
    const { data } = await axios.post(`${API_URI}/api/register`, values);
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data?.data;
    }
    throw new Error("Unexpected error occurred.");
  }
}
