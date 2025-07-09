'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { NavItem } from '@/lib/types';

const navigation: NavItem[] = [
  { name: 'Home', href: '/' },
  { 
    name: 'Learn', 
    href: '/learn',
    children: [
      { name: 'About UC', href: '/learn/about-uc' },
      { name: 'Treatments', href: '/learn/treatments' },
      { name: 'Living with UC', href: '/learn/living-with-uc' },
    ]
  },
  { 
    name: 'Tools', 
    href: '/tools',
    children: [
      { name: 'Symptom Tracker', href: '/tools/symptom-tracker' },
      { name: 'Diet Guide', href: '/tools/diet-guide' },
      { name: 'Exercise', href: '/tools/exercise' },
    ]
  },
  { 
    name: 'Resources', 
    href: '/resources',
    children: [
      { name: 'Research', href: '/resources/research' },
      { name: 'FAQ', href: '/resources/faq' },
    ]
  },
  // { name: 'Community', href: '/community' },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">UC</span>
            </div>
            <span className="text-xl font-semibold text-foreground">UC Guide</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <div key={item.name} className="relative group">
                <Link
                  href={item.href}
                  className="text-neutral-500 hover:text-primary transition-colors duration-200 font-medium"
                >
                  {item.name}
                </Link>
                {item.children && (
                  <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-neutral-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="py-2">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          className="block px-4 py-2 text-sm text-neutral-500 hover:text-primary hover:bg-neutral-50 transition-colors duration-200"
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden p-2 rounded-lg text-neutral-500 hover:text-primary hover:bg-neutral-50 transition-colors duration-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden bg-white border-t border-neutral-200"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <nav className="space-y-4">
              {navigation.map((item) => (
                <div key={item.name}>
                  <Link
                    href={item.href}
                    className="block text-neutral-500 hover:text-primary transition-colors duration-200 font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                  {item.children && (
                    <div className="ml-4 mt-2 space-y-2">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          className="block text-sm text-neutral-500 hover:text-primary transition-colors duration-200"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </motion.div>
      )}
    </header>
  );
}