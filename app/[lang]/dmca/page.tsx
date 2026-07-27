import React from 'react';
import { Copyright, ShieldAlert, FileWarning, CheckCircle, Scale, AlertOctagon } from 'lucide-react';
import { Metadata } from 'next';

// 🚀 FULL SEO & COPYRIGHT PROTECTION METADATA
export const metadata: Metadata = {
  title: "DMCA Policy & Copyright | MihirSync Media",
  description: "MihirSync Media DMCA Takedown Policy. Read how we protect our intellectual property, news articles, and how to report copyright infringement.",
  keywords: "DMCA Policy MihirSync, Copyright infringement India, DMCA takedown notice, news content protection Surat, report stolen content, intellectual property rights",
  openGraph: {
    title: "DMCA Policy | MihirSync Media",
    description: "Strict copyright and intellectual property protection guidelines of MihirSync.",
    url: "https://mihirsync.com/dmca",
    type: "website",
  }
};

export default async function DMCAPolicyPage({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang || 'en';

  return (
    <div className="bg-slate-50 min-h-screen pb-20 font-sans">
      
      {/* 🚀 Hero Section */}
      <div className="bg-[#0b1120] pt-24 pb-32 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(#ef4444 1px, transparent 1px)", backgroundSize: "30px 30px" }}></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <Copyright size={56} className="text-red-500 mx-auto mb-6 drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]" />
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight leading-tight">
            DMCA & Copyright Policy
          </h1>
          <p className="text-lg md:text-xl text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed">
            We aggressively protect our original journalism. Learn about our Intellectual Property rights and DMCA takedown procedures.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 -mt-16 relative z-20 space-y-10">
        
        {/* Intro Card */}
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 p-8 md:p-12">
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-6 flex items-center gap-3">
            <ShieldAlert className="text-blue-600 w-8 h-8"/> 
            Intellectual Property Ownership
          </h2>
          <div className="space-y-4 text-slate-700 font-medium leading-relaxed text-lg">
            <p>
              At <strong className="text-slate-900">MihirSync Media</strong>, we invest massive resources into investigating, reporting, and writing original news stories. All content published on mihirsync.com—including but not limited to articles, headlines, graphics, images, videos, and source codes—is the exclusive property of MihirSync unless otherwise stated.
            </p>
            <p className="text-red-600 font-bold bg-red-50 p-4 rounded-xl border border-red-100">
              Unauthorized copying, reproduction, republishing, uploading, posting, transmitting, or duplicating of any of the material is strictly prohibited and constitutes copyright infringement.
            </p>
          </div>
        </div>

        {/* 🚀 Counter-Notice / Anti-Scraping Box (Heavy Warning) */}
        <div className="bg-gradient-to-br from-slate-900 to-black rounded-3xl p-8 md:p-12 shadow-2xl text-white">
          <h2 className="text-2xl font-black text-white mb-6 flex items-center gap-3">
            <AlertOctagon className="text-red-500 w-8 h-8"/> Notice Regarding Content Scraping
          </h2>
          <p className="text-slate-300 leading-relaxed font-medium mb-6 text-lg">
            MihirSync utilizes advanced digital fingerprinting and automated bots to monitor content scraping and unauthorized RSS stealing globally. 
          </p>
          <ul className="list-disc pl-5 space-y-3 text-slate-300 font-medium">
            <li>Any website found copying our articles verbatim without a visible Do-Follow backlink and clear attribution will face immediate consequences.</li>
            <li>We will issue direct <strong className="text-red-400">DMCA Takedown Notices</strong> to your web host, domain registrar, and Google Search Console.</li>
            <li>Repeated offenses will result in legal action filed in the jurisdiction of Surat, Gujarat, India.</li>
          </ul>
        </div>

        {/* 🚀 Filing a Takedown Notice */}
        <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-8 md:p-12">
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-6 flex items-center gap-3">
            <Scale className="text-blue-600 w-8 h-8"/> Filing a DMCA Notice With Us
          </h2>
          <p className="text-slate-600 leading-relaxed font-medium mb-6 text-lg">
            We respect the intellectual property rights of others. If you believe that your copyrighted work has been infringed upon and is accessible on MihirSync, please notify our Copyright Agent with the following details:
          </p>
          
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-4 text-slate-700 font-medium">
            <p><strong>1. Signature:</strong> An electronic or physical signature of the person authorized to act on behalf of the copyright owner.</p>
            <p><strong>2. Description:</strong> A detailed description of the copyrighted work that you claim has been infringed.</p>
            <p><strong>3. URL:</strong> The exact link (URL) on our website where the alleged infringing material is located.</p>
            <p><strong>4. Contact Info:</strong> Your address, telephone number, and email address.</p>
            <p><strong>5. Good Faith Statement:</strong> A statement that you have a good faith belief that the use is not authorized by the copyright owner, its agent, or the law.</p>
            <p><strong>6. Penalty of Perjury:</strong> A statement that the information in your notice is accurate, and under penalty of perjury, you are authorized to act on behalf of the owner.</p>
          </div>
        </div>

        {/* Contact Agent */}
        <div className="text-center bg-blue-50 border border-blue-100 p-8 rounded-3xl shadow-sm">
          <h2 className="text-2xl font-black text-slate-900 mb-3">Designated Copyright Agent</h2>
          <p className="text-slate-600 mb-6 font-medium max-w-lg mx-auto">Please send all DMCA takedown notices or copyright inquiries to our legal team at the email below.</p>
          <a href="mailto:mihirsync1@gmail.com" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-10 py-4 rounded-full transition-colors shadow-lg text-lg">
            <FileWarning size={20}/> Email: mihirsync1@gmail.com
          </a>
        </div>

      </div>
    </div>
  );
}