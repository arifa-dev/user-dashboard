"use client";

import { useEffect } from "react";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import ComponentCard from "@/components/common/ComponentCard";
import Image from "next/image";
import mpesalogo from "../../../../../public/images/logo/mpesa.png";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { useTransactionHistory } from "@/hooks/useTransactions";

const StatusBadge = ({ status }: { status: string }) => {
  const normalized = status.toLowerCase();

  const colors: Record<string, string> = {
    complete: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
    failed: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400",
    pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
    processing: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
  };

  return (
    <span className={`inline-block px-2 py-0.5 text-xs font-medium rounded-full ${colors[normalized]}`}>
      {normalized}
    </span>
  );
};

export default function TransactionsTable() {
  const { history, overview, loading, err, loadMore, loadingMore } = useTransactionHistory();

  // Infinite scroll 
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.innerHeight + window.scrollY;
      const bottom = document.body.offsetHeight - 300;

      if (scrollPos >= bottom && !loadingMore && !loading) {
        loadMore();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadingMore, loading, loadMore]);


  return (
    <div className="w-full space-y-6">
      <PageBreadcrumb pageTitle="Transactions" />

      {/* Overview Stats */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03] gap-6">
        <h2 className="font-semibold text-gray-800 dark:text-white/90 pb-3">Transactions Overview</h2>

        {!overview ? (
          <p className="text-gray-400 text-sm">Loading stats...</p>
        ) : (
          <div className="grid grid-cols-1 rounded-xl border border-gray-200 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x dark:divide-gray-800 dark:border-gray-800">
            <div className="border-b p-5 sm:border-r lg:border-b-0">
              <p className="mb-1.5 text-sm text-gray-400 dark:text-gray-500">Completed</p>
              <h3 className="text-3xl text-gray-800 dark:text-white/90">{overview.completed}</h3>
            </div>
            <div className="border-b p-5 lg:border-b-0">
              <p className="mb-1.5 text-sm text-gray-400 dark:text-gray-500">Pending</p>
              <h3 className="text-3xl text-gray-800 dark:text-white/90">{overview.pending}</h3>
            </div>
            <div className="border-b p-5 sm:border-r sm:border-b-0">
              <p className="mb-1.5 text-sm text-gray-400 dark:text-gray-500">Failed</p>
              <h3 className="text-3xl text-gray-800 dark:text-white/90">{overview.failed}</h3>
            </div>
            <div className="p-5">
              <p className="mb-1.5 text-sm text-gray-400 dark:text-gray-500">Total</p>
              <h3 className="text-3xl text-gray-800 dark:text-white/90">{overview.total}</h3>
            </div>
          </div>
        )}
      </div>

      {/* Table */}
      <ComponentCard title="Transactions" desc="All your recent transactions including payments and invoices.">
        <div className="max-w-full overflow-x-auto">
          <div className="min-w-[700px]">

            {loading && <p className="text-center py-4 text-gray-400">Loading transactions...</p>}
            {err && <p className="text-center py-4 text-red-400">{err}</p>}

            {!loading && history.items.length === 0 && !err && (
              <p className="text-center py-4 text-gray-400">No transactions found.</p>
            )}

            {!loading && history.items.length > 0 && (
              <Table>
                <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                  <TableRow>
                    {["Provider", "Invoice ID", "Reference", "Date", "Status", "Amount"].map((heading) => (
                      <TableCell
                        key={heading}
                        isHeader
                        className="px-5 py-3 font-medium text-gray-500 text-start text-sm dark:text-gray-400"
                      >
                        {heading}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHeader>

                <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                  {history.items.map((tx: any, index: number) => (
                    <TableRow
                      key={`${tx.id}-${index}`}
                      className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                    >
                      <TableCell className="px-5 py-4 flex items-center gap-2 text-gray-700 dark:text-gray-300 text-sm">
                        {tx.provider === "M-PESA" ? (
                          <Image src={mpesalogo} alt="MPESA" width={55} height={40} />
                        ) : (
                          tx.provider
                        )}
                      </TableCell>

                      <TableCell className="px-5 py-4 text-gray-700 dark:text-gray-300 text-sm">
                        {tx.invoice_id}
                      </TableCell>

                      <TableCell className="px-5 py-4 text-gray-700 dark:text-gray-300 text-sm">
                        {tx.mpesa_reference || "N/A"}
                      </TableCell>

                      <TableCell className="px-5 py-4 text-gray-700 dark:text-gray-300 text-sm">
                        {new Date(tx.start_date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </TableCell>

                      <TableCell className="px-5 py-4">
                        <StatusBadge status={tx.status} />
                      </TableCell>

                      <TableCell className="px-5 py-4 text-gray-700 dark:text-gray-300 text-sm">
                        Ksh {tx.amount}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

            )}

            {/* Loading more indicator */}
            {loadingMore && <p className="text-center py-4 text-gray-400">Loading more…</p>}

          </div>
        </div>
      </ComponentCard>
    </div>
  );
}
