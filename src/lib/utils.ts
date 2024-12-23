import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.SECRET_KEY!;

export const config = {
  runtime: "nodejs",
};

export function isTokenExpired(token: string): boolean {
  try {
    jwt.verify(token, SECRET_KEY);
    return false;
  } catch (error) {
    console.log(error)
    return true;
  }
}


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
