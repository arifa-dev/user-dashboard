"use client";
import React from "react";
import Badge from "../ui/badge/Badge";
import { ArrowDownIcon, ArrowUpIcon, TimeIcon } from "@/icons";
import { formatNumber } from "@/utils";

interface INotificationMetrics {
  total_success: number | string;
  total_pending: number | string;
  success_growth: string; 
  pending_growth: string;
  delivered_count: number | string  
}

export const NotificationMetrics: React.FC<INotificationMetrics> = ({
  total_success,
  total_pending,
  success_growth,
  pending_growth,
  delivered_count
}) => {

  const isPositive = (value: string) => value.trim().startsWith("+");

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">

      {/* Success */}
      <div className="rounded-2xl bg-white border p-5 dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <TimeIcon className="text-gray-800 size-6 dark:text-white/90" />
        </div>

        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">Success</span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {formatNumber(Number(total_success))}
            </h4>
          </div>

          <Badge color={isPositive(success_growth) ? "success" : "error"}>
            {isPositive(success_growth) ? <ArrowUpIcon /> : <ArrowDownIcon />}
            {success_growth}
          </Badge>
        </div>
      </div>


       {/* Delivered */}
      <div className="rounded-2xl border bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <TimeIcon className="text-gray-800 size-6 dark:text-white/90" />
        </div>

        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">Delivered</span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {formatNumber(Number(delivered_count) || 0)}
            </h4>
          </div>

           <Badge color={isPositive(success_growth) ? "success" : "error"}>
            {isPositive(success_growth) ? <ArrowUpIcon /> : <ArrowDownIcon />}
            {success_growth}
          </Badge>
        </div>
      </div>


       {/* Total events count */}
      <div className="rounded-2xl border bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <TimeIcon className="text-gray-800 size-6 dark:text-white/90" />
        </div>

        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">Total Events</span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                {formatNumber(Number(total_pending || 0) + Number(total_success || 0))}
            </h4>
          </div>

        </div>
      </div>

      {/* Pending */}
      <div className="rounded-2xl border bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <TimeIcon className="text-gray-800 size-6 dark:text-white/90" />
        </div>

        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">Pending</span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {formatNumber(Number(total_pending))}
            </h4>
          </div>

          <Badge color={isPositive(pending_growth) ? "success" : "error"}>
            {isPositive(pending_growth) ? <ArrowUpIcon /> : <ArrowDownIcon />}
            {pending_growth}
          </Badge>
        </div>
      </div>

    </div>
  );
};
