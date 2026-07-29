'use client';

import React, { useState, useEffect } from 'react';
import { db } from '../../lib/firebase';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { Zap, ExternalLink, X, Download, Share2 } from 'lucide-react'; // 👈 નવા આઇકોન (Download, Share) ઉમેર્યા

export default function ShortsNews() {
  const [shorts, setShorts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // 🚀 મોટો ફોટો બતાવવા માટે નવું સ્ટેટ
  const [selectedShort, setSelectedShort] = useState<any>(null);

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

  // 📲 શેર કરવાનું ફંક્શન (WhatsApp, Insta, વગેરે માટે)
  const handleShare = async (short: any) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'MihirSync Shorts News',
          text: `Check out this news: ${short.title || ''}`,
          url: short.imageUrl,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      alert('Share option is only supported on mobile browsers.');
    }
  };

  // ⬇️ ડાઉનલોડ કરવાનું ફંક્શન
  const handleDownload = async (short: any) => {
    try {
      const response = await fetch(short.imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `MihirSync_News_${Date.now()}.jpg`; // ફાઈલનું નામ
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      // જો કોઈ એરર આવે તો નવા ટેબમાં ફોટો ખુલશે
      window.open(short.imageUrl, '_blank');
    }
  };

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
          <div 
            key={short.id} 
            onClick={() => setSelectedShort(short)} // 👈 ક્લિક કરતા મોટો ફોટો ખુલશે
            className="min-w-[240px] md:min-w-[280px] h-[350px] md:h-[400px] relative rounded-2xl overflow-hidden snap-center shrink-0 border border-slate-200 shadow-sm group cursor-pointer hover:shadow-xl transition-shadow bg-slate-50 flex justify-center items-center p-2"
          >
            {/* 🚀 અહી object-contain કર્યું એટલે ફોટો કપાશે નહિ અને કાળો પડછાયો પણ કાઢી નાખ્યો */}
            <img src={short.imageUrl} alt={short.title} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" />
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

      {/* 🖼️ LIGHTBOX MODAL (જ્યારે ઈમેજ પર ક્લિક થાય ત્યારે ખુલશે) */}
      {selectedShort && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex flex-col items-center justify-center p-4 backdrop-blur-sm transition-all">
          
          {/* ❌ બંધ કરવાનું બટન */}
          <button 
            onClick={() => setSelectedShort(null)}
            className="absolute top-4 right-4 md:top-8 md:right-8 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full transition-colors"
          >
            <X size={28} />
          </button>

          {/* 📰 મોટી ઈમેજ (આખી દેખાશે) */}
          <div className="w-full max-w-2xl h-[70vh] flex justify-center items-center mt-8">
            <img 
              src={selectedShort.imageUrl} 
              alt="News Full" 
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            />
          </div>

          {/* ⚡ ડાઉનલોડ અને શેર બટન */}
          <div className="mt-8 flex gap-4 w-full max-w-sm justify-center">
            <button 
              onClick={() => handleDownload(selectedShort)}
              className="flex-1 bg-white hover:bg-gray-100 text-black font-black py-4 px-6 rounded-2xl flex items-center justify-center gap-2 transition-transform active:scale-95"
            >
              <Download size={22} /> Save
            </button>
            <button 
              onClick={() => handleShare(selectedShort)}
              className="flex-1 bg-green-500 hover:bg-green-600 text-white font-black py-4 px-6 rounded-2xl flex items-center justify-center gap-2 transition-transform active:scale-95"
            >
              <Share2 size={22} /> Share
            </button>
          </div>

        </div>
      )}

    </div>
  );
}