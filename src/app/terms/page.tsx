"use client";

import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-10">
      <div className="w-full max-w-3xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl  p-8 space-y-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Arifa Terms & Conditions
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Effective Date: November 30, 2025
        </p>

        <p className="text-gray-700 dark:text-gray-300">
          Welcome to <strong>Arifa Realtime Notification Service</strong>. By
          using our platform, you agree to comply with these terms and
          conditions. Please read carefully.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          1. Acceptance of Terms
        </h2>
        <p className="text-gray-700 dark:text-gray-300">
          By accessing or using Arifa’s services, you agree to be bound by these
          Terms & Conditions. If you do not agree, you must not use our
          services.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          2. Services
        </h2>
        <p className="text-gray-700 dark:text-gray-300">
          Arifa provides real-time notification, messaging, and dashboard update
          services. Users can integrate Arifa into their web, mobile, and
          backend applications using secure API keys.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          3. Accounts and Security
        </h2>
        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
          <li>Each user receives a unique API key to access Arifa services.</li>
          <li>
            You are responsible for maintaining the confidentiality of your API
            key and account credentials.
          </li>
          <li>
            Notify us immediately of any unauthorized use of your account or API
            key.
          </li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          4. Free Trial & Testing
        </h2>
        <p className="text-gray-700 dark:text-gray-300">
          Arifa provides a <strong>free test API key</strong> for a limited
          duration (e.g., 4 hours) to allow users to test the service before
          making any purchase. Users should thoroughly test the platform using
          the free key to ensure it meets their requirements.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          5. Payment and No Refund Policy
        </h2>
        <p className="text-gray-700 dark:text-gray-300">
          Payments for Arifa services are <strong>non-refundable</strong>. Once
          a purchase is completed, no refunds will be issued, regardless of user
          satisfaction. Users should carefully test the service using the free
          API key before purchasing any paid plan.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          6. Acceptable Use
        </h2>
        <p className="text-gray-700 dark:text-gray-300">
          Users must not use Arifa services for illegal, harmful, or abusive
          purposes. Misuse of the API, including sending spam or unauthorized
          data, may result in immediate suspension or termination of services.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          7. Limitation of Liability
        </h2>
        <p className="text-gray-700 dark:text-gray-300">
          Arifa provides services “as is” and does not guarantee uninterrupted
          or error-free operation. Arifa is not liable for any damages,
          including indirect, incidental, or consequential damages arising from
          the use of our services.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          8. Termination
        </h2>
        <p className="text-gray-700 dark:text-gray-300">
          Arifa reserves the right to terminate or suspend your account or API
          access at its discretion. Users may terminate their accounts at any
          time, but purchased plans are non-refundable.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          9. Changes to Terms
        </h2>
        <p className="text-gray-700 dark:text-gray-300">
          Arifa may update these Terms & Conditions from time to time. Users
          will be notified of major changes, and continued use of the platform
          constitutes acceptance of the updated terms.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          10. Governing Law
        </h2>
        <p className="text-gray-700 dark:text-gray-300">
          These Terms are governed by the laws of Kenya. Any disputes arising
          from these Terms will be resolved in accordance with Kenyan law.
        </p>

        <p className="text-gray-600 dark:text-gray-400 text-sm mt-6">
          By clicking "Sign Up" and using Arifa services, you acknowledge that
          you have read, understood, and agreed to these Terms & Conditions.
        </p>

        <Link
          href="/signup"
          className="inline-block mt-4 px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Back to Sign Up
        </Link>
      </div>
    </div>
  );
}
