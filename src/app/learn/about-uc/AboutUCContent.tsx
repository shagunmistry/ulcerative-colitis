'use client';

import { motion } from 'motion/react';
import Link from 'next/link';

export function AboutUCContent() {
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
            About Ulcerative Colitis
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-neutral-500 leading-relaxed"
          >
            A comprehensive guide to understanding UC, its symptoms, causes, and how it affects your digestive system.
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              {/* What is UC */}
              <div className="card p-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">What is Ulcerative Colitis?</h2>
                <p className="text-neutral-600 leading-relaxed mb-4">
                  Ulcerative colitis (UC) is a chronic inflammatory bowel disease (IBD) that primarily affects the large intestine (colon) and rectum. 
                  It causes inflammation and ulcers in the innermost lining of the colon, leading to various symptoms and complications.
                </p>
                <p className="text-neutral-600 leading-relaxed">
                  Unlike Crohn&apos;s disease, which can affect any part of the digestive tract, UC is limited to the colon and rectum. 
                  The inflammation typically begins in the rectum and spreads upward in a continuous pattern.
                </p>
              </div>

              {/* Symptoms */}
              <div className="card p-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">Common Symptoms</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">Digestive Symptoms</h3>
                    <ul className="space-y-2 text-neutral-600">
                      <li>• Diarrhea, often with blood or pus</li>
                      <li>• Abdominal pain and cramping</li>
                      <li>• Rectal bleeding</li>
                      <li>• Urgency to defecate</li>
                      <li>• Inability to defecate despite urgency</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">Systemic Symptoms</h3>
                    <ul className="space-y-2 text-neutral-600">
                      <li>• Fatigue and weakness</li>
                      <li>• Weight loss</li>
                      <li>• Fever during flares</li>
                      <li>• Loss of appetite</li>
                      <li>• Anemia (low iron)</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Causes */}
              <div className="card p-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">Causes and Risk Factors</h2>
                <p className="text-neutral-600 leading-relaxed mb-4">
                  The exact cause of UC is unknown, but research suggests it results from a combination of factors:
                </p>
                <div className="space-y-4">
                  <div className="bg-neutral-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-foreground mb-2">🧬 Genetics</h3>
                    <p className="text-sm text-neutral-600">Family history increases risk, but UC is not directly inherited.</p>
                  </div>
                  <div className="bg-neutral-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-foreground mb-2">🦠 Immune System</h3>
                    <p className="text-sm text-neutral-600">An overactive immune response may attack healthy tissue in the colon.</p>
                  </div>
                  <div className="bg-neutral-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-foreground mb-2">🌍 Environment</h3>
                    <p className="text-sm text-neutral-600">Stress, diet, and other environmental factors may trigger symptoms.</p>
                  </div>
                </div>
              </div>

              {/* Diagnosis */}
              <div className="card p-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">Diagnosis</h2>
                <p className="text-neutral-600 leading-relaxed mb-4">
                  UC is diagnosed through a combination of tests and procedures:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-primary/5 p-4 rounded-lg">
                    <h3 className="font-semibold text-foreground mb-2">Blood Tests</h3>
                    <p className="text-sm text-neutral-600">Check for anemia, infection, and inflammation markers</p>
                  </div>
                  <div className="bg-secondary/5 p-4 rounded-lg">
                    <h3 className="font-semibold text-foreground mb-2">Stool Tests</h3>
                    <p className="text-sm text-neutral-600">Rule out infections and check for blood</p>
                  </div>
                  <div className="bg-accent/5 p-4 rounded-lg">
                    <h3 className="font-semibold text-foreground mb-2">Colonoscopy</h3>
                    <p className="text-sm text-neutral-600">Direct visualization of the colon lining</p>
                  </div>
                  <div className="bg-neutral-100 p-4 rounded-lg">
                    <h3 className="font-semibold text-foreground mb-2">Imaging Tests</h3>
                    <p className="text-sm text-neutral-600">CT scans or MRI to assess inflammation</p>
                  </div>
                </div>
              </div>

              {/* Living with UC */}
              <div className="card p-8 bg-gradient-to-r from-primary/5 to-secondary/5">
                <h2 className="text-2xl font-bold text-foreground mb-4">Living with UC</h2>
                <p className="text-neutral-600 leading-relaxed mb-6">
                  While UC is a chronic condition, many people with UC live full, active lives with proper management. 
                  The key is working with your healthcare team to develop a comprehensive treatment plan.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link 
                    href="/learn/treatments" 
                    className="btn-primary px-6 py-3 rounded-lg font-semibold text-center"
                  >
                    Learn About Treatments
                  </Link>
                  <Link 
                    href="/learn/living-with-uc" 
                    className="btn-secondary px-6 py-3 rounded-lg font-semibold text-center"
                  >
                    Daily Management Tips
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-12 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <Link 
              href="/learn" 
              className="text-neutral-500 hover:text-primary transition-colors duration-200 flex items-center"
            >
              ← Back to Learning Hub
            </Link>
            <Link 
              href="/learn/treatments" 
              className="text-neutral-500 hover:text-primary transition-colors duration-200 flex items-center"
            >
              Next: Treatment Options →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}