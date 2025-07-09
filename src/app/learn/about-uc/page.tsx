import { Metadata } from 'next';
import { AboutUCContent } from './AboutUCContent';

export const metadata: Metadata = {
  title: "About Ulcerative Colitis - What is UC?",
  description: "Learn what ulcerative colitis is, its symptoms, causes, and how it affects your digestive system. Comprehensive guide to understanding UC, from diagnosis to living with the condition.",
  keywords: ["what is ulcerative colitis", "UC symptoms", "UC causes", "UC diagnosis", "IBD", "inflammatory bowel disease", "colitis definition", "UC explained"],
  openGraph: {
    title: "About Ulcerative Colitis - What is UC? - UC Guide",
    description: "Learn what ulcerative colitis is, its symptoms, causes, and how it affects your digestive system. Comprehensive guide to understanding UC.",
  },
  twitter: {
    title: "About Ulcerative Colitis - What is UC? - UC Guide",
    description: "Learn what ulcerative colitis is, its symptoms, causes, and how it affects your digestive system. Comprehensive guide to understanding UC.",
  },
};

export default function AboutUCPage() {
  return <AboutUCContent />;
}