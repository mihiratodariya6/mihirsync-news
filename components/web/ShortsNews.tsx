'use client';

import React, { useState, useEffect } from 'react';
import { db } from '../../lib/firebase';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { Zap, ExternalLink } from 'lucide-react'; // 👈 Instagram કાઢીને ExternalLink મૂકી દીધું છે

export default function ShortsNews() {
  const [shorts, setShorts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShorts = async () => {
      try {
        const q = query(collection(db, 'shorts'), orderBy('createdAt', 'desc'), limit(10));
        const querySnapshot = await getDocs(q);
        const shortsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setShorts(shortsData);
      } catch (error) {
        console.error("Error fetching shorts: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchShorts();
  }, []);

  if (loading || shorts.length === 0) return null;

  return (
    <div className="my-10 max-w-7xl mx-auto border-t border-slate-200 pt-10">
      
      {/* ટાઈટલ */}
      <div className="flex items-center gap-2 mb-6 px-4 md:px-8">
        <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
          <Zap className="text-orange-600 animate-pulse" size={24} />
        </div>
        <h2 className="text-2xl md:text-3xl font-black text-slate-800 uppercase tracking-tight">
          Shorts News
        </h2>
      </div>

      {/* આડી લાઈનમાં 10 Shorts */}
      <div className="flex overflow-x-auto gap-4 px-4 md:px-8 pb-6 snap-x custom-scrollbar">
        {shorts.map((short) => (
          <div key={short.id} className="min-w-[220px] md:min-w-[260px] aspect-[3/4] relative rounded-2xl overflow-hidden snap-center shrink-0 border border-slate-200 shadow-sm group cursor-pointer hover:shadow-xl transition-shadow">
            <img src={short.imageUrl} alt={short.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            
            {/* નીચે કાળો પડછાયો */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
            
            <div className="absolute bottom-0 left-0 w-full p-4">
              <h3 className="font-bold text-white text-sm md:text-base line-clamp-2 drop-shadow-md">{short.title}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* 🚀 See More Shorts Button */}
      <div className="flex justify-center mt-4 px-4">
        <a 
          href="https://www.instagram.com/mihirsync?igsh=MW9jcnlpcWllcGNhZQ==" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-gradient-to-r from-orange-500 to-pink-600 text-white font-bold py-3.5 px-8 rounded-full hover:shadow-lg hover:shadow-orange-500/40 transition-all flex items-center gap-2 group"
        >
          See More Shorts News 
          <ExternalLink size={20} className="group-hover:scale-110 transition-transform" />
        </a>
      </div>

    </div>
  );
}