import { Metadata } from 'next';
import { motion } from 'motion/react';
import { useState } from 'react';

export const metadata: Metadata = {
  title: "UC Flare Action Plan - Emergency Plan for UC Flares",
  description: "Create a personalized action plan for managing UC flares. Learn warning signs, action steps, medication protocols, and emergency contacts for effective flare management.",
  keywords: ["UC flare plan", "ulcerative colitis flare", "UC emergency plan", "UC flare management", "UC warning signs", "UC action plan", "UC flare protocol", "UC emergency"],
  openGraph: {
    title: "UC Flare Action Plan - Emergency Plan for UC Flares - UC Guide",
    description: "Create a personalized action plan for managing UC flares. Learn warning signs, action steps, medication protocols, and emergency contacts.",
  },
  twitter: {
    title: "UC Flare Action Plan - Emergency Plan for UC Flares - UC Guide",
    description: "Create a personalized action plan for managing UC flares. Learn warning signs, action steps, medication protocols, and emergency contacts.",
  },
};

'use client';

const warningSignsData = [
  {
    category: 'Digestive Symptoms',
    icon: '🤢',
    color: 'from-red-500 to-red-600',
    symptoms: [
      'Increased bowel movement frequency (>6 per day)',
      'Blood in stool or rectal bleeding',
      'Severe abdominal pain or cramping',
      'Urgent need to have bowel movements',
      'Mucus in stool',
      'Inability to have bowel movements despite urgency'
    ]
  },
  {
    category: 'Systemic Symptoms',
    icon: '🌡️',
    color: 'from-orange-500 to-orange-600',
    symptoms: [
      'Fever over 100.4°F (38°C)',
      'Severe fatigue or weakness',
      'Loss of appetite',
      'Unintended weight loss',
      'Dehydration signs (dizziness, dry mouth)',
      'Nausea or vomiting'
    ]
  },
  {
    category: 'Emergency Signs',
    icon: '🚨',
    color: 'from-red-600 to-red-700',
    symptoms: [
      'Severe abdominal pain with rigidity',
      'High fever with chills',
      'Signs of severe dehydration',
      'Rapid heart rate or chest pain',
      'Confusion or altered mental state',
      'Inability to keep fluids down'
    ]
  }
];

const actionSteps = [
  {
    phase: 'Early Warning Signs',
    timeline: 'First 24-48 hours',
    color: 'from-yellow-500 to-yellow-600',
    steps: [
      'Start symptom tracking immediately',
      'Increase fluid intake (water, electrolytes)',
      'Begin low-residue diet',
      'Contact healthcare provider',
      'Review current medications',
      'Cancel non-essential activities'
    ]
  },
  {
    phase: 'Active Flare Management',
    timeline: '48 hours - 1 week',
    color: 'from-orange-500 to-orange-600',
    steps: [
      'Follow prescribed flare medication protocol',
      'Strict dietary modifications',
      'Stay hydrated with clear fluids',
      'Monitor symptoms closely',
      'Communicate with healthcare team',
      'Arrange work/school accommodations'
    ]
  },
  {
    phase: 'Severe Flare Protocol',
    timeline: 'When symptoms worsen',
    color: 'from-red-500 to-red-600',
    steps: [
      'Seek immediate medical attention',
      'Consider emergency room visit',
      'Bring medication list and symptom log',
      'Contact emergency contacts',
      'Follow hospitalization protocol if needed',
      'Activate support network'
    ]
  }
];

const medicationProtocol = [
  {
    title: 'Maintenance Medications',
    description: 'Continue unless advised otherwise',
    medications: [
      { name: 'Mesalamine', action: 'Continue current dose', timing: 'As prescribed' },
      { name: 'Immunosuppressants', action: 'Do not stop without doctor advice', timing: 'As prescribed' },
      { name: 'Biologics', action: 'Maintain schedule', timing: 'As prescribed' }
    ]
  },
  {
    title: 'Flare Medications',
    description: 'Use as prescribed by your doctor',
    medications: [
      { name: 'Prednisone', action: 'Start taper as prescribed', timing: 'Usually morning' },
      { name: 'Rectal medications', action: 'Use nightly or as directed', timing: 'Before bed' },
      { name: 'Antidiarrheal', action: 'Use sparingly, only if approved', timing: 'As needed' }
    ]
  },
  {
    title: 'Supportive Care',
    description: 'Additional comfort measures',
    medications: [
      { name: 'Probiotics', action: 'May help maintain gut health', timing: 'With meals' },
      { name: 'Electrolyte solutions', action: 'Prevent dehydration', timing: 'Throughout day' },
      { name: 'Pain relief', action: 'Use acetaminophen if needed', timing: 'As needed' }
    ]
  }
];

