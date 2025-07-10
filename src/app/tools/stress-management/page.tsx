'use client';

import { motion } from 'motion/react';
import { useState } from 'react';

const techniques = [
  {
    title: 'Deep Breathing',
    description: 'Simple breathing exercises to activate your relaxation response',
    icon: '🫁',
    color: 'from-blue-500 to-blue-600',
    exercises: [
      {
        name: '4-7-8 Breathing',
        steps: [
          'Inhale through your nose for 4 counts',
          'Hold your breath for 7 counts',
          'Exhale through your mouth for 8 counts',
          'Repeat 3-4 times'
        ]
      },
      {
        name: 'Box Breathing',
        steps: [
          'Inhale for 4 counts',
          'Hold for 4 counts',
          'Exhale for 4 counts',
          'Hold empty for 4 counts',
          'Repeat for 2-5 minutes'
        ]
      },
      {
        name: 'Belly Breathing',
        steps: [
          'Place one hand on chest, one on belly',
          'Breathe slowly through your nose',
          'Feel your belly rise more than your chest',
          'Exhale slowly through pursed lips',
          'Continue for 5-10 minutes'
        ]
      }
    ]
  },
  {
    title: 'Meditation',
    description: 'Mindfulness practices to reduce stress and anxiety',
    icon: '🧘‍♀️',
    color: 'from-purple-500 to-purple-600',
    exercises: [
      {
        name: 'Body Scan',
        steps: [
          'Lie down comfortably',
          'Focus on your toes and slowly move up',
          'Notice sensations without judgment',
          'Breathe into areas of tension',
          'Complete scan from toes to head'
        ]
      },
      {
        name: 'Loving-Kindness',
        steps: [
          'Sit comfortably and close your eyes',
          'Send love to yourself: "May I be happy"',
          'Extend to loved ones: "May you be happy"',
          'Include neutral people, then difficult ones',
          'End with all beings everywhere'
        ]
      },
      {
        name: 'Mindful Observation',
        steps: [
          'Choose an object to focus on',
          'Observe its colors, textures, shapes',
          'When mind wanders, gently return focus',
          'Notice without judging or analyzing',
          'Practice for 5-15 minutes'
        ]
      }
    ]
  },
  {
    title: 'Progressive Relaxation',
    description: 'Systematic muscle relaxation to release physical tension',
    icon: '💆‍♀️',
    color: 'from-green-500 to-green-600',
    exercises: [
      {
        name: 'Full Body PMR',
        steps: [
          'Start with your toes, tense for 5 seconds',
          'Release and feel the relaxation',
          'Move up: calves, thighs, abdomen',
          'Continue: arms, shoulders, face',
          'End with whole body tension and release'
        ]
      },
      {
        name: 'Quick Tension Release',
        steps: [
          'Tense your entire body for 10 seconds',
          'Release everything at once',
          'Feel the wave of relaxation',
          'Breathe deeply and slowly',
          'Repeat 2-3 times as needed'
        ]
      },
      {
        name: 'Facial Relaxation',
        steps: [
          'Scrunch your entire face tightly',
          'Hold for 5 seconds',
          'Release and let face go slack',
          'Smile gently and breathe',
          'Repeat focusing on jaw, eyes, forehead'
        ]
      }
    ]
  },
  {
    title: 'Mindfulness',
    description: 'Present-moment awareness practices',
    icon: '🌸',
    color: 'from-pink-500 to-pink-600',
    exercises: [
      {
        name: '5-4-3-2-1 Grounding',
        steps: [
          'Name 5 things you can see',
          'Name 4 things you can touch',
          'Name 3 things you can hear',
          'Name 2 things you can smell',
          'Name 1 thing you can taste'
        ]
      },
      {
        name: 'Mindful Walking',
        steps: [
          'Walk slowly and deliberately',
          'Feel your feet touching the ground',
          'Notice the movement of your body',
          'Observe your surroundings without judgment',
          'Return focus to walking when mind wanders'
        ]
      },
      {
        name: 'Mindful Eating',
        steps: [
          'Eat slowly and without distractions',
          'Notice colors, textures, smells',
          'Chew thoroughly and taste fully',
          'Notice hunger and fullness cues',
          'Appreciate the nourishment'
        ]
      }
    ]
  }
];

