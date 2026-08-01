'use client';

import React, { useState, useEffect } from 'react';
import { db } from '../../lib/firebase';
import { doc, updateDoc, increment, getDoc } from 'firebase/firestore';
import { Volume2, VolumeX, Bookmark, Share2, Check } from 'lucide-react';

const reactionsList = [
  { id: 'likes', emoji: '👍', label: 'Like' },
  { id: 'love', emoji: '❤️', label: 'Love' },
  { id: 'fire', emoji: '🔥', label: 'Fire' },
  { id: 'wow', emoji: '😲', label: 'Wow' },
  { id: 'sad', emoji: '😢', label: 'Sad' },
  { id: 'clap', emoji: '👏', label: 'Clap' }
];

export default function ArticleInteractions({ articleId, initialLikes = 0, title, textToRead }: any) {
  const [stats, setStats] = useState({
    likes: initialLikes, love: 0, fire: 0, wow: 0, sad: 0, clap: 0
  });
  const [selectedReaction, setSelectedReaction] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  
  // 🔊 ઓડિયો માટે State
  const [isPlaying, setIsPlaying] = useState(false);

  // 🚀 જાદુઈ સ્માર્ટ અવાજ ફંક્શન
  const handleSpeak = () => {
    if ('speechSynthesis' in window) {
      
      // જો અવાજ ચાલુ હોય તો બટન દબાવવાથી બંધ થઈ જશે
      if (isPlaying) {
        window.speechSynthesis.cancel();
        setIsPlaying(false);
        return;
      }

      window.speechSynthesis.cancel(); // કોઈ જૂનો અવાજ ચોંટ્યો હોય તો ક્લિયર કરે

      // 🌍 ૧. Google Translate કઈ ભાષામાં છે એ પકડવાની જાસૂસી
      let currentLang = 'gu-IN'; // ડિફોલ્ટ ગુજરાતી
      
      const htmlLang = document.documentElement.lang || '';
      const match = document.cookie.match(/googtrans=\/.*?\/(.*?)(;|$)/);
      const gtLang = match ? match[1] : '';

      const finalLang = gtLang || htmlLang || 'gu';

      // ભાષા મુજબ અવાજ સેટ કરે
      if (finalLang.includes('hi')) currentLang = 'hi-IN'; // હિન્દી
      else if (finalLang.includes('en')) currentLang = 'en-IN'; // ઇંગ્લિશ (Indian accent)
      else if (finalLang.includes('mr')) currentLang = 'mr-IN'; // મરાઠી
      else if (finalLang.includes('gu')) currentLang = 'gu-IN'; // ગુજરાતી

      // 🎙️ ૨. અવાજ ચાલુ કરવાનું સેટિંગ
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.lang = currentLang; // જે ભાષા પકડી એનો અવાજ આપ્યો
      utterance.rate = 0.9; // બોલવાની સ્પીડ (0.9 થી એકદમ સમાચાર વાળી ફીલ આવશે)
      utterance.pitch = 1;

      // જ્યારે બોલવાનું પૂરું થાય ત્યારે બટન પાછું નોર્મલ થઈ જાય
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);

      window.speechSynthesis.speak(utterance);
      setIsPlaying(true);
    } else {
      alert("માફ કરજો, તમારું બ્રાઉઝર અવાજ સપોર્ટ કરતું નથી!");
    }
  };

  // જ્યારે યુઝર પેજ બંધ કરે ત્યારે અવાજ ઓટોમેટિક બંધ થઈ જાય
  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleReaction = async (type: string) => {
    if (selectedReaction === type) return;
    
    setStats(prev => ({ ...prev, [type]: prev[type as keyof typeof prev] + 1 }));
    setSelectedReaction(type);

    try {
      const ref = doc(db, 'articles', articleId);
      await updateDoc(ref, { [`reactions.${type}`]: increment(1) });
    } catch (error) {
      console.error("Error updating reaction:", error);
    }
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: title, url: url });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(url);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-slate-200 my-8">
      
      {/* Reactions */}
      <div className="flex flex-wrap items-center gap-2">
        {reactionsList.map((reaction) => (
          <button
            key={reaction.id}
            onClick={() => handleReaction(reaction.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-sm font-bold transition-all ${
              selectedReaction === reaction.id 
                ? 'bg-blue-50 border-blue-200 text-blue-700' 
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:scale-105'
            }`}
          >
            <span>{reaction.emoji}</span>
            <span>{stats[reaction.id as keyof typeof stats] || 0}</span>
          </button>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3">
        
        {/* 🔊 Text to Speech Button */}
        <button 
          onClick={handleSpeak}
          className={`p-2.5 rounded-full border transition-all ${
            isPlaying 
              ? 'bg-blue-600 border-blue-600 text-white animate-pulse' 
              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
          title={isPlaying ? "Stop Reading" : "Read Article"}
        >
          {isPlaying ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>

        <button className="p-2.5 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-all">
          <Bookmark size={20} />
        </button>
        
        <button 
          onClick={handleShare}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900 text-white font-bold text-sm hover:bg-slate-800 transition-all shadow-md"
        >
          {isCopied ? <Check size={18} /> : <Share2 size={18} />}
          {isCopied ? 'Copied!' : 'Share'}
        </button>
      </div>

    </div>
  );
}