const contactInfo = [
  {
    category: 'Primary Healthcare Team',
    contacts: [
      { role: 'Gastroenterologist', name: 'Dr. [Name]', phone: '(___) ___-____', notes: 'Primary UC specialist' },
      { role: 'Primary Care Physician', name: 'Dr. [Name]', phone: '(___) ___-____', notes: 'General healthcare' },
      { role: 'Nurse Coordinator', name: '[Name]', phone: '(___) ___-____', notes: 'IBD team contact' }
    ]
  },
  {
    category: 'Emergency Contacts',
    contacts: [
      { role: 'Emergency Room', name: '[Hospital Name]', phone: '(___) ___-____', notes: 'Nearest UC-familiar ER' },
      { role: 'After-hours clinic', name: '[Clinic Name]', phone: '(___) ___-____', notes: 'Urgent care option' },
      { role: 'Pharmacy', name: '[Pharmacy Name]', phone: '(___) ___-____', notes: 'Medication questions' }
    ]
  },
  {
    category: 'Personal Support',
    contacts: [
      { role: 'Family Member', name: '[Name]', phone: '(___) ___-____', notes: 'Emergency contact' },
      { role: 'Friend/Caregiver', name: '[Name]', phone: '(___) ___-____', notes: 'Support person' },
      { role: 'Work/School Contact', name: '[Name]', phone: '(___) ___-____', notes: 'Accommodation needs' }
    ]
  }
];

const planningTips = [
  {
    title: 'Prepare in Advance',
    icon: '📋',
    tips: [
      'Keep a flare kit with essentials ready',
      'Pre-fill emergency contact cards',
      'Maintain updated medication list',
      'Know your insurance coverage details'
    ]
  },
  {
    title: 'Communication Strategy',
    icon: '📞',
    tips: [
      'Establish clear communication plan with healthcare team',
      'Set up emergency contact system',
      'Prepare scripts for calling in sick',
      'Create care instruction sheet for family'
    ]
  },
  {
    title: 'Work/School Preparedness',
    icon: '🏢',
    tips: [
      'Discuss accommodations with supervisor/teachers',
      'Know your rights under disability laws',
      'Prepare documentation for absences',
      'Identify bathroom locations and access'
    ]
  },
  {
    title: 'Emotional Support',
    icon: '💙',
    tips: [
      'Connect with UC support groups',
      'Consider counseling for chronic illness',
      'Practice stress management techniques',
      'Maintain social connections and hobbies'
    ]
  }
];

