'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { useState } from 'react';

const managementTips = [
  {
    category: 'Daily Life',
    icon: '🏠',
    tips: [
      {
        title: 'Meal Planning',
        description: 'Plan meals around your triggers and safe foods',
        details: [
          'Keep a food diary to identify triggers',
          'Eat smaller, more frequent meals',
          'Stay hydrated throughout the day',
          'Consider meal prep during remission'
        ]
      },
      {
        title: 'Bathroom Access',
        description: 'Always know where restrooms are located',
        details: [
          'Use bathroom mapping apps when traveling',
          'Consider a medical alert card',
          'Keep emergency supplies in your car/bag',
          'Communicate needs to employers/schools'
        ]
      },
      {
        title: 'Sleep Hygiene',
        description: 'Maintain good sleep habits for better health',
        details: [
          'Establish a consistent sleep schedule',
          'Create a relaxing bedtime routine',
          'Limit screen time before bed',
          'Keep bedroom cool and dark'
        ]
      }
    ]
  },
  {
    category: 'Nutrition',
    icon: '🥗',
    tips: [
      {
        title: 'Safe Foods',
        description: 'Foods that are generally well-tolerated',
        details: [
          'White rice and refined grains',
          'Lean proteins (chicken, fish, eggs)',
          'Bananas and other low-fiber fruits',
          'Cooked vegetables without skins'
        ]
      },
      {
        title: 'Foods to Limit',
        description: 'Common trigger foods to avoid during flares',
        details: [
          'High-fiber foods (nuts, seeds, raw vegetables)',
          'Spicy and heavily seasoned foods',
          'Dairy products (if lactose intolerant)',
          'Caffeine and alcohol'
        ]
      },
      {
        title: 'Supplements',
        description: 'Nutrients that may need supplementation',
        details: [
          'Iron (due to blood loss)',
          'Vitamin B12 (absorption issues)',
          'Vitamin D and calcium',
          'Folic acid (especially if on certain medications)'
        ]
      }
    ]
  },
  {
    category: 'Mental Health',
    icon: '🧠',
    tips: [
      {
        title: 'Stress Management',
        description: 'Techniques to reduce stress and anxiety',
        details: [
          'Practice deep breathing exercises',
          'Try meditation or mindfulness',
          'Regular physical activity',
          'Connect with support groups'
        ]
      },
      {
        title: 'Coping Strategies',
        description: 'Ways to handle the emotional impact of UC',
        details: [
          'Acknowledge your feelings',
          'Educate yourself about UC',
          'Maintain social connections',
          'Consider professional counseling'
        ]
      },
      {
        title: 'Building Resilience',
        description: 'Developing mental strength to manage UC',
        details: [
          'Focus on what you can control',
          'Celebrate small victories',
          'Develop a support network',
          'Practice self-compassion'
        ]
      }
    ]
  },
  {
    category: 'Work & Travel',
    icon: '✈️',
    tips: [
      {
        title: 'Workplace Accommodations',
        description: 'Rights and accommodations for UC patients',
        details: [
          'Flexible bathroom breaks',
          'Work-from-home options during flares',
          'Adjusted work schedules for appointments',
          'Private space for medication administration'
        ]
      },
      {
        title: 'Travel Preparation',
        description: 'Planning for travel with UC',
        details: [
          'Pack extra medications',
          'Research medical facilities at destination',
          'Bring doctor\'s note and prescription list',
          'Consider travel insurance'
        ]
      },
      {
        title: 'Emergency Planning',
        description: 'Being prepared for unexpected flares',
        details: [
          'Know your doctor\'s emergency contact',
          'Have a list of nearby hospitals',
          'Keep emergency medication kit',
          'Inform trusted contacts about your condition'
        ]
      }
    ]
  }
];

