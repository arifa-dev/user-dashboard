"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Button from "@/components/ui/button/Button";
import { ChevronLeftIcon } from "@/icons";
import Link from "next/link";
import { auth_api } from "@/utils/api";

export default function ActivateAccountPage() {
  const { uid, token } = useParams(); // dynamic route: /activate/[uid]/[token]
  const router = useRouter();

  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [message, setMessage] = useState("");

  const activateAccount = async () => {
    if (!uid || !token) {
      setStatus("error");
      setMessage("Missing activation parameters.");
      return;
    }

    try {
      const { response, data } = await auth_api("/auth/users/activation/", {
        method: "POST",
        body: JSON.stringify({ uid, token }),
      });

      if (response.ok) {
        setStatus("success");
        setMessage(data?.detail || "Your account has been activated!");
      } else {
        setStatus("error");
        setMessage(data?.detail || "Activation failed.");
      }
    } catch (err: any) {
      setStatus("error");
      setMessage(err.message || "Activation failed.");
    }
  };

  useEffect(() => {
    activateAccount();
  }, []);

  return (
    <div className="flex flex-col flex-1 items-center justify-center w-full min-h-screen bg-gray-50 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md text-center">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-gray-500 mb-8 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <ChevronLeftIcon className="mr-1" />
          Back to dashboard
        </Link>

        <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] p-6">
          {status === "loading" && (
            <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
              Activating your account...
            </h1>
          )}

          {status === "success" && (
            <h1 className="text-xl font-semibold text-green-600 dark:text-green-400 mb-4">
              {message}
            </h1>
          )}

          {status === "error" && (
            <h1 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-4">
              {message}
            </h1>
          )}

          {/* Always show the "Go to Sign In" button */}
          <Button className="w-full" onClick={() => router.push("/signin")}>
            Go to Sign In
          </Button>
        </div>
      </div>
    </div>
  );
}
