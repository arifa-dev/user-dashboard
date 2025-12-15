'use client';

import GridShape from "@/components/common/GridShape";
import Image from "next/image";

export default function MaintenancePage() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen p-6 overflow-hidden z-1">
      <GridShape />
      <div className="mx-auto w-full max-w-[472px] text-center">
        <h1 className="mb-8 font-bold text-gray-800 text-title-md dark:text-white/90 xl:text-title-2xl">
          Maintenance Ongoing
        </h1>

        <div className="flex justify-center mb-6">
          <Image
            src="/images/error/maintenance.svg"
            alt="Maintenance Ongoing"
            className="dark:hidden"
            width={172}
            height={52}
          />
          <Image
            src="/images/error/maintenance-dark.svg"
            alt="Maintenance Ongoing"
            className="hidden dark:block"
            width={172}
            height={52}
          />
        </div>

        <p className="mt-6 mb-6 text-base text-gray-700 dark:text-gray-400 sm:text-lg">
          We are currently performing scheduled maintenance. Some services may be temporarily unavailable. Please check back shortly.
        </p>

      </div>
      {/* Footer */}
      <p className="absolute text-sm text-center text-gray-500 -translate-x-1/2 bottom-6 left-1/2 dark:text-gray-400">
        &copy; {new Date().getFullYear()} - Arifa
      </p>
    </div>
  );
}
