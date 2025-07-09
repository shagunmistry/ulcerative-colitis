import { Metadata } from 'next';
import { motion } from 'motion/react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "UC Resources - Research, Support & Educational Materials",
  description: "Comprehensive UC resources including latest research, clinical trials, support groups, educational materials, and emergency resources. Find trusted organizations and helpful tools.",
  keywords: ["UC resources", "ulcerative colitis research", "UC support groups", "UC organizations", "UC clinical trials", "UC apps", "IBD resources", "UC education"],
  openGraph: {
    title: "UC Resources - Research, Support & Educational Materials - UC Guide",
    description: "Comprehensive UC resources including latest research, clinical trials, support groups, educational materials, and emergency resources.",
  },
  twitter: {
    title: "UC Resources - Research, Support & Educational Materials - UC Guide",
    description: "Comprehensive UC resources including latest research, clinical trials, support groups, educational materials, and emergency resources.",
  },
};

'use client';

const resourceCategories = [
  {
    title: 'Research & Studies',
    description: 'Latest scientific research and clinical studies about UC',
    icon: '🔬',
    href: '/resources/research',
    color: 'from-blue-500 to-blue-600',
    features: [
      'Latest research findings',
      'Clinical trial information',
      'Treatment breakthrough news',
      'Evidence-based studies'
    ]
  },
  {
    title: 'Frequently Asked Questions',
    description: 'Common questions and answers about UC',
    icon: '❓',
    href: '/resources/faq',
    color: 'from-green-500 to-green-600',
    features: [
      'Diagnosis questions',
      'Treatment options',
      'Lifestyle management',
      'Insurance and costs'
    ]
  }
];

const externalResources = [
  {
    category: 'Medical Organizations',
    resources: [
      {
        name: 'Crohn\'s & Colitis Foundation',
        description: 'Leading organization for IBD research and support',
        url: 'https://www.crohnscolitisfoundation.org',
        type: 'Organization'
      },
      {
        name: 'American Gastroenterological Association',
        description: 'Professional medical association for gastroenterology',
        url: 'https://gastro.org',
        type: 'Medical'
      },
      {
        name: 'International Foundation for Gastrointestinal Disorders',
        description: 'Educational resources for digestive health',
        url: 'https://iffgd.org',
        type: 'Educational'
      }
    ]
  },
  {
    category: 'Support & Community',
    resources: [
      {
        name: 'IBD Support Groups',
        description: 'Local and online support groups for people with IBD',
        url: 'https://www.crohnscolitisfoundation.org/find-support',
        type: 'Support'
      },
      {
        name: 'Patient Advocacy Groups',
        description: 'Organizations advocating for IBD patients',
        url: 'https://www.crohnscolitisfoundation.org/get-involved',
        type: 'Advocacy'
      },
      {
        name: 'IBD Social Networks',
        description: 'Online communities and forums for IBD patients',
        url: 'https://www.crohnscolitisfoundation.org/community',
        type: 'Community'
      }
    ]
  },
  {
    category: 'Educational Resources',
    resources: [
      {
        name: 'IBD Educational Materials',
        description: 'Comprehensive educational resources about IBD',
        url: 'https://www.crohnscolitisfoundation.org/about-crohns-colitis',
        type: 'Educational'
      },
      {
        name: 'Dietary Guidelines',
        description: 'Nutrition and dietary information for IBD',
        url: 'https://www.crohnscolitisfoundation.org/diet-nutrition',
        type: 'Nutrition'
      },
      {
        name: 'Mental Health Resources',
        description: 'Support for mental health and chronic illness',
        url: 'https://www.crohnscolitisfoundation.org/mental-health',
        type: 'Mental Health'
      }
    ]
  }
];

const toolsAndApps = [
  {
    name: 'MyIBD Coach',
    description: 'Comprehensive IBD management app',
    features: ['Symptom tracking', 'Medication reminders', 'Educational content'],
    platform: 'iOS, Android'
  },
  {
    name: 'IBD Manager',
    description: 'Track symptoms and medications',
    features: ['Daily logging', 'Report generation', 'Trend analysis'],
    platform: 'iOS, Android'
  },
  {
    name: 'Cara Care',
    description: 'Digital health assistant for digestive health',
    features: ['Symptom tracking', 'Food diary', 'AI insights'],
    platform: 'iOS, Android'
  },
  {
    name: 'MyRA',
    description: 'Medication adherence and tracking',
    features: ['Pill reminders', 'Refill alerts', 'Side effect tracking'],
    platform: 'iOS, Android'
  }
];

