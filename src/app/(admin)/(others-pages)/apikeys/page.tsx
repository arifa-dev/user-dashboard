"use client";

import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import ApiKeysList from "@/components/apikeys/ApiKeysList";


export default function BlankPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="ApiKeys List" />
      <div className="mt-6">
          <ApiKeysList />
      </div>
    </div>
  );
}
