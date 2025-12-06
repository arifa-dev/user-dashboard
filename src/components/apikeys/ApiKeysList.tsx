"use client";
import { FiCopy, FiRefreshCcw, FiTrash2, FiEdit3 } from "react-icons/fi";
import Button from "../ui/button/Button";
import { PlusIcon } from "@/icons";
import Link from "next/link";

const apiKeys = [
  {
    label: "Production Web API key",
    key: "arifa_live_********4248",
    status: "Disabled",
    created: "25 Jan, 2025",
    lastUsed: "Today, 10:45 AM",
    enabled: false,
  },
  {
    label: "Production Mobile API key",
    key: "arifa_live_********4923",
    status: "Active",
    created: "29 Dec, 2024",
    lastUsed: "Today, 12:40 AM",
    enabled: true,
  },
  {
    label: "Test Web API Key",
    key: "arifa_test_********0932",
    status: "Active",
    created: "12 Mar, 2024",
    lastUsed: "Today, 11:45 PM",
    enabled: true,
  },
    {
    label: "Test Mobile API key",
    key: "arifa_test_********4923",
    status: "Active",
    created: "29 Dec, 2024",
    lastUsed: "Today, 12:40 AM",
    enabled: true,
  },
];

export default function ApiKeysList() {
  return (
    <div className="w-full rounded-xl border border-gray-200 bg-white p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          API Keys
        </h2>
        <Link href="/generate-apikeys">
          <Button startIcon={<PlusIcon />}>Add API Key</Button>
        </Link>
      </div>

      <div className="space-y-8">
        {apiKeys.map((item, idx) => (
          <div key={idx} className="w-full">
            {/* Label */}
            <p className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              {item.label}
            </p>

            {/* Key Row (Responsive) */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full gap-3 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-700 dark:bg-gray-800">
              
              {/* Key */}
              <span className="text-gray-700 dark:text-gray-300 font-mono text-sm break-all">
                {item.key}
              </span>

              {/* Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <button className="flex items-center gap-1 rounded-md border px-3 py-1 text-sm text-gray-700 transition hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700">
                  <FiCopy /> Copy
                </button>

                <button className="rounded-md border p-2 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-700">
                  <FiRefreshCcw />
                </button>
              </div>
            </div>

            {/* Bottom Info Row (Fully Responsive) */}
            <div className="mt-3 flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-sm text-gray-600 dark:text-gray-400">
              
              {/* Status + Dates */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    item.status === "Active"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {item.status}
                </span>

                <p>
                  Created: <span className="font-medium">{item.created}</span>
                </p>
                <p>
                  Last used: <span className="font-medium">{item.lastUsed}</span>
                </p>
              </div>

              {/* Toggle + Actions */}
              <div className="flex items-center gap-4">
                <label className="relative inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    className="peer sr-only"
                    defaultChecked={item.enabled}
                  />
                  <div className="peer h-5 w-10 rounded-full bg-gray-300 peer-checked:bg-blue-600 after:absolute after:left-0 after:top-0 after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:after:translate-x-5"></div>
                </label>

                <button className="text-gray-500 hover:text-red-500">
                  <FiTrash2 size={18} />
                </button>

                <button className="text-gray-500 hover:text-blue-600">
                  <FiEdit3 size={18} />
                </button>
              </div>
            </div>

            {idx < apiKeys.length - 1 && (
              <hr className="mt-5 border-gray-200 dark:border-gray-700" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
