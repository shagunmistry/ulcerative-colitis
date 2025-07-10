'use client';

import { motion } from 'motion/react';
import Link from 'next/link';

export function LearnPageContent() {
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
              Learn About <span className="text-primary">UC</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg text-neutral-500 mb-8"
            >
              Comprehensive, evidence-based information about ulcerative colitis. Learn about symptoms, causes, treatments, and daily management strategies.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Learning Topics */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'About UC',
                description: 'Understanding ulcerative colitis, its symptoms, causes, and how it affects your body',
                icon: '🩺',
                href: '/learn/about-uc',
                color: 'from-blue-500 to-blue-600'
              },
              {
                title: 'Treatment Options',
                description: 'Comprehensive guide to medications, therapies, and surgical options for UC',
                icon: '💊',
                href: '/learn/treatments',
                color: 'from-green-500 to-green-600'
              },
              {
                title: 'Living with UC',
                description: 'Daily management tips, lifestyle strategies, and coping techniques',
                icon: '🏃‍♀️',
                href: '/learn/living-with-uc',
                color: 'from-purple-500 to-purple-600'
              }
            ].map((topic, index) => (
              <motion.div
                key={topic.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <Link href={topic.href} className="block h-full">
                  <div className="card p-8 h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${topic.color} flex items-center justify-center mb-6`}>
                      <span className="text-3xl">{topic.icon}</span>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-foreground mb-4 group-hover:text-primary transition-colors duration-200">
                      {topic.title}
                    </h3>
                    
                    <p className="text-neutral-500 leading-relaxed mb-6">
                      {topic.description}
                    </p>
                    
                    <div className="flex items-center text-primary font-medium group-hover:translate-x-1 transition-transform duration-200">
                      Learn More →
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Access */}
      <section className="py-16 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Quick Access Tools
            </h2>
            <p className="text-lg text-neutral-500">
              Helpful tools and resources to manage your UC journey
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: 'Diet Guide',
                description: 'UC-friendly foods and meal planning',
                icon: '🍎',
                href: '/tools/diet-guide'
              },
              {
                title: 'Exercise Guide',
                description: 'Safe exercises and fitness tips',
                icon: '💪',
                href: '/tools/exercise'
              },
              {
                title: 'Resources',
                description: 'Support groups and educational materials',
                icon: '📚',
                href: '/resources'
              },
              {
                title: 'Symptom Tracker',
                description: 'Track your symptoms and flares',
                icon: '📊',
                href: '/tools/symptom-tracker'
              }
            ].map((tool, index) => (
              <motion.div
                key={tool.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <Link href={tool.href} className="block">
                  <div className="card p-6 transition-all duration-300 hover:shadow-lg">
                    <div className="flex items-center gap-4">
                      <span className="text-3xl">{tool.icon}</span>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors duration-200">
                          {tool.title}
                        </h3>
                        <p className="text-neutral-500 text-sm">{tool.description}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}