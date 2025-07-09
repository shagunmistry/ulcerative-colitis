'use client';

import { motion } from 'motion/react';
import Link from 'next/link';

const emergencySignsAndSymptoms = [
  {
    category: 'Severe Symptoms',
    color: 'bg-red-500',
    symptoms: [
      'Severe abdominal pain that doesn\'t improve with rest',
      'High fever (over 101°F/38.3°C)',
      'Rapid heart rate (over 100 beats per minute)',
      'Signs of severe dehydration (dizziness, dry mouth, little to no urination)',
      'Persistent vomiting or inability to keep fluids down',
      'Signs of severe bleeding (black, tarry stools or bright red blood)',
      'Severe weakness or fainting',
      'Rigid or board-like abdominal wall'
    ]
  },
  {
    category: 'Moderate Symptoms',
    color: 'bg-orange-500',
    symptoms: [
      'Moderate to severe abdominal cramping',
      'Increased frequency of bloody stools (more than 6 per day)',
      'Moderate dehydration symptoms',
      'Persistent nausea without vomiting',
      'New or worsening joint pain',
      'Skin rashes or eye problems',
      'Moderate fever (100-101°F/37.8-38.3°C)',
      'Significant changes in bowel movements'
    ]
  }
];

const emergencyActions = [
  {
    title: 'Call 911 Immediately If:',
    items: [
      'Severe abdominal pain with fever',
      'Signs of shock (rapid pulse, low blood pressure, confusion)',
      'Severe dehydration',
      'Continuous vomiting',
      'Signs of severe bleeding',
      'Difficulty breathing',
      'Loss of consciousness'
    ],
    urgent: true
  },
  {
    title: 'Contact Your Doctor Urgently If:',
    items: [
      'Moderate symptoms persist or worsen',
      'New symptoms develop',
      'Medication side effects',
      'Unable to manage symptoms at home',
      'Concerns about your condition',
      'Questions about treatment changes'
    ],
    urgent: false
  }
];

const emergencyPreparation = [
  {
    title: 'Medical Information to Bring',
    icon: '📋',
    items: [
      'Current medication list with dosages',
      'Recent test results and lab work',
      'List of allergies and adverse reactions',
      'Emergency contact information',
      'Insurance cards and identification',
      'Recent symptom diary or tracking data',
      'List of previous hospitalizations',
      'Your gastroenterologist\'s contact information'
    ]
  },
  {
    title: 'Questions to Ask Medical Staff',
    icon: '❓',
    items: [
      'What is causing my symptoms?',
      'What tests do I need?',
      'What are my treatment options?',
      'How long will recovery take?',
      'When should I follow up?',
      'Are there any activity restrictions?',
      'What symptoms should I watch for?',
      'When can I resume my normal medications?'
    ]
  }
];

const emergencyContacts = [
  {
    service: 'Emergency Services',
    number: '911',
    description: 'For life-threatening emergencies',
    color: 'bg-red-600'
  },
  {
    service: 'Poison Control',
    number: '1-800-222-1222',
    description: 'For medication overdoses or poisoning',
    color: 'bg-orange-600'
  },
  {
    service: 'Crisis Text Line',
    number: 'Text HOME to 741741',
    description: 'For mental health support',
    color: 'bg-blue-600'
  }
];

const hospitalBagEssentials = [
  {
    category: 'Personal Items',
    items: [
      'Comfortable, loose-fitting clothing',
      'Toiletries and personal hygiene items',
      'Phone charger and entertainment',
      'Comfort items (pillow, blanket)',
      'Slippers or comfortable shoes',
      'Glasses or contacts if needed'
    ]
  },
  {
    category: 'Medical Items',
    items: [
      'Current medication bottles',
      'Insurance cards and ID',
      'Medical records and test results',
      'List of emergency contacts',
      'Advance directives if applicable',
      'Recent symptom diary'
    ]
  }
];

