import React from 'react';
import { Cookie, ShieldAlert, Settings, Info } from 'lucide-react';
import { Metadata } from 'next';

// 🚀 FULL SEO & GOOGLE ADSENSE COMPLIANCE METADATA
export const metadata: Metadata = {
  title: "Cookie Policy | MihirSync Media",
  description: "Learn how MihirSync uses cookies, tracking technologies, and third-party advertising cookies like Google DART to improve user experience.",
  keywords: "Cookie Policy MihirSync, Website cookies, Google AdSense cookies, DART cookie opt-out, privacy compliance India",
  openGraph: {
    title: "Cookie Policy | MihirSync Media",
    description: "Understanding how and why we use cookies on MihirSync.",
    url: "https://mihirsync.com/cookie-policy",
    type: "website",
  }
};

export default async function CookiePolicyPage({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang || 'en';

  return (
    <div className="bg-slate-50 min-h-screen pb-20 font-sans">
      
      {/* 🚀 Header Section */}
      <div className="bg-[#0b1120] pt-24 pb-28 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(#3b82f6 1px, transparent 1px)", backgroundSize: "30px 30px" }}></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <Cookie size={48} className="text-amber-500 mx-auto mb-6 drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]" />
          <h1 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight">
            Cookie Policy
          </h1>
          <p className="text-slate-400 font-medium max-w-2xl mx-auto text-lg">
            This Cookie Policy explains how MihirSync uses cookies and similar technologies.
          </p>
        </div>
      </div>

      {/* 🚀 Main Content Wrapper */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 -mt-16 relative z-20">
        
        {/* Intro Card */}
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 p-8 md:p-12 mb-10 space-y-4">
          <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2"><Info size={24} className="text-blue-600"/> What Are Cookies?</h2>
          <p className="text-slate-700 leading-relaxed font-medium">
            Cookies are small text files that are stored on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently, as well as to provide reporting information and personalized experiences.
          </p>
          <p className="text-slate-700 leading-relaxed font-medium">
            At <strong className="text-slate-900">MihirSync Media</strong>, we use cookies to enhance your browsing experience, analyze site traffic, and serve targeted advertisements through partners like Google AdSense.
          </p>
        </div>

        {/* 🚀 Types of Cookies We Use */}
        <h2 className="text-3xl font-black text-slate-800 mb-8 text-center">Types of Cookies We Use</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
            <h3 className="text-xl font-black text-slate-800 mb-3 flex items-center gap-2">
              <span className="w-3 h-3 bg-blue-600 rounded-full"></span> 1. Essential Cookies
            </h3>
            <p className="text-slate-600 leading-relaxed">
              These cookies are strictly necessary to provide you with services available through our website and to use some of its features, such as language preferences and secure session management.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
            <h3 className="text-xl font-black text-slate-800 mb-3 flex items-center gap-2">
              <span className="w-3 h-3 bg-green-600 rounded-full"></span> 2. Analytics & Performance Cookies
            </h3>
            <p className="text-slate-600 leading-relaxed">
              These cookies collect information that is used either in aggregate form to help us understand how our website is being used, or how effective our marketing campaigns are (e.g., Google Analytics tracking page views).
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
            <h3 className="text-xl font-black text-slate-800 mb-3 flex items-center gap-2">
              <span className="w-3 h-3 bg-amber-500 rounded-full"></span> 3. Advertising & Targeting Cookies (Google AdSense)
            </h3>
            <p className="text-slate-600 leading-relaxed">
              These cookies are used to make advertising messages more relevant to you. They prevent the same ad from continuously reappearing, ensure that ads are properly displayed, and select advertisements based on your interests. This includes Google's DART cookies.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
            <h3 className="text-xl font-black text-slate-800 mb-3 flex items-center gap-2">
              <span className="w-3 h-3 bg-purple-600 rounded-full"></span> 4. Functionality Cookies
            </h3>
            <p className="text-slate-600 leading-relaxed">
              These cookies allow our website to remember choices you make when you use our website, such as remembering your login details or preferred language settings (English, Gujarati, or Hindi).
            </p>
          </div>

        </div>

        {/* 🚀 How to Control Cookies */}
        <div className="bg-amber-50 rounded-3xl p-8 md:p-12 border border-amber-200 mb-10 space-y-4">
          <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <Settings className="text-amber-600"/> How Can You Control Cookies?
          </h2>
          <p className="text-slate-700 leading-relaxed font-medium">
            You have the right to decide whether to accept or reject cookies. You can set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website though your access to some functionality and areas of our website may be restricted.
          </p>
          <p className="text-slate-700 font-medium">
            To learn more about how to manage cookies on popular browsers, visit their respective settings pages or check out <a href="https://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 font-bold underline">allaboutcookies.org</a>.
          </p>
        </div>

        {/* Contact Info */}
        <div className="text-center bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
          <h2 className="text-xl font-black text-slate-900 mb-3">Questions About Our Cookie Policy?</h2>
          <p className="text-slate-600 mb-4">If you have any questions about our use of cookies or other technologies, please email us.</p>
          <a href="mailto:mihirsync1@gmail.com" className="inline-block bg-slate-900 hover:bg-blue-600 text-white font-bold px-6 py-3 rounded-full transition-colors">
            Email: mihirsync1@gmail.com
          </a>
        </div>

      </div>
    </div>
  );
}