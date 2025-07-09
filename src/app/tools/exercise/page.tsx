import { Metadata } from 'next';
import { motion } from 'motion/react';
import { useState } from 'react';

export const metadata: Metadata = {
  title: "UC Exercise Guide - Safe Workouts for Ulcerative Colitis",
  description: "Safe exercise recommendations and fitness plans for people with ulcerative colitis. Learn about low-impact exercises, workout plans by UC status, and safety tips for staying active.",
  keywords: ["UC exercise", "ulcerative colitis exercise", "IBD fitness", "UC workout", "UC physical activity", "UC exercise safety", "low impact exercise", "UC fitness plan"],
  openGraph: {
    title: "UC Exercise Guide - Safe Workouts for Ulcerative Colitis - UC Guide",
    description: "Safe exercise recommendations and fitness plans for people with ulcerative colitis. Learn about low-impact exercises, workout plans by UC status, and safety tips.",
  },
  twitter: {
    title: "UC Exercise Guide - Safe Workouts for Ulcerative Colitis - UC Guide",
    description: "Safe exercise recommendations and fitness plans for people with ulcerative colitis. Learn about low-impact exercises, workout plans by UC status, and safety tips.",
  },
};

'use client';

const exerciseCategories = [
  {
    title: 'Low-Impact Cardio',
    description: 'Gentle on joints and digestive system',
    icon: '🚶‍♀️',
    color: 'from-blue-500 to-blue-600',
    exercises: [
      { name: 'Walking', duration: '20-30 minutes', benefits: 'Improves circulation, reduces stress' },
      { name: 'Swimming', duration: '15-25 minutes', benefits: 'Full-body workout, low impact' },
      { name: 'Cycling', duration: '20-30 minutes', benefits: 'Builds leg strength, cardiovascular health' },
      { name: 'Elliptical', duration: '15-20 minutes', benefits: 'Low impact, full-body movement' }
    ]
  },
  {
    title: 'Strength Training',
    description: 'Build muscle and bone density safely',
    icon: '💪',
    color: 'from-purple-500 to-purple-600',
    exercises: [
      { name: 'Resistance Bands', duration: '15-20 minutes', benefits: 'Gentle strength building' },
      { name: 'Light Weights', duration: '20-30 minutes', benefits: 'Muscle maintenance, bone health' },
      { name: 'Bodyweight Exercises', duration: '15-25 minutes', benefits: 'Functional strength, flexibility' },
      { name: 'Yoga Poses', duration: '10-20 minutes', benefits: 'Strength, balance, relaxation' }
    ]
  },
  {
    title: 'Flexibility & Balance',
    description: 'Improve mobility and reduce stiffness',
    icon: '🧘‍♀️',
    color: 'from-green-500 to-green-600',
    exercises: [
      { name: 'Gentle Yoga', duration: '20-30 minutes', benefits: 'Flexibility, stress relief' },
      { name: 'Stretching', duration: '10-15 minutes', benefits: 'Muscle relaxation, mobility' },
      { name: 'Tai Chi', duration: '15-30 minutes', benefits: 'Balance, mindfulness' },
      { name: 'Pilates', duration: '20-30 minutes', benefits: 'Core strength, flexibility' }
    ]
  }
];

const workoutPlans = [
  {
    title: 'During Remission',
    description: 'Full activity with gradual progression',
    color: 'from-green-500 to-green-600',
    icon: '🟢',
    workouts: [
      { day: 'Monday', activity: 'Walking + Light Strength Training', duration: '30-45 min' },
      { day: 'Tuesday', activity: 'Swimming or Cycling', duration: '25-35 min' },
      { day: 'Wednesday', activity: 'Yoga or Pilates', duration: '30-40 min' },
      { day: 'Thursday', activity: 'Walking + Stretching', duration: '25-35 min' },
      { day: 'Friday', activity: 'Full Body Strength Training', duration: '30-40 min' },
      { day: 'Saturday', activity: 'Longer Walk or Recreational Activity', duration: '45-60 min' },
      { day: 'Sunday', activity: 'Rest or Gentle Yoga', duration: '15-30 min' }
    ]
  },
  {
    title: 'During Mild Flare',
    description: 'Reduced intensity, focus on gentle movement',
    color: 'from-yellow-500 to-yellow-600',
    icon: '🟡',
    workouts: [
      { day: 'Monday', activity: 'Gentle Walking', duration: '15-20 min' },
      { day: 'Tuesday', activity: 'Stretching or Light Yoga', duration: '15-25 min' },
      { day: 'Wednesday', activity: 'Rest or Breathing Exercises', duration: '10-15 min' },
      { day: 'Thursday', activity: 'Short Walk', duration: '10-15 min' },
      { day: 'Friday', activity: 'Gentle Stretching', duration: '15-20 min' },
      { day: 'Saturday', activity: 'Light Movement as Tolerated', duration: '10-20 min' },
      { day: 'Sunday', activity: 'Rest and Relaxation', duration: '15-30 min' }
    ]
  },
  {
    title: 'During Severe Flare',
    description: 'Minimal activity, focus on rest and recovery',
    color: 'from-red-500 to-red-600',
    icon: '🔴',
    workouts: [
      { day: 'Daily', activity: 'Deep Breathing Exercises', duration: '5-10 min' },
      { day: 'As Tolerated', activity: 'Gentle Stretching in Bed', duration: '5-10 min' },
      { day: 'When Able', activity: 'Short, Slow Walks', duration: '5-10 min' },
      { day: 'Focus', activity: 'Rest, Hydration, and Recovery', duration: 'As needed' }
    ]
  }
];

