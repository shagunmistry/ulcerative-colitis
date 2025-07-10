import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | UC Guide",
  description: "Privacy policy for UC Guide - learn how we collect, use, and protect your personal information when using our ulcerative colitis resources.",
  robots: "index, follow",
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">Privacy Policy</h1>
          <p className="text-lg text-gray-600">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Information We Collect</h2>
            <div className="space-y-4 text-gray-600">
              <h3 className="text-lg font-semibold text-gray-900">Information You Provide</h3>
              <p>
                We may collect information that you voluntarily provide when using our services, such as:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Contact information when you reach out to us</li>
                <li>Feedback and suggestions you submit</li>
                <li>Information you provide when using our tools (stored locally on your device)</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-900 mt-6">Automatically Collected Information</h3>
              <p>
                When you visit our website, we may automatically collect:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Browser type and version</li>
                <li>Operating system</li>
                <li>IP address (anonymized)</li>
                <li>Pages visited and time spent on our site</li>
                <li>Referring website information</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Your Information</h2>
            <div className="space-y-4 text-gray-600">
              <p>We use the information we collect to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Provide and improve our services</li>
                <li>Respond to your inquiries and support requests</li>
                <li>Analyze website usage to improve user experience</li>
                <li>Ensure website security and prevent fraud</li>
                <li>Comply with legal obligations</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Information Sharing</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                We do not sell, trade, or otherwise transfer your personal information to third parties except:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>With your explicit consent</li>
                <li>To trusted service providers who assist us in operating our website</li>
                <li>When required by law or to protect our rights</li>
                <li>In connection with a business transfer or merger</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Data Storage and Security</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                We implement appropriate security measures to protect your personal information:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>SSL encryption for data transmission</li>
                <li>Secure hosting infrastructure</li>
                <li>Regular security audits and updates</li>
                <li>Limited access to personal information</li>
              </ul>
              <p className="mt-4">
                Many of our tools store data locally on your device and do not transmit personal health information to our servers.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Cookies and Tracking</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                We use cookies and similar technologies to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Remember your preferences</li>
                <li>Analyze website traffic and usage patterns</li>
                <li>Improve website functionality</li>
              </ul>
              <p className="mt-4">
                You can control cookie settings through your browser preferences. Disabling cookies may affect some website functionality.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Third-Party Services</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Our website may contain links to third-party websites or services. We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Your Rights</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                You have the right to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Access the personal information we have about you</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your personal information</li>
                <li>Opt-out of certain communications</li>
                <li>Data portability where technically feasible</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Children&apos;s Privacy</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Our services are not intended for children under 13. We do not knowingly collect personal information from children under 13. If you believe we have collected information from a child under 13, please contact us immediately.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. International Users</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                If you are accessing our website from outside the United States, please be aware that your information may be transferred to, stored, and processed in the United States where our servers are located.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Changes to This Policy</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                We may update this privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page and updating the &quot;Last updated&quot; date.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Contact Us</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                If you have any questions about this privacy policy or our privacy practices, please contact us at:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p><strong>Email:</strong> privacy@ulcerative-colitis.vercel.app</p>
                <p><strong>Website:</strong> https://ulcerative-colitis.vercel.app</p>
              </div>
            </div>
          </section>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">Important Note</h3>
          <p className="text-blue-700">
            This privacy policy applies to information collected through our website and services. We are committed to protecting your privacy and being transparent about our data practices.
          </p>
        </div>
      </div>
    </div>
  );
}