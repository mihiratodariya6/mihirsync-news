import React from 'react';
import { Briefcase, Send, MapPin, Clock } from 'lucide-react';
import { Metadata } from 'next';

// 🚀 FULL SEO & LOCAL JOB TARGETING
export const metadata: Metadata = {
  title: "Careers & Jobs at MihirSync | Media Jobs in Surat, Gujarat",
  description: "Join the fast-growing team at MihirSync. Explore open job positions for journalists, video editors, and software developers in Surat, Gujarat, India.",
  keywords: "Careers MihirSync, Jobs in media Surat, News reporter jobs Gujarat, Content writer vacancy Surat, IT jobs in media India",
  openGraph: {
    title: "Careers at MihirSync - Join Our Team",
    description: "Build the future of digital journalism with us in Surat, Gujarat.",
    url: "https://mihirsync.com/careers",
    type: "website",
  }
};

export default async function CareersPage() {
  const jobs = [
    { title: "Senior News Reporter", type: "Full-Time", location: "Surat, Gujarat, India", desc: "Looking for energetic reporters with 2+ years of experience in political and tech journalism." },
    { title: "Video Editor & Reels Creator", type: "Full-Time / Remote", location: "Surat / Remote", desc: "Expert in professional video editing, motion graphics, and fast-paced news Shorts/Reels." },
    { title: "Next.js / Full Stack Developer", type: "Full-Time", location: "Surat, Gujarat, India", desc: "Maintain and scale our enterprise CMS platform and high-traffic news portal." }
  ];

  return (
    <div className="bg-slate-50 min-h-screen pb-20 font-sans">
      <div className="bg-[#0b1120] pt-24 pb-28 px-4 sm:px-6 text-center">
        <Briefcase size={48} className="text-blue-500 mx-auto mb-6" />
        <h1 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight">Join Our Team</h1>
        <p className="text-slate-400 font-medium max-w-xl mx-auto">Build the future of digital journalism from Gujarat with MihirSync Media.</p>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-16 relative z-20 space-y-6">
        {jobs.map((job, idx) => (
          <div key={idx} className="bg-white p-8 rounded-3xl shadow-lg border border-slate-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 hover:border-blue-300 transition-colors">
            <div>
              <h3 className="text-2xl font-black text-slate-900 mb-2">{job.title}</h3>
              <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-slate-500 mb-4">
                <span className="flex items-center gap-1 bg-blue-50 text-blue-700 px-3 py-1 rounded-full"><Clock size={12}/> {job.type}</span>
                <span className="flex items-center gap-1 bg-slate-100 text-slate-700 px-3 py-1 rounded-full"><MapPin size={12}/> {job.location}</span>
              </div>
              <p className="text-slate-600 font-medium">{job.desc}</p>
            </div>
            <a href="mailto:mihirsync1@gmail.com" className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-full transition-colors shrink-0 flex items-center gap-2 text-sm shadow-md">
              Apply Now <Send size={14}/>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}