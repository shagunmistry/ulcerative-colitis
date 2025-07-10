'use client';

import { motion } from 'motion/react';
import { useState } from 'react';

const commonMedications = [
  {
    category: 'Aminosalicylates',
    description: 'Anti-inflammatory medications for mild to moderate UC',
    medications: [
      { name: 'Mesalamine (Asacol, Pentasa)', dosage: '800mg-1.6g', frequency: '2-3 times daily' },
      { name: 'Sulfasalazine', dosage: '500mg-1g', frequency: '2-4 times daily' },
      { name: 'Balsalazide (Colazal)', dosage: '2.25g', frequency: '3 times daily' },
      { name: 'Olsalazine (Dipentum)', dosage: '500mg', frequency: '2 times daily' }
    ]
  },
  {
    category: 'Corticosteroids',
    description: 'Anti-inflammatory drugs for flares',
    medications: [
      { name: 'Prednisone', dosage: '20-40mg', frequency: 'Once daily, tapered' },
      { name: 'Budesonide', dosage: '9mg', frequency: 'Once daily' },
      { name: 'Hydrocortisone (rectal)', dosage: '100mg', frequency: '1-2 times daily' }
    ]
  },
  {
    category: 'Immunosuppressants',
    description: 'Medications that suppress immune system',
    medications: [
      { name: 'Azathioprine (Imuran)', dosage: '50-150mg', frequency: 'Once daily' },
      { name: 'Mercaptopurine (Purinethol)', dosage: '50-100mg', frequency: 'Once daily' },
      { name: 'Methotrexate', dosage: '15-25mg', frequency: 'Once weekly' }
    ]
  },
  {
    category: 'Biologics',
    description: 'Targeted therapy for moderate to severe UC',
    medications: [
      { name: 'Infliximab (Remicade)', dosage: '5-10mg/kg', frequency: 'Every 8 weeks (IV)' },
      { name: 'Adalimumab (Humira)', dosage: '40mg', frequency: 'Every 2 weeks (injection)' },
      { name: 'Vedolizumab (Entyvio)', dosage: '300mg', frequency: 'Every 8 weeks (IV)' },
      { name: 'Ustekinumab (Stelara)', dosage: '90mg', frequency: 'Every 8 weeks (injection)' }
    ]
  }
];

const sideEffects = [
  {
    category: 'Common Side Effects',
    effects: [
      { symptom: 'Nausea', severity: 'mild', medications: ['Mesalamine', 'Azathioprine'] },
      { symptom: 'Headache', severity: 'mild', medications: ['Mesalamine', 'Prednisone'] },
      { symptom: 'Fatigue', severity: 'mild', medications: ['Azathioprine', 'Methotrexate'] },
      { symptom: 'Loss of appetite', severity: 'mild', medications: ['Prednisone', 'Azathioprine'] }
    ]
  },
  {
    category: 'Serious Side Effects',
    effects: [
      { symptom: 'Increased infection risk', severity: 'serious', medications: ['Biologics', 'Immunosuppressants'] },
      { symptom: 'Liver problems', severity: 'serious', medications: ['Azathioprine', 'Methotrexate'] },
      { symptom: 'Bone loss', severity: 'serious', medications: ['Prednisone'] },
      { symptom: 'Kidney problems', severity: 'serious', medications: ['Aminosalicylates'] }
    ]
  }
];

const trackingFeatures = [
  {
    title: 'Medication Schedule',
    description: 'Set reminders for each medication',
    icon: '⏰',
    features: [
      'Daily, weekly, or custom schedules',
      'Push notifications for doses',
      'Flexible timing adjustments',
      'Snooze and reschedule options'
    ]
  },
  {
    title: 'Dosage Tracking',
    description: 'Monitor your medication intake',
    icon: '💊',
    features: [
      'Log each dose taken',
      'Track missed doses',
      'Dosage history and patterns',
      'Medication effectiveness notes'
    ]
  },
  {
    title: 'Side Effects Monitor',
    description: 'Record and track side effects',
    icon: '⚠️',
    features: [
      'Symptom severity tracking',
      'Side effect timing patterns',
      'Medication correlation analysis',
      'Healthcare provider reports'
    ]
  },
  {
    title: 'Refill Reminders',
    description: 'Never run out of medication',
    icon: '🔔',
    features: [
      'Automatic refill calculations',
      'Pharmacy contact information',
      'Insurance renewal reminders',
      'Prescription expiration alerts'
    ]
  }
];

const tips = [
  {
    title: 'Take as Prescribed',
    description: 'Follow your doctor\'s instructions exactly',
    icon: '👨‍⚕️',
    details: [
      'Don\'t skip doses without consulting your doctor',
      'Take at the same time each day',
      'Complete the full course even if feeling better',
      'Don\'t stop suddenly without medical guidance'
    ]
  },
  {
    title: 'Monitor Side Effects',
    description: 'Keep track of how medications affect you',
    icon: '📝',
    details: [
      'Note any new symptoms or changes',
      'Rate severity on a scale of 1-10',
      'Record timing of side effects',
      'Report concerning symptoms to your doctor'
    ]
  },
  {
    title: 'Medication Interactions',
    description: 'Be aware of drug interactions',
    icon: '⚠️',
    details: [
      'Tell all healthcare providers about UC medications',
      'Check with pharmacist before taking new medications',
      'Be cautious with over-the-counter drugs',
      'Consider supplement interactions'
    ]
  },
  {
    title: 'Storage and Safety',
    description: 'Proper medication storage and handling',
    icon: '🏠',
    details: [
      'Store medications as directed',
      'Keep in original containers',
      'Check expiration dates regularly',
      'Dispose of expired medications safely'
    ]
  }
];

