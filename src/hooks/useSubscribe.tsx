import { useState } from "react";
import { notification_api } from "@/utils/api";

export const useSubscribe = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [invoiceId, setInvoiceId] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const subscribe = async (phoneNumber: string, planID: string) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    setInvoiceId(null);

    try {
      const payload = {
        phone_number: phoneNumber,
        plan_id: planID,
      };

      const { response, data } = await notification_api("/subscription/create", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(data?.message || "Failed to initiate subscription");
      }

      setInvoiceId(data?.data?.invoice_id ?? null);
      setSuccess(true);
      return data;
    } catch (err: any) {
      setError(err.message || "Unexpected error");
      setSuccess(false);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { subscribe, loading, error, success, invoiceId };
};
