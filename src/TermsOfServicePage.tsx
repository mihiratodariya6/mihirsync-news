import React from 'react';
import { motion } from 'motion/react';
import SEO from './components/SEO';
import { Scale, FileText, AlertTriangle, ExternalLink, ShieldAlert } from 'lucide-react';

export default function TermsOfServicePage() {
  const lastUpdated = "May 12, 2026";

  return (
    <div className="pt-24 pb-16 min-h-screen bg-gray-50 dark:bg-brand-dark">
      <SEO 
        title="Terms of Service | MihirSync"
        description="Review the MihirSync Terms of Service for rules, policies, and usage guidelines for our digital news platform."
        ogType="website"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-white/5 rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 dark:border-white/10"
        >
          <div className="space-y-6 mb-12">
            <h1 className="text-4xl md:text-6xl font-display font-extrabold tracking-tight">
              Terms of <span className="text-brand-red">Service</span>
            </h1>
            <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Last Updated: {lastUpdated}</p>
            <p className="text-lg text-gray-500 leading-relaxed">
              By accessing and using MihirSync, you agree to comply with the following terms and usage guidelines. 
              Please read them carefully.
            </p>
          </div>

          <div className="space-y-12 prose prose-lg dark:prose-invert max-w-none">
            <section className="space-y-4">
              <h2 className="flex items-center text-2xl font-bold">
                <Scale className="w-6 h-6 mr-3 text-brand-red" /> Usage Terms
              </h2>
              <ul className="space-y-3">
                <li><span className="font-bold">Informational Purposes:</span> All content provided is for informational purposes only.</li>
                <li><span className="font-bold">Copyright:</span> Users may not copy, republish, or distribute our content without explicit written permission.</li>
                <li><span className="font-bold">Prohibited Activity:</span> Users must avoid any abusive, harmful, or illegal activity while interacting with our platform.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="flex items-center text-2xl font-bold">
                <ShieldAlert className="w-6 h-6 mr-3 text-brand-red" /> Content Policy
              </h2>
              <p>
                MihirSync reserves the right to moderate comments, remove spam, and protect community standards. 
                We aim to maintain a respectful and factual environment for all global readers.
              </p>
            </section>

            <section className="space-y-4">
              <div className="bg-amber-100/50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 p-6 rounded-2xl flex gap-4">
                <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0 mt-1" />
                <div>
                  <h3 className="text-amber-700 dark:text-amber-500 font-bold m-0">Disclaimers</h3>
                  <p className="text-sm text-amber-700/80 dark:text-amber-500/80 m-0 leading-relaxed">
                    While we strive for absolute accuracy in our reporting, news content may change rapidly as stories develop. 
                    MihirSync is not liable for outcomes based on information found on this platform.
                  </p>
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="flex items-center text-2xl font-bold">
                <ExternalLink className="w-6 h-6 mr-3 text-brand-red" /> Third-Party Links
              </h2>
              <p>
                Our platform may contain links to external websites, sources, and advertisements. 
                We do not control the content or policies of these third-party platforms.
              </p>
            </section>

            <div className="pt-12 border-t border-gray-100 dark:border-white/10">
              <p className="text-sm text-gray-400">
                Continuing to use the platform implies acceptance of these terms. For legal inquiries, contact <span className="text-brand-red font-bold">legal@mihirsync.com</span>.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
