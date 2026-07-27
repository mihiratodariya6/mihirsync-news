import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Zap, Globe, Target, MapPin, Mail } from 'lucide-react';
import { Metadata } from 'next';

// 🚀 FULL SEO & GEO-TARGETING FOR ADSENSE
export const metadata: Metadata = {
  title: "About Us | MihirSync - India's Fastest Growing News Portal",
  description: "Learn about MihirSync Media. Based in Surat, Gujarat, we are dedicated to providing fast, accurate, and unbiased news on Technology, AI, Business, and World events.",
  keywords: "About MihirSync, MihirSync News, Surat News Agency, Gujarat News Portal, Unbiased News India, Technology News Website, MihirSync Editorial Team",
  openGraph: {
    title: "About MihirSync Media",
    description: "Discover our mission to deliver truth and speed in journalism. Reporting locally from Surat, reaching globally.",
    url: "https://mihirsync.com/about",
    siteName: "MihirSync",
    type: "website",
  }
};

export default async function AboutUsPage({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang || 'en';

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      
      {/* 🚀 Hero Section */}
      <div className="bg-[#0b1120] pt-24 pb-32 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(#3b82f6 1px, transparent 1px)", backgroundSize: "30px 30px" }}></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="text-blue-500 font-bold tracking-widest uppercase text-sm mb-4 block">Who We Are</span>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight leading-tight">
            Delivering the Truth,<br/> At the Speed of Light.
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            MihirSync is a next-generation digital news enterprise headquartered in Surat, Gujarat. We bridge the gap between global happenings and local awareness.
          </p>
        </div>
      </div>

      {/* 🚀 Main Content Wrapper */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 -mt-16 relative z-20">
        
        {/* Mission & Vision Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 hover:border-blue-200 transition-colors">
            <Target size={40} className="text-blue-600 mb-6" />
            <h2 className="text-2xl font-black text-slate-800 mb-4">Our Mission</h2>
            <p className="text-slate-600 leading-relaxed font-medium">
              To empower citizens with unfiltered, verified, and rapidly accessible information. We strive to be the most trusted voice in Technology, AI, Business, and Global Politics by eliminating fake news and bias.
            </p>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 hover:border-blue-200 transition-colors">
            <Globe size={40} className="text-blue-600 mb-6" />
            <h2 className="text-2xl font-black text-slate-800 mb-4">Our Vision</h2>
            <p className="text-slate-600 leading-relaxed font-medium">
              To become the world's leading multi-lingual digital news platform. From the heart of Surat to every corner of the globe, we envision a world connected by facts and powered by advanced journalism tech.
            </p>
          </div>
        </div>

        {/* The MihirSync Difference (Great for AdSense Trust) */}
        <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-8 md:p-12 mb-16">
          <h2 className="text-3xl font-black text-slate-800 mb-10 text-center">Why Choose MihirSync?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Zap size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Lightning Fast</h3>
              <p className="text-sm text-slate-500 font-medium">Our enterprise CMS and AI tools ensure that breaking news reaches your screen before anyone else.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <ShieldCheck size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">100% Fact-Checked</h3>
              <p className="text-sm text-slate-500 font-medium">Every article goes through rigorous multi-level verification. We have a zero-tolerance policy for fake news.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Globe size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Multi-Lingual</h3>
              <p className="text-sm text-slate-500 font-medium">News has no language barrier. We provide seamless reading experiences in English, Gujarati, and Hindi.</p>
            </div>
          </div>
        </div>

        {/* Company Info / Contact Info (Crucial for AdSense) */}
        <div className="bg-slate-900 rounded-3xl p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="md:w-2/3">
            <h2 className="text-3xl font-black mb-4">Headquartered in Gujarat, India</h2>
            <p className="text-slate-400 font-medium leading-relaxed mb-6">
              MihirSync Media is proudly rooted in Surat. Our editorial team works round the clock to ensure you never miss an update that impacts your life, your business, or your future.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex items-center gap-3">
                <MapPin className="text-blue-500" size={20} />
                <span className="text-sm font-bold">Surat, Gujarat - 395006</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="text-blue-500" size={20} />
                <span className="text-sm font-bold">mihirsync1@gmail.com</span>
              </div>
            </div>
          </div>
          <div className="md:w-1/3 flex justify-center md:justify-end w-full">
            <Link href={`/${lang}/contact`} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-bold shadow-lg transition-transform hover:scale-105 active:scale-95 text-center w-full md:w-auto">
              Contact Editorial Team
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}