'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { SymptomEntry } from '@/lib/types';
import { generateId, formatDate } from '@/lib/utils';

const symptoms = [
  'Diarrhea',
  'Blood in stool',
  'Abdominal pain',
  'Cramping',
  'Urgency',
  'Fatigue',
  'Nausea',
  'Weight loss',
  'Fever',
  'Joint pain'
];

const triggers = [
  'Stress',
  'Spicy food',
  'Dairy',
  'High-fiber foods',
  'Alcohol',
  'Caffeine',
  'NSAIDs',
  'Lack of sleep',
  'Travel',
  'Missed medication'
];

const severityLabels = {
  1: { label: 'Minimal', color: 'bg-green-400', description: 'Very mild symptoms' },
  2: { label: 'Mild', color: 'bg-green-300', description: 'Some discomfort' },
  3: { label: 'Moderate', color: 'bg-yellow-400', description: 'Noticeable symptoms' },
  4: { label: 'Severe', color: 'bg-orange-400', description: 'Significant impact' },
  5: { label: 'Very Severe', color: 'bg-red-400', description: 'Debilitating symptoms' }
};

export default function SymptomTrackerPage() {
  const [entries, setEntries] = useState<SymptomEntry[]>([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [selectedTriggers, setSelectedTriggers] = useState<string[]>([]);
  const [severity, setSeverity] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [notes, setNotes] = useState('');
  const [showForm, setShowForm] = useState(false);

  // Load entries from localStorage on component mount
  useEffect(() => {
    const stored = localStorage.getItem('uc-symptom-entries');
    if (stored) {
      setEntries(JSON.parse(stored));
    }
  }, []);

  // Save entries to localStorage whenever entries change
  useEffect(() => {
    localStorage.setItem('uc-symptom-entries', JSON.stringify(entries));
  }, [entries]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newEntry: SymptomEntry = {
      id: generateId(),
      date: new Date().toISOString().split('T')[0],
      symptoms: selectedSymptoms,
      severity,
      notes,
      triggers: selectedTriggers
    };

    setEntries([newEntry, ...entries]);
    
    // Reset form
    setSelectedSymptoms([]);
    setSelectedTriggers([]);
    setSeverity(1);
    setNotes('');
    setShowForm(false);
  };

  const toggleSymptom = (symptom: string) => {
    setSelectedSymptoms(prev => 
      prev.includes(symptom) 
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    );
  };

  const toggleTrigger = (trigger: string) => {
    setSelectedTriggers(prev => 
      prev.includes(trigger) 
        ? prev.filter(t => t !== trigger)
        : [...prev, trigger]
    );
  };

  const exportData = () => {
    const dataStr = JSON.stringify(entries, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `uc-symptoms-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const getRecentPattern = () => {
    const recent = entries.slice(0, 7);
    if (recent.length === 0) return null;
    
    const avgSeverity = recent.reduce((sum, entry) => sum + entry.severity, 0) / recent.length;
    const commonSymptoms = symptoms.filter(symptom => 
      recent.filter(entry => entry.symptoms.includes(symptom)).length >= recent.length / 2
    );
    
    return { avgSeverity: Math.round(avgSeverity * 10) / 10, commonSymptoms };
  };

  const pattern = getRecentPattern();

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-white">
      {/* Hero Section */}
      <section className="pt-20 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold text-foreground mb-6"
          >
            Symptom Tracker
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg text-neutral-500 mb-8"
          >
            Track your UC symptoms, identify patterns, and share insights with your healthcare provider. 
            All data is stored securely on your device.
          </motion.p>

          {!showForm && (
            <motion.button 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              onClick={() => setShowForm(true)}
              className="btn-primary px-8 py-3 rounded-lg font-semibold"
            >
              Log Today&apos;s Symptoms
            </motion.button>
          )}
        </div>
      </section>

      {/* Entry Form */}
      {showForm && (
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="pb-12"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="card p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-foreground">Log Symptoms for {formatDate(new Date())}</h2>
                <button 
                  onClick={() => setShowForm(false)}
                  className="text-neutral-500 hover:text-foreground transition-colors"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Symptoms Selection */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">Symptoms Experienced</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {symptoms.map(symptom => (
                      <button
                        key={symptom}
                        type="button"
                        onClick={() => toggleSymptom(symptom)}
                        className={`p-3 rounded-lg border transition-all duration-200 text-left ${
                          selectedSymptoms.includes(symptom)
                            ? 'border-primary bg-primary/10 text-primary'
                            : 'border-neutral-200 hover:border-neutral-300'
                        }`}
                      >
                        {symptom}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Severity Scale */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">Overall Severity</h3>
                  <div className="space-y-4">
                    <div className="flex gap-2 justify-center">
                      {[1, 2, 3, 4, 5].map(level => (
                        <button
                          key={level}
                          type="button"
                          onClick={() => setSeverity(level as 1 | 2 | 3 | 4 | 5)}
                          className={`w-12 h-12 rounded-full border-2 transition-all duration-200 ${
                            severity === level
                              ? `border-white ${severityLabels[level as keyof typeof severityLabels].color} shadow-lg`
                              : `border-neutral-300 ${severityLabels[level as keyof typeof severityLabels].color} opacity-60`
                          }`}
                        >
                          {level}
                        </button>
                      ))}
                    </div>
                    <div className="text-center">
                      <p className="font-medium text-foreground">
                        {severityLabels[severity].label}
                      </p>
                      <p className="text-sm text-neutral-500">
                        {severityLabels[severity].description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Potential Triggers */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">Potential Triggers</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {triggers.map(trigger => (
                      <button
                        key={trigger}
                        type="button"
                        onClick={() => toggleTrigger(trigger)}
                        className={`p-3 rounded-lg border transition-all duration-200 text-left ${
                          selectedTriggers.includes(trigger)
                            ? 'border-secondary bg-secondary/10 text-secondary'
                            : 'border-neutral-200 hover:border-neutral-300'
                        }`}
                      >
                        {trigger}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">Additional Notes</h3>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Any additional details about your symptoms, medications, activities, etc."
                    className="w-full p-4 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                    rows={4}
                  />
                </div>

                {/* Submit Button */}
                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="btn-primary px-8 py-3 rounded-lg font-semibold"
                  >
                    Save Entry
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-8 py-3 border border-neutral-300 rounded-lg font-semibold text-neutral-600 hover:bg-neutral-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </motion.section>
      )}

      {/* Recent Entries & Pattern Analysis */}
      <section className="pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Entries */}
            <div className="lg:col-span-2">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-foreground">Recent Entries</h2>
                {entries.length > 0 && (
                  <button
                    onClick={exportData}
                    className="btn-secondary px-4 py-2 rounded-lg font-semibold text-sm"
                  >
                    Export Data
                  </button>
                )}
              </div>

              {entries.length === 0 ? (
                <div className="card p-8 text-center">
                  <span className="text-4xl mb-4 block">📊</span>
                  <h3 className="text-lg font-semibold text-foreground mb-2">No entries yet</h3>
                  <p className="text-neutral-500">Start tracking your symptoms to see patterns and insights.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {entries.slice(0, 10).map(entry => (
                    <motion.div
                      key={entry.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="card p-6"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-semibold text-foreground">{formatDate(entry.date)}</h3>
                        <div className="flex items-center gap-2">
                          <span className={`w-3 h-3 rounded-full ${severityLabels[entry.severity].color}`}></span>
                          <span className="text-sm text-neutral-500">{severityLabels[entry.severity].label}</span>
                        </div>
                      </div>
                      
                      {entry.symptoms.length > 0 && (
                        <div className="mb-3">
                          <h4 className="text-sm font-medium text-foreground mb-2">Symptoms:</h4>
                          <div className="flex flex-wrap gap-2">
                            {entry.symptoms.map(symptom => (
                              <span key={symptom} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                                {symptom}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {entry.triggers && entry.triggers.length > 0 && (
                        <div className="mb-3">
                          <h4 className="text-sm font-medium text-foreground mb-2">Potential Triggers:</h4>
                          <div className="flex flex-wrap gap-2">
                            {entry.triggers.map(trigger => (
                              <span key={trigger} className="text-xs bg-secondary/10 text-secondary px-2 py-1 rounded">
                                {trigger}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {entry.notes && (
                        <div>
                          <h4 className="text-sm font-medium text-foreground mb-2">Notes:</h4>
                          <p className="text-sm text-neutral-600">{entry.notes}</p>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Pattern Analysis */}
            <div className="space-y-6">
              {pattern && (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  className="card p-6"
                >
                  <h3 className="text-lg font-semibold text-foreground mb-4">7-Day Pattern</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-foreground mb-2">Average Severity</h4>
                      <div className="flex items-center gap-2">
                        <span className={`w-4 h-4 rounded-full ${
                          pattern.avgSeverity <= 2 ? 'bg-green-400' :
                          pattern.avgSeverity <= 3 ? 'bg-yellow-400' :
                          pattern.avgSeverity <= 4 ? 'bg-orange-400' : 'bg-red-400'
                        }`}></span>
                        <span className="font-medium">{pattern.avgSeverity}/5</span>
                      </div>
                    </div>
                    
                    {pattern.commonSymptoms.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium text-foreground mb-2">Most Common Symptoms</h4>
                        <div className="space-y-1">
                          {pattern.commonSymptoms.map(symptom => (
                            <div key={symptom} className="text-sm text-neutral-600">• {symptom}</div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="card p-6"
              >
                <h3 className="text-lg font-semibold text-foreground mb-4">Tips</h3>
                <div className="space-y-3 text-sm text-neutral-600">
                  <p>• Track symptoms daily for better pattern recognition</p>
                  <p>• Note potential triggers to identify personal patterns</p>
                  <p>• Export your data to share with your healthcare provider</p>
                  <p>• Look for correlations between triggers and flares</p>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="card p-6 bg-primary/5"
              >
                <h3 className="text-lg font-semibold text-foreground mb-4">Privacy Notice</h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  All your symptom data is stored locally on your device. We don&apos;t collect or share any personal health information.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-12 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <Link 
              href="/tools" 
              className="text-neutral-500 hover:text-primary transition-colors duration-200 flex items-center"
            >
              ← Back to Tools
            </Link>
            <Link 
              href="/tools/diet-guide" 
              className="text-neutral-500 hover:text-primary transition-colors duration-200 flex items-center"
            >
              Next: Diet Guide →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}