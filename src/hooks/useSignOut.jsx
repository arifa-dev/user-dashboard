"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth_api } from "@/utils/api";

export function useSignOut() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const signOut = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("accessToken");

      if (token) {
        const { response } = await auth_api("/auth/logout/", {
          method: "POST",
        });

        if (response.ok) {
          // Only remove token if logout succeeded
          localStorage.removeItem("accessToken");
          localStorage.removeItem("postLoginRedirect");
          router.replace("/signin");
        } else {
          console.error("Logout failed:", response.status);
        }
      } else {
        // No token: just redirect to signin
        router.replace("/signin");
      }
    } catch (err) {
      console.error("Logout error:", err);
      router.replace("/signin");
    } finally {
      setLoading(false);
    }
  };

  return { signOut, loading };
}
