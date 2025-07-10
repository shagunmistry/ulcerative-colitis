import Link from 'next/link';

const footerLinks = {
  learn: [
    { name: 'About UC', href: '/learn/about-uc' },
    { name: 'Treatments', href: '/learn/treatments' },
    { name: 'Living with UC', href: '/learn/living-with-uc' },
  ],
  tools: [
    { name: 'Symptom Tracker', href: '/tools/symptom-tracker' },
    { name: 'Diet Guide', href: '/tools/diet-guide' },
    { name: 'Exercise', href: '/tools/exercise' },
  ],
  resources: [
    { name: 'Research', href: '/resources/research' },
    { name: 'FAQ', href: '/resources/faq' },
    // { name: 'Community', href: '/community' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Medical Disclaimer', href: '/disclaimer' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-neutral-50 border-t border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">UC</span>
              </div>
              <span className="text-xl font-semibold text-foreground">UC Guide</span>
            </Link>
            <p className="text-sm text-neutral-500 max-w-xs">
              Your comprehensive guide to understanding and managing Ulcerative Colitis. 
              Evidence-based information and practical tools in one place.
            </p>
          </div>

          {/* Learn */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Learn</h3>
            <ul className="space-y-2">
              {footerLinks.learn.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-500 hover:text-primary transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools & Resources */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Tools & Resources</h3>
            <ul className="space-y-2">
              {[...footerLinks.tools, ...footerLinks.resources].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-500 hover:text-primary transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-500 hover:text-primary transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-neutral-200 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-neutral-500">
            © 2024 UC Guide. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <p className="text-xs text-neutral-400">
              Not a substitute for professional medical advice. Always consult your healthcare provider.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}