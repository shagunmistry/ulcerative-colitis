import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Medical Disclaimer | UC Guide",
  description: "Important medical disclaimer for UC Guide - understand the limitations and proper use of our ulcerative colitis information and tools.",
  robots: "index, follow",
};

export default function DisclaimerPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">Medical Disclaimer</h1>
          <p className="text-lg text-gray-600">
            Important information about the use of UC Guide
          </p>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <div className="flex items-start space-x-3">
            <div className="text-red-600">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-red-800">Critical Warning</h3>
              <p className="text-red-700 mt-2">
                The information provided on UC Guide is for educational purposes only and should never replace professional medical advice, diagnosis, or treatment. Always consult with qualified healthcare providers for medical decisions.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Not Medical Advice</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                UC Guide provides general information about ulcerative colitis for educational purposes only. This information:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Is not medical advice</strong> - It should not be used to diagnose, treat, cure, or prevent any disease</li>
                <li><strong>Is not personalized</strong> - It may not be suitable for your specific medical condition</li>
                <li><strong>Is not comprehensive</strong> - It may not cover all aspects of ulcerative colitis</li>
                <li><strong>May not be current</strong> - Medical information changes rapidly</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Consult Healthcare Professionals</h2>
            <div className="space-y-4 text-gray-600">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-800 mb-2">Always Consult Your Doctor</h3>
                <p className="text-blue-700">
                  Before making any changes to your treatment plan, starting new medications, or making significant lifestyle changes, always consult with your healthcare provider.
                </p>
              </div>
              <p>
                You should consult with qualified healthcare professionals for:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Diagnosis of medical conditions</li>
                <li>Treatment recommendations</li>
                <li>Medication changes or adjustments</li>
                <li>Interpretation of symptoms</li>
                <li>Emergency medical situations</li>
                <li>Personalized medical advice</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Emergency Situations</h2>
            <div className="space-y-4 text-gray-600">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h3 className="font-semibold text-yellow-800 mb-2">Medical Emergencies</h3>
                <p className="text-yellow-700">
                  If you are experiencing a medical emergency, do not rely on this website. Immediately contact emergency services (911 in the US) or go to the nearest emergency room.
                </p>
              </div>
              <p>
                Seek immediate medical attention if you experience:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Severe abdominal pain</li>
                <li>Signs of severe dehydration</li>
                <li>High fever (over 101°F/38.3°C)</li>
                <li>Severe bleeding</li>
                <li>Signs of infection or sepsis</li>
                <li>Sudden worsening of symptoms</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Individual Variation</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Ulcerative colitis affects each person differently. What works for one person may not work for another. Factors that can affect your condition include:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Severity and extent of disease</li>
                <li>Individual medical history</li>
                <li>Current medications</li>
                <li>Other health conditions</li>
                <li>Age and overall health status</li>
                <li>Genetic factors</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Information Sources</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                While we strive to provide accurate and up-to-date information, we cannot guarantee:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>The completeness of all information</li>
                <li>The accuracy of all content</li>
                <li>That information reflects the most current research</li>
                <li>That all sources are error-free</li>
              </ul>
              <p className="mt-4">
                Medical knowledge evolves constantly. Always verify information with current medical literature and healthcare professionals.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Self-Management Tools</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Our tracking tools and resources are designed to help you organize information for discussions with your healthcare provider. They are not intended to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Replace professional medical monitoring</li>
                <li>Provide diagnostic capabilities</li>
                <li>Recommend treatment changes</li>
                <li>Substitute for medical appointments</li>
              </ul>
              <p className="mt-4">
                Always share information from our tools with your healthcare provider for proper interpretation and action.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Third-Party Information</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Our website may contain links to or information from third-party sources. We do not:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Endorse all third-party content</li>
                <li>Guarantee the accuracy of external sources</li>
                <li>Control the content of linked websites</li>
                <li>Take responsibility for third-party information</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Medication Information</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Information about medications provided on this site:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Is for educational purposes only</li>
                <li>Should not replace medication instructions from your doctor</li>
                <li>May not include all possible side effects or interactions</li>
                <li>Should be verified with your pharmacist or healthcare provider</li>
              </ul>
              <p className="mt-4">
                Never start, stop, or change medications without consulting your healthcare provider.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Limitations of Liability</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                UC Guide and its creators are not liable for:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Consequences of using or misusing the information provided</li>
                <li>Delays in seeking appropriate medical care</li>
                <li>Decisions made based on website content</li>
                <li>Outcomes of treatment decisions</li>
                <li>Technical issues or data loss</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Your Responsibility</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                By using UC Guide, you acknowledge that:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>You understand this disclaimer</li>
                <li>You will not use the site as a substitute for medical care</li>
                <li>You will consult healthcare professionals for medical decisions</li>
                <li>You are responsible for your own health decisions</li>
                <li>You understand the limitations of the information provided</li>
              </ul>
            </div>
          </section>
        </div>

        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Remember</h3>
          <p className="text-gray-700">
            UC Guide is a resource to help you learn about ulcerative colitis and organize information for discussions with your healthcare team. It should complement, not replace, professional medical care. When in doubt, always consult with qualified healthcare professionals.
          </p>
        </div>
      </div>
    </div>
  );
}