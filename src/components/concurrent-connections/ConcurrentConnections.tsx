"use client";

import { FiActivity } from "react-icons/fi";
import { useWebSocket } from "@/hooks/useWebsocket";

export default function ConcurrentConnections() {
  const { data, isConnected } = useWebSocket("/connect");

  // Show loading state if data is not available
  if (!data) {
    return (
      <div className="flex items-center justify-between rounded-2xl border bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800">
            <FiActivity className="size-5 text-gray-700 dark:text-white/90 animate-pulse" />
            <span className="absolute top-0 right-0 w-3 h-3 rounded-full bg-gray-400 border border-white dark:border-gray-900 animate-pulse" />
          </div>
          <h2 className="text-sm font-medium text-gray-400">
            Loading concurrent connections...
          </h2>
        </div>
        <div className="text-right font-bold text-xl text-gray-800 dark:text-white/90">
          --
        </div>
      </div>
    );
  }

  const count = data.message?.count ?? 0;
  const limit = data.message?.limit ?? 0;

  // Status dot color
  const statusColor = isConnected ? "bg-green-500" : "bg-red-500";

  return (
    <div className="flex items-center justify-between rounded-2xl border bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
      {/* Left: Icon + label + status */}
      <div className="flex items-center gap-3">
        <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800">
          <FiActivity className="size-5 text-gray-700 dark:text-white/90" />
          {/* Status dot */}
          <span
            className={`absolute top-0 right-0 w-3 h-3 rounded-full ${statusColor} border border-white dark:border-gray-900`}
          />
        </div>

        <h2 className="text-sm font-medium text-gray-400">
          Live Concurrent Connections
        </h2>
      </div>

      {/* Right: value */}
      <div className="text-right font-bold text-xl text-gray-800 dark:text-white/90">
        {count}
        <span className="text-gray-500"> / {limit}</span>
      </div>
    </div>
  );
}
