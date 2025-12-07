import { useEffect, useState, useCallback } from "react";
import { notification_api } from "@/utils/api";

export const useTransactionHistory = () => {
  const [history, setHistory] = useState<any>({ items: [] });
  const [overview, setOverview] = useState<any>(null);

  const [nextPage, setNextPage] = useState<number | null>(null);

  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const fetchData = useCallback(async (pageNum = 1) => {
    try {
      pageNum === 1 ? setLoading(true) : setLoadingMore(true);
      setErr(null);

      const { data } = await notification_api(
        `/subscription/history?page=${pageNum}&per_page=15`
      );

      // MAIN ITEMS
      const subscriptionData = data.data.Subscription || [];

      // OVERVIEW
      const overviewData = data.pagination?.overview || {};

      // REAL NEXT PAGE
      const paginationMeta = data.pagination?.pagination || {};
      const next = paginationMeta.next ?? null;

      setHistory((prev: any) => ({
        items:
          pageNum === 1
            ? subscriptionData
            : [...prev.items, ...subscriptionData],
      }));

      setOverview(overviewData);
      setNextPage(next);

    } catch (e) {
      setErr("Failed to load transactions.");
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, []);

  useEffect(() => {
    fetchData(1);
  }, [fetchData]);

  const loadMore = useCallback(() => {
    if (!nextPage) return;
    fetchData(nextPage);
  }, [nextPage, fetchData]);

  return {
    history,
    overview,
    loading,
    loadingMore,
    loadMore,
    err,
  };
};
