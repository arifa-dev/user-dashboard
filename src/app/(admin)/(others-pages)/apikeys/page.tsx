import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import ApiKeysList from "@/components/apikeys/ApiKeysList";

export const metadata: Metadata = {
  title: "Next.js Blank Page | TailAdmin - Next.js Dashboard Template",
  description: "This is Next.js Blank Page TailAdmin Dashboard Template",
};

export default function BlankPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="ApiKeys" />
      <div className="mt-6">
  <ApiKeysList />
</div>

    </div>
  );
}
