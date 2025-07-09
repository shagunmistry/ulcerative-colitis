import { Metadata } from 'next';
import EmergencyContent from './EmergencyContent';

export const metadata: Metadata = {
  title: "UC Emergency Resources - When to Seek Immediate Care",
  description: "Critical information for UC emergencies. Know when to seek immediate medical care, emergency warning signs, what to bring to the hospital, and how to prepare for UC-related emergencies.",
  keywords: ["UC emergency", "ulcerative colitis emergency", "UC warning signs", "UC hospital", "UC emergency care", "UC complications", "UC emergency plan", "IBD emergency"],
  openGraph: {
    title: "UC Emergency Resources - When to Seek Immediate Care - UC Guide",
    description: "Critical information for UC emergencies. Know when to seek immediate medical care, emergency warning signs, and how to prepare for UC-related emergencies.",
  },
  twitter: {
    title: "UC Emergency Resources - When to Seek Immediate Care - UC Guide",
    description: "Critical information for UC emergencies. Know when to seek immediate medical care, emergency warning signs, and how to prepare for UC-related emergencies.",
  },
};

export default function EmergencyPage() {
  return <EmergencyContent />;
}