import React from "react";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import ComponentCard from "@/components/common/ComponentCard";
import Image from "next/image";
import mpesalogo from "../../../../../public/images/logo/mpesa.png";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";

interface Transaction {
  id: number;
  provider: string;
  invoice: string;
  reference: string;
  date: string;
  status: string;
  amount: string;
}

const transactions: Transaction[] = [
  { id: 1, provider: "MPESA", invoice: "Q62K65R", reference: "N/A", date: "Dec 4, 2025", status: "pending", amount: "Ksh 10" },
  { id: 2, provider: "MPESA", invoice: "A12B34C", reference: "REF123", date: "Dec 3, 2025", status: "completed", amount: "Ksh 250" },
  { id: 3, provider: "MPESA", invoice: "Z98Y76X", reference: "N/A", date: "Dec 1, 2025", status: "failed", amount: "Ksh 50" },
];

const StatusBadge = ({ status }: { status: Transaction["status"] }) => {
  const colors: Record<Transaction["status"], string> = {
    completed: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
    failed: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400",
    pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
  };

  return (
    <span className={`inline-block px-2 py-0.5 text-xs font-medium rounded-full ${colors[status]}`}>
      {status}
    </span>
  );
};

export default function TransactionsTable() {
  return (
    <div className="w-full space-y-6">
      <PageBreadcrumb  pageTitle="Transactions"/>
      
      {/* Stats Grid */}

          <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]  gap-6">
          
          <h2 className="font-semibold text-gray-800 dark:text-white/90 pb-3">Transactions Overview</h2>
      <div className="grid grid-cols-1  rounded-xl border border-gray-200 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x dark:divide-gray-800 dark:border-gray-800">
        <div className="border-b p-5 sm:border-r lg:border-b-0">
          <p className="mb-1.5 text-sm text-gray-400 dark:text-gray-500">Completed</p>
          <h3 className="text-3xl text-gray-800 dark:text-white/90">30</h3>
        </div>
        <div className="border-b p-5 lg:border-b-0">
          <p className="mb-1.5 text-sm text-gray-400 dark:text-gray-500">Pending</p>
          <h3 className="text-3xl text-gray-800 dark:text-white/90">0</h3>
        </div>
        <div className="border-b p-5 sm:border-r sm:border-b-0">
          <p className="mb-1.5 text-sm text-gray-400 dark:text-gray-500">Failed</p>
          <h3 className="text-3xl text-gray-800 dark:text-white/90">5</h3>
        </div>
        <div className="p-5">
          <p className="mb-1.5 text-sm text-gray-400 dark:text-gray-500">Total</p>
          <h3 className="text-3xl text-gray-800 dark:text-white/90">35</h3>
        </div>
      </div>

      </div>

      {/* Table */}
      <ComponentCard title="Transactions" desc="All your recent transactions including payments and invoices.">
        <div className="max-w-full overflow-x-auto">
          <div className="min-w-[700px]">
            <Table>
              <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                <TableRow>
                  {["Provider", "Invoice ID", "Reference", "Date", "Status", "Amount"].map((heading) => (
                    <TableCell
                      key={heading}
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                      {heading}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHeader>

              <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                {transactions.map((tx) => (
                  <TableRow key={tx.id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                    <TableCell className="px-5 py-4 text-gray-700 text-theme-sm dark:text-gray-300 flex items-center gap-2">
                      {tx.provider === "MPESA" ? (
                        <Image src={mpesalogo} alt="MPESA" width={55} height={90} />
                      ) : (
                        tx.provider
                      )}
                    </TableCell>

                    <TableCell className="px-5 py-4 text-gray-700 text-theme-sm dark:text-gray-300">
                      {tx.invoice}
                    </TableCell>

                    <TableCell className="px-5 py-4 text-gray-700 text-theme-sm dark:text-gray-300">
                      {tx.reference}
                    </TableCell>

                    <TableCell className="px-5 py-4 text-gray-700 text-theme-sm dark:text-gray-300">
                      {tx.date}
                    </TableCell>

                    <TableCell className="px-5 py-4 text-theme-sm">
                      <StatusBadge status={tx.status} />
                    </TableCell>

                    <TableCell className="px-5 py-4 text-gray-700 text-theme-sm dark:text-gray-300">
                      {tx.amount}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </ComponentCard>
    </div>
  );
}
