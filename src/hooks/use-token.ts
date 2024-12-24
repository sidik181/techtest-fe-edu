"use client"

import { useEffect, useState } from "react";

export function useAuthToken() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("auth");
    setToken(storedToken);
  }, []);

  console.log(token)

  return token;
}
