'use client';

import React, { useState, useEffect } from 'react';
import { db } from '../../lib/firebase'; // તારા પ્રોજેક્ટ મુજબ પાથ સેટ કરજે (જો એરર આવે તો)
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { Flame } from 'lucide-react';

export default function TrendingReels() {
  const [reels, setReels] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReels = async () => {
      try {
        // છેલ્લી 5 નવી રીલ્સ લાવશે
        const q = query(collection(db, 'reels'), orderBy('createdAt', 'desc'), limit(5));
        const querySnapshot = await getDocs(q);
        const reelsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setReels(reelsData);
      } catch (error) {
        console.error("Error fetching reels: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchReels();
  }, []);

  // જો રીલ્સ લોડ થતી હોય અથવા ડેટાબેઝમાં એકપણ રીલ ના હોય, તો કંઈ નહિ બતાવે
  if (loading || reels.length === 0) return null;

  return (
    <div className="my-10 max-w-7xl mx-auto">
      {/* સેક્શનનું ટાઈટલ */}
      <div className="flex items-center gap-2 mb-6 px-4 md:px-8">
        <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
          <Flame className="text-pink-600 animate-pulse" size={24} />
        </div>
        <h2 className="text-2xl md:text-3xl font-black text-slate-800 uppercase tracking-tight">
          Trending Reels
        </h2>
      </div>
      
      {/* આડી લાઈનમાં સ્વિપ થતી રીલ્સ */}
      <div className="flex overflow-x-auto gap-6 px-4 md:px-8 pb-6 snap-x custom-scrollbar">
        {reels.map((reel) => (
          <div key={reel.id} className="min-w-[300px] md:min-w-[340px] bg-white rounded-3xl overflow-hidden snap-center shrink-0 border border-slate-200 shadow-sm hover:shadow-xl transition-shadow">
            <div className="aspect-[9/16] w-full relative bg-slate-100">
              <iframe 
                src={reel.embedUrl} 
                className="absolute top-0 left-0 w-full h-full"
                frameBorder="0" 
                scrolling="no" 
                allowTransparency={true}
                title={reel.title}
              ></iframe>
            </div>
            <div className="p-4 bg-white">
              <h3 className="font-bold text-slate-800 text-sm md:text-base truncate">{reel.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}