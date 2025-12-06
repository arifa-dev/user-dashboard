import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";



export const metadata: Metadata = {
  title: "Billing | Arifa Dashboard",
  description: "View plan details and payment methods",
};

export default function BillingPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Billing" />

      <div className="mt-8 space-y-10">

     
          <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]  gap-6">
          
          <h2 className="font-semibold text-gray-800 dark:text-white/90 pb-6">Billing Overview</h2>
          <div className="grid grid-cols-1 rounded-xl border border-gray-200 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-y-0 dark:divide-gray-800 dark:border-gray-800">
                <div className="border-b p-5 sm:border-r lg:border-b-0">
                  <p className="mb-1.5 text-sm text-gray-400 dark:text-gray-500">Current Plan</p>
                  <h3 className="text-3xl text-gray-800 dark:text-white/90">Hobby</h3>
                </div>
                <div className="border-b p-5 lg:border-b-0">
                  <p className="mb-1.5 text-sm text-gray-400 dark:text-gray-500">Cost</p>
                  <h3 className="text-3xl text-gray-800 dark:text-white/90">Ksh 750</h3>
                </div>
                <div className="border-b p-5 sm:border-r sm:border-b-0">
                  <p className="mb-1.5 text-sm text-gray-400 dark:text-gray-500">Renewal Date</p>
                  <h3 className="text-3xl text-gray-800 dark:text-white/90">Mar 22, 2028</h3>
                </div>
                <div className="p-5">
                  <p className="mb-1.5 text-sm text-gray-400 dark:text-gray-500">Days Remaining</p>
                  <h3 className="text-3xl text-gray-800 dark:text-white/90">23 / 30</h3>
                </div>
              </div>

        </div>

      </div>
     
    </div>
  );
}