const stressTracking = [
  {
    title: 'Daily Stress Check-in',
    description: 'Quick assessment of your stress levels',
    questions: [
      'How stressed do I feel right now? (1-10)',
      'What are my main stressors today?',
      'How is my body feeling?',
      'What emotions am I experiencing?',
      'What would help me feel better?'
    ]
  },
  {
    title: 'Stress Triggers',
    description: 'Identify what causes your stress',
    categories: [
      'Work/School pressures',
      'Financial concerns',
      'Relationship issues',
      'Health worries',
      'Time pressures',
      'Social situations',
      'Environmental factors'
    ]
  },
  {
    title: 'Physical Symptoms',
    description: 'How stress affects your body',
    symptoms: [
      'Headaches or tension',
      'Muscle tightness',
      'Fatigue or low energy',
      'Digestive issues',
      'Sleep problems',
      'Changes in appetite',
      'Rapid heartbeat'
    ]
  }
];

const quickTips = [
  {
    title: 'Take a Break',
    description: 'Step away from stressful situations when possible',
    icon: '⏸️',
    tip: 'Even 5 minutes can reset your stress response'
  },
  {
    title: 'Practice Saying No',
    description: 'Protect your energy by setting boundaries',
    icon: '🚫',
    tip: 'You don\'t have to do everything for everyone'
  },
  {
    title: 'Stay Connected',
    description: 'Reach out to friends, family, or support groups',
    icon: '🤝',
    tip: 'Social support is crucial for managing chronic illness'
  },
  {
    title: 'Limit News/Social Media',
    description: 'Reduce exposure to stressful information',
    icon: '📱',
    tip: 'Set specific times for checking news and social media'
  },
  {
    title: 'Get Outside',
    description: 'Nature exposure can reduce stress hormones',
    icon: '🌳',
    tip: 'Even looking at plants through a window helps'
  },
  {
    title: 'Practice Gratitude',
    description: 'Focus on positive aspects of your life',
    icon: '🙏',
    tip: 'Write down 3 things you\'re grateful for each day'
  }
];