const emergencyResources = [
  {
    title: 'When to Seek Emergency Care',
    items: [
      'Severe abdominal pain',
      'High fever (over 101°F)',
      'Signs of dehydration',
      'Rapid heart rate',
      'Severe bleeding',
      'Inability to keep fluids down'
    ]
  },
  {
    title: 'What to Bring to the ER',
    items: [
      'Current medication list',
      'Insurance cards',
      'Recent test results',
      'Emergency contact information',
      'Symptom log or diary',
      'Comfort items for potential stay'
    ]
  }
];

export default function ResourcesPage() {
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
              UC <span className="text-primary">Resources</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg text-neutral-500 mb-8"
            >
              Comprehensive resources to help you understand UC, find support, and manage your condition effectively.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Main Resource Categories */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {resourceCategories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <Link href={category.href} className="block h-full">
                  <div className="card p-8 h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                    <div className={`w-20 h-20 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-6`}>
                      <span className="text-4xl text-white">{category.icon}</span>
                    </div>
                    
                    <h3 className="text-2xl font-semibold text-foreground mb-4 group-hover:text-primary transition-colors duration-200">
                      {category.title}
                    </h3>
                    
                    <p className="text-neutral-500 leading-relaxed mb-6">
                      {category.description}
                    </p>
                    
                    <div className="space-y-3 mb-6">
                      {category.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <span className="text-primary">✓</span>
                          <span className="text-neutral-600">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex items-center text-primary font-medium group-hover:translate-x-1 transition-transform duration-200">
                      Explore Resources →
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* External Resources */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">
              External Resources
            </h2>
            <p className="text-lg text-neutral-500">
              Trusted organizations and resources for UC information and support
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {externalResources.map((category, index) => (
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
                
                <div className="space-y-4">
                  {category.resources.map((resource, i) => (
                    <div key={i} className="border-l-4 border-primary/20 pl-4 py-3">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-foreground">{resource.name}</h4>
                        <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded">
                          {resource.type}
                        </span>
                      </div>
                      <p className="text-sm text-neutral-600 mb-2">{resource.description}</p>
                      <a 
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline"
                      >
                        Visit Resource →
                      </a>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools and Apps */}
      <section className="py-16 bg-gradient-to-r from-neutral-50 to-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Recommended Apps & Tools
            </h2>
            <p className="text-lg text-neutral-500">
              Digital tools to help you manage your UC on the go
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {toolsAndApps.map((app, index) => (
              <motion.div
                key={app.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {app.name}
                    </h3>
                    <p className="text-neutral-600 mb-3">{app.description}</p>
                  </div>
                  <span className="text-xs px-2 py-1 bg-green-100 text-green-600 rounded">
                    {app.platform}
                  </span>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {app.features.map((feature, i) => (
                    <span key={i} className="text-xs px-3 py-1 bg-neutral-100 text-neutral-600 rounded-full">
                      {feature}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Resources */}
      <section className="py-16 bg-red-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl">🚨</span>
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Emergency Resources
            </h2>
            <p className="text-lg text-neutral-500">
              Important information for UC-related emergencies
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {emergencyResources.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card p-6"
              >
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-red-500 mt-1">•</span>
                      <span className="text-neutral-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Support */}
      <section className="py-16 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Additional Support
            </h2>
            <p className="text-lg text-neutral-500">
              Remember that managing UC is a journey, and you don't have to do it alone
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Talk to Your Doctor',
                description: 'Regular communication with your healthcare team is essential',
                icon: '👨‍⚕️'
              },
              {
                title: 'Connect with Others',
                description: 'Join support groups to share experiences and learn from others',
                icon: '🤝'
              },
              {
                title: 'Stay Informed',
                description: 'Keep up with the latest research and treatment options',
                icon: '📚'
              }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card p-6 text-center"
              >
                <span className="text-4xl mb-4 block">{item.icon}</span>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {item.title}
                </h3>
                <p className="text-neutral-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-8 bg-yellow-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-yellow-100 border border-yellow-200 rounded-lg p-6">
            <div className="flex items-start gap-3">
              <span className="text-yellow-600 text-xl">⚠️</span>
              <div>
                <h3 className="font-semibold text-yellow-800 mb-2">Important Notice</h3>
                <p className="text-yellow-700 text-sm">
                  The resources provided here are for informational purposes only and should not replace professional medical advice. 
                  Always consult with your healthcare provider for personalized treatment recommendations. 
                  External links are provided for convenience and do not constitute endorsement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}