'use client';

import { motion } from 'motion/react';
import Link from 'next/link';

const tools = [
  {
    title: 'Symptom Tracker',
    description: 'Monitor your UC symptoms, track patterns, and identify triggers with our anonymous tracking tool.',
    icon: '📊',
    href: '/tools/symptom-tracker',
    color: 'from-blue-500 to-blue-600',
    features: ['Daily symptom logging', 'Pattern analysis', 'Trigger identification', 'Export data']
  },
  {
    title: 'Diet Guide',
    description: 'Discover UC-friendly foods, identify triggers, and get personalized dietary recommendations.',
    icon: '🥗',
    href: '/tools/diet-guide',
    color: 'from-green-500 to-green-600',
    features: ['Food database', 'Trigger foods list', 'Safe foods guide', 'Meal planning tips']
  },
  {
    title: 'Exercise Guide',
    description: 'Safe exercise recommendations and fitness plans tailored for people with UC.',
    icon: '🏃‍♂️',
    href: '/tools/exercise',
    color: 'from-purple-500 to-purple-600',
    features: ['Low-impact exercises', 'Remission workouts', 'Flare-safe activities', 'Progress tracking']
  },
  {
    title: 'Stress Management',
    description: 'Learn stress reduction techniques and mindfulness practices to help manage UC.',
    icon: '🧘‍♀️',
    href: '/tools/stress-management',
    color: 'from-teal-500 to-teal-600',
    features: ['Breathing exercises', 'Meditation guides', 'Stress tracking', 'Relaxation techniques']
  },
  {
    title: 'Medication Tracker',
    description: 'Keep track of your medications, dosages, and side effects.',
    icon: '💊',
    href: '/tools/medication-tracker',
    color: 'from-orange-500 to-orange-600',
    features: ['Medication schedule', 'Dosage tracking', 'Side effect monitoring', 'Refill reminders']
  },
  {
    title: 'Flare Action Plan',
    description: 'Create a personalized action plan for managing UC flares.',
    icon: '🚨',
    href: '/tools/flare-plan',
    color: 'from-red-500 to-red-600',
    features: ['Emergency contacts', 'Action steps', 'Medication protocol', 'Warning signs']
  }
];

export default function ToolsPage() {
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
              UC Management <span className="text-primary">Tools</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg text-neutral-500 mb-8"
            >
              Practical tools to help you track symptoms, manage your diet, stay active, and take control of your UC journey.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tools.map((tool, index) => (
              <motion.div
                key={tool.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <Link href={tool.href} className="block h-full">
                  <div className="card p-6 h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center mb-6`}>
                      <span className="text-3xl">{tool.icon}</span>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-200">
                      {tool.title}
                    </h3>
                    
                    <p className="text-neutral-500 leading-relaxed mb-4">
                      {tool.description}
                    </p>
                    
                    <div className="space-y-2 mb-6">
                      {tool.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <span className="text-primary text-sm">✓</span>
                          <span className="text-sm text-neutral-600">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex items-center text-primary font-medium group-hover:translate-x-1 transition-transform duration-200">
                      Try it now →
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Tool */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Start with Symptom Tracking
              </h2>
              <p className="text-lg text-neutral-500">
                Understanding your patterns is the first step to better UC management
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="card p-8 bg-gradient-to-r from-primary/5 to-secondary/5"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-semibold text-foreground mb-4">
                    Anonymous Symptom Tracker
                  </h3>
                  <p className="text-neutral-600 mb-6 leading-relaxed">
                    Track your symptoms, identify patterns, and export your data to share with your healthcare provider. 
                    All data is stored locally on your device for complete privacy.
                  </p>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3">
                      <span className="text-primary">📊</span>
                      <span className="text-neutral-600">Visual symptom tracking</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-primary">🔍</span>
                      <span className="text-neutral-600">Pattern analysis</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-primary">📱</span>
                      <span className="text-neutral-600">Works offline</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-primary">🔒</span>
                      <span className="text-neutral-600">Completely private</span>
                    </div>
                  </div>
                  <Link 
                    href="/tools/symptom-tracker" 
                    className="btn-primary px-8 py-3 rounded-lg font-semibold"
                  >
                    Start Tracking
                  </Link>
                </div>
                
                <div className="bg-white rounded-lg p-6 shadow-lg">
                  <h4 className="font-semibold text-foreground mb-4">Sample Tracking View</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-neutral-50 rounded">
                      <span className="text-sm text-neutral-600">Today</span>
                      <div className="flex gap-2">
                        <span className="w-3 h-3 bg-green-400 rounded-full"></span>
                        <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
                        <span className="w-3 h-3 bg-neutral-200 rounded-full"></span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-neutral-50 rounded">
                      <span className="text-sm text-neutral-600">Yesterday</span>
                      <div className="flex gap-2">
                        <span className="w-3 h-3 bg-green-400 rounded-full"></span>
                        <span className="w-3 h-3 bg-green-400 rounded-full"></span>
                        <span className="w-3 h-3 bg-neutral-200 rounded-full"></span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-neutral-50 rounded">
                      <span className="text-sm text-neutral-600">2 days ago</span>
                      <div className="flex gap-2">
                        <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
                        <span className="w-3 h-3 bg-red-400 rounded-full"></span>
                        <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-neutral-500 mt-4">🟢 Good • 🟡 Moderate • 🔴 Severe</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Privacy Notice */}
      <section className="py-16 bg-gradient-to-r from-neutral-50 to-neutral-100">
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
              Your Privacy is Protected
            </h2>
            <p className="text-lg text-neutral-500 max-w-2xl mx-auto">
              All our tools store data locally on your device. We don&apos;t collect, store, or share any personal health information. 
              You maintain complete control over your data.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-foreground mb-4"
          >
            Ready to Take Control?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-neutral-500 mb-8"
          >
            Start with one tool and gradually build your UC management routine.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link 
              href="/tools/symptom-tracker" 
              className="btn-primary px-8 py-3 rounded-lg font-semibold"
            >
              Start Symptom Tracking
            </Link>
            <Link 
              href="/tools/diet-guide" 
              className="btn-secondary px-8 py-3 rounded-lg font-semibold"
            >
              Explore Diet Guide
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}