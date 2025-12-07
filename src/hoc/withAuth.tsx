"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth_api } from "@/utils/api";

export function withAuth<P extends object>(Component: React.ComponentType<P>) {
  return function ProtectedPage(props: P) {
    const router = useRouter();

    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
      const verifyToken = async () => {
        try {
          const token = localStorage.getItem("accessToken");

          if (!token) {
            setIsAuthenticated(false);
            setLoading(false);
            return router.replace("/signin");
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
    }, []);

    if (loading) {
      return <div className="p-4">Checking authentication...</div>;
    }

    if (!isAuthenticated) return null;

    return <Component {...props} />;
  };
}
