"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeftIcon } from "@/icons";
import { auth_api } from "@/utils/api";

export default function VerifyEmailPage() {
  const [pendingEmail, setPendingEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const email = localStorage.getItem("pendingEmail");
    setPendingEmail(email);
  }, []);

  const handleResend = async () => {
    if (!pendingEmail) {
      setMessage("Missing email. Please register again.");
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const { data } = await auth_api("/auth/users/resend_activation/", {
        method: "POST",
        body: JSON.stringify({ email: pendingEmail }),
      });

      setMessage(data?.detail || "Activation email has been resent!");
    } catch (err: any) {
      setMessage(err?.message || "Failed to resend activation email");
    } finally {
      setLoading(false);
    }
  };

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
          <h1 className="mb-4 text-2xl font-semibold text-gray-800 dark:text-white">
            Verify Your Email
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            {pendingEmail
              ? `A verification email has been sent to ${pendingEmail}. Please check your inbox and follow the instructions to activate your account.`
              : "A verification email has been sent. Please check your inbox."}
          </p>

          <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
            Didn’t receive the email?{" "}
            <span
              onClick={loading ? undefined : handleResend}
              className={`cursor-pointer font-medium text-brand-500 hover:text-brand-600 dark:text-brand-400 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Sending..." : "Resend"}
            </span>
          </p>

          {message && (
            <p className="mt-4 text-sm text-gray-700 dark:text-gray-300">
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
