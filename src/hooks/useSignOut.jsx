"use client";

import { auth_api } from "@/utils/api";
import { useRouter } from "next/navigation";

export  function useSignOut() {
  const router = useRouter();

  const signOut = async () => {
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

          // Redirect to signin page
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
    }
  };

  return signOut;
}
