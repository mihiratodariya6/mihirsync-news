import React from 'react';
import { Scale, FileText, CheckCircle, AlertTriangle } from 'lucide-react';
import { Metadata } from 'next';

// 🚀 ADSENSE & SEO METADATA
export const metadata: Metadata = {
  title: "Terms & Conditions | MihirSync Media",
  description: "Read the Terms and Conditions for using MihirSync Media. Guidelines on content usage, intellectual property, and user obligations.",
  keywords: "Terms and Conditions MihirSync, MihirSync terms of service, News portal terms, website usage policy, Surat news agency legal",
  openGraph: {
    title: "Terms & Conditions | MihirSync",
    description: "Terms of service and usage guidelines for MihirSync Media.",
    url: "https://mihirsync.com/terms",
    type: "website",
  }
};

export default async function TermsAndConditionsPage({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang || 'en';

  return (
    <div className="bg-slate-50 min-h-screen pb-20 font-sans">
      
      {/* 🚀 Header Section */}
      <div className="bg-[#0b1120] pt-24 pb-28 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(#3b82f6 1px, transparent 1px)", backgroundSize: "30px 30px" }}></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <Scale size={48} className="text-blue-500 mx-auto mb-6 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
          <h1 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight">
            Terms & Conditions
          </h1>
          <p className="text-slate-400 font-medium max-w-xl mx-auto">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
      </div>

      {/* 🚀 Main Legal Content Wrapper */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-16 relative z-20">
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 p-8 md:p-12 text-slate-700 leading-relaxed space-y-10">

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-4 flex items-center gap-2"><FileText size={20} className="text-blue-600"/> 1. Introduction</h2>
            <p className="mb-4">
              Welcome to <strong>MihirSync Media</strong>. These terms and conditions outline the rules and regulations for the use of MihirSync's Website, located at mihirsync.com.
            </p>
            <p>
              By accessing this website we assume you accept these terms and conditions. Do not continue to use MihirSync if you do not agree to take all of the terms and conditions stated on this page.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-4 flex items-center gap-2"><CheckCircle size={20} className="text-blue-600"/> 2. Intellectual Property Rights</h2>
            <p className="mb-4">
              Other than the content you own, under these Terms, MihirSync and/or its licensors own all the intellectual property rights and materials contained in this Website.
            </p>
            <p className="mb-4">You are granted limited license only for purposes of viewing the material contained on this Website.</p>
            <ul className="list-disc pl-5 space-y-2 text-slate-600 bg-slate-50 p-6 rounded-xl border border-slate-100">
              <li>You must not republish material from MihirSync without proper credit.</li>
              <li>You must not sell, rent or sub-license material from MihirSync.</li>
              <li>You must not reproduce, duplicate or copy material from MihirSync for commercial purposes.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-4 flex items-center gap-2"><AlertTriangle size={20} className="text-blue-600"/> 3. User Comments & Content</h2>
            <p className="mb-4">
              Parts of this website offer an opportunity for users to post and exchange opinions and information in certain areas of the website. MihirSync does not filter, edit, publish or review Comments prior to their presence on the website. Comments do not reflect the views and opinions of MihirSync, its agents, and/or affiliates.
            </p>
            <p>
              MihirSync reserves the right to monitor all Comments and to remove any Comments which can be considered inappropriate, offensive, or causes breach of these Terms and Conditions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-4">4. News Accuracy & Disclaimer</h2>
            <p className="mb-4">
              While we strive to provide the fastest and most accurate news, the information provided on this website is for general informational purposes only. We make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability with respect to the website or the information, products, services, or related graphics contained on the website.
            </p>
          </section>

          <section className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
            <h2 className="text-2xl font-black text-slate-900 mb-4">5. Governing Law & Jurisdiction</h2>
            <p>
              These Terms will be governed by and interpreted in accordance with the laws of the State of Gujarat, India. Any disputes relating to these terms and conditions will be subject to the exclusive jurisdiction of the courts of <strong>Surat, Gujarat, India</strong>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-4">6. Contact Information</h2>
            <p>
              If you have any questions or concerns regarding these terms, please contact us at: <br/>
              <a href="mailto:mihirsync1@gmail.com" className="text-blue-600 font-bold hover:underline mt-2 inline-block">mihirsync1@gmail.com</a>
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}