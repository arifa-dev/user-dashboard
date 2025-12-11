"use client";

import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { MoreDotIcon } from "@/icons";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import { useState } from "react";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { formatNumber } from "@/utils";

// Dynamically import the ReactApexChart component
const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

type MonthlyNotificationsChartProps = {
  monthlyData?: {
    dates: string[]; // e.g., ["Dec 2025", "Jan 2026"]
    success: number[];
    failed?: number[];
    pending?: number[];
  };
};

export default function MonthlyNotificationsChart({ monthlyData }: MonthlyNotificationsChartProps) {
  const [isOpen, setIsOpen] = useState(false);

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  // Compute total notifications per month
  const totalPerMonth =
    monthlyData?.dates.map((_, idx) => {
      const s = monthlyData?.success[idx] || 0;
      const f = monthlyData?.failed?.[idx] || 0;
      const p = monthlyData?.pending?.[idx] || 0;
      return s + f + p;
    }) || [];

  // Extract only month name (strip year if exists)
  const monthsOnly = monthlyData?.dates.map((dateStr) => dateStr.split(" ")[0]) || [];

  const options: ApexOptions = {
    colors: ["#465fff"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "bar",
      height: 180,
      toolbar: { show: false },
    },
    plotOptions: {
      bar: { horizontal: false, columnWidth: "39%", borderRadius: 5, borderRadiusApplication: "end" },
    },
    dataLabels: { enabled: false },
    stroke: { show: true, width: 4, colors: ["transparent"] },
    xaxis: {
      categories: monthsOnly,
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    legend: { show: true, position: "top", horizontalAlign: "left", fontFamily: "Outfit" },
    yaxis: {
      title: { text: undefined },
      labels: {
        formatter: (val: number) => formatNumber(val), // Format y-axis numbers
      },
    },
    grid: { yaxis: { lines: { show: true } } },
    fill: { opacity: 1 },
    tooltip: {
      x: { show: false },
      y: {
        formatter: (val: number) => `${formatNumber(val)} notifications`, // Format tooltip numbers
      },
    },
  };

  const series = [
    {
      name: "Total Notifications",
      data: totalPerMonth,
    },
  ];

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Monthly Notifications
        </h3>

        <div className="relative inline-block">
          <button onClick={toggleDropdown} className="dropdown-toggle">
            <MoreDotIcon className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" />
          </button>
          <Dropdown isOpen={isOpen} onClose={closeDropdown} className="w-40 p-2">
            <DropdownItem onItemClick={closeDropdown} className="dropdown-item">
              View More
            </DropdownItem>
            <DropdownItem onItemClick={closeDropdown} className="dropdown-item">
              Delete
            </DropdownItem>
          </Dropdown>
        </div>
      </div>

      <div className="max-w-full overflow-x-auto custom-scrollbar">
        <div className="-ml-5 min-w-[650px] xl:min-w-full pl-2">
          <ReactApexChart options={options} series={series} type="bar" height={180} />
        </div>
      </div>
    </div>
  );
}