const exerciseTips = [
  {
    title: 'Listen to Your Body',
    description: 'Stop if you feel pain, extreme fatigue, or worsening symptoms',
    icon: '👂'
  },
  {
    title: 'Start Slowly',
    description: 'Begin with short, low-intensity sessions and gradually increase',
    icon: '🐌'
  },
  {
    title: 'Stay Hydrated',
    description: 'Drink water before, during, and after exercise',
    icon: '💧'
  },
  {
    title: 'Choose Comfortable Clothes',
    description: 'Wear loose, breathable clothing that doesn\'t restrict movement',
    icon: '👕'
  },
  {
    title: 'Plan Around Meals',
    description: 'Exercise when your stomach is not too full or empty',
    icon: '🍽️'
  },
  {
    title: 'Have an Exit Strategy',
    description: 'Know where bathrooms are located when exercising outside',
    icon: '🚪'
  }
];

export default function ExercisePage() {
  const [activeTab, setActiveTab] = useState('exercises');

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
              Exercise <span className="text-primary">Guide</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg text-neutral-500 mb-8"
            >
              Safe exercise recommendations and fitness plans tailored for people with UC. Stay active while managing your condition.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {[
              { id: 'exercises', label: 'Exercise Types', icon: '🏃‍♂️' },
              { id: 'plans', label: 'Workout Plans', icon: '📋' },
              { id: 'tips', label: 'Safety Tips', icon: '💡' }
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
          {activeTab === 'exercises' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  UC-Friendly Exercise Types
                </h2>
                <p className="text-lg text-neutral-500 max-w-2xl mx-auto">
                  These exercises are generally safe and beneficial for people with UC. Choose activities that feel good and match your current health status.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {exerciseCategories.map((category, index) => (
                  <motion.div
                    key={category.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="card p-6"
                  >
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-6`}>
                      <span className="text-3xl">{category.icon}</span>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      {category.title}
                    </h3>
                    
                    <p className="text-neutral-500 mb-6">
                      {category.description}
                    </p>

                    <div className="space-y-4">
                      {category.exercises.map((exercise, i) => (
                        <div key={i} className="border-l-4 border-primary/20 pl-4">
                          <div className="flex justify-between items-start mb-1">
                            <h4 className="font-medium text-foreground">{exercise.name}</h4>
                            <span className="text-sm text-neutral-500">{exercise.duration}</span>
                          </div>
                          <p className="text-sm text-neutral-600">{exercise.benefits}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'plans' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Workout Plans by UC Status
                </h2>
                <p className="text-lg text-neutral-500 max-w-2xl mx-auto">
                  Adapt your exercise routine based on your current symptoms and overall health status.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {workoutPlans.map((plan, index) => (
                  <motion.div
                    key={plan.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="card p-6"
                  >
                    <div className="flex items-center mb-4">
                      <span className="text-3xl mr-3">{plan.icon}</span>
                      <div>
                        <h3 className="text-xl font-semibold text-foreground">
                          {plan.title}
                        </h3>
                        <p className="text-neutral-500 text-sm">{plan.description}</p>
                      </div>
                    </div>

                    <div className={`w-full h-2 rounded-full bg-gradient-to-r ${plan.color} mb-6`}></div>

                    <div className="space-y-3">
                      {plan.workouts.map((workout, i) => (
                        <div key={i} className="bg-neutral-50 rounded-lg p-4">
                          <div className="flex justify-between items-start mb-2">
                            <div className="font-medium text-foreground text-sm">
                              {workout.day}
                            </div>
                            <div className="text-xs text-neutral-500">
                              {workout.duration}
                            </div>
                          </div>
                          <div className="text-sm text-neutral-600">
                            {workout.activity}
                          </div>
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
                  Exercise Safety Tips
                </h2>
                <p className="text-lg text-neutral-500 max-w-2xl mx-auto">
                  Important guidelines to help you exercise safely with UC and avoid potential complications.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {exerciseTips.map((tip, index) => (
                  <motion.div
                    key={tip.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="card p-6"
                  >
                    <div className="flex items-start gap-4">
                      <span className="text-3xl">{tip.icon}</span>
                      <div>
                        <h3 className="text-xl font-semibold text-foreground mb-2">
                          {tip.title}
                        </h3>
                        <p className="text-neutral-600">{tip.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Benefits of Exercise for UC
            </h2>
            <p className="text-lg text-neutral-500 max-w-2xl mx-auto">
              Regular, appropriate exercise can provide numerous benefits for people with UC.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Reduce Inflammation', description: 'Exercise may help reduce systemic inflammation', icon: '🔥' },
              { title: 'Improve Mood', description: 'Physical activity releases endorphins and reduces stress', icon: '😊' },
              { title: 'Strengthen Bones', description: 'Weight-bearing exercise helps maintain bone density', icon: '🦴' },
              { title: 'Better Sleep', description: 'Regular exercise can improve sleep quality', icon: '😴' },
              { title: 'Boost Immunity', description: 'Moderate exercise supports immune function', icon: '🛡️' },
              { title: 'Maintain Weight', description: 'Exercise helps maintain healthy body weight', icon: '⚖️' }
            ].map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card p-6 text-center"
              >
                <span className="text-4xl mb-4 block">{benefit.icon}</span>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {benefit.title}
                </h3>
                <p className="text-neutral-600 text-sm">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Medical Disclaimer */}
      <section className="py-8 bg-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-blue-100 border border-blue-200 rounded-lg p-6">
            <div className="flex items-start gap-3">
              <span className="text-blue-600 text-xl">ℹ️</span>
              <div>
                <h3 className="font-semibold text-blue-800 mb-2">Medical Disclaimer</h3>
                <p className="text-blue-700 text-sm">
                  Always consult with your healthcare provider before starting any new exercise program, especially if you have UC or other health conditions. 
                  This guide is for informational purposes only and should not replace professional medical advice.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}