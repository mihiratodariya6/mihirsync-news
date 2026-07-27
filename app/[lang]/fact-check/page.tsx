import React from 'react';
import { ShieldCheck, Search, FileSearch, AlertOctagon, CheckCircle2, MessageSquareWarning } from 'lucide-react';
import { Metadata } from 'next';

// 🚀 FULL SEO & GOOGLE NEWS APPROVAL METADATA
export const metadata: Metadata = {
  title: "Fact Check Policy | MihirSync Media",
  description: "Learn about MihirSync's rigorous Fact Check Policy. Discover how our editorial team verifies sources, debunks fake news, and ensures 100% reporting accuracy.",
  keywords: "Fact Check Policy MihirSync, Fake news debunking, news verification process, accurate journalism India, fact-checking methodology",
  openGraph: {
    title: "Fact Check Policy | MihirSync Media",
    description: "Our strict 5-step process to combat fake news and deliver absolute truth.",
    url: "https://mihirsync.com/fact-check",
    type: "website",
  }
};

export default async function FactCheckPolicyPage({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang || 'en';

  return (
    <div className="bg-slate-50 min-h-screen pb-20 font-sans">
      
      {/* 🚀 Header Section */}
      <div className="bg-[#0b1120] pt-24 pb-28 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(#3b82f6 1px, transparent 1px)", backgroundSize: "30px 30px" }}></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <ShieldCheck size={48} className="text-green-500 mx-auto mb-6 drop-shadow-[0_0_15px_rgba(34,197,94,0.5)]" />
          <h1 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight">
            Fact Check Policy
          </h1>
          <p className="text-slate-400 font-medium max-w-2xl mx-auto text-lg">
            Our unwavering commitment to combating fake news and delivering 100% verified truth.
          </p>
        </div>
      </div>

      {/* 🚀 Main Content Wrapper */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 -mt-16 relative z-20">
        
        {/* Intro Card */}
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 p-8 md:p-12 mb-10">
          <p className="text-slate-700 leading-relaxed font-medium text-lg">
            In the age of social media, misinformation travels faster than the truth. At <strong className="text-slate-900">MihirSync Media</strong>, we view fact-checking not just as a policy, but as the core duty of our journalism. We have established a rigorous, multi-layered verification process to ensure that every piece of information we publish is entirely accurate.
          </p>
        </div>

        {/* 🚀 5-Step Fact-Checking Methodology */}
        <h2 className="text-3xl font-black text-slate-800 mb-8 text-center">Our 5-Step Verification Process</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 hover:border-green-300 hover:shadow-lg transition-all">
            <Search size={32} className="text-green-600 mb-5" />
            <h3 className="text-xl font-black text-slate-800 mb-3">1. Primary Source Tracking</h3>
            <p className="text-slate-600 leading-relaxed">
              We never rely on hearsay or secondary reporting. Our journalists are trained to trace every claim back to its primary source—whether it’s an official government document, a direct quote from a verified press conference, or on-ground visual evidence.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 hover:border-green-300 hover:shadow-lg transition-all">
            <CheckCircle2 size={32} className="text-green-600 mb-5" />
            <h3 className="text-xl font-black text-slate-800 mb-3">2. Cross-Verification</h3>
            <p className="text-slate-600 leading-relaxed">
              A single source is never enough for major breaking news. We cross-verify data and statements using at least two independent and credible sources before treating any claim as a publishable fact.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 hover:border-green-300 hover:shadow-lg transition-all">
            <FileSearch size={32} className="text-green-600 mb-5" />
            <h3 className="text-xl font-black text-slate-800 mb-3">3. Digital Forensics</h3>
            <p className="text-slate-600 leading-relaxed">
              To combat deepfakes and manipulated media, our tech team uses reverse image searches, video metadata analysis, and AI-detection tools to authenticate photos, audio clips, and videos before publishing them.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 hover:border-green-300 hover:shadow-lg transition-all">
            <AlertOctagon size={32} className="text-green-600 mb-5" />
            <h3 className="text-xl font-black text-slate-800 mb-3">4. Expert Consultation</h3>
            <p className="text-slate-600 leading-relaxed">
              When reporting on complex subjects like Technology, AI, Healthcare, or Finance, we consult Subject Matter Experts (SMEs) to ensure that technical jargon and data are interpreted and presented correctly.
            </p>
          </div>

        </div>

        {/* 🚀 How Readers Can Help (Crucial for Trust) */}
        <div className="bg-green-50 rounded-3xl p-8 md:p-12 border border-green-200 mb-10 flex flex-col md:flex-row gap-8 items-center">
          <div className="md:w-2/3">
            <h2 className="text-2xl font-black text-slate-900 mb-4 flex items-center gap-2">
              <MessageSquareWarning className="text-green-600"/> Spot Something Fake?
            </h2>
            <p className="text-slate-700 leading-relaxed font-medium mb-4">
              We believe fact-checking is a collaborative effort. If you find any article on our platform that contains factual errors, or if you want us to fact-check a viral WhatsApp forward or social media post, please let us know.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-slate-700 font-medium">
              <li>Include the link to our article or the viral claim.</li>
              <li>Provide any credible proof or sources you have.</li>
            </ul>
          </div>
          <div className="md:w-1/3 flex justify-center w-full">
            <a href="mailto:mihirsync1@gmail.com" className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full font-bold shadow-lg shadow-green-600/30 transition-transform hover:scale-105 active:scale-95 text-center w-full">
              Submit a Fact Check
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}