"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { EyeCloseIcon, EyeIcon, ChevronLeftIcon } from "@/icons";
import Link from "next/link";
import { auth_api } from "@/utils/api";

export default function ResetPasswordForm() {
  const { uid, token } = useParams();  // <-- Dynamic route params
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<null | "success" | "error">(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== password2) {
      setStatus("error");
      setMessage("Passwords do not match.");
      return;
    }

    setLoading(true);
    setStatus(null);
    setMessage(null);

    try {
      const { response, data } = await auth_api("/auth/users/reset_password_confirm/", {
        method: "POST",
        body: JSON.stringify({
          uid,
          token,
          new_password: password,
          re_new_password: password2,
        }),
      });

      if (response.ok) {
        setStatus("success");
        setMessage("Password updated! Redirecting to Sign In...");
        setTimeout(() => router.push("/signin"), 1500);
      } else {
        setStatus("error");
        setMessage(data?.detail || "Failed to reset password.");
      }
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col flex-1 lg:w-1/2 w-full">
      <div className="w-full max-w-md sm:pt-10 mx-auto mb-5">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <ChevronLeftIcon />
          Back to dashboard
        </Link>
      </div>

      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div className="mb-5 sm:mb-8 text-center">
          <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
            Set New Password
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Enter and confirm your new password.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <Label>New Password <span className="text-error-500">*</span></Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="New password"
                  defaultValue={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                >
                  {showPassword ? <EyeIcon className="fill-gray-500 dark:fill-gray-400" /> : <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />}
                </span>
              </div>
            </div>

            <div>
              <Label>Confirm Password <span className="text-error-500">*</span></Label>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm password"
                defaultValue={password2}
                onChange={(e) => setPassword2(e.target.value)}
              />
            </div>

            {message && (
              <p className={status === "error" ? "text-error-500" : "text-green-500"}>
                {message}
              </p>
            )}

            <div>
              <Button className="w-full" size="sm" disabled={loading}>
                {loading ? "Updating..." : "Update Password"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
