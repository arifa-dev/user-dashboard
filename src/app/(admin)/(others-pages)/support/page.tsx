'use client';

import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import ComponentCard from "@/components/common/ComponentCard";
import Link from "next/link";

export default function SupportPage() {
  return (
    <>
      <PageBreadcrumb pageTitle="Support" />

      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <header className="mb-6">
          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-white/90">
            Need Help? We’re Here for You
          </h3>
          <p className="max-w-2xl text-sm text-gray-600 dark:text-gray-400">
            Our support team is ready to assist you with any questions or issues. Whether you need technical guidance, account help, or integration support, we’ve got you covered.
          </p>
        </header>

        <div className="space-y-6">
          <ComponentCard
            title="Contact Support"
            desc="Reach out to our support team via email for assistance with any questions, issues, or guidance you need."
          >
            <a
              href="mailto:arifabusiness.dev@gmail.com"
              className="inline-flex items-center gap-1 font-semibold text-indigo-600 transition-colors hover:text-indigo-700 hover:underline dark:text-indigo-400 dark:hover:text-indigo-300 text-sm"
            >
              arifabusiness.dev@gmail.com
            </a>
          </ComponentCard>

          <ComponentCard
            title="Documentation & Guides"
            desc="Access our detailed documentation and step-by-step guides to help you integrate and use our services efficiently."
          >
            <Link
              href="https://notifications.arifa.dev/docs/"
              target="_blank"
              className="text-indigo-600 hover:underline dark:text-indigo-400 text-sm"
            >
              View Documentation
            </Link>
          </ComponentCard>

          <ComponentCard
            title="System Status"
            desc="Check the current status of our services to stay informed about any maintenance or outages."
          >
            <Link
              href="/system-status"
              className="text-indigo-600 hover:underline dark:text-indigo-400 text-sm"
            >
              View System Status
            </Link>
          </ComponentCard>

          <ComponentCard
            title="FAQs & Troubleshooting"
            desc="Find answers to common questions and solutions to frequent issues to help you get back on track quickly."
          >
            <Link
              href="https://notifications.arifa.dev/docs/faq.html"
              target="_blank"
              className="text-indigo-600 hover:underline dark:text-indigo-400 text-sm"
            >
              Browse FAQs
            </Link>
          </ComponentCard>
        </div>
      </div>
    </>
  );
}
