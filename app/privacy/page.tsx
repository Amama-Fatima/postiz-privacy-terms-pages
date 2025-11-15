export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-sm rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Privacy Policy
        </h1>
        <p className="text-sm text-gray-600 mb-8">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <div className="space-y-6 text-gray-700">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              1. Introduction
            </h2>
            <p>
              Welcome to Postiz (&quot;we,&quot; &quot;our,&quot; or
              &quot;us&quot;). We are committed to protecting your personal
              information and your right to privacy. This Privacy Policy
              explains how we collect, use, disclose, and safeguard your
              information when you use our social media management platform.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              2. Information We Collect
            </h2>
            <p className="mb-3">
              We collect information that you provide directly to us, including:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Account Information:</strong> Name, email address,
                username, and password
              </li>
              <li>
                <strong>Profile Information:</strong> Business name, website,
                profile picture
              </li>
              <li>
                <strong>Social Media Accounts:</strong> Access tokens and
                credentials for connected platforms (TikTok, Meta/Facebook,
                Instagram, Twitter, LinkedIn, etc.)
              </li>
              <li>
                <strong>Content:</strong> Posts, images, videos, and other
                content you create or schedule through our platform
              </li>
              <li>
                <strong>Usage Data:</strong> Information about how you interact
                with our service
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              3. How We Use Your Information
            </h2>
            <p className="mb-3">We use the information we collect to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide, maintain, and improve our services</li>
              <li>
                Post content to your connected social media accounts on your
                behalf
              </li>
              <li>Send you technical notices, updates, and support messages</li>
              <li>Respond to your comments and questions</li>
              <li>Monitor and analyze usage patterns and trends</li>
              <li>
                Detect, prevent, and address technical issues and security
                threats
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              4. Information Sharing and Disclosure
            </h2>
            <p className="mb-3">
              We may share your information in the following circumstances:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Social Media Platforms:</strong> We share your content
                with the social media platforms you&apos;ve connected (TikTok,
                Meta, etc.) to post on your behalf
              </li>
              <li>
                <strong>Service Providers:</strong> We work with third-party
                service providers who perform services on our behalf
              </li>
              <li>
                <strong>Legal Requirements:</strong> If required by law or to
                protect our rights
              </li>
              <li>
                <strong>Business Transfers:</strong> In connection with any
                merger, sale, or acquisition of our business
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              5. Data Security
            </h2>
            <p>
              We implement appropriate technical and organizational measures to
              protect your personal information. However, no method of
              transmission over the internet is 100% secure, and we cannot
              guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              6. Your Rights and Choices
            </h2>
            <p className="mb-3">You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access, update, or delete your personal information</li>
              <li>Disconnect your social media accounts at any time</li>
              <li>Opt-out of marketing communications</li>
              <li>Request a copy of your data</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              7. Third-Party Services
            </h2>
            <p>
              Our service integrates with third-party social media platforms
              (TikTok, Meta/Facebook, Instagram, Twitter, LinkedIn). These
              platforms have their own privacy policies, and we encourage you to
              review them.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              8. Data Retention
            </h2>
            <p>
              We retain your information for as long as your account is active
              or as needed to provide you services. You may request deletion of
              your account at any time.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              9. Children&apos;s Privacy
            </h2>
            <p>
              Our service is not intended for users under the age of 13 (or 16
              in the EU). We do not knowingly collect information from children.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              10. Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. We will
              notify you of any changes by posting the new policy on this page
              and updating the &quot;Last updated&quot; date.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              11. Contact Us
            </h2>
            <p>
              If you have questions about this Privacy Policy, please contact us
              at:
            </p>
            <p className="mt-2">
              Email: privacy@kingofautomation.com
              <br />
              Address: [Your Business Address]
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
