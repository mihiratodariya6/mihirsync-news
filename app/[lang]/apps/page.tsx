import React from 'react';
import Link from 'next/link';
import { Smartphone, Apple, Rocket, ArrowLeft, BellRing } from 'lucide-react';
import { Metadata } from 'next';

// 🚀 FULL SEO & GEO-TARGETING METADATA
export const metadata: Metadata = {
  title: "Download MihirSync App (Coming Soon) | Android & iOS",
  description: "Get ready for the fastest news experience. The MihirSync mobile app for Android and iPhone is launching soon. Serving top news from Surat, Gujarat, India and worldwide.",
  keywords: "MihirSync app, download news app, Android news app, iOS news app, Surat news, Gujarat news, Indian news portal, fastest news app",
  openGraph: {
    title: "MihirSync Mobile App - Coming Soon!",
    description: "We are building the ultimate news experience for your mobile device. Stay tuned for our Android and iOS apps.",
    url: "https://mihirsync.com/apps",
    siteName: "MihirSync Media",
    locale: "en_IN",
    type: "website",
  }
};

export default async function AppsComingSoonPage({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang || 'en';

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center py-20 px-4 sm:px-6">
      <div className="max-w-4xl w-full bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-slate-200 text-center">
        
        {/* 🚀 Header/Banner Area (Dark Premium Look) */}
        <div className="bg-gradient-to-br from-[#0b1120] via-slate-900 to-blue-950 py-20 px-8 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(#3b82f6 1px, transparent 1px)", backgroundSize: "20px 20px" }}></div>
          
          <Rocket size={72} className="text-blue-500 mx-auto mb-6 animate-bounce relative z-10 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
          
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4 relative z-10">
            Something Big is Coming!
          </h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto font-medium relative z-10 leading-relaxed">
            We are crafting the ultimate mobile news experience. The official <strong className="text-white">MihirSync App</strong> will be available soon on both Android and iOS devices.
          </p>
        </div>

        {/* 🚀 Content Area */}
        <div className="p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            
            {/* Android Card */}
            <div className="bg-slate-50 border border-slate-200 p-8 rounded-3xl flex flex-col items-center gap-4 hover:border-green-400 hover:shadow-lg transition-all group">
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Smartphone size={40} />
              </div>
              <div>
                <h3 className="text-2xl font-black text-slate-800">Android App</h3>
                <span className="inline-block bg-slate-200 text-slate-600 text-xs font-bold px-3 py-1 rounded-full mt-2 uppercase tracking-widest">
                  Status: In Development ⏳
                </span>
              </div>
            </div>

            {/* iOS Card */}
            <div className="bg-slate-50 border border-slate-200 p-8 rounded-3xl flex flex-col items-center gap-4 hover:border-slate-800 hover:shadow-lg transition-all group">
              <div className="w-20 h-20 bg-slate-200 text-slate-800 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Apple size={40} />
              </div>
              <div>
                <h3 className="text-2xl font-black text-slate-800">iPhone App</h3>
                <span className="inline-block bg-slate-200 text-slate-600 text-xs font-bold px-3 py-1 rounded-full mt-2 uppercase tracking-widest">
                  Status: Designing UI 🎨
                </span>
              </div>
            </div>

          </div>

          {/* Alert Box */}
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 md:p-8 flex flex-col items-center">
            <BellRing size={28} className="text-blue-600 mb-3" />
            <h4 className="text-xl font-black text-slate-800 mb-2">Want to be the first to know?</h4>
            <p className="text-sm font-medium text-slate-600 mb-8 text-center max-w-lg leading-relaxed">
              Subscribe to our newsletter from the footer below, and we will email you the moment our official apps are available for download!
            </p>
            <Link href={`/${lang}`} className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-full font-bold shadow-xl shadow-blue-600/30 transition-all active:scale-95 text-sm uppercase tracking-wider">
              <ArrowLeft size={18} /> Continue Reading News
            </Link>
          </div>
          
        </div>
      </div>
    </div>
  );
}