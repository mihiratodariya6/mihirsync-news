import React from 'react';
import { RefreshCw, Edit3, Mail, CheckCircle, AlertCircle } from 'lucide-react';
import { Metadata } from 'next';

// 🚀 FULL SEO & GOOGLE NEWS APPROVAL METADATA
export const metadata: Metadata = {
  title: "Correction Policy | MihirSync Media",
  description: "MihirSync's Correction Policy. We believe in transparency and accountability. Learn how we correct factual errors in our news reports.",
  keywords: "Correction Policy MihirSync, News correction guidelines, report an error, journalism ethics India, transparent reporting",
  openGraph: {
    title: "Correction Policy | MihirSync Media",
    description: "Our commitment to acknowledging and correcting our mistakes transparently.",
    url: "https://mihirsync.com/correction-policy",
    type: "website",
  }
};

export default async function CorrectionPolicyPage({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang || 'en';

  return (
    <div className="bg-slate-50 min-h-screen pb-20 font-sans">
      
      {/* 🚀 Header Section */}
      <div className="bg-[#0b1120] pt-24 pb-28 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(#3b82f6 1px, transparent 1px)", backgroundSize: "30px 30px" }}></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <RefreshCw size={48} className="text-orange-500 mx-auto mb-6 drop-shadow-[0_0_15px_rgba(249,115,22,0.5)]" />
          <h1 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight">
            Correction Policy
          </h1>
          <p className="text-slate-400 font-medium max-w-2xl mx-auto text-lg">
            Because transparency and accountability are the foundations of public trust.
          </p>
        </div>
      </div>

      {/* 🚀 Main Content Wrapper */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 -mt-16 relative z-20">
        
        {/* Intro Card */}
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 p-8 md:p-12 mb-10">
          <p className="text-slate-700 leading-relaxed font-medium text-lg">
            At <strong className="text-slate-900">MihirSync Media</strong>, we strive for 100% accuracy in our reporting. However, journalism is a fast-paced endeavor, and occasionally, mistakes happen. When we make a factual error, our policy is to acknowledge it openly, correct it promptly, and explain the change to our readers. We do not stealth-edit or hide our mistakes.
          </p>
        </div>

        {/* 🚀 Our Process */}
        <h2 className="text-3xl font-black text-slate-800 mb-8 text-center">How We Handle Corrections</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 hover:border-orange-300 hover:shadow-lg transition-all">
            <Edit3 size={32} className="text-orange-600 mb-5" />
            <h3 className="text-xl font-black text-slate-800 mb-3">1. Factual Corrections</h3>
            <p className="text-slate-600 leading-relaxed">
              If a story contains a factual error (e.g., incorrect dates, names, locations, or data), we will update the text immediately. We will also append a <strong>"Correction Note"</strong> at the bottom of the article detailing what was changed and when.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 hover:border-orange-300 hover:shadow-lg transition-all">
            <AlertCircle size={32} className="text-orange-600 mb-5" />
            <h3 className="text-xl font-black text-slate-800 mb-3">2. Clarifications</h3>
            <p className="text-slate-600 leading-relaxed">
              If our reporting is factually accurate but the phrasing is misleading, vague, or lacks crucial context, we will rewrite the section and add a <strong>"Clarification Note"</strong> to explain the added context.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 hover:border-orange-300 hover:shadow-lg transition-all">
            <RefreshCw size={32} className="text-orange-600 mb-5" />
            <h3 className="text-xl font-black text-slate-800 mb-3">3. Major Updates</h3>
            <p className="text-slate-600 leading-relaxed">
              For breaking news, stories are constantly evolving. When significant new information is added to a developing story after its initial publication, we will mark the article with an <strong>"Updated"</strong> timestamp.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 hover:border-orange-300 hover:shadow-lg transition-all">
            <CheckCircle size={32} className="text-orange-600 mb-5" />
            <h3 className="text-xl font-black text-slate-800 mb-3">4. Social Media Corrections</h3>
            <p className="text-slate-600 leading-relaxed">
              If a factual error is made on our social media platforms (Facebook, X, Instagram, WhatsApp), we will issue a new post clarifying the mistake or delete the incorrect post and publish a corrected version with a transparent explanation.
            </p>
          </div>

        </div>

        {/* 🚀 Report an Error Box */}
        <div className="bg-orange-50 rounded-3xl p-8 md:p-12 border border-orange-200 mb-10 flex flex-col md:flex-row gap-8 items-center">
          <div className="md:w-2/3">
            <h2 className="text-2xl font-black text-slate-900 mb-4 flex items-center gap-2">
              <Mail className="text-orange-600"/> Report an Error
            </h2>
            <p className="text-slate-700 leading-relaxed font-medium mb-4">
              We rely on our readers to hold us accountable. If you spot a typographical, grammatical, or factual error in our reporting, we want to hear from you. 
            </p>
            <p className="text-slate-700 font-medium">
              Please send an email with the link to the article and the details of the error. Our editorial team will review the claim and take immediate action.
            </p>
          </div>
          <div className="md:w-1/3 flex justify-center w-full">
            <a href="mailto:mihirsync1@gmail.com" className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-full font-bold shadow-lg shadow-orange-600/30 transition-transform hover:scale-105 active:scale-95 text-center w-full">
              Email: mihirsync1@gmail.com
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}