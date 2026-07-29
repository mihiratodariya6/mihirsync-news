'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { db } from '../../lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import Link from 'next/link';
import TrendingReels from '../components/web/TrendingReels'; // 👈 તારું ઇમ્પોર્ટ અહીં છે

export default function HomePage() {
  const params = useParams();
  const lang = (params.lang as 'en' | 'gu' | 'hi') || 'en';

  const [featuredNews, setFeaturedNews] = useState<any[]>([]);
  const [trendingNews, setTrendingNews] = useState<any[]>([]);
  const [homeNews, setHomeNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const q = query(collection(db, 'articles'), where('status', '==', 'published'));
        const snap = await getDocs(q);
        const allNews = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        allNews.sort((a: any, b: any) => b.createdAt?.toMillis() - a.createdAt?.toMillis());

        setFeaturedNews(allNews.filter(n => n.placement?.isFeatured));
        setTrendingNews(allNews.filter(n => n.placement?.isTrending).slice(0, 5));
        setHomeNews(allNews.filter(n => n.placement?.showOnHome));
      } catch (error) {
        console.error("Error loading news:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHomeData();
  }, []);

  if (loading) return <div className="p-20 text-center font-bold text-slate-500">Loading Top News...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      
      {/* 🔝 TOP SECTION: Slider & Trending */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        
        {/* 🖼️ Left: Main Featured Slider */}
        <div className="lg:col-span-2 relative h-[450px] rounded-3xl overflow-hidden shadow-2xl group cursor-pointer">
          {featuredNews.length > 0 ? (
            <Link href={`/${lang}/post/${featuredNews[0].id}`}>
              <img src={featuredNews[0].featuredImage} alt="Featured" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8 w-full">
                <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-md uppercase tracking-wider mb-4 inline-block">
                  {featuredNews[0].category}
                </span>
                <h1 className="text-3xl md:text-4xl font-black text-white leading-tight drop-shadow-lg">
                  {featuredNews[0].translations[lang]?.title || featuredNews[0].translations['en']?.title}
                </h1>
                <p className="text-slate-300 mt-3 text-lg line-clamp-2">
                  {featuredNews[0].translations[lang]?.shortDescription || featuredNews[0].translations['en']?.shortDescription}
                </p>
              </div>
            </Link>
          ) : (
            <div className="w-full h-full bg-slate-200 flex items-center justify-center rounded-3xl">
              <span className="font-bold text-slate-400">એડમિનમાંથી 'Top Slider' ટીક કરો.</span>
            </div>
          )}
        </div>

        {/* 🔥 Right: Trending Now Sidebar */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col h-[450px]">
          <h3 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2">
            <span className="text-red-500">🔥</span> Trending Now
          </h3>
          <div className="flex-1 overflow-y-auto custom-scrollbar space-y-6 pr-2">
            {trendingNews.length > 0 ? (
              trendingNews.map((news, index) => (
                <Link key={news.id} href={`/${lang}/post/${news.id}`} className="flex gap-4 group">
                  <span className="text-4xl font-black text-slate-200 group-hover:text-blue-100 transition-colors">{index + 1}</span>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">
                      {news.translations[lang]?.title || news.translations['en']?.title}
                    </h4>
                    <span className="text-[10px] font-bold text-blue-500 uppercase mt-2 inline-block">{news.category}</span>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-sm font-bold text-slate-400">એડમિનમાંથી 'Trending' ટીક કરો.</p>
            )}
          </div>
        </div>

      </div>

      {/* 📰 BOTTOM SECTION: Latest Stories */}
      <div className="mb-16"> {/* અહી નીચે જગ્યા છોડવા mb-16 ઉમેર્યું */}
        <div className="flex justify-between items-end border-b border-slate-200 pb-4 mb-8">
          <h2 className="text-2xl font-black text-slate-900 border-l-4 border-blue-600 pl-4">Latest Stories</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {homeNews.length > 0 ? (
            homeNews.map((news) => (
              <Link key={news.id} href={`/${lang}/post/${news.id}`} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-100 transition-all group">
                <div className="h-48 overflow-hidden relative">
                  <img src={news.featuredImage || 'https://via.placeholder.com/400'} alt="News" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5">
                  <span className="text-[10px] font-bold text-blue-600 uppercase mb-2 block">{news.category}</span>
                  <h2 className="font-bold text-lg text-slate-900 leading-tight group-hover:text-blue-600 transition-colors line-clamp-2">
                    {news.translations[lang]?.title || news.translations['en']?.title}
                  </h2>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-center text-slate-400 font-bold col-span-full py-10">એડમિનમાંથી 'Show on Main Home Page' ટીક કરો.</p>
          )}
        </div>
      </div>

      {/* 🎬 TRENDING REELS SECTION: આ આપણે નવું ઉમેર્યું છે 🚀 */}
      <div className="border-t border-slate-200 pt-10">
         <TrendingReels />
      </div>

    </div>
  );
}