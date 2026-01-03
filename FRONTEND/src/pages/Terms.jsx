import { MailCheck } from 'lucide-react';
import React from 'react'

const Terms = () => {
  return (
    <div className="mx-auto max-w-4xl px-6 py-10 text-sm text-gray-700 dark:text-gray-300">
      
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
        Terms and Conditions
      </h1>

      <p className="mt-2 text-xs text-gray-500">
        Last updated: {new Date().toLocaleDateString()}
      </p>

      {/* Intro */}
      <section className="mt-6 space-y-3">
        <p>
          Welcome to <strong>SmartVault</strong>. These Terms and Conditions
          govern your use of the SmartVault application and services.
        </p>
        <p>
          By accessing or using SmartVault, you agree to be bound by these
          Terms. If you do not agree, please do not use the application.
        </p>
      </section>

      {/* Eligibility */}
      <section className="mt-8 space-y-3">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          1. Eligibility
        </h2>
        <p>
          You must be at least 13 years old to use SmartVault. By creating an
          account, you confirm that you meet this requirement.
        </p>
      </section>

      {/* Account Responsibility */}
      <section className="mt-8 space-y-3">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          2. Account Responsibility
        </h2>

        <ul className="list-disc pl-6 space-y-1">
          <li>You are responsible for maintaining the security of your account.</li>
          <li>You must not share your login credentials with others.</li>
          <li>You are responsible for all activity under your account.</li>
        </ul>
      </section>

      {/* Acceptable Use */}
      <section className="mt-8 space-y-3">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          3. Acceptable Use
        </h2>

        <p>You agree not to use SmartVault to:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Upload or store illegal, harmful, or abusive content</li>
          <li>Attempt unauthorized access to other accounts or systems</li>
          <li>Distribute malware, spam, or malicious software</li>
          <li>Violate any applicable laws or regulations</li>
        </ul>
      </section>

      {/* User Content */}
      <section className="mt-8 space-y-3">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          4. User Content
        </h2>

        <p>
          You retain ownership of the content you store in SmartVault.
          However, you grant SmartVault permission to store and process your
          data solely for providing the service.
        </p>

        <p>
          SmartVault does not claim ownership of your personal files, notes,
          or passwords.
        </p>
      </section>

      {/* Data Security */}
      <section className="mt-8 space-y-3">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          5. Data Security
        </h2>

        <p>
          We take reasonable measures to protect your data. However, you
          understand that no digital service can guarantee absolute security.
        </p>
      </section>

      {/* Third-Party Services */}
      <section className="mt-8 space-y-3">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          6. Third-Party Services
        </h2>

        <p>
          SmartVault may integrate with third-party services for authentication,
          storage, or analytics. We are not responsible for the practices or
          policies of these third-party services.
        </p>
      </section>

      {/* Account Termination */}
      <section className="mt-8 space-y-3">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          7. Account Termination
        </h2>

        <p>
          You may delete your account at any time. Upon deletion, your data
          will be permanently removed, subject to legal requirements.
        </p>

        <p>
          SmartVault reserves the right to suspend or terminate accounts that
          violate these Terms.
        </p>
      </section>

      {/* Limitation of Liability */}
      <section className="mt-8 space-y-3">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          8. Limitation of Liability
        </h2>

        <p>
          SmartVault is provided “as is” without warranties of any kind. We
          are not liable for data loss, service interruptions, or damages
          resulting from the use of the application.
        </p>
      </section>

      {/* Changes */}
      <section className="mt-8 space-y-3">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          9. Changes to These Terms
        </h2>

        <p>
          We may update these Terms from time to time. Continued use of
          SmartVault after changes means you accept the updated Terms.
        </p>
      </section>

      {/* Contact */}
      <section className="mt-8 space-y-3">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          10. Contact Us
        </h2>

        <p>
          If you have any questions regarding these Terms and Conditions,
          please contact us at:
        </p>
      <div className='flex  gap-2 '><MailCheck className='size-4'> </MailCheck>
        <p className="font-medium">
          Email: contact@smartvault.com
        </p></div>
      </section>

    </div>
  );
};

export default Terms;
