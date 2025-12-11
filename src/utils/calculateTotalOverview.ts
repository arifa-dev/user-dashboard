export function calculateTotalOverview(data: any) {
  if (!data) return 0;

  const success = data.total_success ?? 0;
  const pending = data.total_pending ?? 0;
  const failed = data.total_failed ?? 0;

  const sGrowth = parseFloat(data.success_growth ?? "0");
  const pGrowth = parseFloat(data.pending_growth ?? "0");
  const fGrowth = parseFloat(data.failed_growth ?? "0");

  const total = success + pending + failed;
  if (total === 0) return 0;

  const weighted =
    success * sGrowth +
    pending * pGrowth +
    failed * fGrowth;

  return Math.round(weighted / total);
}
