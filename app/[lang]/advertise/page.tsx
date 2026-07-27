import React from 'react';
import { Megaphone, Target, BarChart, Globe, Zap, Mail, LayoutTemplate, PlaySquare } from 'lucide-react';
import { Metadata } from 'next';

// 🚀 FULL SEO FOR ADVERTISERS & SPONSORS
export const metadata: Metadata = {
  title: "Advertise With Us | MihirSync - Premium Digital News Advertising",
  description: "Scale your brand with MihirSync Media. Reach millions of highly engaged users across India and globally. We offer display ads, native content, and video sponsorships.",
  keywords: "Advertise on MihirSync, digital news advertising India, sponsored articles Gujarat, display ads Surat, media kit advertising, reach Indian audience",
  openGraph: {
    title: "Advertise With MihirSync Media",
    description: "Connect your brand with millions of active readers globally and locally in India.",
    url: "https://mihirsync.com/advertise",
    type: "website",
  }
};

export default async function AdvertisePage() {
  return (
    <div className="bg-slate-50 min-h-screen pb-20 font-sans">
      
      {/* 🚀 Hero Section */}
      <div className="bg-[#0b1120] pt-24 pb-32 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(#3b82f6 1px, transparent 1px)", backgroundSize: "30px 30px" }}></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <Megaphone size={56} className="text-blue-500 mx-auto mb-6 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight leading-tight">
            Amplify Your Brand <br/>With MihirSync
          </h1>
          <p className="text-lg md:text-xl text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed">
            Partner with India's fastest-growing digital news network. Reach a highly engaged, premium audience across Surat, Gujarat, India, and the world.
          </p>
        </div>
      </div>

      {/* 🚀 Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 -mt-16 relative z-20 space-y-12">
        
        {/* Stats Grid */}
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 p-8 md:p-12">
          <h2 className="text-3xl font-black text-slate-900 mb-8 text-center">Why Partner With Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100">
              <Globe size={40} className="text-blue-600 mx-auto mb-4" />
              <h3 className="text-4xl font-black text-slate-900 mb-2">10M+</h3>
              <p className="text-slate-600 font-bold uppercase tracking-wider text-sm">Monthly Impressions</p>
            </div>
            <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100">
              <Target size={40} className="text-blue-600 mx-auto mb-4" />
              <h3 className="text-4xl font-black text-slate-900 mb-2">Tier 1</h3>
              <p className="text-slate-600 font-bold uppercase tracking-wider text-sm">Audience Quality</p>
            </div>
            <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100">
              <BarChart size={40} className="text-blue-600 mx-auto mb-4" />
              <h3 className="text-4xl font-black text-slate-900 mb-2">15+</h3>
              <p className="text-slate-600 font-bold uppercase tracking-wider text-sm">Content Categories</p>
            </div>
          </div>
          <p className="text-slate-600 mt-8 text-center max-w-3xl mx-auto font-medium leading-relaxed">
            Our audience consists of tech enthusiasts, business leaders, investors, and active consumers. By advertising with MihirSync, your brand is placed seamlessly alongside high-quality, trusted journalism.
          </p>
        </div>

        {/* Ad Solutions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-200 hover:border-blue-300 transition-colors">
            <LayoutTemplate size={32} className="text-blue-600 mb-4" />
            <h3 className="text-2xl font-black text-slate-900 mb-3">Display Advertising</h3>
            <p className="text-slate-600 leading-relaxed font-medium">
              High-impact banner ads, sticky sidebars, and interstitial formats designed to maximize CTR without disrupting the reading experience. Geo-targeted campaigns available for specific regions like Gujarat or pan-India.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-200 hover:border-blue-300 transition-colors">
            <Zap size={32} className="text-blue-600 mb-4" />
            <h3 className="text-2xl font-black text-slate-900 mb-3">Sponsored Content</h3>
            <p className="text-slate-600 leading-relaxed font-medium">
              Native articles and advertorials written by our expert content team. Tell your brand's story in a way that resonates with our audience. Fully SEO-optimized to ensure long-term visibility on search engines.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-200 hover:border-blue-300 transition-colors">
            <PlaySquare size={32} className="text-blue-600 mb-4" />
            <h3 className="text-2xl font-black text-slate-900 mb-3">Video & Multimedia</h3>
            <p className="text-slate-600 leading-relaxed font-medium">
              Pre-roll video ads, integrated YouTube sponsorships, and custom short-form video content (Reels/Shorts) distributed across MihirSync's growing social media network.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-200 hover:border-blue-300 transition-colors">
            <Mail size={32} className="text-blue-600 mb-4" />
            <h3 className="text-2xl font-black text-slate-900 mb-3">Newsletter Sponsorship</h3>
            <p className="text-slate-600 leading-relaxed font-medium">
              Reach our most loyal readers directly in their inbox. Our daily and weekly email newsletters boast an impressive open rate, putting your brand front and center.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-900 rounded-3xl p-10 md:p-16 text-white text-center shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-black mb-6">Let's Build Your Campaign</h2>
          <p className="text-blue-100 font-medium mb-8 max-w-2xl mx-auto text-lg">
            Request our full Media Kit, rate card, and audience demographics report. Our sales team based in Surat is ready to craft a custom strategy for you.
          </p>
          <a href="mailto:mihirsync1@gmail.com" className="inline-flex items-center gap-3 bg-white text-blue-700 font-black px-10 py-4 rounded-full shadow-lg hover:scale-105 transition-transform text-lg">
            <Mail size={24}/> Contact Sales: mihirsync1@gmail.com
          </a>
        </div>

      </div>
    </div>
  );
}