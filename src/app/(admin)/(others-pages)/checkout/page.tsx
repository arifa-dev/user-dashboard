"use client";

import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { useSearchParams } from "next/navigation";
import ComponentCard from "@/components/common/ComponentCard";
import Button from "@/components/ui/button/Button";

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const plan_name = searchParams.get("plan_name");
  const plan_price = searchParams.get("price");

  return (
    <div className="space-y-8">
      <PageBreadcrumb pageTitle="Checkout" />

      {/* Checkout Overview */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03] space-y-6">
        <h2 className="font-semibold text-gray-800 dark:text-white/90 text-lg">Checkout Overview</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 rounded-xl border border-gray-200 lg:divide-x lg:divide-y-0 dark:divide-gray-800 dark:border-gray-800">
          <div className="border-b p-5 sm:border-r lg:border-b-0">
            <p className="mb-1.5 text-sm text-gray-400 dark:text-gray-500">Selected Plan</p>
            <h3 className="text-2xl text-gray-800 dark:text-white/90">{plan_name}</h3>
          </div>

          <div className="border-b p-5 lg:border-b-0">
            <p className="mb-1.5 text-sm text-gray-400 dark:text-gray-500">Cost</p>
            <h3 className="text-2xl text-gray-800 dark:text-white/90">Ksh {plan_price}</h3>
          </div>

          <div className="border-b p-5 sm:border-r sm:border-b-0">
            <p className="mb-1.5 text-sm text-gray-400 dark:text-gray-500">Billing</p>
            <h3 className="text-2xl text-gray-800 dark:text-white/90">Monthly</h3>
          </div>

          <div className="p-5">
            <p className="mb-1.5 text-sm text-gray-400 dark:text-gray-500">Duration</p>
            <h3 className="text-2xl text-gray-800 dark:text-white/90">30 days</h3>
          </div>
        </div>
      </div>

      {/* Payment Section */}
      <ComponentCard title="Complete Purchase" desc="Please input your MPESA number to receive the payment prompt.">
        <div className="space-y-4">

          <div className="flex flex-col gap-2">
            <input
              type="text"
              placeholder="254712345678"
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-primary focus:outline-none"
            />
          </div>

          <Button className="w-full">
            Subscribe
          </Button>
        </div>
      
      </ComponentCard>
    </div>
  );
}
