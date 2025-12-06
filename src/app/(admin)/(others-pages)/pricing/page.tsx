import React from 'react';
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Pricing Table | TailAdmin - Next.js Dashboard Template",
  description: "Pricing table with different plans",
};

const pricingPlans = [
  {
    id: 1,
    name: "Developer",
    description: "Perfect plan for Testing",
    price: "Free",
    period: "For a Lifetime",
    isCurrentPlan: true,
    buttonText: null,
    borderColor: "border border-gray-200 dark:border-gray-800",
    buttonColor: "",
    shadow: "shadow-sm",
    features: [
      "2 concurrent connections",
      "Unlimited requests",
      "Test Api Keys (mobile & web)",
      "Api Key Active for 4hrs",
      "One-time generate"
    ]
  },
  {
    id: 2,
    name: "Hobby",
    description: "For users who want to do more",
    price: "750",
    period: "/Month",
    isCurrentPlan: false,
    buttonText: "Subscribe",
    borderColor: "border-2 border-blue-500 dark:border-blue-600",
    buttonColor: "bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 focus:ring-blue-500",
    shadow: "shadow-lg",
    features: [
      "100 concurrent connections",
      "Unlimited requests",
      "Live Api Keys (mobile & web)",
      "Api Keys with no expiry",
    ]
  },
  {
    id: 3,
    name: "Startup",
    description: "For bussiness",
    price: "2,500",
    period: "/month",
    isCurrentPlan: false,
    buttonText: "Subscribe",
    borderColor: "border-2 border-green-500 dark:border-green-600",
    buttonColor: "bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 focus:ring-green-500",
    shadow: "shadow-lg",
      features: [
      "1000 concurrent connections",
      "Unlimited requests",
      "Live Api Keys (mobile & web)",
      "Api Keys with no expiry",
    ]
  }
];

const CheckIcon = () => (
  <svg className="mr-3 h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
  </svg>
);

const PlanCard = ({ plan }: { plan: typeof pricingPlans[0] }) => {
  return (
    <div className={`rounded-xl bg-white p-6 dark:bg-gray-900 ${plan.borderColor} ${plan.shadow}`}>
      <h2 className="mb-2 text-2xl font-bold text-gray-800 dark:text-white">
        {plan.name}
      </h2>
      <p className="mb-6 text-gray-600 dark:text-gray-400">
        {plan.description}
      </p>
      
      <div className="mb-6">
        <h3 className="text-3xl font-bold text-gray-800 dark:text-white">{plan.price}</h3>
        <p className="text-gray-600 dark:text-gray-400">{plan.period}</p>
      </div>
      
      {plan.isCurrentPlan && (
        <div className="mb-6">
          <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800 dark:bg-green-900/30 dark:text-green-400">
            Current Plan
          </span>
        </div>
      )}
      
      {plan.buttonText && (
        <Link href={`/checkout?plan_id=${plan.id}&plan_name=${plan.name}&price=${plan.price}`}>
          <button className={`mb-6 w-full rounded-lg px-4 py-3 font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${plan.buttonColor}`}>
            {plan.buttonText}
          </button>
        </Link>
      )}
      
      <ul className="space-y-3">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-center text-gray-700 dark:text-gray-300">
            <CheckIcon />
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default function PricingPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Pricing" />
      <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
        <div className="mb-10 text-center">
          <h1 className="mb-4 text-3xl font-bold text-gray-800 dark:text-white/90 md:text-4xl">
            Select Plan
          </h1>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {pricingPlans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>
      </div>
    </div>
  );
}