"use client";
import React, { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import ChartTab from "../common/ChartTab";

// Dynamically import the chart component
const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

// Notification data
const notificationsData = {
  weekly: {
    dates: ["01 Dec", "02 Dec", "03 Dec", "04 Dec", "05 Dec", "06 Dec", "07 Dec"],
    success: [12, 18, 20, 15, 22, 25, 30],
    failed: [2, 1, 3, 4, 2, 1, 0],
    pending: [5, 4, 3, 6, 4, 5, 3],
  },
  monthly: {
    dates: ["Week 1", "Week 2", "Week 3", "Week 4"],
    success: [70, 80, 90, 85],
    failed: [5, 3, 2, 4],
    pending: [10, 8, 5, 6],
  },
  quarterly: {
    dates: ["Q1", "Q2", "Q3", "Q4"],
    success: [200, 250, 220, 270],
    failed: [15, 10, 8, 12],
    pending: [20, 18, 25, 22],
  },
};

export default function NotificationsStatisticsChart() {
  const [range, setRange] = useState<"weekly" | "monthly" | "quarterly">("weekly");

  // Chart series (memoized to update when range changes)
  const series = useMemo(() => [
    { name: "Success", data: notificationsData[range].success },
    { name: "Failed", data: notificationsData[range].failed },
    { name: "Pending", data: notificationsData[range].pending },
  ], [range]);

  // Chart options (memoized, dynamic x-axis categories)
  const options: ApexOptions = useMemo(() => ({
    chart: { fontFamily: "Outfit, sans-serif", type: "area", height: 310, toolbar: { show: false } },
    colors: ["#039855", "#D92D20", "#F59E0B"],
    stroke: { curve: "smooth", width: [2, 2, 2] },
    fill: { type: "gradient", gradient: { opacityFrom: 0.55, opacityTo: 0 } },
    markers: { size: 0, strokeColors: "#fff", strokeWidth: 2, hover: { size: 6 } },
    grid: { xaxis: { lines: { show: false } }, yaxis: { lines: { show: true } } },
    dataLabels: { enabled: false },
    tooltip: { enabled: true },
    xaxis: {
      type: "category",
      categories: notificationsData[range].dates,
      axisBorder: { show: false },
      axisTicks: { show: false },
      tooltip: { enabled: false },
    },
    yaxis: {
      labels: { style: { fontSize: "12px", colors: ["#6B7280"] } },
      title: { text: "Notifications", style: { fontSize: "12px" } },
    },
    legend: { show: true, position: "top", horizontalAlign: "left" },
  }), [range]);

  return (
    <div className="rounded-2xl border border-gray-200 bg-white px-5 pt-5 pb-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
      {/* Header */}
      <div className="flex flex-col gap-5 mb-6 sm:flex-row sm:justify-between sm:items-start">
        <div className="w-full">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Notifications Statistics
          </h3>
          <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
            Real-time notifications metrics ({range})
          </p>
        </div>

        {/* Chart tabs */}
        <div className="flex items-start gap-3 sm:justify-end w-full sm:w-auto">
          <ChartTab
            options={["weekly", "monthly", "quarterly"]}
            selected={range}
            onChange={(val) => setRange(val as "weekly" | "monthly" | "quarterly")}
          />
        </div>
      </div>

      {/* Chart */}
      <div className="max-w-full overflow-x-auto custom-scrollbar">
        <div className="min-w-[700px] xl:min-w-full">
          <ReactApexChart options={options} series={series} type="area" height={310} />
        </div>
      </div>
    </div>
  );
}
