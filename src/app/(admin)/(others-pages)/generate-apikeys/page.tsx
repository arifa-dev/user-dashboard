"use client";

import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import {
  FiGlobe,
  FiSmartphone,
  FiCheckCircle,
  FiAlertTriangle,
} from "react-icons/fi";
import { useState } from "react";
import ComponentCard from "@/components/common/ComponentCard";
import { useSubscriptionApiKeyInfo } from "@/hooks/useSubscriptionApiKeyInfo";
import { useGenerateApiKey } from "@/hooks/useGenerateApiKey";

export default function GenerateApiKeysPage() {
  const { subscription } = useSubscriptionApiKeyInfo();
  const { generateApiKey, apiKey, loading, error } = useGenerateApiKey();

  const [clientType, setClientType] = useState<"web" | "mobile">("web");
  const [keyType, setKeyType] = useState<"test" | "prod">("test");
  const [host, setHost] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    await generateApiKey({
      client: clientType,
      key_type: keyType,
      host: clientType === "web" ? host : undefined,
      plan_id: keyType === "test" ? null : subscription?.plan?.id ?? null,
    });
  };

  return (
    <>
      <PageBreadcrumb pageTitle="Generate API Keys" />

      <div className="mb-3">
        {/* ERROR MESSAGE */}
        {error && (
          <div className="flex items-center gap-2 p-3 rounded-lg border border-red-300 bg-red-50 text-red-700 dark:bg-red-900/20 dark:border-red-800 dark:text-red-300 text-sm">
            <FiAlertTriangle /> {error}
          </div>
        )}

        {/* GENERATED RESULT */}
        {apiKey && (
          <div className="flex items-center gap-2 p-3 rounded-lg border border-green-300 bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800 text-sm">
            <FiCheckCircle />
            <span className="font-medium">API Key:</span>
            <code className="px-2 py-1 rounded bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700">
              {apiKey}
            </code>
          </div>
        )}
      </div>

      {/* FLEX WRAP CONTAINER */}
      <div className="w-full flex flex-wrap gap-6 h-fit">
        {/* GENERATE API KEY FORM */}
        <div className="w-full sm:w-[48%] h-fit">
          <ComponentCard
            title="Generate API Key"
            desc="Create secure API keys for your web or mobile applications."
          >
            <div className="space-y-6">
              {/* CLIENT TYPE */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Client Type
                </label>
                <div className="flex flex-col gap-2">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="clientType"
                      checked={clientType === "web"}
                      onChange={() => setClientType("web")}
                      className="h-4 w-4 text-indigo-600"
                    />
                    <div className="flex items-center gap-2 text-gray-800 dark:text-gray-200">
                      <FiGlobe /> Web App
                    </div>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="clientType"
                      checked={clientType === "mobile"}
                      onChange={() => setClientType("mobile")}
                      className="h-4 w-4 text-indigo-600"
                    />
                    <div className="flex items-center gap-2 text-gray-800 dark:text-gray-200">
                      <FiSmartphone /> Mobile App
                    </div>
                  </label>
                </div>
              </div>

              {/* MOBILE WARNING */}
              {clientType === "mobile" && (
                <div className="flex items-start gap-3 p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-sm dark:bg-amber-900/20 dark:text-amber-300 dark:border-amber-700">
                  <FiAlertTriangle size={18} />
                  Never embed a production API key directly in a mobile app.
                </div>
              )}

              {/* KEY TYPE */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Key Type
                </label>
                <div className="flex flex-col gap-2">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="keyType"
                      checked={keyType === "test"}
                      onChange={() => setKeyType("test")}
                      className="h-4 w-4 text-indigo-600"
                    />
                    <span className="text-gray-800 dark:text-gray-200">
                      Test Key (expires in 4 hours)
                    </span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="keyType"
                      checked={keyType === "prod"}
                      onChange={() => setKeyType("prod")}
                      className="h-4 w-4 text-indigo-600"
                    />
                    <span className="text-gray-800 dark:text-gray-200">
                      Production Key
                    </span>
                  </label>
                </div>
              </div>

              {/* DOMAIN INPUT */}
              {clientType === "web" && (
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Domain
                  </label>
                  <input
                    type="text"
                    placeholder="https://myapp.com"
                    value={host}
                    onChange={(e) => setHost(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-100"
                  />
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    NB: The API key will only work from this domain. Origin is
                    validated.
                  </p>
                </div>
              )}

              {/* SUBMIT BUTTON */}
              <button
                disabled={loading}
                onClick={handleSubmit}
                className="w-full py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold transition"
              >
                {loading ? "Generating..." : "Generate API Key"}
              </button>
            </div>
          </ComponentCard>
        </div>

        {/* ACTIVE PLAN CARD */}
        <div className="w-full sm:w-[48%] h-fit">
          <ComponentCard
            title="Active Paid Plan"
            desc="All API Keys will be generated based on this plan"
          >
            <div className="space-y-2">
              <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {subscription?.plan?.name || "Developer (Free)"}
              </p>
              <p className="text-sm font-medium text-green-600 dark:text-green-400">
                Status: {subscription?.active ? "Active" : "Active"}
              </p>
            </div>
          </ComponentCard>
        </div>
      </div>
    </>
  );
}
