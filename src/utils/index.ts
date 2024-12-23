import axios from "axios";
import { NextResponse } from "next/server";

export const formatPriceToIdr = (price: number) => {
  const rupiah = new Intl.NumberFormat("id", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(price);
  return rupiah;
};

export const formatDateToId = (date: Date) => {
  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
};

export const getMonthName = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleString("id-ID", { month: "long" });
};

export function handleApiError(error: unknown) {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status ?? 500;
    console.error("Axios Error:", error.message);
    return NextResponse.json(
      { data: error.response?.data ?? null },
      { status }
    );
  } else {
    console.error("Unexpected Error:", error);
    return NextResponse.json(
      { message: "Unexpected error occurred." },
      { status: 500 }
    );
  }
}
