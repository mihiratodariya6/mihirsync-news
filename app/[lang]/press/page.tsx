import React from 'react';
import { Award, Download, FileText, Image as ImageIcon, Briefcase, ChevronRight } from 'lucide-react';
import { Metadata } from 'next';

// 🚀 FULL SEO FOR MEDIA AGENCIES
export const metadata: Metadata = {
  title: "Press Room & Media Kit | MihirSync Media",
  description: "Official press room for MihirSync Media. Download our brand assets, high-res logos, company boilerplate, and latest press releases.",
  keywords: "MihirSync media kit, press releases India, brand logo assets, company info Surat Gujarat, news agency press kit, MihirSync boilerplate",
  openGraph: {
    title: "MihirSync Press & Media Room",
    description: "Official brand assets, company information, and press resources.",
    url: "https://mihirsync.com/press",
    type: "website",
  }
};

export default async function PressPage() {
  return (
    <div className="bg-slate-50 min-h-screen pb-20 font-sans">
      
      {/* 🚀 Hero Section */}
      <div className="bg-[#0b1120] pt-24 pb-32 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(#3b82f6 1px, transparent 1px)", backgroundSize: "30px 30px" }}></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <Award size={56} className="text-blue-500 mx-auto mb-6 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight leading-tight">
            Press & Media Room
          </h1>
          <p className="text-lg md:text-xl text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed">
            Welcome to the official MihirSync press center. Find everything you need to feature our brand, including logos, boilerplate, and contact information.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 -mt-16 relative z-20 space-y-10">
        
        {/* Company Boilerplate */}
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 p-8 md:p-12">
          <h2 className="text-2xl font-black text-slate-900 mb-4 flex items-center gap-2"><FileText size={24} className="text-blue-600"/> Company Boilerplate</h2>
          <p className="text-slate-600 font-medium leading-relaxed mb-6">
            For journalists and media partners, please use the following standard description when writing about us:
          </p>
          <div className="bg-slate-50 p-6 rounded-2xl border-l-4 border-blue-600 text-slate-700 italic leading-relaxed">
            "MihirSync Media is a fast-growing, next-generation digital news enterprise headquartered in Surat, Gujarat, India. Dedicated to delivering unbiased, rigorously fact-checked, and lightning-fast news, MihirSync covers Global Affairs, Technology, AI, Business, and Sports. Available in English, Hindi, and Gujarati, the platform leverages advanced CMS technology to connect millions of readers with the truth."
          </div>
        </div>

        {/* Brand Assets */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-200">
            <ImageIcon size={32} className="text-blue-600 mb-4" />
            <h3 className="text-2xl font-black text-slate-900 mb-4">Logos & Identity</h3>
            <p className="text-slate-600 leading-relaxed font-medium mb-6">
              Download our official high-resolution vector logos (SVG/PNG), icon marks, and color palettes. Please do not stretch, alter colors, or modify the logo proportions.
            </p>
            <button className="flex items-center gap-2 bg-slate-900 hover:bg-blue-600 text-white px-6 py-3 rounded-full font-bold transition-colors w-full justify-center">
              <Download size={18} /> Download Logo Pack
            </button>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-200">
            <Briefcase size={32} className="text-blue-600 mb-4" />
            <h3 className="text-2xl font-black text-slate-900 mb-4">Executive Bios & Headshots</h3>
            <p className="text-slate-600 leading-relaxed font-medium mb-6">
              Access professional biographies and high-quality headshots of MihirSync's founding team, editorial board, and executive leadership.
            </p>
            <button className="flex items-center gap-2 bg-slate-900 hover:bg-blue-600 text-white px-6 py-3 rounded-full font-bold transition-colors w-full justify-center">
              <Download size={18} /> Download Press Bios
            </button>
          </div>
        </div>

        {/* PR Contact */}
        <div className="bg-blue-50 rounded-3xl p-8 md:p-12 border border-blue-100 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-2xl font-black text-slate-900 mb-2">Media & PR Inquiries</h2>
            <p className="text-slate-600 font-medium">Are you a journalist seeking a comment, interview, or partnership? Reach out to our PR desk directly.</p>
          </div>
          <a href="mailto:mihirsync1@gmail.com" className="bg-blue-600 text-white font-black px-8 py-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors shrink-0">
            mihirsync1@gmail.com
          </a>
        </div>

      </div>
    </div>
  );
}