export default function LivingWithUCPage() {
  const [selectedCategory, setSelectedCategory] = useState('Daily Life');

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
            Living with UC
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-neutral-500 leading-relaxed"
          >
            Practical strategies and tips for managing daily life with Ulcerative Colitis while maintaining your quality of life.
          </motion.p>
        </div>
      </section>

      {/* Management Categories */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {managementTips.map((category) => (
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

          {/* Tips Content */}
          <div className="space-y-8">
            {managementTips
              .filter(category => category.category === selectedCategory)
              .map((category) => (
                <div key={category.category}>
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  >
                    {category.tips.map((tip, index) => (
                      <motion.div
                        key={tip.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        className="card p-6 h-full"
                      >
                        <h3 className="text-xl font-semibold text-foreground mb-3">
                          {tip.title}
                        </h3>
                        <p className="text-neutral-600 mb-4 leading-relaxed">
                          {tip.description}
                        </p>
                        
                        <div className="space-y-2">
                          {tip.details.map((detail, i) => (
                            <div key={i} className="flex items-start gap-2">
                              <span className="text-primary text-sm mt-1">•</span>
                              <span className="text-sm text-neutral-600">{detail}</span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Flare Management */}
      <section className="py-16 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Managing Flares
            </h2>
            <p className="text-lg text-neutral-500">
              What to do when symptoms worsen
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="card p-6"
            >
              <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center">
                <span className="text-2xl mr-2">🚨</span>
                Warning Signs
              </h3>
              <ul className="space-y-2 text-neutral-600">
                <li>• Increased frequency of bowel movements</li>
                <li>• Blood in stool</li>
                <li>• Severe abdominal pain</li>
                <li>• Fever or fatigue</li>
                <li>• Dehydration</li>
                <li>• Significant weight loss</li>
              </ul>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="card p-6"
            >
              <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center">
                <span className="text-2xl mr-2">⚡</span>
                Immediate Actions
              </h3>
              <ul className="space-y-2 text-neutral-600">
                <li>• Contact your healthcare provider</li>
                <li>• Follow your flare action plan</li>
                <li>• Adjust diet to bland, easy-to-digest foods</li>
                <li>• Stay hydrated</li>
                <li>• Rest and reduce stress</li>
                <li>• Take prescribed medications as directed</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quality of Life Tips */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Maintaining Quality of Life
            </h2>
            <p className="text-lg text-neutral-500">
              UC doesn&apos;t have to define your life
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Stay Active',
                description: 'Regular exercise during remission can improve overall health and mood',
                icon: '🏃‍♂️'
              },
              {
                title: 'Build Support',
                description: 'Connect with family, friends, and UC support groups for emotional support',
                icon: '👥'
              },
              {
                title: 'Plan Ahead',
                description: 'Preparation helps you feel more confident and in control',
                icon: '📅'
              }
            ].map((tip, index) => (
              <motion.div
                key={tip.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">{tip.icon}</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{tip.title}</h3>
                <p className="text-neutral-600">{tip.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="py-16 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Additional Resources
            </h2>
            <p className="text-lg text-neutral-500">
              Tools and resources to help you manage UC
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="card p-6"
            >
              <h3 className="text-xl font-semibold text-foreground mb-4">Track Your Symptoms</h3>
              <p className="text-neutral-600 mb-4">
                Monitor your symptoms and identify patterns with our anonymous tracking tool.
              </p>
              <Link 
                href="/tools/symptom-tracker" 
                className="btn-primary px-6 py-3 rounded-lg font-semibold"
              >
                Start Tracking
              </Link>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="card p-6"
            >
              <h3 className="text-xl font-semibold text-foreground mb-4">Diet Guide</h3>
              <p className="text-neutral-600 mb-4">
                Discover UC-friendly foods and get personalized dietary recommendations.
              </p>
              <Link 
                href="/tools/diet-guide" 
                className="btn-secondary px-6 py-3 rounded-lg font-semibold"
              >
                Explore Foods
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-12 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <Link 
              href="/learn/treatments" 
              className="text-neutral-500 hover:text-primary transition-colors duration-200 flex items-center"
            >
              ← Previous: Treatment Options
            </Link>
            <Link 
              href="/tools" 
              className="text-neutral-500 hover:text-primary transition-colors duration-200 flex items-center"
            >
              Next: Management Tools →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}