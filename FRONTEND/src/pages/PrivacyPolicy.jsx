import React from 'react'
import { MailCheck } from 'lucide-react';


const PrivacyPolicy = () => {
  return (
    <div className="mx-auto max-w-4xl px-6 py-10 text-sm text-gray-700 dark:text-gray-300">
      
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
        Privacy Policy
      </h1>

      <p className="mt-2 text-xs text-gray-500">
        Last updated: {new Date().toLocaleDateString()}
      </p>

      {/* Intro */}
      <section className="mt-6 space-y-3">
        <p>
          Welcome to <strong>SmartVault</strong>. Your privacy and data security
          are extremely important to us. This Privacy Policy explains how we
          collect, use, store, and protect your personal information when you
          use our application.
        </p>
        <p>
          By using SmartVault, you agree to the practices described in this
          policy.
        </p>
      </section>

      {/* Information We Collect */}
      <section className="mt-8 space-y-3">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          1. Information We Collect
        </h2>

        <p><strong>a) Account Information</strong></p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Email address</li>
          <li>Display name / username</li>
          <li>Profile photo (if provided)</li>
          <li>Authentication provider (email/password or OAuth)</li>
        </ul>

        <p className="mt-3"><strong>b) User Content</strong></p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Notes, passwords, and files you store in SmartVault</li>
          <li>Metadata related to uploaded files (file name, size, type)</li>
        </ul>

        <p className="mt-3"><strong>c) Technical Information</strong></p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Device and browser information</li>
          <li>IP address (used for security and abuse prevention)</li>
          <li>Login timestamps and activity logs</li>
        </ul>
      </section>

      {/* How We Use Data */}
      <section className="mt-8 space-y-3">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          2. How We Use Your Information
        </h2>

        <ul className="list-disc pl-6 space-y-1">
          <li>To create and manage your SmartVault account</li>
          <li>To securely store and retrieve your data</li>
          <li>To authenticate users and prevent unauthorized access</li>
          <li>To improve app performance and user experience</li>
          <li>To comply with legal and security requirements</li>
        </ul>
      </section>

      {/* Data Security */}
      <section className="mt-8 space-y-3">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          3. Data Security
        </h2>

        <p>
          We use industry-standard security measures to protect your data,
          including:
        </p>

        <ul className="list-disc pl-6 space-y-1">
          <li>Secure authentication mechanisms</li>
          <li>Encrypted communication (HTTPS)</li>
          <li>Access control and authorization checks</li>
          <li>Restricted access to sensitive information</li>
        </ul>

        <p className="mt-2">
          However, no system is 100% secure. We cannot guarantee absolute
          security, but we continuously work to improve our protections.
        </p>
      </section>

      {/* Third Party Services */}
      <section className="mt-8 space-y-3">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          4. Third-Party Services
        </h2>

        <p>
          SmartVault uses trusted third-party services to operate, such as:
        </p>

        <ul className="list-disc pl-6 space-y-1">
          <li>Authentication providers (for login and identity verification)</li>
          <li>Cloud storage services for file hosting</li>
          <li>Analytics and monitoring tools (non-personal usage data)</li>
        </ul>

        <p className="mt-2">
          These services have their own privacy policies, and we encourage you
          to review them.
        </p>
      </section>

      {/* Data Retention */}
      <section className="mt-8 space-y-3">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          5. Data Retention
        </h2>

        <p>
          We retain your data only for as long as your account is active or as
          required to provide our services.
        </p>

        <p>
          When you delete your account, your personal data and stored content
          are permanently removed from our systems, except where retention is
          required by law.
        </p>
      </section>

      {/* User Rights */}
      <section className="mt-8 space-y-3">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          6. Your Rights
        </h2>

        <ul className="list-disc pl-6 space-y-1">
          <li>Access and review your personal data</li>
          <li>Update or correct your account information</li>
          <li>Delete your account and associated data</li>
          <li>Withdraw consent where applicable</li>
        </ul>
      </section>

      {/* Children */}
      <section className="mt-8 space-y-3">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          7. Children’s Privacy
        </h2>

        <p>
          SmartVault is not intended for use by children under the age of 13.
          We do not knowingly collect personal information from children.
        </p>
      </section>

      {/* Changes */}
      <section className="mt-8 space-y-3">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          8. Changes to This Policy
        </h2>

        <p>
          We may update this Privacy Policy from time to time. Any changes will
          be posted on this page with an updated revision date.
        </p>
      </section>

      {/* Contact */}
      <section className="mt-8 space-y-3">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          9. Contact Us
        </h2>

        <p>
          If you have any questions or concerns about this Privacy Policy, you
          can contact us at:
        </p>

         
      <div className='flex  gap-2 '><MailCheck className='size-4'> </MailCheck>
        <p className="font-medium">
          Email:  contact@smartvault.com
        </p></div>
      </section>

    </div>
  );
};

export default PrivacyPolicy;
