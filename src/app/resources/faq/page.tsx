import { Metadata } from "next";

export const metadata: Metadata = {
  title: "UC FAQ - Frequently Asked Questions | UC Guide",
  description: "Find answers to common questions about ulcerative colitis, including symptoms, treatments, diet, and lifestyle management. Expert-reviewed UC information.",
  keywords: ["ulcerative colitis FAQ", "UC questions", "colitis answers", "IBD FAQ", "UC symptoms", "UC treatment", "UC diet"],
};

export default function FAQPage() {
  const faqCategories = [
    {
      title: "Understanding UC",
      questions: [
        {
          question: "What is ulcerative colitis?",
          answer: "Ulcerative colitis (UC) is a chronic inflammatory bowel disease that causes inflammation and ulcers in the lining of the colon and rectum. It's one of the two main forms of inflammatory bowel disease (IBD), along with Crohn's disease."
        },
        {
          question: "What causes ulcerative colitis?",
          answer: "The exact cause is unknown, but it's believed to result from a combination of factors including genetics, immune system dysfunction, environmental triggers, and possibly gut bacteria imbalances. It's not caused by stress or diet, though these can trigger symptoms."
        },
        {
          question: "Is UC hereditary?",
          answer: "There is a genetic component to UC. Having a family member with IBD increases your risk, but most people with UC don't have a family history of the condition. Multiple genes are involved, making it a complex genetic condition."
        },
        {
          question: "Can UC be cured?",
          answer: "Currently, there is no cure for UC. However, the condition can be effectively managed with medications, lifestyle changes, and sometimes surgery. Many people with UC live normal, productive lives with proper treatment."
        }
      ]
    },
    {
      title: "Symptoms & Diagnosis",
      questions: [
        {
          question: "What are the main symptoms of UC?",
          answer: "Common symptoms include bloody diarrhea, abdominal pain and cramping, urgency to have bowel movements, fatigue, weight loss, and sometimes fever. Symptoms can range from mild to severe and may come and go."
        },
        {
          question: "How is UC diagnosed?",
          answer: "Diagnosis typically involves a combination of medical history, physical exam, blood tests, stool samples, and colonoscopy with biopsy. Your doctor may also order imaging studies like CT scans or MRI."
        },
        {
          question: "What's the difference between UC and Crohn's disease?",
          answer: "UC affects only the colon and rectum in a continuous pattern, while Crohn's can affect any part of the digestive tract in patches. UC inflammation is limited to the inner lining, while Crohn's can affect all layers of the bowel wall."
        },
        {
          question: "Can UC symptoms come and go?",
          answer: "Yes, UC typically follows a pattern of flares (active symptoms) and remission (few or no symptoms). The goal of treatment is to induce and maintain remission for as long as possible."
        }
      ]
    },
    {
      title: "Treatment & Medications",
      questions: [
        {
          question: "What medications are used to treat UC?",
          answer: "Common medications include 5-ASA drugs (mesalamine), corticosteroids, immunosuppressants (azathioprine, methotrexate), and biologics (infliximab, adalimumab, vedolizumab). The choice depends on disease severity and location."
        },
        {
          question: "Do I need to take medication forever?",
          answer: "Most people with UC need long-term medication to maintain remission and prevent flares. Stopping medication during remission often leads to symptom return. Always discuss medication changes with your doctor."
        },
        {
          question: "What are biologics and when are they used?",
          answer: "Biologics are advanced medications that target specific parts of the immune system. They're typically used for moderate to severe UC when other treatments haven't worked effectively. Examples include anti-TNF drugs and integrin inhibitors."
        },
        {
          question: "When is surgery needed for UC?",
          answer: "Surgery may be considered for severe UC that doesn't respond to medication, complications like perforation or severe bleeding, or increased cancer risk. The most common surgery is colectomy (colon removal) with creation of an internal pouch."
        }
      ]
    },
    {
      title: "Diet & Lifestyle",
      questions: [
        {
          question: "Is there a specific diet for UC?",
          answer: "There's no one-size-fits-all UC diet, but many people find that avoiding trigger foods during flares helps. Common triggers include high-fiber foods, dairy, spicy foods, and alcohol. A low-residue diet may help during flares."
        },
        {
          question: "Can I drink alcohol with UC?",
          answer: "Alcohol can irritate the digestive tract and may trigger symptoms in some people. It can also interact with certain UC medications. Discuss alcohol consumption with your doctor, especially if you're taking medication."
        },
        {
          question: "Should I take probiotics?",
          answer: "Some studies suggest certain probiotics may help with UC symptoms, but evidence is limited. Always consult your doctor before starting probiotics, as they may not be appropriate for everyone, especially those with severe immune suppression."
        },
        {
          question: "Can stress cause UC flares?",
          answer: "While stress doesn't cause UC, it can trigger flares in some people. Managing stress through relaxation techniques, exercise, counseling, or support groups may help reduce flare frequency and severity."
        }
      ]
    },
    {
      title: "Living with UC",
      questions: [
        {
          question: "Can I live a normal life with UC?",
          answer: "Yes, many people with UC live full, active lives. With proper treatment and management, you can work, travel, exercise, and maintain relationships. It may require some planning and adjustments, but UC doesn't have to limit your life significantly."
        },
        {
          question: "Can I exercise with UC?",
          answer: "Regular exercise is generally beneficial for people with UC. It can help reduce inflammation, improve mood, and maintain bone health. Choose low-impact activities during flares and stay hydrated. Always consult your doctor before starting a new exercise program."
        },
        {
          question: "How does UC affect pregnancy?",
          answer: "Most women with UC can have successful pregnancies. It's important to achieve remission before conceiving and work closely with both your gastroenterologist and obstetrician. Some medications may need adjustment during pregnancy."
        },
        {
          question: "Am I at higher risk for colon cancer?",
          answer: "People with UC have an increased risk of colon cancer, especially with extensive disease or long disease duration. Regular colonoscopy screening is crucial for early detection. The risk can be reduced with proper treatment and monitoring."
        }
      ]
    },
    {
      title: "Emergency Situations",
      questions: [
        {
          question: "When should I seek emergency care?",
          answer: "Seek immediate medical attention for severe abdominal pain, signs of dehydration, fever over 101°F (38.3°C), severe bleeding, or if you're having more than 10 bowel movements per day. These could indicate a serious complication."
        },
        {
          question: "What is toxic megacolon?",
          answer: "Toxic megacolon is a rare but serious complication where the colon becomes severely dilated and inflamed. Symptoms include severe abdominal pain, distention, fever, and rapid heart rate. It requires immediate emergency treatment."
        },
        {
          question: "Can UC cause perforation?",
          answer: "Perforation (a hole in the colon wall) is a rare but serious complication of severe UC. Signs include sudden severe abdominal pain, rigid abdomen, and signs of infection. This is a medical emergency requiring immediate surgery."
        }
      ]
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find answers to common questions about ulcerative colitis, from understanding the condition to managing daily life.
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-start space-x-3">
            <div className="text-blue-600">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-800">Important Note</h3>
              <p className="text-blue-700 mt-2">
                This FAQ provides general information about UC. Always consult with your healthcare provider for personalized medical advice and treatment decisions.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {faqCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900">{category.title}</h2>
              </div>
              <div className="divide-y divide-gray-200">
                {category.questions.map((faq, index) => (
                  <div key={index} className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      {faq.question}
                    </h3>
                    <div className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gray-50 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Still Have Questions?</h2>
          <div className="space-y-4">
            <p className="text-gray-600">
              If you can't find the answer to your question here, consider these resources:
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span><strong>Your healthcare team:</strong> Always the best source for personalized medical advice</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span><strong>Crohn's & Colitis Foundation:</strong> Comprehensive patient education resources</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span><strong>Support groups:</strong> Connect with others who understand your experience</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span><strong>Patient advocacy organizations:</strong> Additional resources and support</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-yellow-800 mb-2">Emergency Situations</h3>
          <p className="text-yellow-700">
            If you're experiencing severe symptoms such as intense abdominal pain, high fever, severe bleeding, or signs of dehydration, seek immediate medical attention. Don't wait to contact your healthcare provider.
          </p>
        </div>
      </div>
    </div>
  );
}