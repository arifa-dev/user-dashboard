import type { Metadata } from "next";
import { NotificationMetrics } from "@/components/notifications/NotificationMetrics ";
import NotificationsOverview from "@/components/notifications/NotificationOverview";
import MonthlyNotificationsChart from "@/components/notifications/MonthlyNotificationsChart";
import StatisticsChart from "@/components/notifications/StatisticsChart";

export const metadata: Metadata = {
  title:
    "Next.js E-commerce Dashboard | TailAdmin - Next.js Dashboard Template",
  description: "This is Next.js Home for TailAdmin Dashboard Template",
};

export default function Ecommerce() {
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12 space-y-6 xl:col-span-7">
        <NotificationMetrics />

        <MonthlyNotificationsChart />
      </div>

      <div className="col-span-12 xl:col-span-5">
        <NotificationsOverview />
      </div>
      
      <div className="col-span-12">
         <StatisticsChart />
      </div>
     
     
    </div>
  );
}
