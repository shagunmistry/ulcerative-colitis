'use client';

import { Metadata } from 'next';
import { motion } from 'motion/react';
import Link from 'next/link';
import { useState } from 'react';

export const metadata: Metadata = {
  title: "UC Treatment Options - Medications & Therapies",
  description: "Comprehensive guide to ulcerative colitis treatment options including medications, biologics, surgery, and lifestyle therapies. Learn about aminosalicylates, corticosteroids, immunosuppressants, and more.",
  keywords: ["UC treatment", "ulcerative colitis medications", "UC biologics", "UC surgery", "mesalamine", "prednisone", "infliximab", "adalimumab", "UC therapy"],
  openGraph: {
    title: "UC Treatment Options - Medications & Therapies - UC Guide",
    description: "Comprehensive guide to ulcerative colitis treatment options including medications, biologics, surgery, and lifestyle therapies.",
  },
  twitter: {
    title: "UC Treatment Options - Medications & Therapies - UC Guide",
    description: "Comprehensive guide to ulcerative colitis treatment options including medications, biologics, surgery, and lifestyle therapies.",
  },
};

const treatments = [
  {
    category: 'Medications',
    icon: '💊',
    treatments: [
      {
        name: 'Aminosalicylates',
        description: 'Anti-inflammatory drugs that reduce inflammation in the colon',
        examples: ['Mesalamine', 'Sulfasalazine', 'Balsalazide'],
        effectiveness: 'Mild to moderate UC',
        sideEffects: ['Headache', 'Nausea', 'Abdominal pain']
      },
      {
        name: 'Corticosteroids',
        description: 'Powerful anti-inflammatory drugs for short-term use',
        examples: ['Prednisone', 'Prednisolone', 'Budesonide'],
        effectiveness: 'Moderate to severe flares',
        sideEffects: ['Weight gain', 'Mood changes', 'Increased infection risk']
      },
      {
        name: 'Immunosuppressants',
        description: 'Medications that suppress the immune system',
        examples: ['Azathioprine', 'Mercaptopurine', 'Cyclosporine'],
        effectiveness: 'Moderate to severe UC',
        sideEffects: ['Increased infection risk', 'Nausea', 'Liver problems']
      },
      {
        name: 'Biologics',
        description: 'Targeted therapy that blocks specific immune proteins',
        examples: ['Infliximab', 'Adalimumab', 'Vedolizumab'],
        effectiveness: 'Moderate to severe UC',
        sideEffects: ['Injection site reactions', 'Increased infection risk']
      }
    ]
  },
  {
    category: 'Lifestyle',
    icon: '🌱',
    treatments: [
      {
        name: 'Dietary Changes',
        description: 'Identifying and avoiding trigger foods',
        examples: ['Low-residue diet', 'Elimination diet', 'Anti-inflammatory foods'],
        effectiveness: 'Symptom management',
        sideEffects: ['Nutritional deficiencies if not properly managed']
      },
      {
        name: 'Stress Management',
        description: 'Techniques to reduce stress and its impact on UC',
        examples: ['Meditation', 'Yoga', 'Counseling'],
        effectiveness: 'Symptom reduction',
        sideEffects: ['Generally none']
      },
      {
        name: 'Exercise',
        description: 'Regular physical activity to improve overall health',
        examples: ['Walking', 'Swimming', 'Low-impact exercises'],
        effectiveness: 'Overall wellbeing',
        sideEffects: ['Fatigue during flares']
      }
    ]
  },
  {
    category: 'Surgical',
    icon: '🏥',
    treatments: [
      {
        name: 'Colectomy',
        description: 'Surgical removal of part or all of the colon',
        examples: ['Total colectomy', 'Subtotal colectomy', 'Proctocolectomy'],
        effectiveness: 'Severe UC, complications',
        sideEffects: ['Surgical risks', 'Permanent changes to bowel function']
      },
      {
        name: 'Ileostomy',
        description: 'Creating an opening for waste elimination',
        examples: ['Temporary ileostomy', 'Permanent ileostomy'],
        effectiveness: 'Post-surgery management',
        sideEffects: ['Lifestyle adjustments', 'Skin irritation']
      }
    ]
  }
];

