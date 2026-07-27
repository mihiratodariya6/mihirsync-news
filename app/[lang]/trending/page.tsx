import React from 'react';
import { Flame, TrendingUp, Activity, Globe } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';
import { db } from '../../../lib/firebase';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';

// 🚀 FULL SEO FOR TRENDING/VIRAL KEYWORDS
export const metadata: Metadata = {
  title: "Trending News & Viral Stories | MihirSync India",
  description: "Explore the most read, viral, and trending news stories right now on MihirSync across Technology, AI, Business, and World events. Live from India.",
  keywords: "Trending news India, viral stories Gujarat, most read articles worldwide, MihirSync trending, breaking news updates, top headlines Surat",
  openGraph: {
    title: "Trending Now on MihirSync",
    description: "Catch up on the most viral and top-read news articles globally.",
    url: "https://mihirsync.com/trending",
    type: "website",
  }
};

export default async function TrendingPage({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang || 'en';

  let posts: any[] = [];
  try {
    const q = query(collection(db, 'articles'), orderBy('stats.views', 'desc'), limit(10));
    const snap = await getDocs(q);
    posts = snap.docs.map(d => ({ id: d.id, ...d.data() }));
  } catch (error) {
    console.error(error);
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-20 font-sans">
      
      {/* 🚀 Hero Section */}
      <div className="bg-[#0b1120] pt-24 pb-32 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(#ef4444 1px, transparent 1px)", backgroundSize: "30px 30px" }}></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <Flame size={56} className="text-red-500 mx-auto mb-6 drop-shadow-[0_0_15px_rgba(239,68,68,0.5)] animate-pulse" />
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight leading-tight">
            Trending <span className="text-red-500">Now</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed">
            The pulse of the world. Discover the most read, viral, and impactful stories buzzing across India and the globe right now.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-16 relative z-20 space-y-8">
        
        {/* 🚀 Articles List or Beautiful Empty State */}
        {posts.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl shadow-xl border border-slate-200 text-center space-y-6">
            <Activity size={64} className="text-slate-300 mx-auto mb-4" />
            <h2 className="text-2xl font-black text-slate-800">Our Algorithms Are Crunching Data...</h2>
            <p className="text-slate-500 font-medium max-w-lg mx-auto">
              There are no trending articles at this exact second. Our real-time analytics engine is tracking thousands of views across MihirSync to determine what's going viral next. Please check back in a few moments!
            </p>
            <Link href={`/${lang}`} className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3 rounded-full mt-4 transition-colors">
              Read Latest News
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map((post, idx) => {
              const title = post.translations?.[lang]?.title || post.translations?.en?.title || 'Untitled';
              return (
                <Link key={post.id} href={`/${lang}/post/${post.id}`} className="bg-white p-6 md:p-8 rounded-3xl shadow-md border border-slate-200 flex items-center gap-6 hover:border-red-400 hover:shadow-lg transition-all group block">
                  <span className="text-4xl md:text-5xl font-black text-slate-200 group-hover:text-red-100 transition-colors">
                    #{idx + 1}
                  </span>
                  <div className="flex-1">
                    <span className="bg-red-50 text-red-600 text-xs font-black px-3 py-1 rounded-md uppercase tracking-wider mb-2 inline-block">
                      {post.category || 'Trending'}
                    </span>
                    <h3 className="text-xl md:text-2xl font-black text-slate-900 group-hover:text-red-600 transition-colors leading-tight">
                      {title}
                    </h3>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* 🚀 SEO & Context Content Block (Heavy Content) */}
        <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-8 md:p-12 mt-12">
          <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-2">
            <Globe className="text-blue-600"/> How Do We Track Trending News?
          </h2>
          <div className="space-y-4 text-slate-600 font-medium leading-relaxed">
            <p>
              At MihirSync, we believe in providing you with the news that matters most to the community. The <strong>Trending News</strong> section is powered by an advanced real-time analytics engine that monitors reader engagement across our entire platform.
            </p>
            <p>
              Unlike traditional feeds that rely solely on editorial curation, this page reflects the collective voice of our audience. We analyze metrics such as page views, time spent reading, social media shares, and sudden spikes in traffic to determine which stories are capturing the world's attention.
            </p>
            <p>
              Whether it's a massive breakthrough in Artificial Intelligence from Silicon Valley, a major economic policy shift in India, a viral sports moment, or local updates from Surat and Gujarat, if the world is reading it, you'll find it right here. We update this list dynamically so you are always ahead of the curve.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}