'use client';

import { motion } from 'motion/react';
import { useState } from 'react';

const triggerFoods = [
  {
    category: 'High-Fiber Foods',
    description: 'May cause symptoms during flares',
    foods: ['Raw vegetables', 'Whole grains', 'Beans and legumes', 'Nuts and seeds', 'Popcorn'],
    severity: 'high',
    icon: '🌾'
  },
  {
    category: 'Dairy Products',
    description: 'Can trigger symptoms in lactose-intolerant individuals',
    foods: ['Milk', 'Cheese', 'Ice cream', 'Yogurt with live cultures'],
    severity: 'medium',
    icon: '🥛'
  },
  {
    category: 'Spicy Foods',
    description: 'May irritate the digestive tract',
    foods: ['Hot peppers', 'Spicy sauces', 'Curry', 'Wasabi'],
    severity: 'high',
    icon: '🌶️'
  },
  {
    category: 'Alcohol & Caffeine',
    description: 'Can stimulate the intestines',
    foods: ['Beer', 'Wine', 'Coffee', 'Energy drinks'],
    severity: 'medium',
    icon: '☕'
  },
  {
    category: 'High-Fat Foods',
    description: 'May worsen diarrhea',
    foods: ['Fried foods', 'Fatty meats', 'Butter', 'Margarine'],
    severity: 'high',
    icon: '🍟'
  }
];

const safeFoods = [
  {
    category: 'Lean Proteins',
    description: 'Easy to digest and well-tolerated',
    foods: ['Chicken breast', 'Fish', 'Eggs', 'Tofu'],
    icon: '🐟'
  },
  {
    category: 'Cooked Vegetables',
    description: 'Easier to digest than raw',
    foods: ['Carrots', 'Spinach', 'Zucchini', 'Sweet potatoes'],
    icon: '🥕'
  },
  {
    category: 'Refined Grains',
    description: 'Lower in fiber during flares',
    foods: ['White rice', 'White bread', 'Pasta', 'Crackers'],
    icon: '🍞'
  },
  {
    category: 'Fruits',
    description: 'Remove skin and seeds',
    foods: ['Bananas', 'Melon', 'Applesauce', 'Canned peaches'],
    icon: '🍌'
  },
  {
    category: 'Hydration',
    description: 'Essential for recovery',
    foods: ['Water', 'Herbal tea', 'Broth', 'Electrolyte drinks'],
    icon: '💧'
  }
];

const mealPlans = [
  {
    title: 'During Flare-Up',
    description: 'Low-residue, easy-to-digest meals',
    meals: [
      { meal: 'Breakfast', food: 'Oatmeal with banana and honey' },
      { meal: 'Lunch', food: 'Chicken broth with white rice' },
      { meal: 'Dinner', food: 'Baked fish with mashed potatoes' },
      { meal: 'Snack', food: 'Applesauce or yogurt' }
    ],
    color: 'from-red-500 to-red-600'
  },
  {
    title: 'In Remission',
    description: 'Balanced nutrition with gradual fiber increase',
    meals: [
      { meal: 'Breakfast', food: 'Scrambled eggs with toast' },
      { meal: 'Lunch', food: 'Grilled chicken with cooked vegetables' },
      { meal: 'Dinner', food: 'Salmon with quinoa and steamed broccoli' },
      { meal: 'Snack', food: 'Nuts or fruit' }
    ],
    color: 'from-green-500 to-green-600'
  }
];

