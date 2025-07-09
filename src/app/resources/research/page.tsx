import { Metadata } from "next";

export const metadata: Metadata = {
  title: "UC Research - Latest Studies and Clinical Trials | UC Guide",
  description: "Stay updated with the latest ulcerative colitis research, clinical trials, and breakthrough treatments. Evidence-based information for UC patients and healthcare providers.",
  keywords: ["ulcerative colitis research", "UC clinical trials", "IBD studies", "colitis treatment research", "UC medications", "inflammatory bowel disease research"],
};

export default function ResearchPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">UC Research & Clinical Trials</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay informed about the latest research developments, clinical trials, and breakthrough treatments in ulcerative colitis care.
          </p>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <div className="flex items-start space-x-3">
            <div className="text-yellow-600">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-yellow-800">Medical Disclaimer</h3>
              <p className="text-yellow-700 mt-2">
                The research information provided here is for educational purposes only. Always consult with your healthcare provider before making any treatment decisions or participating in clinical trials.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Current Research Areas</h2>
              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="font-semibold text-gray-900">Biologics and Targeted Therapies</h3>
                  <p className="text-gray-600 text-sm mt-1">
                    Research on anti-TNF agents, IL-23 inhibitors, and JAK inhibitors for UC treatment.
                  </p>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <h3 className="font-semibold text-gray-900">Microbiome Studies</h3>
                  <p className="text-gray-600 text-sm mt-1">
                    Investigation of gut bacteria role in UC development and treatment response.
                  </p>
                </div>
                <div className="border-l-4 border-purple-500 pl-4">
                  <h3 className="font-semibold text-gray-900">Personalized Medicine</h3>
                  <p className="text-gray-600 text-sm mt-1">
                    Genetic testing and biomarkers to predict treatment response and disease progression.
                  </p>
                </div>
                <div className="border-l-4 border-orange-500 pl-4">
                  <h3 className="font-semibold text-gray-900">Novel Drug Delivery</h3>
                  <p className="text-gray-600 text-sm mt-1">
                    Colon-specific drug delivery systems and oral formulations of existing treatments.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Finding Clinical Trials</h2>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">ClinicalTrials.gov</h3>
                  <p className="text-gray-600 text-sm mb-2">
                    The official U.S. database of clinical studies
                  </p>
                  <a 
                    href="https://clinicaltrials.gov/search?cond=Ulcerative%20Colitis" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Search UC trials →
                  </a>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Crohn's & Colitis Foundation</h3>
                  <p className="text-gray-600 text-sm mb-2">
                    Clinical trial matching and resources
                  </p>
                  <a 
                    href="https://www.crohnscolitisfoundation.org/clinical-trials" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Find trials →
                  </a>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">IBD Clinical Trial Finder</h3>
                  <p className="text-gray-600 text-sm mb-2">
                    Specialized search for IBD clinical trials
                  </p>
                  <a 
                    href="https://www.ibdclinicaltrials.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Search trials →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Recent Research Highlights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">Vedolizumab Long-term Efficacy</h3>
                    <p className="text-sm text-gray-500">Published in Gastroenterology</p>
                  </div>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">2024</span>
                </div>
                <p className="text-gray-600 text-sm mt-2">
                  Long-term real-world data showing sustained efficacy and safety of vedolizumab in UC patients.
                </p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">Microbiome Restoration Therapy</h3>
                    <p className="text-sm text-gray-500">Published in Nature Medicine</p>
                  </div>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">2024</span>
                </div>
                <p className="text-gray-600 text-sm mt-2">
                  Fecal microbiota transplantation showing promising results in inducing and maintaining remission.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">JAK Inhibitor Efficacy</h3>
                    <p className="text-sm text-gray-500">Published in Lancet</p>
                  </div>
                  <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">2024</span>
                </div>
                <p className="text-gray-600 text-sm mt-2">
                  Clinical trial results showing effectiveness of tofacitinib in moderate to severe UC.
                </p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">Personalized Treatment Algorithms</h3>
                    <p className="text-sm text-gray-500">Published in Clinical Gastroenterology</p>
                  </div>
                  <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded">2024</span>
                </div>
                <p className="text-gray-600 text-sm mt-2">
                  AI-driven approaches to predict treatment response and optimize therapy selection.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Questions to Ask Your Doctor</h2>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-3">Before Considering a Clinical Trial:</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                What are the potential benefits and risks?
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                How does this compare to standard treatment options?
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                What are the time commitments and follow-up requirements?
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                Will I be able to continue my current medications?
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                What happens if the treatment doesn't work or causes side effects?
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">Stay Updated</h3>
          <p className="text-blue-700">
            Research in UC is rapidly evolving. Follow reputable medical organizations and journals for the latest developments, and always discuss new research findings with your healthcare team.
          </p>
        </div>
      </div>
    </div>
  );
}