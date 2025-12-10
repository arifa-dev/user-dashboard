"use client";

import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { useSubscriptionApiKeyInfo } from "@/hooks/useSubscriptionApiKeyInfo";
import Button from "@/components/ui/button/Button"; // Adjust path if needed
import { FiRefreshCcw } from "react-icons/fi";

export default function BillingPage() {
  const { loading, error, subscription, refresh } = useSubscriptionApiKeyInfo();

  const planName = subscription?.plan?.name ?? "N/A";
  const planCost = subscription?.plan?.price
    ? `Ksh ${subscription.plan.price}`
    : "N/A";

  const renewalDate = subscription?.next_billing_date
  ? new Date(subscription.next_billing_date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  : "N/A";


  const daysRemaining = subscription?.days_remaining ?? "N/A";

  return (
    <div>
      <PageBreadcrumb pageTitle="Billing" />

      <div className="mt-8 space-y-10">
        <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="flex items-center justify-between pb-6">
            <h2 className="font-semibold text-gray-800 dark:text-white/90">
              Billing Overview
            </h2>
            <Button
              onClick={refresh}
              className="flex items-center gap-2 text-sm px-3 py-1"
            >
              <FiRefreshCcw /> Refresh
            </Button>
          </div>

          {loading ? (
            <p className="text-gray-400">Loading billing info...</p>
          ) : error ? (
            <p className="text-red-500">Failed to load: {error}</p>
          ) : (
            <div className="grid grid-cols-1 rounded-xl border border-gray-200 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x dark:divide-gray-800 dark:border-gray-800">
              <div className="border-b p-5 sm:border-r lg:border-b-0">
                <p className="text-sm text-gray-400">Current Plan</p>
                <h3 className="text-3xl text-gray-800 dark:text-white/90">{planName}</h3>
              </div>

              <div className="border-b p-5 lg:border-b-0">
                <p className="text-sm text-gray-400">Cost</p>
                <h3 className="text-3xl text-gray-800 dark:text-white/90">{planCost}</h3>
              </div>

              <div className="border-b p-5 sm:border-r lg:border-b-0">
                <p className="text-sm text-gray-400">Renewal Date</p>
                <h3 className="text-3xl text-gray-800 dark:text-white/90">{renewalDate}</h3>
              </div>

              <div className="p-5"> 
                <p className="text-sm text-gray-400">Days Remaining</p>
                <h3 className="text-3xl text-gray-800 dark:text-white/90">{daysRemaining}</h3>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
