'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { db } from '../../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import Link from 'next/link';
import TrendingReels from '../../components/web/TrendingReels'; 
import ShortsNews from '../../components/web/ShortsNews';

export default function HomePage() {
  const params = useParams();
  const lang = (params.lang as string) || 'gu';

  const [featuredNews, setFeaturedNews] = useState<any[]>([]);
  const [trendingNews, setTrendingNews] = useState<any[]>([]);
  const [homeNews, setHomeNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 🚀 અસલી બ્રહ્માસ્ત્ર: ખાલી ગુજરાતી જ ઉપાડશે!
  const getTitle = (news: any) => {
    const guTitle = news?.translations?.gu?.title;
    if (guTitle && guTitle.trim() !== '') return guTitle;
    return news?.translations?.en?.title || 'Title Missing';
  };

  const getDesc = (news: any) => {
    const guDesc = news?.translations?.gu?.shortDescription;
    if (guDesc && guDesc.trim() !== '') return guDesc;
    return news?.translations?.en?.shortDescription || '';
  };

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'articles'));
        const rawDocs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as any));

        const publishedNews = rawDocs.filter((news: any) => {
          const st = (news.status || '').toLowerCase();
          return st === 'published' || st === ''; 
        });

        publishedNews.sort((a: any, b: any) => {
          const timeA = a.createdAt?.toMillis ? a.createdAt.toMillis() : 0;
          const timeB = b.createdAt?.toMillis ? b.createdAt.toMillis() : 0;
          return timeB - timeA;
        });

        setFeaturedNews(publishedNews.filter((n: any) => n.placement?.isFeatured));
        setTrendingNews(publishedNews.filter((n: any) => n.placement?.isTrending).slice(0, 5));
        setHomeNews(publishedNews.filter((n: any) => n.placement?.showOnHome));
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
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        
        <div className="lg:col-span-2 relative h-[450px] rounded-3xl overflow-hidden shadow-2xl group cursor-pointer bg-slate-100">
          {featuredNews.length > 0 ? (
            <Link href={`/${lang}/post/${featuredNews[0].id}`}>
              <img src={featuredNews[0].featuredImage || 'https://via.placeholder.com/800'} alt="Featured" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8 w-full">
                <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-md uppercase tracking-wider mb-4 inline-block">
                  {featuredNews[0].category || 'NEWS'}
                </span>
                <h1 className="text-3xl md:text-4xl font-black text-white leading-tight drop-shadow-lg">
                  {getTitle(featuredNews[0])}
                </h1>
                <p className="text-slate-300 mt-3 text-lg line-clamp-2">
                  {getDesc(featuredNews[0])}
                </p>
              </div>
            </Link>
          ) : (
            <div className="w-full h-full bg-slate-200 flex items-center justify-center rounded-3xl">
              <span className="font-bold text-slate-400">એડમિનમાંથી 'Top Slider' ટીક કરો.</span>
            </div>
          )}
        </div>

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
                      {getTitle(news)}
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

      <div className="mb-16">
        <div className="flex justify-between items-end border-b border-slate-200 pb-4 mb-8">
          <h2 className="text-2xl font-black text-slate-900 border-l-4 border-blue-600 pl-4">Latest Stories</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {homeNews.length > 0 ? (
            homeNews.map((news) => (
              <Link key={news.id} href={`/${lang}/post/${news.id}`} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-100 transition-all group">
                <div className="h-48 overflow-hidden relative bg-slate-100">
                  <img src={news.featuredImage || 'https://via.placeholder.com/400'} alt="News" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5">
                  <span className="text-[10px] font-bold text-blue-600 uppercase mb-2 block tracking-wider">{news.category}</span>
                  <h2 className="font-bold text-lg text-slate-900 leading-[1.4] group-hover:text-blue-600 transition-colors line-clamp-2">
                    {getTitle(news)}
                  </h2>
                  <p className="text-slate-500 text-sm mt-3 line-clamp-2 leading-relaxed">
                    {getDesc(news)}
                  </p>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-center text-slate-400 font-bold col-span-full py-10">એડમિનમાંથી 'Show on Main Home Page' ટીક કરો.</p>
          )}
        </div>
      </div>

      <div className="border-t border-slate-200 pt-10">
         <TrendingReels />
      </div>

      <div className="mb-10">
         <ShortsNews />
      </div>

    </div>
  );
}