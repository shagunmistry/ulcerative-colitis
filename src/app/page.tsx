'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { FeatureCard } from '@/lib/types';

const features: FeatureCard[] = [
  {
    title: 'Learn About UC',
    description: 'Comprehensive information about Ulcerative Colitis, symptoms, causes, and treatment options.',
    icon: '📚',
    href: '/learn',
    color: 'primary'
  },
  {
    title: 'Track Your Symptoms',
    description: 'Anonymous symptom tracker to monitor your condition and identify patterns.',
    icon: '📊',
    href: '/tools/symptom-tracker',
    color: 'secondary'
  },
  {
    title: 'Diet & Nutrition',
    description: 'UC-friendly foods guide and dietary recommendations for better management.',
    icon: '🥗',
    href: '/tools/diet-guide',
    color: 'accent'
  },
  {
    title: 'Research & Resources',
    description: 'Latest research, medical studies, and educational resources about UC.',
    icon: '🔬',
    href: '/resources',
    color: 'primary'
  },
  {
    title: 'Community Stories',
    description: 'Patient experiences, success stories, and tips from the UC community.',
    icon: '👥',
    href: '/community',
    color: 'secondary'
  },
  {
    title: 'Exercise & Wellness',
    description: 'Safe exercise recommendations and stress management techniques.',
    icon: '🏃‍♂️',
    href: '/tools/exercise',
    color: 'accent'
  }
];

export default function Home() {
  return (
    <div className="min-h-screen" itemScope itemType="https://schema.org/WebPage">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-neutral-50 via-white to-neutral-50 py-20 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight"
              itemProp="name"
            >
              Your Comprehensive Guide to{' '}
              <span className="text-primary">Ulcerative Colitis</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl text-neutral-500 mb-8 max-w-2xl mx-auto leading-relaxed"
              itemProp="description"
            >
              Access evidence-based information, practical tools, and supportive resources - all in one place. 
              Take control of your UC journey with confidence.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link 
                href="/learn" 
                className="btn-primary text-center px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Start Learning
              </Link>
              <Link 
                href="/tools/symptom-tracker" 
                className="btn-secondary text-center px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Track Symptoms
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold text-foreground mb-4"
            >
              Everything You Need to Manage UC
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-neutral-500 max-w-2xl mx-auto"
            >
              Comprehensive resources and tools designed to help you understand and manage your condition effectively.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <Link href={feature.href} className="block">
                  <div className="card p-6 h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                    <div className="text-4xl mb-4">{feature.icon}</div>
                    <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-200">
                      {feature.title}
                    </h3>
                    <p className="text-neutral-500 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Access Section */}
      <section className="py-20 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold text-foreground mb-4"
            >
              Quick Access
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-neutral-500"
            >
              Get instant access to our most popular resources
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="card p-8 text-center"
            >
              <h3 className="text-2xl font-semibold text-foreground mb-4">Emergency Resources</h3>
              <p className="text-neutral-500 mb-6">
                Quick access to emergency contacts and flare management protocols
              </p>
              <Link 
                href="/resources/emergency" 
                className="btn-primary px-6 py-3 rounded-lg font-semibold"
              >
                Get Help Now
              </Link>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="card p-8 text-center"
            >
              <h3 className="text-2xl font-semibold text-foreground mb-4">Latest Updates</h3>
              <p className="text-neutral-500 mb-6">
                Stay informed with the latest UC research and treatment advances
              </p>
              <Link 
                href="/resources/research" 
                className="btn-secondary px-6 py-3 rounded-lg font-semibold"
              >
                View Research
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Medical Disclaimer */}
      <section className="py-8 bg-neutral-50 border-t border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm text-neutral-500">
              <strong>Medical Disclaimer:</strong> This website is for educational purposes only and is not a substitute for professional medical advice. 
              Always consult with your healthcare provider before making any decisions about your treatment.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