export default function MedicationTrackerPage() {
  const [activeTab, setActiveTab] = useState('overview');
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
              Medication <span className="text-primary">Tracker</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg text-neutral-500 mb-8"
            >
              Keep track of your UC medications, dosages, side effects, and refill schedules. Stay organized and informed about your treatment.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {[
              { id: 'overview', label: 'UC Medications', icon: '💊' },
              { id: 'tracking', label: 'Tracking Features', icon: '📱' },
              { id: 'sideeffects', label: 'Side Effects', icon: '⚠️' },
              { id: 'tips', label: 'Tips', icon: '💡' }
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
          {activeTab === 'overview' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Common UC Medications
                </h2>
                <p className="text-lg text-neutral-500 max-w-2xl mx-auto">
                  Understanding your medications helps you take them correctly and recognize their effects.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Category Selector */}
                <div className="lg:col-span-1 space-y-4">
                  {commonMedications.map((category, index) => (
                    <button
                      key={category.category}
                      onClick={() => setSelectedCategory(index)}
                      className={`w-full p-4 rounded-lg text-left transition-all duration-200 ${
                        selectedCategory === index
                          ? 'bg-primary text-white shadow-lg'
                          : 'bg-white text-neutral-600 hover:bg-primary/10'
                      }`}
                    >
                      <h3 className="font-semibold mb-2">{category.category}</h3>
                      <p className="text-sm opacity-80">{category.description}</p>
                    </button>
                  ))}
                </div>

                {/* Medication Details */}
                <div className="lg:col-span-3">
                  <div className="card p-8">
                    <h3 className="text-2xl font-bold text-foreground mb-4">
                      {commonMedications[selectedCategory].category}
                    </h3>
                    <p className="text-neutral-500 mb-8">
                      {commonMedications[selectedCategory].description}
                    </p>

                    <div className="space-y-4">
                      {commonMedications[selectedCategory].medications.map((med, i) => (
                        <div key={i} className="bg-neutral-50 rounded-lg p-6">
                          <h4 className="font-semibold text-foreground mb-3">{med.name}</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <span className="text-sm text-neutral-500">Typical Dosage:</span>
                              <p className="font-medium text-primary">{med.dosage}</p>
                            </div>
                            <div>
                              <span className="text-sm text-neutral-500">Frequency:</span>
                              <p className="font-medium text-primary">{med.frequency}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'tracking' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Medication Tracking Features
                </h2>
                <p className="text-lg text-neutral-500 max-w-2xl mx-auto">
                  Our tracking system helps you stay on top of your medication regimen and monitor your health.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {trackingFeatures.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="card p-6"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <span className="text-2xl">{feature.icon}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-foreground mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-neutral-500 mb-4">{feature.description}</p>
                        <ul className="space-y-2">
                          {feature.features.map((item, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-primary text-sm mt-1">✓</span>
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

          {activeTab === 'sideeffects' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Medication Side Effects
                </h2>
                <p className="text-lg text-neutral-500 max-w-2xl mx-auto">
                  Understanding potential side effects helps you recognize when to contact your healthcare provider.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {sideEffects.map((category, index) => (
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
                      {category.effects.map((effect, i) => (
                        <div key={i} className="border-l-4 border-primary/20 pl-4 py-3">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-medium text-foreground">{effect.symptom}</h4>
                            <span className={`text-xs px-2 py-1 rounded ${
                              effect.severity === 'serious' 
                                ? 'bg-red-100 text-red-600' 
                                : 'bg-yellow-100 text-yellow-600'
                            }`}>
                              {effect.severity}
                            </span>
                          </div>
                          <p className="text-sm text-neutral-500">
                            Common with: {effect.medications.join(', ')}
                          </p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'tips' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Medication Management Tips
                </h2>
                <p className="text-lg text-neutral-500 max-w-2xl mx-auto">
                  Best practices for safely and effectively managing your UC medications.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {tips.map((tip, index) => (
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
                        <h3 className="text-xl font-semibold text-foreground mb-2">
                          {tip.title}
                        </h3>
                        <p className="text-neutral-500 mb-4">{tip.description}</p>
                        <ul className="space-y-2">
                          {tip.details.map((detail, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-primary text-sm mt-1">•</span>
                              <span className="text-sm text-neutral-600">{detail}</span>
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

      {/* Privacy Notice */}
      <section className="py-16 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl">🔒</span>
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Your Data is Private
            </h2>
            <p className="text-lg text-neutral-500 max-w-2xl mx-auto">
              All medication tracking data is stored locally on your device. We don&apos;t collect, store, or share any personal health information.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Medical Disclaimer */}
      <section className="py-8 bg-orange-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-orange-100 border border-orange-200 rounded-lg p-6">
            <div className="flex items-start gap-3">
              <span className="text-orange-600 text-xl">⚠️</span>
              <div>
                <h3 className="font-semibold text-orange-800 mb-2">Important Medical Disclaimer</h3>
                <p className="text-orange-700 text-sm">
                  This medication tracker is for informational purposes only and should not replace professional medical advice. 
                  Always consult with your healthcare provider before starting, stopping, or changing any medication. 
                  Report any concerning side effects to your doctor immediately.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}