export default function DietGuidePage() {
  const [activeTab, setActiveTab] = useState('triggers');

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
              UC <span className="text-primary">Diet Guide</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg text-neutral-500 mb-8"
            >
              Discover UC-friendly foods, identify triggers, and get personalized dietary recommendations to manage your symptoms better.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {[
              { id: 'triggers', label: 'Trigger Foods', icon: '⚠️' },
              { id: 'safe', label: 'Safe Foods', icon: '✅' },
              { id: 'plans', label: 'Meal Plans', icon: '📋' }
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
          {activeTab === 'triggers' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Foods to Avoid During Flares
                </h2>
                <p className="text-lg text-neutral-500 max-w-2xl mx-auto">
                  These foods may worsen UC symptoms. Everyone is different, so keep a food diary to identify your personal triggers.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {triggerFoods.map((category, index) => (
                  <motion.div
                    key={category.category}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="card p-6"
                  >
                    <div className="flex items-center mb-4">
                      <span className="text-3xl mr-3">{category.icon}</span>
                      <div>
                        <h3 className="text-xl font-semibold text-foreground">
                          {category.category}
                        </h3>
                        <span className={`text-sm px-2 py-1 rounded ${
                          category.severity === 'high' 
                            ? 'bg-red-100 text-red-600' 
                            : 'bg-yellow-100 text-yellow-600'
                        }`}>
                          {category.severity === 'high' ? 'High Risk' : 'Medium Risk'}
                        </span>
                      </div>
                    </div>
                    <p className="text-neutral-500 mb-4">{category.description}</p>
                    <ul className="space-y-2">
                      {category.foods.map((food, i) => (
                        <li key={i} className="flex items-center text-sm text-neutral-600">
                          <span className="text-red-400 mr-2">•</span>
                          {food}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'safe' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  UC-Friendly Foods
                </h2>
                <p className="text-lg text-neutral-500 max-w-2xl mx-auto">
                  These foods are generally well-tolerated and can help provide nutrition during flares and remission.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {safeFoods.map((category, index) => (
                  <motion.div
                    key={category.category}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="card p-6"
                  >
                    <div className="flex items-center mb-4">
                      <span className="text-3xl mr-3">{category.icon}</span>
                      <div>
                        <h3 className="text-xl font-semibold text-foreground">
                          {category.category}
                        </h3>
                        <span className="text-sm px-2 py-1 rounded bg-green-100 text-green-600">
                          Generally Safe
                        </span>
                      </div>
                    </div>
                    <p className="text-neutral-500 mb-4">{category.description}</p>
                    <ul className="space-y-2">
                      {category.foods.map((food, i) => (
                        <li key={i} className="flex items-center text-sm text-neutral-600">
                          <span className="text-green-400 mr-2">•</span>
                          {food}
                        </li>
                      ))}
                    </ul>
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
                  Sample Meal Plans
                </h2>
                <p className="text-lg text-neutral-500 max-w-2xl mx-auto">
                  Meal ideas for different stages of UC management. Always consult with your healthcare provider or dietitian.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {mealPlans.map((plan, index) => (
                  <motion.div
                    key={plan.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="card p-6"
                  >
                    <div className={`w-full h-2 rounded-full bg-gradient-to-r ${plan.color} mb-6`}></div>
                    <h3 className="text-2xl font-semibold text-foreground mb-2">
                      {plan.title}
                    </h3>
                    <p className="text-neutral-500 mb-6">{plan.description}</p>
                    
                    <div className="space-y-4">
                      {plan.meals.map((meal, i) => (
                        <div key={i} className="flex items-start gap-4 p-4 bg-neutral-50 rounded-lg">
                          <div className="min-w-0 flex-1">
                            <div className="text-sm font-medium text-primary mb-1">
                              {meal.meal}
                            </div>
                            <div className="text-neutral-600">
                              {meal.food}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-16 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Diet Management Tips
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'Keep a Food Diary',
                tip: 'Track what you eat and your symptoms to identify personal triggers',
                icon: '📝'
              },
              {
                title: 'Eat Small, Frequent Meals',
                tip: 'Smaller portions are easier to digest and may reduce symptoms',
                icon: '🍽️'
              },
              {
                title: 'Stay Hydrated',
                tip: 'Drink plenty of water, especially during flares to prevent dehydration',
                icon: '💧'
              },
              {
                title: 'Work with a Dietitian',
                tip: 'Get personalized nutrition advice from a professional familiar with IBD',
                icon: '👩‍⚕️'
              }
            ].map((tip, index) => (
              <motion.div
                key={tip.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card p-6"
              >
                <div className="flex items-start gap-4">
                  <span className="text-3xl">{tip.icon}</span>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {tip.title}
                    </h3>
                    <p className="text-neutral-600">{tip.tip}</p>
                  </div>
                </div>
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
                <h3 className="font-semibold text-yellow-800 mb-2">Important Disclaimer</h3>
                <p className="text-yellow-700 text-sm">
                  This diet guide is for informational purposes only and should not replace professional medical advice. 
                  Always consult with your healthcare provider or a registered dietitian before making significant dietary changes, 
                  especially if you have UC or other digestive conditions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}