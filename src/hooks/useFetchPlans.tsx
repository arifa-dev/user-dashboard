import { useState, useEffect, useCallback } from "react";
import { notification_api } from "@/utils/api";

export interface PlanFeature {
  id: string;
  plan_id: string;
  feature: string;
  created_at: string;
}

export interface Plan {
  id: string;
  name: string;
  price: number;
  duration_days: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  concurrent: number;
}

export interface PlanWithFeatures {
  plan: Plan;
  features: PlanFeature[];
}

// Type for backend API response
interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}

export const useFetchPlans = () => {
  const [plans, setPlans] = useState<PlanWithFeatures[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPlans = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Call API
      const res = await notification_api("/plans", { method: "GET" });

      // Use the already parsed JSON `data` from notification_api
      const json: ApiResponse<PlanWithFeatures[]> = res.data;

      if (!json.success) {
        throw new Error(json.message || "Failed to fetch plans");
      }

      // Set the plans from json.data
      setPlans(json.data ?? []);
    } catch (err: any) {
      setError(err.message || "Unexpected error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPlans();
  }, [fetchPlans]);

  return {
    plans,
    loading,
    error,
    refresh: fetchPlans,
  };
};