export default function StressManagementPage() {
  const [activeTab, setActiveTab] = useState('techniques');
  const [selectedTechnique, setSelectedTechnique] = useState(0);

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
              Stress <span className="text-primary">Management</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg text-neutral-500 mb-8"
            >
              Learn stress reduction techniques and mindfulness practices to help manage UC symptoms and improve your overall well-being.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {[
              { id: 'techniques', label: 'Techniques', icon: '🧘‍♀️' },
              { id: 'tracking', label: 'Stress Tracking', icon: '📊' },
              { id: 'tips', label: 'Quick Tips', icon: '💡' }
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
          {activeTab === 'techniques' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Stress Reduction Techniques
                </h2>
                <p className="text-lg text-neutral-500 max-w-2xl mx-auto">
                  Practice these evidence-based techniques to manage stress and reduce its impact on your UC symptoms.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Technique Categories */}
                <div className="lg:col-span-1 space-y-4">
                  {techniques.map((technique, index) => (
                    <button
                      key={technique.title}
                      onClick={() => setSelectedTechnique(index)}
                      className={`w-full p-4 rounded-lg text-left transition-all duration-200 ${
                        selectedTechnique === index
                          ? 'bg-primary text-white shadow-lg'
                          : 'bg-white text-neutral-600 hover:bg-primary/10'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{technique.icon}</span>
                        <div>
                          <h3 className="font-semibold">{technique.title}</h3>
                          <p className="text-sm opacity-80">{technique.description}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Technique Details */}
                <div className="lg:col-span-3">
                  <div className="card p-8">
                    <div className="flex items-center mb-6">
                      <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${techniques[selectedTechnique].color} flex items-center justify-center mr-4`}>
                        <span className="text-3xl text-white">{techniques[selectedTechnique].icon}</span>
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-foreground">
                          {techniques[selectedTechnique].title}
                        </h3>
                        <p className="text-neutral-500">{techniques[selectedTechnique].description}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {techniques[selectedTechnique].exercises.map((exercise, i) => (
                        <div key={i} className="bg-neutral-50 rounded-lg p-6">
                          <h4 className="font-semibold text-foreground mb-4">{exercise.name}</h4>
                          <ol className="space-y-2">
                            {exercise.steps.map((step, j) => (
                              <li key={j} className="text-sm text-neutral-600 flex items-start">
                                <span className="text-primary mr-2 font-medium">{j + 1}.</span>
                                {step}
                              </li>
                            ))}
                          </ol>
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
                  Track Your Stress
                </h2>
                <p className="text-lg text-neutral-500 max-w-2xl mx-auto">
                  Understanding your stress patterns can help you identify triggers and develop better coping strategies.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {stressTracking.map((section, index) => (
                  <motion.div
                    key={section.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="card p-6"
                  >
                    <h3 className="text-xl font-semibold text-foreground mb-4">
                      {section.title}
                    </h3>
                    <p className="text-neutral-500 mb-6">{section.description}</p>
                    
                    <div className="space-y-3">
                      {section.questions && section.questions.map((question, i) => (
                        <div key={i} className="bg-neutral-50 rounded-lg p-4">
                          <p className="text-sm text-neutral-600">{question}</p>
                        </div>
                      ))}
                      
                      {section.categories && section.categories.map((category, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 bg-neutral-50 rounded-lg">
                          <input type="checkbox" className="w-4 h-4 text-primary" />
                          <label className="text-sm text-neutral-600">{category}</label>
                        </div>
                      ))}
                      
                      {section.symptoms && section.symptoms.map((symptom, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 bg-neutral-50 rounded-lg">
                          <input type="checkbox" className="w-4 h-4 text-primary" />
                          <label className="text-sm text-neutral-600">{symptom}</label>
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
                  Quick Stress-Relief Tips
                </h2>
                <p className="text-lg text-neutral-500 max-w-2xl mx-auto">
                  Simple strategies you can use anytime to manage stress and support your UC management.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {quickTips.map((tip, index) => (
                  <motion.div
                    key={tip.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="card p-6"
                  >
                    <div className="text-center">
                      <span className="text-4xl mb-4 block">{tip.icon}</span>
                      <h3 className="text-xl font-semibold text-foreground mb-3">
                        {tip.title}
                      </h3>
                      <p className="text-neutral-600 mb-4">{tip.description}</p>
                      <div className="bg-primary/10 rounded-lg p-4">
                        <p className="text-sm font-medium text-primary">{tip.tip}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Stress-UC Connection */}
      <section className="py-16 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Why Stress Management Matters for UC
            </h2>
            <p className="text-lg text-neutral-500">
              Understanding the connection between stress and UC can help you prioritize stress management as part of your overall treatment plan.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="card p-6"
            >
              <h3 className="text-xl font-semibold text-foreground mb-4">
                How Stress Affects UC
              </h3>
              <ul className="space-y-3">
                {[
                  'May trigger flares or worsen symptoms',
                  'Can affect immune system function',
                  'May impact sleep and healing',
                  'Can influence treatment adherence',
                  'May affect quality of life'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-red-500 text-sm">⚠️</span>
                    <span className="text-neutral-600 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="card p-6"
            >
              <h3 className="text-xl font-semibold text-foreground mb-4">
                Benefits of Stress Management
              </h3>
              <ul className="space-y-3">
                {[
                  'May reduce flare frequency',
                  'Improves overall quality of life',
                  'Better sleep and energy levels',
                  'Enhanced coping abilities',
                  'Stronger immune function'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-green-500 text-sm">✅</span>
                    <span className="text-neutral-600 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Professional Help */}
      <section className="py-8 bg-purple-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-purple-100 border border-purple-200 rounded-lg p-6">
            <div className="flex items-start gap-3">
              <span className="text-purple-600 text-xl">💜</span>
              <div>
                <h3 className="font-semibold text-purple-800 mb-2">When to Seek Professional Help</h3>
                <p className="text-purple-700 text-sm mb-3">
                  If stress is significantly impacting your UC symptoms or quality of life, consider reaching out to:
                </p>
                <ul className="text-purple-700 text-sm space-y-1">
                  <li>• Mental health counselors or therapists</li>
                  <li>• UC support groups or patient organizations</li>
                  <li>• Your gastroenterologist or healthcare team</li>
                  <li>• Stress management specialists</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}