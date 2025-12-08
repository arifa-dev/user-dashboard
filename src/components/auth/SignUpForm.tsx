"use client";

import Checkbox from "@/components/form/input/Checkbox";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "@/icons";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth_api } from "@/utils/api";

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    location: "",
    email: "",
    password: "",
    re_password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Password match validation
    if (formData.password !== formData.re_password) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const { data, response } = await auth_api("/auth/users/", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      if (data?.id) {
        // Store pending email for verification step
        localStorage.setItem("pendingEmail", formData.email);
        router.push("/verify-email"); // redirect to verification page
      } else {
        setError(data?.detail || "Failed to sign up. Please try again.");
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col flex-1 lg:w-1/2 w-full overflow-y-auto no-scrollbar">
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
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Sign Up
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter your details to create an account!
            </p>
          </div>

          {error && (
            <p className="mb-3 text-sm text-red-600 dark:text-red-400">{error}</p>
          )}

          <form onSubmit={handleSubmit}>
            <div className="space-y-5">
              {/* First & Last Name */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <Label>
                    First Name<span className="text-error-500">*</span>
                  </Label>
                  <Input
                    type="text"
                    name="first_name"
                    defaultValue={formData.first_name}
                    onChange={handleChange}
                    placeholder="Enter your first name"
                  />
                </div>
                <div>
                  <Label>
                    Last Name<span className="text-error-500">*</span>
                  </Label>
                  <Input
                    type="text"
                    name="last_name"
                    defaultValue={formData.last_name}
                    onChange={handleChange}
                    placeholder="Enter your last name"
                  />
                </div>
              </div>

              {/* Phone & Location */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <Label>
                    Phone Number<span className="text-error-500">*</span>
                  </Label>
                  <Input
                    type="text"
                    name="phone_number"
                    defaultValue={formData.phone_number}
                    onChange={handleChange}
                    placeholder="254712345678"
                  />
                </div>
                <div>
                  <Label>
                    Location<span className="text-error-500">*</span>
                  </Label>
                  <Input
                    type="text"
                    name="location"
                    defaultValue={formData.location}
                    onChange={handleChange}
                    placeholder="Nairobi, Kenya"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <Label>
                  Email<span className="text-error-500">*</span>
                </Label>
                <Input
                  type="email"
                  name="email"
                  defaultValue={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                />
              </div>

              {/* Password */}
              <div>
                <Label>
                  Password<span className="text-error-500">*</span>
                </Label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    defaultValue={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                  >
                    {showPassword ? (
                      <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
                    ) : (
                      <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
                    )}
                  </span>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <Label>
                  Confirm Password<span className="text-error-500">*</span>
                </Label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="re_password"
                    defaultValue={formData.re_password}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                  >
                    {showPassword ? (
                      <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
                    ) : (
                      <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
                    )}
                  </span>
                </div>
              </div>

              {/* Checkbox */}
              <div className="flex items-center gap-3">
                <Checkbox checked={isChecked} onChange={setIsChecked} />
                <p className="inline-block font-normal text-gray-500 dark:text-gray-400">
                  By creating an account you agree to the{" "}
                  <span className="text-gray-800 dark:text-white/90">
                    <Link href="/terms">Terms and Conditions</Link>
                  </span>
                </p>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={!isChecked || loading}
                  className={`flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-lg shadow-theme-xs ${
                    isChecked
                      ? "bg-brand-500 hover:bg-brand-600"
                      : "bg-gray-300 cursor-not-allowed"
                  }`}
                >
                  {loading ? "Signing..." : "Sign Up"}
                </button>
              </div>
            </div>
          </form>

          <div className="mt-5">
            <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
              Already have an account?{" "}
              <Link
                href="/signin"
                className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
