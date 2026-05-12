import React from 'react';
import { motion } from 'motion/react';
import SEO from './components/SEO';
import { Shield, Eye, Lock, Globe, FileText, UserCheck } from 'lucide-react';

export default function PrivacyPolicyPage() {
  const lastUpdated = "May 12, 2026";

  return (
    <div className="pt-24 pb-16 min-h-screen bg-gray-50 dark:bg-brand-dark">
      <SEO 
        title="Privacy Policy | MihirSync"
        description="Read the MihirSync Privacy Policy to understand how we collect, use, and protect user information on our global news platform."
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
              Privacy <span className="text-brand-red">Policy</span>
            </h1>
            <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Last Updated: {lastUpdated}</p>
            <p className="text-lg text-gray-500 leading-relaxed">
              At MihirSync, protecting user privacy and maintaining transparency are our top priorities. 
              This policy outlines how we handle your data when you use our platform.
            </p>
          </div>

          <div className="space-y-12 prose prose-lg dark:prose-invert max-w-none">
            <section className="space-y-4">
              <h2 className="flex items-center text-2xl font-bold">
                <Eye className="w-6 h-6 mr-3 text-brand-red" /> Data Collection
              </h2>
              <p>We may collect information when you interact with our platform:</p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none pl-0">
                <li className="flex items-center bg-gray-50 dark:bg-white/5 p-4 rounded-xl border border-gray-100 dark:border-white/10">
                  <UserCheck className="w-5 h-5 mr-3 text-brand-red" /> User email addresses (for newsletters)
                </li>
                <li className="flex items-center bg-gray-50 dark:bg-white/5 p-4 rounded-xl border border-gray-100 dark:border-white/10">
                  <Globe className="w-5 h-5 mr-3 text-brand-red" /> Device & Browser information
                </li>
                <li className="flex items-center bg-gray-50 dark:bg-white/5 p-4 rounded-xl border border-gray-100 dark:border-white/10">
                  <Shield className="w-5 h-5 mr-3 text-brand-red" /> Analytics data & engagement
                </li>
                <li className="flex items-center bg-gray-50 dark:bg-white/5 p-4 rounded-xl border border-gray-100 dark:border-white/10">
                  <FileText className="w-5 h-5 mr-3 text-brand-red" /> Cookies for personalization
                </li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="flex items-center text-2xl font-bold">
                <Brain className="w-6 h-6 mr-3 text-brand-red" /> How We Use Data
              </h2>
              <p>The information we collect is used to power your experience:</p>
              <ul>
                <li>Improve website performance and user interface.</li>
                <li>Personalize news recommendations using AI patterns.</li>
                <li>Send morning newsletters and breaking news alerts.</li>
                <li>Analyze traffic patterns to deliver relevant content.</li>
                <li>Prevent spam, abuse, and potential security threats.</li>
              </ul>
              <div className="bg-brand-red/10 border border-brand-red/20 p-6 rounded-2xl">
                <p className="text-brand-red font-bold m-0 flex items-center">
                  <Lock className="w-5 h-5 mr-2" /> We never sell personal user information to third parties.
                </p>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">Cookies Policy</h2>
              <p>
                MihirSync uses cookies to improve user experience, analytics, and website functionality. 
                Cookies allow us to remember your preferences (like Dark Mode) and provide a seamless navigation experience.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">User Rights</h2>
              <p>
                As a user, you have full control over your data. You may request data removal, 
                access a copy of your stored preferences, or unsubscribe from our communications at any time.
              </p>
            </section>

            <div className="pt-12 border-t border-gray-100 dark:border-white/10">
              <p className="text-sm text-gray-400">
                If you have any questions regarding this policy, please contact our privacy team at <span className="text-brand-red font-bold">privacy@mihirsync.com</span>.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

import { Brain } from 'lucide-react';
