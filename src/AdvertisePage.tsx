import React from 'react';
import { motion } from 'motion/react';
import SEO from './components/SEO';
import { BarChart3, Target, MousePointer2, Megaphone, Smartphone, Star, CheckCircle2, ArrowRight } from 'lucide-react';

export default function AdvertisePage() {
  return (
    <div className="pt-24 pb-16 min-h-screen">
      <SEO 
        title="Advertise With MihirSync | Global Digital Advertising Platform"
        description="Advertise with MihirSync and reach a global audience through premium digital news advertising, sponsored content, and brand campaigns."
        ogType="website"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        {/* Hero */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-8 py-12"
        >
          <div className="inline-flex items-center space-x-2 bg-brand-red/10 text-brand-red px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
            <Star className="w-3 h-3 fill-current" />
            <span>Premium Advertising Solutions</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-extrabold tracking-tight max-w-5xl mx-auto">
            Reach a <span className="text-brand-red">Global</span> Tech-Minded Audience
          </h1>
          <p className="text-xl text-gray-500 max-w-3xl mx-auto leading-relaxed">
            Partner with MihirSync to grow your brand. We deliver targeted, 
            high-impact advertising for the world's most innovative companies.
          </p>
          <div className="flex justify-center pt-4">
            <button className="bg-brand-red text-white px-10 py-5 rounded-full font-bold text-lg hover:scale-105 transition-all shadow-2xl shadow-brand-red/30">
              Start Advertising
            </button>
          </div>
        </motion.div>

        {/* Audience Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="bg-gray-50 dark:bg-white/5 p-8 rounded-3xl text-center border border-gray-100 dark:border-white/10">
            <p className="text-4xl font-display font-extrabold text-brand-red">5M+</p>
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mt-2">Monthly Views</p>
          </div>
          <div className="bg-gray-50 dark:bg-white/5 p-8 rounded-3xl text-center border border-gray-100 dark:border-white/10">
            <p className="text-4xl font-display font-extrabold text-brand-red">72%</p>
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mt-2">Tech Focused</p>
          </div>
          <div className="bg-gray-50 dark:bg-white/5 p-8 rounded-3xl text-center border border-gray-100 dark:border-white/10">
            <p className="text-4xl font-display font-extrabold text-brand-red">15M</p>
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mt-2">Global Reach</p>
          </div>
          <div className="bg-gray-50 dark:bg-white/5 p-8 rounded-3xl text-center border border-gray-100 dark:border-white/10">
            <p className="text-4xl font-display font-extrabold text-brand-red">8.4m</p>
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mt-2">Avg. Session</p>
          </div>
        </div>

        {/* Advertising Options */}
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-display font-bold">Advertising Options</h2>
            <p className="text-gray-500">Choose the format that fits your brand goals.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-white dark:bg-white/5 rounded-3xl border border-gray-100 dark:border-white/10 hover:border-brand-red transition-all group">
              <Megaphone className="w-10 h-10 text-brand-red mb-6" />
              <h3 className="text-2xl font-bold mb-4">Sponsored Stories</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">
                Native articles written by our editorial team or provided by your brand, optimized for SEO and engagement.
              </p>
              <div className="text-brand-red font-bold text-sm flex items-center">
                Learn More <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-all" />
              </div>
            </div>
            
            <div className="p-8 bg-white dark:bg-white/5 rounded-3xl border border-gray-100 dark:border-white/10 hover:border-brand-red transition-all group">
              <Smartphone className="w-10 h-10 text-brand-red mb-6" />
              <h3 className="text-2xl font-bold mb-4">Mobile Hub Ads</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">
                High-visibility mobile banners and interstitial units designed for our high-traffic mobile application.
              </p>
              <div className="text-brand-red font-bold text-sm flex items-center">
                Learn More <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-all" />
              </div>
            </div>

            <div className="p-8 bg-white dark:bg-white/5 rounded-3xl border border-gray-100 dark:border-white/10 hover:border-brand-red transition-all group">
              <BarChart3 className="w-10 h-10 text-brand-red mb-6" />
              <h3 className="text-2xl font-bold mb-4">Newsletter Blasts</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">
                Direct placement in our daily morning briefings sent to hundreds of thousands of engaged subscribers.
              </p>
              <div className="text-brand-red font-bold text-sm flex items-center">
                Learn More <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-all" />
              </div>
            </div>
          </div>
        </div>

        {/* Why partner */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center bg-brand-dark rounded-[3rem] p-8 md:p-20 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-red/20 blur-[120px] rounded-full -mr-48 -mt-48" />
          
          <div className="space-y-8 relative z-10">
            <h2 className="text-4xl md:text-5xl font-display font-bold leading-tight">
              Why Partner With <br/> <span className="text-brand-red">MihirSync?</span>
            </h2>
            <div className="space-y-6">
              {[
                { title: 'AI-Driven Targeting', desc: 'Precision delivery to users most likely to engage with your products.' },
                { title: 'Global News Hub', desc: 'Reach readers across continents in real-time.' },
                { title: 'Mobile-First Traffic', desc: 'Optimized for the way modern users consume digital media.' },
                { title: 'SEO Optimized', desc: 'Your content stays visible and searchable long after publication.' }
              ].map((item) => (
                <div key={item.title} className="flex gap-4">
                  <CheckCircle2 className="w-6 h-6 text-brand-red shrink-0" />
                  <div>
                    <h4 className="font-bold">{item.title}</h4>
                    <p className="text-gray-400 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative z-10 hidden lg:block">
            <div className="aspect-square bg-white/5 rounded-3xl border border-white/10 p-12 flex flex-col justify-center space-y-8">
              <div className="space-y-2">
                <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Case Study</p>
                <h3 className="text-3xl font-display font-bold italic">"MihirSync delivered 3x higher CTR than traditional media for our AI launch."</h3>
                <p className="text-brand-red font-bold">— CMO, Global AI Startup</p>
              </div>
              <div className="h-1 bg-white/10 w-full" />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-2xl font-bold">240%</p>
                  <p className="text-xs text-gray-500 uppercase">Growth</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">12k+</p>
                  <p className="text-xs text-gray-500 uppercase">Conversions</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center space-y-8 pb-12">
          <h2 className="text-4xl font-display font-bold">Ready to Launch Your Campaign?</h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Contact our advertising team today for a custom proposal and media kit.
          </p>
          <a href="mailto:advertise@mihirsync.com" className="inline-flex items-center bg-brand-red text-white px-10 py-5 rounded-full font-bold text-lg hover:scale-105 transition-all shadow-2xl shadow-brand-red/30">
            Email Strategy Team <ArrowRight className="w-5 h-5 ml-2" />
          </a>
        </div>
      </div>
    </div>
  );
}
