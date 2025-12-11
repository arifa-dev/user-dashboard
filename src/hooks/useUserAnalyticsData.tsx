import { useState, useEffect, useCallback } from "react";
import { notification_api } from "@/utils/api";

// Type for chart data
type AnalyticsChartData = {
  dates: string[];
  success: number[];
  failed: number[];
  pending: number[];
};

// Full response type
type UserAnalytics = {
  total_success: number;
  total_failed: number;
  total_pending: number;
  success_growth: string | null;
  failed_growth: string | null;
  pending_growth: string | null;
  weekly_data?: AnalyticsChartData;
  monthly_data?: AnalyticsChartData;
  quarterly_data?: AnalyticsChartData;
};

export const useUserAnalyticsData = () => {
  const [data, setData] = useState<UserAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalytics = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const { response, data: resData } = await notification_api("/analytics/me", {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(resData?.message || "Failed to fetch analytics");
      }

      // Ensure empty objects for chart data if not present
      const analyticsData: UserAnalytics = {
        ...resData?.data,
        weekly_data: resData?.data?.weekly_data ?? { dates: [], success: [], failed: [], pending: [] },
        monthly_data: resData?.data?.monthly_data ?? { dates: [], success: [], failed: [], pending: [] },
        quarterly_data: resData?.data?.quarterly_data ?? { dates: [], success: [], failed: [], pending: [] },
      };

      setData(analyticsData);
      return analyticsData;
    } catch (err: any) {
      setError(err.message || "Unexpected error");
      setData(null);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  return { data, loading, error, refetch: fetchAnalytics };
};

export default useUserAnalyticsData;
