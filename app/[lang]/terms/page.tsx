import React from 'react';
import { Scale, FileText, CheckCircle, AlertTriangle, Link as LinkIcon, Shield } from 'lucide-react';
import { Metadata } from 'next';

// 🚀 ADSENSE & SEO METADATA
export const metadata: Metadata = {
  title: "Terms & Conditions | MihirSync Media",
  description: "Read the Terms and Conditions for using MihirSync Media. Guidelines on content usage, intellectual property, third-party ads (AdSense), and user obligations.",
  keywords: "Terms and Conditions MihirSync, MihirSync terms of service, News portal terms, website usage policy, Surat news agency legal, copyright policy",
  openGraph: {
    title: "Terms & Conditions | MihirSync",
    description: "Terms of service and usage guidelines for MihirSync Media.",
    url: "https://mihirsync-news-9nvx.vercel.app/terms", // 👈 સાચું URL
    type: "website",
  }
};

export default async function TermsAndConditionsPage({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang || 'en';

  return (
    <div className="bg-slate-50 min-h-screen pb-20 font-sans selection:bg-blue-200 selection:text-blue-900">
      
      {/* 🚀 Header Section */}
      <div className="bg-[#0b1120] pt-24 pb-32 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(#3b82f6 1px, transparent 1px)", backgroundSize: "30px 30px" }}></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <Scale size={56} className="text-blue-500 mx-auto mb-6 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
            Terms & Conditions
          </h1>
          <p className="text-slate-400 font-medium max-w-xl mx-auto text-lg">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
      </div>

      {/* 🚀 Main Legal Content Wrapper */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-20 relative z-20">
        <div className="bg-white rounded-3xl shadow-2xl shadow-slate-200/50 border border-slate-200 p-8 md:p-12 text-slate-700 leading-relaxed space-y-12">

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-4 flex items-center gap-2"><FileText size={24} className="text-blue-600"/> 1. Introduction</h2>
            <p className="mb-4 text-slate-800 font-medium">
              Welcome to <strong className="font-black text-slate-900">MihirSync Media</strong>. These terms and conditions outline the rules and regulations for the use of MihirSync's Website, located at mihirsync-news-9nvx.vercel.app.
            </p>
            <p className="text-slate-600">
              By accessing this website we assume you accept these terms and conditions in full. Do not continue to use MihirSync if you do not agree to take all of the terms and conditions stated on this page.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-4 flex items-center gap-2"><CheckCircle size={24} className="text-blue-600"/> 2. Intellectual Property Rights</h2>
            <p className="mb-4 text-slate-600">
              Other than the content you own, under these Terms, MihirSync and/or its licensors own all the intellectual property rights and materials contained in this Website, including news reports, articles, photographs, videos, and graphics.
            </p>
            <p className="mb-4 text-slate-600">You are granted a limited license only for purposes of viewing the material contained on this Website.</p>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <p className="font-bold text-slate-800 mb-3">You must not:</p>
              <ul className="list-disc pl-5 space-y-2 text-slate-700 font-medium">
                <li>Republish material from MihirSync without prior written consent or proper credit.</li>
                <li>Sell, rent, or sub-license material from MihirSync.</li>
                <li>Reproduce, duplicate, or copy material from MihirSync for commercial purposes.</li>
                <li>Redistribute content from MihirSync (unless content is specifically made for redistribution).</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-4 flex items-center gap-2"><AlertTriangle size={24} className="text-blue-600"/> 3. User Comments & Content</h2>
            <p className="mb-4 text-slate-600">
              Parts of this website offer an opportunity for users to post and exchange opinions and information in certain areas of the website. MihirSync does not filter, edit, publish or review Comments prior to their presence on the website. Comments do not reflect the views and opinions of MihirSync, its agents, and/or affiliates.
            </p>
            <p className="text-slate-600">
              MihirSync reserves the right to monitor all Comments and to remove any Comments which can be considered inappropriate, offensive, defamatory, or causes a breach of these Terms and Conditions.
            </p>
          </section>

          {/* 🚀 ADDED FOR ADSENSE: Hyperlinking and Ads Policy */}
          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-4 flex items-center gap-2"><LinkIcon size={24} className="text-blue-600"/> 4. Hyperlinking & Third-Party Ads</h2>
            <p className="mb-4 text-slate-600">
              MihirSync uses third-party advertising companies (such as Google AdSense) to serve ads when you visit our website. These companies may use information about your visits to this and other websites in order to provide advertisements about goods and services of interest to you.
            </p>
            <p className="text-slate-600">
              Our website may contain links to third-party websites or services that are not owned or controlled by MihirSync. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites or services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-4 flex items-center gap-2"><Shield size={24} className="text-blue-600"/> 5. News Accuracy & Disclaimer</h2>
            <p className="mb-4 text-slate-600">
              While we strive to provide the fastest, most accurate, and verified news, the information provided on this website is for general informational purposes only. We make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability with respect to the website or the information, products, services, or related graphics contained on the website.
            </p>
            <p className="font-bold text-slate-800 bg-slate-50 p-4 rounded-xl border-l-4 border-slate-300">
              Any reliance you place on such information is therefore strictly at your own risk.
            </p>
          </section>

          <section className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-3xl border border-blue-100/50 relative overflow-hidden">
            <h2 className="text-2xl font-black text-slate-900 mb-4 relative z-10">6. Governing Law & Jurisdiction</h2>
            <p className="text-slate-700 relative z-10 font-medium">
              These Terms will be governed by and interpreted in accordance with the laws of the State of Gujarat, India. Any disputes relating to these terms and conditions will be subject to the exclusive jurisdiction of the courts of <strong className="font-black text-slate-900">Surat, Gujarat, India</strong>.
            </p>
          </section>

          <section className="text-center pt-8 border-t border-slate-100">
            <h2 className="text-2xl font-black text-slate-900 mb-4">7. Contact Information</h2>
            <p className="text-slate-600 mb-6">
              If you have any questions or concerns regarding these terms, please contact our legal team.
            </p>
            <a href="mailto:mihirsync1@gmail.com" className="inline-block bg-slate-900 text-white font-bold px-8 py-4 rounded-full hover:bg-blue-600 transition-colors shadow-lg hover:shadow-blue-500/30">
              Email: mihirsync1@gmail.com
            </a>
          </section>

        </div>
      </div>
    </div>
  );
}