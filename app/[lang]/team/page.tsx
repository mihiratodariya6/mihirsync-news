import React from 'react';
import { Users, Award, Shield, CheckCircle } from 'lucide-react';
import { Metadata } from 'next';

// 🚀 FULL SEO, GEO-TARGETING & OPENGRAPH
export const metadata: Metadata = {
  title: "Our Editorial Team | MihirSync Media - Surat, India",
  description: "Meet the experienced journalists, editors, and tech experts behind MihirSync. Headquartered in Surat, Gujarat, we deliver fast, accurate, and unbiased global news.",
  keywords: "MihirSync Team, Journalists in Surat, Editorial Board India, News Editors Gujarat, Media professionals India, Top news portal team",
  openGraph: {
    title: "Meet the MihirSync Editorial Team",
    description: "The passionate minds from Surat, Gujarat working round the clock to bring you the truth.",
    url: "https://mihirsync.com/team",
    siteName: "MihirSync Media",
    type: "website",
  }
};

export default async function TeamPage({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang || 'en';

  const teamMembers = [
    { name: "Mihir Patel", role: "Founder & Editor-in-Chief", desc: "Leading the vision of fast and accurate digital journalism from Surat, Gujarat." },
    { name: "Aarav Sharma", role: "Senior Technology Editor", desc: "Specializing in AI, Silicon Valley updates, tech breakthroughs, and startup ecosystems." },
    { name: "Priya Mehta", role: "Global Affairs & Business Lead", desc: "Tracking international markets, trade policies, and global economic shifts." },
    { name: "Rajesh Varma", role: "Head of Fact-Checking", desc: "Ensuring zero-tolerance for fake news with rigorous multi-step verification." }
  ];

  return (
    <div className="bg-slate-50 min-h-screen pb-20 font-sans">
      <div className="bg-[#0b1120] pt-24 pb-28 px-4 sm:px-6 text-center">
        <Users size={48} className="text-blue-500 mx-auto mb-6" />
        <h1 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight">Meet Our Editorial Team</h1>
        <p className="text-slate-400 font-medium max-w-xl mx-auto">The passionate minds from Surat working round the clock to bring you the truth globally.</p>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 -mt-16 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {teamMembers.map((member, idx) => (
            <div key={idx} className="bg-white p-8 rounded-3xl shadow-lg border border-slate-200">
              <div className="w-14 h-14 bg-blue-600 text-white rounded-2xl flex items-center justify-center font-black text-xl mb-6 shadow-md">
                {member.name.charAt(0)}
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-1">{member.name}</h3>
              <p className="text-blue-600 font-bold text-sm mb-4">{member.role}</p>
              <p className="text-slate-600 font-medium leading-relaxed">{member.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}