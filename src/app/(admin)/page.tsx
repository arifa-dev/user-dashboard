"use client";

import { NotificationMetrics } from "@/components/notifications/NotificationMetrics";
import NotificationsOverview from "@/components/notifications/NotificationOverview";
import MonthlyNotificationsChart from "@/components/notifications/MonthlyNotificationsChart";
import StatisticsChart from "@/components/notifications/StatisticsChart"; 
import { useUserAnalyticsData } from "@/hooks/useUserAnalyticsData";

export default function HomePage() {
  const { data, loading, error } = useUserAnalyticsData();

  if (loading) return <p className="text-gray-400">Loading analytics...</p>;
  if (error) return <p className="text-red-500">Failed to load: {error}</p>;

  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">

      <div className="col-span-12 space-y-6 xl:col-span-7">
        <NotificationMetrics 
          total_pending={data?.total_pending ?? "..."} 
          total_success={data?.total_success ?? "..."}
          pending_growth={data?.pending_growth || "..."}
          success_growth={data?.success_growth || "..."}
        />

        {/* Pass monthly data to MonthlyNotificationsChart */}
        <MonthlyNotificationsChart monthlyData={data?.monthly_data} />
      </div>

      <div className="col-span-12 xl:col-span-5">
        <NotificationsOverview data={data} />
      </div>
      
      <div className="col-span-12">
        {/* Pass weekly/monthly/quarterly data to StatisticsChart */}
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
