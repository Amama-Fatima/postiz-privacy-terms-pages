export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-sm rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Terms of Service
        </h1>
        <p className="text-sm text-gray-600 mb-8">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <div className="space-y-6 text-gray-700">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing and using Postiz ("the Service"), you accept and
              agree to be bound by the terms and provisions of this agreement.
              If you do not agree to these Terms of Service, please do not use
              the Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              2. Description of Service
            </h2>
            <p>
              Postiz is a social media management platform that allows users to
              schedule, publish, and manage content across multiple social media
              platforms including TikTok, Meta/Facebook, Instagram, Twitter,
              LinkedIn, and others.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              3. User Accounts
            </h2>
            <p className="mb-3">To use our Service, you must:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Be at least 13 years old (or 16 in the EU)</li>
              <li>Provide accurate and complete registration information</li>
              <li>Maintain the security of your account credentials</li>
              <li>
                Be responsible for all activities that occur under your account
              </li>
              <li>Notify us immediately of any unauthorized use</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              4. User Content and Conduct
            </h2>
            <p className="mb-3">
              You are responsible for the content you post through our Service.
              You agree not to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Post content that violates any law or third-party rights</li>
              <li>Post spam, misleading, or fraudulent content</li>
              <li>
                Post content that is harmful, threatening, abusive, or harassing
              </li>
              <li>
                Violate the terms of service of any connected social media
                platform
              </li>
              <li>
                Use the Service to infringe on intellectual property rights
              </li>
              <li>Attempt to gain unauthorized access to our systems</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              5. Social Media Platform Integration
            </h2>
            <p>
              When you connect your social media accounts to our Service, you
              grant us permission to access and post content on your behalf. You
              acknowledge that:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>You must comply with each platform's terms of service</li>
              <li>
                We are not responsible for actions taken by third-party
                platforms
              </li>
              <li>Platform APIs and features may change without notice</li>
              <li>
                You can revoke access at any time through your account settings
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              6. Intellectual Property
            </h2>
            <p>
              The Service and its original content, features, and functionality
              are owned by Postiz and are protected by international copyright,
              trademark, and other intellectual property laws. You retain all
              rights to the content you post through the Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              7. Limitation of Liability
            </h2>
            <p>
              To the maximum extent permitted by law, Postiz shall not be liable
              for any indirect, incidental, special, consequential, or punitive
              damages resulting from your use of or inability to use the
              Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              8. Service Availability
            </h2>
            <p>
              We strive to provide reliable service but do not guarantee
              uninterrupted access. We may modify, suspend, or discontinue the
              Service at any time without notice.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              9. Termination
            </h2>
            <p>
              We may terminate or suspend your account and access to the Service
              immediately, without prior notice, for conduct that we believe
              violates these Terms or is harmful to other users, us, or third
              parties.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              10. Changes to Terms
            </h2>
            <p>
              We reserve the right to modify these Terms at any time. We will
              notify users of any material changes by posting the new Terms on
              this page and updating the "Last updated" date.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              11. Governing Law
            </h2>
            <p>
              These Terms shall be governed by and construed in accordance with
              the laws of [Your Jurisdiction], without regard to its conflict of
              law provisions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              12. Contact Information
            </h2>
            <p>
              If you have any questions about these Terms, please contact us at:
            </p>
            <p className="mt-2">
              Email: legal@kingofautomation.com
              <br />
              Address: [Your Business Address]
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
