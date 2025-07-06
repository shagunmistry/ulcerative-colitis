'use client';

import { motion } from 'motion/react';
import Link from 'next/link';

const learningTopics = [
  {
    title: 'About Ulcerative Colitis',
    description: 'Understanding UC: symptoms, causes, and how it affects the digestive system.',
    icon: '🩺',
    href: '/learn/about-uc',
    color: 'from-blue-500 to-blue-600'
  },
  {
    title: 'Treatment Options',
    description: 'Comprehensive guide to medications, therapies, and surgical options.',
    icon: '💊',
    href: '/learn/treatments',
    color: 'from-green-500 to-green-600'
  },
  {
    title: 'Living with UC',
    description: 'Daily management strategies, lifestyle tips, and coping mechanisms.',
    icon: '🏠',
    href: '/learn/living-with-uc',
    color: 'from-purple-500 to-purple-600'
  },
  {
    title: 'Types of UC',
    description: 'Different forms of UC, severity levels, and location classifications.',
    icon: '📊',
    href: '/learn/types',
    color: 'from-orange-500 to-orange-600'
  },
  {
    title: 'Diet & Nutrition',
    description: 'Nutritional guidance, trigger foods, and dietary management strategies.',
    icon: '🥗',
    href: '/learn/diet',
    color: 'from-teal-500 to-teal-600'
  },
  {
    title: 'Complications',
    description: 'Understanding potential complications and when to seek medical help.',
    icon: '⚠️',
    href: '/learn/complications',
    color: 'from-red-500 to-red-600'
  }
];

export default function LearnPage() {
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
              Learn About <span className="text-primary">Ulcerative Colitis</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg text-neutral-500 mb-8"
            >
              Comprehensive, evidence-based information to help you understand UC and make informed decisions about your care.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Learning Topics Grid */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {learningTopics.map((topic, index) => (
              <motion.div
                key={topic.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <Link href={topic.href} className="block h-full">
                  <div className="card p-6 h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${topic.color} flex items-center justify-center mb-4`}>
                      <span className="text-2xl">{topic.icon}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-200">
                      {topic.title}
                    </h3>
                    <p className="text-neutral-500 leading-relaxed">
                      {topic.description}
                    </p>
                    <div className="mt-4 flex items-center text-primary font-medium group-hover:translate-x-1 transition-transform duration-200">
                      Learn more →
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Facts Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl font-bold text-foreground mb-4"
            >
              Quick Facts About UC
            </motion.h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-primary">👥</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">1 in 250</h3>
              <p className="text-neutral-500">People are affected by UC globally</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-secondary">🧬</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Chronic</h3>
              <p className="text-neutral-500">UC is a lifelong condition that can be managed</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-accent">💊</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Treatable</h3>
              <p className="text-neutral-500">Multiple treatment options available</p>
            </motion.div>
          </div>
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
            Ready to Start Your Learning Journey?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-neutral-500 mb-8"
          >
            Begin with the basics and gradually build your understanding of UC.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link 
              href="/learn/about-uc" 
              className="btn-primary px-8 py-3 rounded-lg font-semibold"
            >
              Start with UC Basics
            </Link>
            <Link 
              href="/tools/symptom-tracker" 
              className="btn-secondary px-8 py-3 rounded-lg font-semibold"
            >
              Track Your Symptoms
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}