export default function FlarePlanPage() {
  const [activeTab, setActiveTab] = useState('warning');
  const [selectedCategory, setSelectedCategory] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-white">
      {/* Hero Section */}
      <section className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl font-bold text-foreground mb-6"
            >
              Flare Action <span className="text-primary">Plan</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg text-neutral-500 mb-8"
            >
              Create a personalized action plan for managing UC flares. Be prepared with clear steps, emergency contacts, and medication protocols.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {[
              { id: 'warning', label: 'Warning Signs', icon: '⚠️' },
              { id: 'actions', label: 'Action Steps', icon: '🎯' },
              { id: 'medications', label: 'Medication Protocol', icon: '💊' },
              { id: 'contacts', label: 'Emergency Contacts', icon: '📞' },
              { id: 'planning', label: 'Planning Tips', icon: '📋' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-primary text-white shadow-lg'
                    : 'bg-white text-neutral-600 hover:bg-primary/10'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {activeTab === 'warning' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Recognize Warning Signs
                </h2>
                <p className="text-lg text-neutral-500 max-w-2xl mx-auto">
                  Early recognition of flare symptoms allows for prompt treatment and better outcomes.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {warningSignsData.map((category, index) => (
                  <motion.div
                    key={category.category}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="card p-6"
                  >
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-6`}>
                      <span className="text-3xl text-white">{category.icon}</span>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-foreground mb-4">
                      {category.category}
                    </h3>
                    
                    <ul className="space-y-3">
                      {category.symptoms.map((symptom, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className={`w-2 h-2 rounded-full mt-2 ${
                            category.category === 'Emergency Signs' ? 'bg-red-500' : 'bg-orange-400'
                          }`}></span>
                          <span className="text-sm text-neutral-600">{symptom}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'actions' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Action Steps by Phase
                </h2>
                <p className="text-lg text-neutral-500 max-w-2xl mx-auto">
                  Follow these structured steps based on the severity and timing of your flare.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {actionSteps.map((phase, index) => (
                  <motion.div
                    key={phase.phase}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="card p-6"
                  >
                    <div className={`w-full h-2 rounded-full bg-gradient-to-r ${phase.color} mb-6`}></div>
                    
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {phase.phase}
                    </h3>
                    
                    <p className="text-neutral-500 mb-6">{phase.timeline}</p>
                    
                    <ol className="space-y-3">
                      {phase.steps.map((step, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="text-primary font-medium text-sm min-w-[20px]">{i + 1}.</span>
                          <span className="text-sm text-neutral-600">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'medications' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Medication Protocol
                </h2>
                <p className="text-lg text-neutral-500 max-w-2xl mx-auto">
                  Your personalized medication plan for managing flares. Always follow your doctor's specific instructions.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {medicationProtocol.map((category, index) => (
                  <motion.div
                    key={category.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="card p-6"
                  >
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {category.title}
                    </h3>
                    
                    <p className="text-neutral-500 mb-6">{category.description}</p>
                    
                    <div className="space-y-4">
                      {category.medications.map((med, i) => (
                        <div key={i} className="bg-neutral-50 rounded-lg p-4">
                          <h4 className="font-medium text-foreground mb-2">{med.name}</h4>
                          <p className="text-sm text-neutral-600 mb-1">{med.action}</p>
                          <p className="text-xs text-neutral-500">Timing: {med.timing}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'contacts' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Emergency Contacts
                </h2>
                <p className="text-lg text-neutral-500 max-w-2xl mx-auto">
                  Keep these important contact numbers easily accessible during a flare.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {contactInfo.map((category, index) => (
                  <motion.div
                    key={category.category}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="card p-6"
                  >
                    <h3 className="text-xl font-semibold text-foreground mb-6">
                      {category.category}
                    </h3>
                    
                    <div className="space-y-4">
                      {category.contacts.map((contact, i) => (
                        <div key={i} className="border-l-4 border-primary/20 pl-4">
                          <div className="flex justify-between items-start mb-1">
                            <h4 className="font-medium text-foreground">{contact.role}</h4>
                          </div>
                          <p className="text-sm text-neutral-600 mb-1">{contact.name}</p>
                          <p className="text-sm font-medium text-primary mb-1">{contact.phone}</p>
                          <p className="text-xs text-neutral-500">{contact.notes}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'planning' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Planning Tips
                </h2>
                <p className="text-lg text-neutral-500 max-w-2xl mx-auto">
                  Prepare for potential flares with these proactive planning strategies.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {planningTips.map((tip, index) => (
                  <motion.div
                    key={tip.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="card p-6"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <span className="text-2xl">{tip.icon}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-foreground mb-4">
                          {tip.title}
                        </h3>
                        <ul className="space-y-2">
                          {tip.tips.map((item, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-primary text-sm mt-1">•</span>
                              <span className="text-sm text-neutral-600">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Flare Kit Section */}
      <section className="py-16 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Flare Emergency Kit
            </h2>
            <p className="text-lg text-neutral-500">
              Keep these items readily available for quick access during a flare.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="card p-6"
            >
              <h3 className="text-xl font-semibold text-foreground mb-4">
                Medical Supplies
              </h3>
              <ul className="space-y-3">
                {[
                  'Current medication list',
                  'Flare medications (if prescribed)',
                  'Thermometer',
                  'Electrolyte solutions',
                  'Heating pad',
                  'Emergency contact cards'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className="text-primary">✓</span>
                    <span className="text-neutral-600">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="card p-6"
            >
              <h3 className="text-xl font-semibold text-foreground mb-4">
                Comfort Items
              </h3>
              <ul className="space-y-3">
                {[
                  'Soft tissues or wipes',
                  'Comfortable clothing',
                  'Bland food items (crackers, rice)',
                  'Herbal teas',
                  'Entertainment (books, tablets)',
                  'Stress relief items'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className="text-primary">✓</span>
                    <span className="text-neutral-600">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Medical Disclaimer */}
      <section className="py-8 bg-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-blue-100 border border-blue-200 rounded-lg p-6">
            <div className="flex items-start gap-3">
              <span className="text-blue-600 text-xl">ℹ️</span>
              <div>
                <h3 className="font-semibold text-blue-800 mb-2">Medical Disclaimer</h3>
                <p className="text-blue-700 text-sm">
                  This flare action plan is a general template and should be customized with your healthcare provider. 
                  Always follow your doctor's specific instructions and seek immediate medical attention for severe symptoms. 
                  This information is not intended to replace professional medical advice.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}