export default function EmergencyContent() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
      {/* Hero Section */}
      <section className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <span className="text-3xl">🚨</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl font-bold text-foreground mb-6"
            >
              Emergency <span className="text-red-600">Resources</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg text-neutral-600 mb-8"
            >
              Critical information for UC-related emergencies. Know when to seek immediate care and how to prepare.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-red-100 border border-red-200 rounded-lg p-6"
            >
              <div className="flex items-start gap-3">
                <span className="text-red-600 text-xl">⚠️</span>
                <div className="text-left">
                  <h3 className="font-semibold text-red-800 mb-2">Emergency Disclaimer</h3>
                  <p className="text-red-700">
                    This page is for informational purposes only. In a medical emergency, call 911 immediately. 
                    This information should not replace professional medical advice or emergency care.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Emergency Signs and Symptoms */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">
              When to Seek Emergency Care
            </h2>
            <p className="text-lg text-neutral-500">
              Recognize these warning signs that require immediate medical attention
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {emergencySignsAndSymptoms.map((category, index) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card p-6"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-4 h-4 rounded-full ${category.color}`}></div>
                  <h3 className="text-xl font-semibold text-foreground">
                    {category.category}
                  </h3>
                </div>
                
                <ul className="space-y-3">
                  {category.symptoms.map((symptom, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-red-500 mt-1">•</span>
                      <span className="text-neutral-600">{symptom}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Actions */}
      <section className="py-16 bg-gradient-to-r from-red-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Emergency Action Plan
            </h2>
            <p className="text-lg text-neutral-500">
              Know what to do and when to act
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {emergencyActions.map((action, index) => (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`card p-6 ${action.urgent ? 'border-l-4 border-red-500' : 'border-l-4 border-orange-500'}`}
              >
                <h3 className={`text-xl font-semibold mb-4 ${action.urgent ? 'text-red-600' : 'text-orange-600'}`}>
                  {action.title}
                </h3>
                
                <ul className="space-y-3">
                  {action.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className={`mt-1 ${action.urgent ? 'text-red-500' : 'text-orange-500'}`}>•</span>
                      <span className="text-neutral-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Contacts */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Emergency Contacts
            </h2>
            <p className="text-lg text-neutral-500">
              Important numbers to have readily available
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {emergencyContacts.map((contact, index) => (
              <motion.div
                key={contact.service}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card p-6 text-center"
              >
                <div className={`w-16 h-16 ${contact.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <span className="text-white text-2xl">📞</span>
                </div>
                
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {contact.service}
                </h3>
                
                <div className="text-2xl font-bold text-primary mb-2">
                  {contact.number}
                </div>
                
                <p className="text-sm text-neutral-600">
                  {contact.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Preparation */}
      <section className="py-16 bg-gradient-to-r from-neutral-50 to-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Emergency Preparation
            </h2>
            <p className="text-lg text-neutral-500">
              Be prepared for emergency situations
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {emergencyPreparation.map((prep, index) => (
              <motion.div
                key={prep.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card p-6"
              >
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl">{prep.icon}</span>
                  <h3 className="text-xl font-semibold text-foreground">
                    {prep.title}
                  </h3>
                </div>
                
                <ul className="space-y-3">
                  {prep.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-blue-500 mt-1">✓</span>
                      <span className="text-neutral-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Hospital Bag Essentials */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Hospital Bag Essentials
            </h2>
            <p className="text-lg text-neutral-500">
              Items to pack for a potential hospital stay
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {hospitalBagEssentials.map((category, index) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card p-6"
              >
                <h3 className="text-xl font-semibold text-foreground mb-6">
                  {category.category}
                </h3>
                
                <div className="grid grid-cols-1 gap-3">
                  {category.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <input 
                        type="checkbox" 
                        className="w-4 h-4 text-primary rounded border-gray-300"
                        id={`${category.category}-${i}`}
                      />
                      <label 
                        htmlFor={`${category.category}-${i}`}
                        className="text-neutral-600 cursor-pointer"
                      >
                        {item}
                      </label>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Plan Template */}
      <section className="py-16 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Personal Emergency Plan
            </h2>
            <p className="text-lg text-neutral-500">
              Create your personalized emergency action plan
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="card p-8"
          >
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  My Healthcare Team
                </h3>
                <div className="space-y-2 text-sm">
                  <p><strong>Primary Gastroenterologist:</strong> _______________________________</p>
                  <p><strong>Primary Care Doctor:</strong> _______________________________</p>
                  <p><strong>Preferred Hospital:</strong> _______________________________</p>
                  <p><strong>Emergency Contact:</strong> _______________________________</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  My Current Medications
                </h3>
                <div className="space-y-2 text-sm">
                  <p><strong>UC Medications:</strong> _______________________________</p>
                  <p><strong>Other Medications:</strong> _______________________________</p>
                  <p><strong>Allergies:</strong> _______________________________</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  My Warning Signs
                </h3>
                <div className="space-y-2 text-sm">
                  <p><strong>Early Warning Signs:</strong> _______________________________</p>
                  <p><strong>Emergency Signs:</strong> _______________________________</p>
                  <p><strong>Triggers to Avoid:</strong> _______________________________</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Back to Resources */}
      <section className="py-12 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link 
              href="/resources" 
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
            >
              ← Back to Resources
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}