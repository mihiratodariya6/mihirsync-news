'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { db } from '../../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import Link from 'next/link';

export default function HomePage() {
  const params = useParams();
  const lang = (params.lang as string) || 'gu';

  const [homeNews, setHomeNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [debugInfo, setDebugInfo] = useState('Checking database...'); // 🚀 અસલી જાસૂસ

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'articles'));
        const rawDocs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as any));
        
        // 🚨 ડેટાબેઝમાં કેટલા ન્યૂઝ છે એ એક્ઝેટ પકડીને સ્ક્રીન પર બતાવશે
        setDebugInfo(`✅ SUCCESS! Firebase માંથી ${rawDocs.length} ન્યૂઝ મળ્યા છે.`);
        
        // 🚀 કોઈ જ કન્ડિશન નહિ! જે છે એ બધું હોમપેજ પર સીધું બતાવો!
        setHomeNews(rawDocs);

      } catch (error: any) {
        console.error(error);
        setDebugInfo(`❌ ERROR: ડેટાબેઝ એરર - ${error.message}`);
      } finally {
        setLoading(false);
      }
    };
    fetchHomeData();
  }, []);

  const getTitle = (news: any) => news?.translations?.gu?.title || news?.translations?.en?.title || news?.title || 'Title Missing';
  
  if (loading) return <div className="p-20 text-center font-bold text-slate-500 animate-pulse text-xl">Loading Latest News...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      
      {/* 🚨 જાસૂસી બોર્ડ (આપણને ખબર પડે કે પ્રોબ્લેમ ક્યાં છે) */}
      <div className="bg-yellow-100 text-yellow-800 p-4 rounded-xl mb-8 font-black text-center border border-yellow-300 shadow-sm text-lg">
        🛠️ સિસ્ટમ સ્ટેટસ: {debugInfo}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        
        {/* 🖼️ Left: Main Featured Slider (ડેટાબેઝનો પહેલો ન્યૂઝ) */}
        <div className="lg:col-span-2 relative h-[450px] rounded-3xl overflow-hidden shadow-2xl group cursor-pointer bg-slate-100">
          {homeNews.length > 0 ? (
            <Link href={`/${lang}/post/${homeNews[0].id}`}>
              <img src={homeNews[0].featuredImage || 'https://via.placeholder.com/800'} alt="Featured" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8 w-full">
                <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-md uppercase tracking-wider mb-4 inline-block">
                  {homeNews[0].category || 'BREAKING'}
                </span>
                <h1 className="text-3xl md:text-4xl font-black text-white leading-tight drop-shadow-lg">
                  {getTitle(homeNews[0])}
                </h1>
              </div>
            </Link>
          ) : (
            <div className="w-full h-full bg-slate-200 flex items-center justify-center rounded-3xl">
              <span className="font-bold text-slate-400">ડેટાબેઝ ખાલી છે અથવા એક્સેસ નથી!</span>
            </div>
          )}
        </div>

        {/* 🔥 Right: Trending Now Sidebar (પહેલા ૫ ન્યૂઝ) */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col h-[450px]">
          <h3 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2">
            <span className="text-red-500">🔥</span> Trending Now
          </h3>
          <div className="flex-1 overflow-y-auto custom-scrollbar space-y-6 pr-2">
            {homeNews.slice(0, 5).map((news, index) => (
              <Link key={news.id} href={`/${lang}/post/${news.id}`} className="flex gap-4 group">
                <span className="text-4xl font-black text-slate-200 group-hover:text-blue-100 transition-colors">{index + 1}</span>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">
                    {getTitle(news)}
                  </h4>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>

      {/* 📰 BOTTOM SECTION: Latest Stories (કોઈ પણ ફિલ્ટર વગર બધા જ ન્યૂઝ) */}
      <div className="mb-16">
        <div className="flex justify-between items-end border-b border-slate-200 pb-4 mb-8">
          <h2 className="text-2xl font-black text-slate-900 border-l-4 border-blue-600 pl-4">All News (Zero Filters)</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {homeNews.map((news) => (
            <Link key={news.id} href={`/${lang}/post/${news.id}`} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-100 transition-all group">
              <div className="h-48 overflow-hidden relative bg-slate-100">
                <img src={news.featuredImage || 'https://via.placeholder.com/400'} alt="News" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-5">
                <span className="text-[10px] font-bold text-blue-600 uppercase mb-2 block tracking-wider">{news.category || 'NEWS'}</span>
                <h2 className="font-bold text-lg text-slate-900 leading-[1.4] group-hover:text-blue-600 transition-colors line-clamp-2">
                  {getTitle(news)}
                </h2>
              </div>
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
}