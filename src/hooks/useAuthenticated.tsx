"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth_api } from "@/utils/api";

type UseAuthenticatedResult = {
  loading: boolean;
  isAuthenticated: boolean;
};

export function useAuthenticated(): UseAuthenticatedResult {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const token = localStorage.getItem("accessToken");

        if (!token) {
          setIsAuthenticated(false);
          router.replace("/signin");
          return;
        }

        const { response } = await auth_api("/auth/jwt/verify/", {
          method: "POST",
          body: JSON.stringify({ token }),
        });

        if (response.ok) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          router.replace("/signin");
        }
      } catch {
        setIsAuthenticated(false);
        router.replace("/signin");
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, [router]);

  return { loading, isAuthenticated };
}
