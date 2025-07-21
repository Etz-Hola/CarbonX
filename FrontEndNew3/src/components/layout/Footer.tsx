import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Twitter, Github, Disc as Discord, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { label: 'Trade', path: '/trade' },
      { label: 'Stake', path: '/stake' },
      { label: 'Impact', path: '/impact' },
      { label: 'Retirement', path: '/retirement' },
    ],
    resources: [
      { label: 'Documentation', path: '/docs' },
      { label: 'API', path: '/api' },
      { label: 'Blog', path: '/blog' },
      { label: 'Help Center', path: '/help' },
    ],
    company: [
      { label: 'About', path: '/about' },
      { label: 'Careers', path: '/careers' },
      { label: 'Privacy Policy', path: '/privacy' },
      { label: 'Terms of Service', path: '/terms' },
    ],
  };

  const socialLinks = [
    { icon: Twitter, href: 'https://twitter.com/carbonx', label: 'Twitter' },
    { icon: Discord, href: 'https://discord.gg/carbonx', label: 'Discord' },
    { icon: Github, href: 'https://github.com/carbonx', label: 'GitHub' },
    { icon: Mail, href: 'mailto:hello@carbonx.io', label: 'Email' },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-emerald-600 rounded-lg">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">CarbonX</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-sm">
              Democratizing carbon credit trading through fractionalization and DeFi incentives.
              Join the fight against climate change.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-gray-400 hover:text-emerald-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {currentYear} CarbonX. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm">
              Built with 💚 for the planet
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};