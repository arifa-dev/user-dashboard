"use client";

import { FiCopy, FiRefreshCcw, FiTrash2} from "react-icons/fi";
import Button from "../ui/button/Button";
import { PlusIcon } from "@/icons";
import Link from "next/link";
import { useSubscriptionApiKeyInfo } from "@/hooks/useSubscriptionApiKeyInfo";
import { useState } from "react";
import { notification_api } from "@/utils/api";

export default function ApiKeysList() {
  const { loading, error, liveKeys, testKeys, refresh } =
    useSubscriptionApiKeyInfo();

  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (key: string) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1500);
  };


  const ApiKeyActions = async (key: string, action: "rotate" | "delete") => {
      const endpoint = action === "rotate" ? `/apikey/rotate/${key}` : `/apikey/delete/${key}`;
      const method = action === "rotate" ? "POST" : "DELETE";

      try {
        const { response, data } = await notification_api(endpoint, { method });
        
        if (!response.ok) {
          throw new Error(data?.message || "API request failed");
        }

        refresh()
      } catch (_) {
        return 
      }
  };


  if (loading) return <p className="text-gray-400">Loading API keys...</p>;
  if (error)
    return (
      <p className="text-red-500">
        Failed to load API keys — {error.toString()}
      </p>
    );

  // Combine all keys
  const allKeys = [...liveKeys, ...testKeys];

  // Function to generate dynamic heading
  const getKeyHeading = (key: typeof allKeys[0]) => {
    const type = key.key_type.toLowerCase(); // 'live' or 'test'
    const client = key.client.toLowerCase(); // 'web' or 'mobile'
    const typeLabel = type === "live" ? "Production" : "Test";
    const clientLabel = client === "mobile" ? "Mobile" : "Web";
    return `${typeLabel} ${clientLabel} Key`;
  };

  return (
    <div className="w-full rounded-xl border border-gray-200 bg-white p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          API Keys
        </h2>

        <div className="flex items-center gap-3">
          <Button onClick={refresh} className="flex items-center gap-2">
            <FiRefreshCcw />
            Refresh
          </Button>

          <Link href="/generate-apikeys">
            <Button startIcon={<PlusIcon />}>Add API Key</Button>
          </Link>
        </div>
      </div>

      <div className="space-y-8">
        {allKeys.length === 0 && (
          <p className="text-gray-500 dark:text-gray-400">
            No API keys found. Create one to get started.
          </p>
        )}

        {allKeys.map((item, idx) => (
          <div key={idx} className="w-full">
            {/* Dynamic Label */}
            <p className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              {getKeyHeading(item)}
            </p>

            {/* Key Row */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full gap-3 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-700 dark:bg-gray-800">
              <span className="text-gray-700 dark:text-gray-300 font-mono text-sm break-all">
                {item.api_key}
              </span>

              <div className="flex flex-wrap items-center gap-3">
                {/* COPY BUTTON */}
                <button
                  onClick={() => handleCopy(item.api_key)}
                  className="flex items-center gap-1 rounded-md border px-3 py-1 text-sm text-gray-700 transition hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  <FiCopy />
                  {copiedKey === item.api_key ? "Copied!" : "Copy"}
                </button>

                {/* ROTATE BUTTON */}
                <button
                  onClick={() => ApiKeyActions(item.api_key, "rotate")}
                  className="rounded-md border p-2 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-700"
                >
                  <FiRefreshCcw />
                </button>
              </div>
            </div>

            {/* Bottom row */}
            <div className="mt-3 flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    item.status === "active"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {item.status}
                </span>

                <p>
                  Created:{" "}
                  <span className="font-medium">
                    {new Date(item.created_at).toLocaleDateString()}
                  </span>
                </p>
              </div>

              <div className="flex items-center gap-4">
                <label className="relative inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    className="peer sr-only"
                    defaultChecked={item.status === "active"}
                  />
                  <div className="peer h-5 w-10 rounded-full bg-gray-300 peer-checked:bg-blue-600 after:absolute after:left-0 after:top-0 after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:after:translate-x-5"></div>
                </label>

                <button 
                  className="text-gray-500 hover:text-red-500" 
                  onClick={() => ApiKeyActions(item.api_key, "delete")}
                >
                  <FiTrash2 size={18} />
                </button>
              </div>
            </div>

            {idx < allKeys.length - 1 && (
              <hr className="mt-5 border-gray-200 dark:border-gray-700" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
