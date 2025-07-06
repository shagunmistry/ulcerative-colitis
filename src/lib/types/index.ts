export interface NavItem {
  name: string;
  href: string;
  icon?: string;
  children?: NavItem[];
}

export interface FeatureCard {
  title: string;
  description: string;
  icon: string;
  href: string;
  color: 'primary' | 'secondary' | 'accent';
}

export interface SymptomEntry {
  id: string;
  date: string;
  symptoms: string[];
  severity: 1 | 2 | 3 | 4 | 5;
  notes: string;
  triggers?: string[];
}

export interface FoodItem {
  id: string;
  name: string;
  category: 'safe' | 'trigger' | 'moderate';
  description: string;
  tags: string[];
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'article' | 'video' | 'pdf' | 'research';
  url: string;
  tags: string[];
  publishedDate: string;
  author?: string;
}

export interface PatientStory {
  id: string;
  name: string;
  age: number;
  diagnosis: string;
  story: string;
  tips: string[];
  image?: string;
}

export interface TreatmentOption {
  id: string;
  name: string;
  type: 'medication' | 'lifestyle' | 'surgical';
  description: string;
  effectiveness: number;
  sideEffects: string[];
  cost: 'low' | 'medium' | 'high';
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  tags: string[];
}