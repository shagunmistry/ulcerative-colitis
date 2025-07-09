import { Metadata } from 'next';
import { LearnPageContent } from './LearnPageContent';

export const metadata: Metadata = {
  title: "Learn About Ulcerative Colitis",
  description: "Comprehensive, evidence-based information about ulcerative colitis. Learn about UC symptoms, causes, types, treatments, and daily management strategies from trusted medical sources.",
  keywords: ["ulcerative colitis education", "UC information", "IBD learning", "colitis symptoms", "UC causes", "UC types", "UC treatments", "UC management"],
  openGraph: {
    title: "Learn About Ulcerative Colitis - UC Guide",
    description: "Comprehensive, evidence-based information about ulcerative colitis. Learn about UC symptoms, causes, types, treatments, and daily management strategies.",
  },
  twitter: {
    title: "Learn About Ulcerative Colitis - UC Guide",
    description: "Comprehensive, evidence-based information about ulcerative colitis. Learn about UC symptoms, causes, types, treatments, and daily management strategies.",
  },
};

export default function LearnPage() {
  return <LearnPageContent />;
}