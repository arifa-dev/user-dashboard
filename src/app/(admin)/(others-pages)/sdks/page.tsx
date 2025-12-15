'use client';

import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import ComponentCard from "@/components/common/ComponentCard";
import Link from "next/link";

export default function Profile() {
  return (
    <>
      <PageBreadcrumb pageTitle="SDKs" />

      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-white/90">
          Arifa SDKs
        </h3>

        <p className="mb-6 max-w-2xl text-sm text-gray-600 dark:text-gray-400">
           Official SDKs for integrating real-time and offline notifications into modern web and backend applications. Built for performance, reliability, and ease of use
        </p>

        <div className="space-y-6">
          <ComponentCard
            title="arifa-notifications"
            desc="A React notification component with WebSocket support for real-time notifications from Arifa.Allows developers to easily integrate notifications in any React app and fully control how notifications are renderedz"
            >
                <Link
                    href="https://www.npmjs.com/package/arifa-notifications"
                    target="_blank"
                    className="mb-2 inline-flex items-center gap-1 text-sm font-semibold text-indigo-600 transition-colors hover:text-indigo-700 hover:underline dark:text-indigo-400 dark:hover:text-indigo-300"
                >
                    arifa-notifications
                </Link>
          </ComponentCard>
        </div>
      </div>
    </>
  );
}
