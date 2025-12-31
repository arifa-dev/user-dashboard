"use client";

import { NotificationMetrics } from "@/components/notifications/NotificationMetrics";
import NotificationsOverview from "@/components/notifications/NotificationOverview";
import MonthlyNotificationsChart from "@/components/notifications/MonthlyNotificationsChart";
import StatisticsChart from "@/components/notifications/StatisticsChart";
import { useUserAnalyticsData } from "@/hooks/useUserAnalyticsData";
import ConcurrentConnections from "@/components/concurrent-connections/ConcurrentConnections";

export default function HomePage() {
  const { data, loading, error } = useUserAnalyticsData();

  if (loading) return <p className="text-gray-400">Loading analytics...</p>;
  if (error) return <p className="text-red-500">Failed to load: {error}</p>;

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 w-full overflow-x-hidden">

      {/* Left column */}
      <div className="col-span-1 xl:col-span-7 flex flex-col gap-6">
        <ConcurrentConnections />

        <NotificationMetrics
          total_pending={data?.total_pending ?? "..."}
          total_success={data?.total_success ?? "..."}
          pending_growth={data?.pending_growth || "..."}
          success_growth={data?.success_growth || "..."}
          delivered_count={data?.total_delivered || "..."}
        />
      </div>

      {/* Right column */}
      <div className="col-span-1 xl:col-span-5 w-full">
        <NotificationsOverview data={data} />
      </div>

      {/* Charts – full width, stacked */}
      <div className="col-span-1 xl:col-span-12 flex flex-col gap-6 w-full">
        <MonthlyNotificationsChart monthlyData={data?.monthly_data} />

        <StatisticsChart
          analyticsData={{
            weekly: data?.weekly_data || { dates: [], success: [], failed: [], pending: [] },
            monthly: data?.monthly_data || { dates: [], success: [], failed: [], pending: [] },
            quarterly: data?.quarterly_data || { dates: [], success: [], failed: [], pending: [] },
          }}
        />
      </div>

    </div>
  );
}
