import React from 'react';
import { PenTool, Scale, Eye, Search, BookOpen, Users } from 'lucide-react';
import { Metadata } from 'next';

// 🚀 FULL SEO & GOOGLE NEWS APPROVAL METADATA
export const metadata: Metadata = {
  title: "Editorial Policy | MihirSync Media",
  description: "Read the Editorial Policy of MihirSync. Our core principles of ethical journalism, unbiased reporting, fact-checking, and editorial independence.",
  keywords: "Editorial Policy MihirSync, Journalism ethics, unbiased news policy, Google News guidelines, objective reporting India",
  openGraph: {
    title: "Editorial Policy | MihirSync Media",
    description: "Our commitment to truth, accuracy, and ethical journalism.",
    url: "https://mihirsync.com/editorial-policy",
    type: "website",
  }
};

export default async function EditorialPolicyPage({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang || 'en';

  return (
    <div className="bg-slate-50 min-h-screen pb-20 font-sans">
      
      {/* 🚀 Header Section */}
      <div className="bg-[#0b1120] pt-24 pb-28 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(#3b82f6 1px, transparent 1px)", backgroundSize: "30px 30px" }}></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <PenTool size={48} className="text-blue-500 mx-auto mb-6 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
          <h1 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight">
            Editorial Policy
          </h1>
          <p className="text-slate-400 font-medium max-w-2xl mx-auto text-lg">
            Our unwavering commitment to truth, accuracy, and ethical journalism.
          </p>
        </div>
      </div>

      {/* 🚀 Main Content Wrapper */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 -mt-16 relative z-20">
        
        {/* Intro Card */}
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 p-8 md:p-12 mb-10">
          <h2 className="text-2xl font-black text-slate-900 mb-4 flex items-center gap-2"><BookOpen size={24} className="text-blue-600"/> Core Philosophy</h2>
          <p className="text-slate-700 leading-relaxed font-medium text-lg">
            At <strong className="text-slate-900">MihirSync Media</strong>, journalism is a public trust. Our primary mission is to serve the public by finding and reporting the truth. We believe that independent, rigorously fact-checked, and unbiased reporting is essential for a functioning democracy and an informed global society.
          </p>
        </div>

        {/* Policy Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          
          <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 hover:border-blue-200 transition-colors">
            <Search size={32} className="text-blue-600 mb-5" />
            <h3 className="text-xl font-black text-slate-800 mb-3">1. Accuracy & Verification</h3>
            <p className="text-slate-600 leading-relaxed">
              Accuracy is the foundation of our journalism. Our reporters and editors must verify facts before publication. We rely on primary sources, official documents, and direct reporting. Rumors and unverified viral content are never published as news.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 hover:border-blue-200 transition-colors">
            <Scale size={32} className="text-blue-600 mb-5" />
            <h3 className="text-xl font-black text-slate-800 mb-3">2. Fairness & Objectivity</h3>
            <p className="text-slate-600 leading-relaxed">
              We present facts without taking sides. Our news reports remain strictly neutral, separating facts from opinions. We ensure that all relevant parties involved in a story are given a fair opportunity to present their point of view before publication.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 hover:border-blue-200 transition-colors">
            <Eye size={32} className="text-blue-600 mb-5" />
            <h3 className="text-xl font-black text-slate-800 mb-3">3. Independence & Integrity</h3>
            <p className="text-slate-600 leading-relaxed">
              MihirSync maintains strict editorial independence. Our news coverage is not influenced by political parties, corporate advertisers, or special interest groups. Our loyalty lies solely with our readers.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 hover:border-blue-200 transition-colors">
            <Users size={32} className="text-blue-600 mb-5" />
            <h3 className="text-xl font-black text-slate-800 mb-3">4. Diversity & Inclusion</h3>
            <p className="text-slate-600 leading-relaxed">
              We are committed to reflecting the diversity of our society. We actively seek out diverse voices, perspectives, and stories that might otherwise be ignored by mainstream media. We do not tolerate hate speech or discrimination in our reporting.
            </p>
          </div>

        </div>

        {/* 🚀 Separation of News and Opinion */}
        <div className="bg-blue-50 rounded-3xl p-8 md:p-12 border border-blue-100 mb-10">
          <h2 className="text-2xl font-black text-slate-900 mb-4">5. Clear Distinction: News vs. Opinion</h2>
          <p className="text-slate-700 leading-relaxed font-medium mb-4">
            We believe our readers should immediately know whether they are reading a factual news report or an opinion piece. 
          </p>
          <ul className="list-disc pl-5 space-y-2 text-slate-700 font-medium">
            <li><strong className="text-slate-900">News Articles:</strong> Strictly factual, unbiased, and objective.</li>
            <li><strong className="text-slate-900">Editorials/Opinions:</strong> Clearly labeled with tags like "Opinion" or "Editorial". These represent the views of the author and not necessarily the news organization.</li>
          </ul>
        </div>

        {/* Contact Editorial Team */}
        <div className="text-center bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
          <h2 className="text-xl font-black text-slate-900 mb-3">Feedback & Editorial Queries</h2>
          <p className="text-slate-600 mb-4">If you have questions about our journalism practices, or wish to provide feedback on our editorial standards, please contact our Editorial Board.</p>
          <a href="mailto:mihirsync1@gmail.com" className="inline-block bg-slate-900 hover:bg-blue-600 text-white font-bold px-6 py-3 rounded-full transition-colors">
            Email: mihirsync1@gmail.com
          </a>
        </div>

      </div>
    </div>
  );
}