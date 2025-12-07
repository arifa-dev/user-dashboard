import { useEffect, useState, useCallback } from "react";
import { notification_api } from "@/utils/api";

export interface SubscriptionInfo {
  active: boolean;
  start_date: string | null;
  end_date: string | null;
  days_remaining: number;
  next_billing_date: string | null;
  
  plan: {
    id: string | null;
    name: string | null;
    price: number | null;
  } | null;
}

export interface ApiKeyInfo {
  api_key: string;
  key_type: string;
  client: string;
  status: string;
  expires_at: string | null;
  created_at: string;
}

export interface UserApiData {
  subscription: SubscriptionInfo | null;
  live_keys: ApiKeyInfo[];
  test_keys: ApiKeyInfo[];
}

export const useSubscriptionApiKeyInfo = () => {
  const [data, setData] = useState<UserApiData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const { response, data } = await notification_api("/apikey/info", {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(data?.message || "Failed to fetch API info");
      }

      setData(data);
    } catch (err: any) {
      setError(err.message || "Unexpected error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    subscription: data?.subscription ?? null,
    liveKeys: data?.live_keys ?? [],
    testKeys: data?.test_keys ?? [],
    loading,
    error,
    refresh: fetchData,
  };
};
