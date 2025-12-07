"use client";

import { useState } from "react";
import { notification_api } from "@/utils/api";

interface GenerateApiKeyParams {
  client: "web" | "mobile";
  key_type: "test" | "prod";
  host?: string;
  plan_id?: string | null;
}



export const useGenerateApiKey = () => {
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [error, setError] = useState<string>("");

  const generateApiKey = async (params: GenerateApiKeyParams): Promise<string | null> => {
    setLoading(true);
    setApiKey(null);
    setError("");

    try {
      const { response, data } = await notification_api("/apikey/generate", {
        method: "POST",
        body: JSON.stringify(params),
      });

      if (response.ok) {
        setApiKey(data.data.api_key);
        return data.data.api_key;
      } else {
        const msg = data?.message;
        setError(msg);
        return null;
      }
    } catch (err: any) {
      setError(err.message || "Network error");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { generateApiKey, apiKey, loading, error };
};
