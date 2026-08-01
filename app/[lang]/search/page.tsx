'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { db } from '../../../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import Link from 'next/link';
import { Loader2, SearchX, Search } from 'lucide-react';

function SearchContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  
  const lang = (params.lang as string) || 'gu';
  const query = searchParams.get('q') || ''; // URL માંથી સર્ચ શબ્દ કાઢશે

  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const getTitle = (news: any) => news?.translations?.gu?.title || news?.translations?.en?.title || news?.title || '';
  const getDesc = (news: any) => news?.translations?.gu?.shortDescription || news?.translations?.en?.shortDescription || news?.shortDescription || '';

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const snapshot = await getDocs(collection(db, 'articles'));
        const rawDocs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as any));
        
        const lowerQuery = query.toLowerCase().trim();

        // 🚀 ખાલી Published ન્યૂઝ જ લેશે
        const validNews = rawDocs.filter((news: any) => {
          return (news.status || '').toLowerCase() === 'published' && news.featuredImage;
        });

        // 🚀 ટાઈટલ, ડિસ્ક્રિપ્શન અથવા કેટેગરીમાં સર્ચ શબ્દ મેચ કરશે
        const filtered = validNews.filter((news: any) => {
          const title = getTitle(news).toLowerCase();
          const desc = getDesc(news).toLowerCase();
          const category = (news.category || '').toLowerCase();
          
          return title.includes(lowerQuery) || desc.includes(lowerQuery) || category.includes(lowerQuery);
        });

        // લેટેસ્ટ ન્યૂઝ ઉપર
        filtered.sort((a: any, b: any) => {
          const timeA = a.createdAt?.toMillis ? a.createdAt.toMillis() : 0;
          const timeB = b.createdAt?.toMillis ? b.createdAt.toMillis() : 0;
          return timeB - timeA;
        });

        setSearchResults(filtered);

      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  if (loading) return <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3 text-slate-500 font-bold"><Loader2 className="animate-spin text-blue-600" size={32} /> શોધાઈ રહ્યું છે: "{query}"...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 min-h-[70vh]">
      <div className="border-l-4 border-blue-600 pl-4 mb-10">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2"><Search size={28}/> Search Results</h1>
        <p className="text-slate-500 font-medium mt-2">Showing results for: <span className="text-blue-600 font-bold bg-blue-50 px-2 py-1 rounded-md">"{query}"</span></p>
      </div>

      {searchResults.length === 0 ? (
        <div className="text-center p-16 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center justify-center">
          <SearchX size={56} className="text-slate-300 mb-4" />
          <h2 className="text-xl font-bold text-slate-700 mb-2">કોઈ ન્યૂઝ મળ્યા નથી!</h2>
          <p className="text-slate-500">તમે જે શોધી રહ્યા છો તે શબ્દ બદલીને ફરી પ્રયાસ કરો.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {searchResults.map((news) => (
            <Link key={news.id} href={`/${lang}/post/${news.id}`} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-100 transition-all group">
              <div className="h-48 overflow-hidden relative bg-slate-100">
                <img src={news.featuredImage} alt="News" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-5">
                <span className="text-[10px] font-bold text-blue-600 uppercase mb-2 block tracking-wider">{news.category || 'NEWS'}</span>
                <h2 className="font-bold text-lg text-slate-900 leading-[1.4] group-hover:text-blue-600 transition-colors line-clamp-2">
                  {getTitle(news)}
                </h2>
                <p className="text-slate-500 text-sm mt-3 line-clamp-2 leading-relaxed">
                  {getDesc(news)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

// 🚀 Vercel માં એરર ના આવે એટલે Suspense માં મૂક્યું છે
export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-20 text-center font-bold text-slate-500 animate-pulse text-xl">Loading Search...</div>}>
      <SearchContent />
    </Suspense>
  );
}