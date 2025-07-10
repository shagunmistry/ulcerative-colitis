import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | UC Guide",
  description: "Terms of service for UC Guide - understand the terms and conditions for using our ulcerative colitis resources and tools.",
  robots: "index, follow",
};

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">Terms of Service</h1>
          <p className="text-lg text-gray-600">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                By accessing and using UC Guide (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Description of Service</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                UC Guide provides educational information and tools related to ulcerative colitis management. Our services include:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Educational content about ulcerative colitis</li>
                <li>Self-management tools and trackers</li>
                <li>Resources for patients and caregivers</li>
                <li>Links to external resources and research</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Medical Disclaimer</h2>
            <div className="space-y-4 text-gray-600">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h3 className="font-semibold text-red-800 mb-2">Important Medical Information</h3>
                <p className="text-red-700">
                  UC Guide is for educational purposes only and is not intended to replace professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
                </p>
              </div>
              <p>
                The information provided on this website:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Is not a substitute for professional medical advice</li>
                <li>Should not be used for diagnosing or treating health problems</li>
                <li>May not be suitable for all individuals</li>
                <li>Should be discussed with your healthcare provider</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. User Responsibilities</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                By using our service, you agree to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Use the service only for lawful purposes</li>
                <li>Not attempt to gain unauthorized access to our systems</li>
                <li>Not distribute malware or engage in harmful activities</li>
                <li>Respect intellectual property rights</li>
                <li>Not share personal health information in public areas</li>
                <li>Consult with healthcare professionals for medical decisions</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Intellectual Property</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                The content, organization, graphics, design, and other matters related to UC Guide are protected under applicable copyrights and other proprietary laws. Copying, redistribution, or republication of any such content is strictly prohibited without written permission.
              </p>
              <p>
                You may:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>View and print content for personal, non-commercial use</li>
                <li>Share links to our content</li>
              </ul>
              <p>
                You may not:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Reproduce content for commercial purposes</li>
                <li>Modify or create derivative works</li>
                <li>Remove copyright notices</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. User-Generated Content</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                If you submit content to us (such as feedback or suggestions), you grant us a non-exclusive, royalty-free, perpetual license to use, modify, and distribute such content for the purpose of improving our services.
              </p>
              <p>
                You represent that any content you submit:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Does not violate any third-party rights</li>
                <li>Is accurate and not misleading</li>
                <li>Does not contain personal health information of others</li>
                <li>Complies with applicable laws</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Third-Party Links</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Our website may contain links to third-party websites. These links are provided for convenience only. We do not endorse or take responsibility for the content, privacy policies, or practices of third-party sites.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Privacy</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Your privacy is important to us. Please review our Privacy Policy, which also governs your use of our service, to understand our practices.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Disclaimers and Limitations</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                UC Guide is provided &quot;as is&quot; without any warranties, express or implied. We do not guarantee that:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>The service will be uninterrupted or error-free</li>
                <li>All information is current or accurate</li>
                <li>The service will meet your specific needs</li>
                <li>Any errors will be corrected</li>
              </ul>
              <p className="mt-4">
                To the fullest extent permitted by law, UC Guide shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of your use of our service.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Emergency Situations</h2>
            <div className="space-y-4 text-gray-600">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h3 className="font-semibold text-yellow-800 mb-2">Emergency Warning</h3>
                <p className="text-yellow-700">
                  UC Guide is not intended for use in emergency situations. If you are experiencing a medical emergency, immediately contact your local emergency services or go to the nearest emergency room.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Termination</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                We reserve the right to terminate or suspend your access to our service at any time, without notice, for conduct that we believe violates these Terms of Service or is harmful to other users or us.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Governing Law</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                These Terms of Service shall be governed by and construed in accordance with the laws of the United States, without regard to its conflict of law provisions.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Changes to Terms</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                We reserve the right to modify these terms at any time. Changes will be posted on this page with an updated &quot;Last updated&quot; date. Your continued use of the service after changes are posted constitutes acceptance of the new terms.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">14. Contact Information</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p><strong>Email:</strong> legal@ulcerative-colitis.vercel.app</p>
                <p><strong>Website:</strong> https://ulcerative-colitis.vercel.app</p>
              </div>
            </div>
          </section>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">Agreement</h3>
          <p className="text-blue-700">
            By using UC Guide, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
          </p>
        </div>
      </div>
    </div>
  );
}