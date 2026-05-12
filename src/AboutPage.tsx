import React from 'react';
import { motion } from 'motion/react';
import SEO from './components/SEO';
import { TrendingUp, Zap, Globe, Cpu, Rocket, ShieldCheck } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="pt-24 pb-16 min-h-screen">
      <SEO 
        title="About MihirSync | Global AI-Powered News & Breaking Stories"
        description="Learn about MihirSync, a modern AI-powered global news platform delivering breaking news, technology updates, business insights, world affairs, sports, entertainment, and trending stories at lightning speed."
        ogType="website"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-12"
        >
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-6xl font-display font-extrabold tracking-tight">
              About Mihir<span className="text-brand-red">Sync</span>
            </h1>
            <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Leading the future of digital journalism through AI-powered precision and global perspective.
            </p>
          </div>

          {/* Hero Image / Placeholder */}
          <div className="aspect-video bg-gray-100 dark:bg-white/5 rounded-3xl overflow-hidden relative group">
            <img 
              src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop" 
              alt="MihirSync Global Reach" 
              className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <Zap className="w-20 h-20 text-brand-red fill-current" />
            </div>
          </div>

          {/* Content Section */}
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-lg leading-relaxed">
              MihirSync is a modern digital news platform focused on delivering fast, reliable, and engaging news from around the world. 
              Our mission is to make global information accessible in a smarter, faster, and more user-friendly way.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
              <div className="bg-gray-50 dark:bg-white/5 p-8 rounded-2xl border border-gray-100 dark:border-white/10">
                <h3 className="flex items-center text-brand-red font-bold text-xl mb-4">
                  <Globe className="w-6 h-6 mr-3" /> What We Cover
                </h3>
                <ul className="grid grid-cols-1 gap-2 text-sm font-medium">
                  <li>• Breaking News</li>
                  <li>• World News</li>
                  <li>• Technology & AI</li>
                  <li>• Business & Finance</li>
                  <li>• Sports & Entertainment</li>
                  <li>• Startups & Science</li>
                  <li>• Viral & Trending Stories</li>
                </ul>
              </div>
              
              <div className="bg-gray-50 dark:bg-white/5 p-8 rounded-2xl border border-gray-100 dark:border-white/10">
                <h3 className="flex items-center text-brand-red font-bold text-xl mb-4">
                  <Rocket className="w-6 h-6 mr-3" /> Our Mission
                </h3>
                <p className="text-sm leading-relaxed">
                  We combine AI-powered technology with modern journalism to provide readers with real-time updates and high-quality news experiences. 
                  We believe news should be fast, accurate, and accessible worldwide.
                </p>
              </div>
            </div>

            <h2 className="font-display font-bold text-3xl mt-12 mb-6">Built for the Modern Reader</h2>
            <p>
              At MihirSync, we believe that news should be:
            </p>
            <div className="flex flex-wrap gap-4 mb-12">
              {['Fast', 'Accurate', 'Easy to Understand', 'Mobile-friendly', 'Worldwide'].map((trait) => (
                <span key={trait} className="bg-brand-red text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                  {trait}
                </span>
              ))}
            </div>

            <p>
              We are building the future of digital media with advanced AI systems, modern storytelling, 
              and a premium reading experience optimized for every device.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
