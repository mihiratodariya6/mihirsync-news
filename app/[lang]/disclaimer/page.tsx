import React from 'react';
import { AlertTriangle, ShieldAlert, HeartHandshake, Info, Scale, ExternalLink } from 'lucide-react';
import { Metadata } from 'next';

// 🚀 FULL SEO & GEO-TARGETING METADATA
export const metadata: Metadata = {
  title: "Disclaimer | MihirSync Media - Legal & Reporting Policies",
  description: "Official Disclaimer of MihirSync Media. Read our legal policies regarding news accuracy, fair use, and our strict commitment to respecting all communities, castes, and religions.",
  keywords: "Disclaimer MihirSync, News portal disclaimer India, legal disclaimer Surat, unbiased news Gujarat, news accuracy policy, religious sentiment policy news",
  openGraph: {
    title: "Official Disclaimer | MihirSync Media",
    description: "Our legal guidelines, reporting boundaries, and commitment to social harmony.",
    url: "https://mihirsync.com/disclaimer",
    type: "website",
  }
};

export default async function DisclaimerPage({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang || 'en';

  return (
    <div className="bg-slate-50 min-h-screen pb-20 font-sans">
      
      {/* 🚀 Hero Section */}
      <div className="bg-[#0b1120] pt-24 pb-32 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(#eab308 1px, transparent 1px)", backgroundSize: "30px 30px" }}></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <AlertTriangle size={56} className="text-yellow-500 mx-auto mb-6 drop-shadow-[0_0_15px_rgba(234,179,8,0.5)]" />
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight leading-tight">
            Official Disclaimer
          </h1>
          <p className="text-lg md:text-xl text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed">
            Transparency and legal clarity are at the heart of our operations. Please read our operational and reporting boundaries carefully.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 -mt-16 relative z-20 space-y-10">
        
        {/* 🚀 CRITICAL: Community & Religious Sentiments (As per your request) */}
        <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-3xl p-8 md:p-12 border border-yellow-200 shadow-xl">
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-6 flex items-center gap-3">
            <HeartHandshake className="text-yellow-600 w-8 h-8"/> 
            Respect for All Religions, Castes & Communities
          </h2>
          <div className="space-y-4 text-slate-700 font-medium leading-relaxed text-lg">
            <p>
              At <strong className="text-slate-900">MihirSync Media</strong>, we uphold the highest standards of secularism, equality, and constitutional respect. The news and reports published on our platform are strictly based on the information received from news agencies, on-ground reporters, public press releases, and digital platforms.
            </p>
            <p className="bg-white p-6 rounded-2xl border-l-4 border-yellow-500 shadow-sm italic text-slate-800">
              "We have absolutely no intention to insult, malign, defame, or hurt the sentiments of any religion, caste, ethnic group, community, gender, organization, or individual. Our job is solely to report the news as it is received."
            </p>
            <p>
              In the fast-paced nature of digital news publishing, if any word, image, headline, or context unintentionally causes offense or contains a factual discrepancy regarding any community, <strong className="text-red-600 font-bold">we sincerely and deeply apologize in advance.</strong> It is never intentional. We encourage readers to notify us immediately, and we are committed to rectifying or removing such inadvertent errors without delay.
            </p>
          </div>
        </div>

        {/* Other Legal Sections */}
        <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-8 md:p-12 space-y-10">
          
          <section>
            <h3 className="text-2xl font-black text-slate-900 mb-4 flex items-center gap-2"><Info size={24} className="text-blue-600"/> General News Accuracy</h3>
            <p className="text-slate-600 leading-relaxed font-medium">
              All the information on this website is published in good faith and for general information purposes only. While we employ rigorous fact-checking, MihirSync does not make any absolute warranties about the completeness, reliability, and 100% accuracy of this information. Any action you take upon the information you find on this website is strictly at your own risk. MihirSync will not be liable for any losses and/or damages in connection with the use of our website.
            </p>
          </section>

          <section>
            <h3 className="text-2xl font-black text-slate-900 mb-4 flex items-center gap-2"><ShieldAlert size={24} className="text-blue-600"/> Views Expressed</h3>
            <p className="text-slate-600 leading-relaxed font-medium">
              The views, thoughts, and opinions expressed in the opinion pieces, editorials, guest columns, and user comments belong solely to the original author(s). They do not necessarily reflect the official policy, position, or views of MihirSync Media, its founders, management, or its editorial board.
            </p>
          </section>

          <section>
            <h3 className="text-2xl font-black text-slate-900 mb-4 flex items-center gap-2"><ExternalLink size={24} className="text-blue-600"/> External Links</h3>
            <p className="text-slate-600 leading-relaxed font-medium">
              From our website, you can visit other websites by following hyperlinks to external sites. While we strive to provide only quality links to ethical websites, we have no control over the content and nature of these sites. These links do not imply a recommendation for all the content found on these sites. Site owners and content may change without notice before we have the opportunity to remove a 'bad' link.
            </p>
          </section>

          <section>
            <h3 className="text-2xl font-black text-slate-900 mb-4 flex items-center gap-2"><Scale size={24} className="text-blue-600"/> Fair Use Notice</h3>
            <p className="text-slate-600 leading-relaxed font-medium">
              This website may contain copyrighted material, the use of which may not have been specifically authorized by the copyright owner. We use such material under "fair use" for the purposes of news reporting, criticism, comment, and education as provided for in international copyright laws.
            </p>
          </section>
        </div>

        {/* Contact Banner */}
        <div className="text-center bg-slate-900 rounded-3xl p-8 md:p-12 shadow-xl">
          <h2 className="text-2xl font-black text-white mb-3">Notice an Issue?</h2>
          <p className="text-slate-400 mb-6 font-medium max-w-lg mx-auto">If you believe any content on our site violates this disclaimer or hurts sentiments, please email us directly for swift action.</p>
          <a href="mailto:mihirsync1@gmail.com" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3.5 rounded-full transition-colors shadow-lg">
            mihirsync1@gmail.com
          </a>
        </div>

      </div>
    </div>
  );
}