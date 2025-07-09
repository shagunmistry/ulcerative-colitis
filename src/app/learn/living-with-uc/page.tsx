import { Metadata } from 'next';
import { LivingWithUCContent } from './LivingWithUCContent';

export const metadata: Metadata = {
  title: "Living with UC - Daily Management & Lifestyle Tips",
  description: "Practical strategies for living with ulcerative colitis. Learn daily management tips, nutrition advice, stress management, work accommodations, and how to maintain quality of life with UC.",
  keywords: ["living with UC", "UC management", "UC lifestyle", "UC daily tips", "UC nutrition", "UC stress management", "UC work accommodations", "UC quality of life"],
  openGraph: {
    title: "Living with UC - Daily Management & Lifestyle Tips - UC Guide",
    description: "Practical strategies for living with ulcerative colitis. Learn daily management tips, nutrition advice, stress management, and quality of life maintenance.",
  },
  twitter: {
    title: "Living with UC - Daily Management & Lifestyle Tips - UC Guide",
    description: "Practical strategies for living with ulcerative colitis. Learn daily management tips, nutrition advice, stress management, and quality of life maintenance.",
  },
};

export default function LivingWithUCPage() {
  return <LivingWithUCContent />;
}