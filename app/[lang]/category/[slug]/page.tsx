'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { db } from '../../../../lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import Link from 'next/link';

export default function CategoryPage() {
  const params = useParams();
  // 🚀 અહી ડિફોલ્ટ ભાષા 'gu' (ગુજરાતી) સેટ કરી દીધી
  const lang = (params.lang as 'en' | 'gu' | 'hi') || 'gu';
  const slug = params.slug as string;

  const [featuredNews, setFeaturedNews] = useState<any[]>([]);
  const [trendingNews, setTrendingNews] = useState<any[]>([]);
  const [latestNews, setLatestNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryNews = async () => {
      try {
        const q = query(
          collection(db, 'articles'),
          where('status', '==', 'published'),
          where('categorySlugs', 'array-contains', slug)
        );
        
        const snapshot = await getDocs(q);
        const allNews = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        allNews.sort((a: any, b: any) => b.createdAt?.toMillis() - a.createdAt?.toMillis());

        setFeaturedNews(allNews.filter(n => n.placement?.isFeatured));
        setTrendingNews(allNews.filter(n => n.placement?.isTrending).slice(0, 5)); 
        setLatestNews(allNews); 
        
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategoryNews();
  }, [slug]);

  if (loading) return <div className="p-20 text-center font-bold text-slate-500 animate-pulse text-xl">Loading {slug.toUpperCase()} News...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 min-h-screen">
      
      {/* 🏷️ Category Title */}
      <div className="border-l-4 border-blue-600 pl-4 mb-10">
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 uppercase tracking-tight">{slug.replace('-', ' ')} News</h1>
        <p className="text-slate-500 font-medium mt-1">Explore the latest updates in this category.</p>
      </div>

      {latestNews.length === 0 ? (
        <div className="text-center p-20 bg-white rounded-2xl border border-slate-200">
          <h2 className="text-xl font-bold text-slate-400">હજુ સુધી આ કેટેગરીમાં કોઈ ન્યૂઝ નથી!</h2>
          <p className="text-sm text-slate-400 mt-2">નોંધ: જૂની ન્યૂઝને એડિટ કરીને ફરીથી કેટેગરી ટીક કરીને સેવ કરો.</p>
        </div>
      ) : (
        <div className="w-full flex flex-col">
          
          {/* 🔝 TOP SECTION: Category Slider & Trending */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            
            {/* 🖼️ Left: Featured Slider */}
            <div className="lg:col-span-2 relative h-[400px] md:h-[450px] rounded-3xl overflow-hidden shadow-2xl group cursor-pointer bg-slate-100">
              {featuredNews.length > 0 ? (
                <Link href={`/${lang}/post/${featuredNews[0].id}`}>
                  <img src={featuredNews[0].featuredImage || 'https://via.placeholder.com/800'} alt="Featured" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/50 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full">
                    <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-md uppercase tracking-wider mb-4 inline-block shadow-md">
                      {featuredNews[0].category}
                    </span>
                    <h1 className="text-2xl md:text-4xl font-black text-white leading-tight drop-shadow-lg">
                      {/* 🚀 અહી બેકઅપ તરીકે 'gu' સેટ કર્યું છે */}
                      {featuredNews[0].translations[lang]?.title || featuredNews[0].translations['gu']?.title}
                    </h1>
                  </div>
                </Link>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-slate-400">
                  <span className="font-bold text-lg mb-2">No Slider News</span>
                  <span className="text-sm">એડમિનમાંથી 'Top Slider' ટીક કરો.</span>
                </div>
              )}
            </div>

            {/* 🔥 Right: Trending Sidebar */}
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col h-[400px] md:h-[450px]">
              <h3 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2">
                <span className="text-red-500">🔥</span> Trending in {slug.replace('-', ' ').toUpperCase()}
              </h3>
              <div className="flex-1 overflow-y-auto custom-scrollbar space-y-6 pr-2">
                {trendingNews.length > 0 ? (
                  trendingNews.map((news, index) => (
                    <Link key={news.id} href={`/${lang}/post/${news.id}`} className="flex gap-4 group">
                      <span className="text-4xl font-black text-slate-200 group-hover:text-blue-100 transition-colors">{index + 1}</span>
                      <div>
                        <h4 className="font-bold text-slate-800 text-sm leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">
                          {/* 🚀 અહી બેકઅપ તરીકે 'gu' સેટ કર્યું છે */}
                          {news.translations[lang]?.title || news.translations['gu']?.title}
                        </h4>
                        <span className="text-[10px] font-bold text-slate-400 mt-2 flex items-center gap-1">
                          {news.createdAt ? new Date(news.createdAt.toMillis()).toLocaleDateString() : ''}
                        </span>
                      </div>
                    </Link>
                  ))
                ) : (
                  <p className="text-sm font-bold text-slate-400">એડમિનમાંથી 'Trending' ટીક કરો.</p>
                )}
              </div>
            </div>

          </div>

          {/* 📰 BOTTOM SECTION: All Latest Stories */}
          <div className="flex justify-between items-end border-b border-slate-200 pb-4 mb-8">
            <h2 className="text-2xl font-black text-slate-900 border-l-4 border-blue-600 pl-4">All Stories</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {latestNews.map((news) => (
              <Link key={news.id} href={`/${lang}/post/${news.id}`} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-100 transition-all group">
                <div className="h-48 overflow-hidden relative bg-slate-100">
                  <img src={news.featuredImage || 'https://via.placeholder.com/400'} alt="News" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5">
                  <span className="text-[10px] font-bold text-blue-600 uppercase mb-2 block tracking-wider">{news.category}</span>
                  <h2 className="font-bold text-lg text-slate-900 leading-[1.4] group-hover:text-blue-600 transition-colors line-clamp-2">
                    {/* 🚀 અહી બેકઅપ તરીકે 'gu' સેટ કર્યું છે */}
                    {news.translations[lang]?.title || news.translations['gu']?.title}
                  </h2>
                  <p className="text-slate-500 text-sm mt-3 line-clamp-2 leading-relaxed">
                    {/* 🚀 અહી બેકઅપ તરીકે 'gu' સેટ કર્યું છે */}
                    {news.translations[lang]?.shortDescription || news.translations['gu']?.shortDescription}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}