export default function TreatmentsPage() {
  const [selectedCategory, setSelectedCategory] = useState('Medications');

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold text-foreground mb-6"
          >
            Treatment Options
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-neutral-500 leading-relaxed"
          >
            Comprehensive guide to UC treatment options, from medications to lifestyle changes and surgical interventions.
          </motion.p>
        </div>
      </section>

      {/* Treatment Categories */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {treatments.map((category) => (
              <button
                key={category.category}
                onClick={() => setSelectedCategory(category.category)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                  selectedCategory === category.category
                    ? 'bg-primary text-white shadow-lg'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.category}
              </button>
            ))}
          </div>

          {/* Treatment Details */}
          <div className="space-y-8">
            {treatments
              .filter(category => category.category === selectedCategory)
              .map((category) => (
                <div key={category.category}>
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  >
                    {category.treatments.map((treatment, index) => (
                      <motion.div
                        key={treatment.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        className="card p-6"
                      >
                        <h3 className="text-xl font-semibold text-foreground mb-3">
                          {treatment.name}
                        </h3>
                        <p className="text-neutral-600 mb-4 leading-relaxed">
                          {treatment.description}
                        </p>
                        
                        <div className="space-y-3">
                          <div>
                            <h4 className="font-semibold text-foreground mb-1">Examples:</h4>
                            <div className="flex flex-wrap gap-2">
                              {treatment.examples.map((example, i) => (
                                <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                                  {example}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold text-foreground mb-1">Best for:</h4>
                            <p className="text-sm text-neutral-600">{treatment.effectiveness}</p>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold text-foreground mb-1">Side Effects:</h4>
                            <ul className="text-sm text-neutral-600 space-y-1">
                              {treatment.sideEffects.map((effect, i) => (
                                <li key={i}>• {effect}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Treatment Approach */}
      <section className="py-16 bg-gradient-to-br from-neutral-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Step-by-Step Treatment Approach
            </h2>
            <p className="text-lg text-neutral-500">
              UC treatment typically follows a step-up approach based on disease severity.
            </p>
          </motion.div>

          <div className="space-y-6">
            {[
              {
                step: 1,
                title: 'Mild UC',
                description: 'Start with aminosalicylates and lifestyle modifications',
                color: 'bg-green-100 text-green-800'
              },
              {
                step: 2,
                title: 'Moderate UC',
                description: 'Add corticosteroids for flares, consider immunosuppressants',
                color: 'bg-yellow-100 text-yellow-800'
              },
              {
                step: 3,
                title: 'Severe UC',
                description: 'Biologics, hospitalization if needed, surgery as last resort',
                color: 'bg-red-100 text-red-800'
              }
            ].map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="flex items-center gap-4 p-6 card"
              >
                <div className={`w-12 h-12 rounded-full ${step.color} flex items-center justify-center font-bold text-lg`}>
                  {step.step}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">{step.title}</h3>
                  <p className="text-neutral-600">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Important Notes */}
      <section className="py-16 bg-amber-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="card p-8"
          >
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
              <span className="text-2xl mr-2">⚠️</span>
              Important Treatment Considerations
            </h2>
            <div className="space-y-4 text-neutral-600">
              <p>• <strong>Work with your healthcare team:</strong> Treatment plans should be individualized based on your specific needs and disease severity.</p>
              <p>• <strong>Regular monitoring:</strong> Many UC medications require regular blood tests and monitoring for side effects.</p>
              <p>• <strong>Medication adherence:</strong> Taking medications as prescribed is crucial for maintaining remission.</p>
              <p>• <strong>Lifestyle factors:</strong> Diet, stress management, and exercise complement medical treatment.</p>
              <p>• <strong>Emergency situations:</strong> Know when to seek immediate medical attention during flares.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-12 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <Link 
              href="/learn/about-uc" 
              className="text-neutral-500 hover:text-primary transition-colors duration-200 flex items-center"
            >
              ← Previous: About UC
            </Link>
            <Link 
              href="/learn/living-with-uc" 
              className="text-neutral-500 hover:text-primary transition-colors duration-200 flex items-center"
            >
              Next: Living with UC →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}