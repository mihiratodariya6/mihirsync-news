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
  // Stats State (આ ડેટા ડાયરેક્ટ ફાયરબેઝમાંથી આવશે અને એડમિન એડિટ પણ કરી શકશે)
  const [stats, setStats] = useState({
    likes: initialLikes,
    love: 0,
    fire: 0,
    wow: 0,
    sad: 0,
    clap: 0
  });

  const [selectedReaction, setSelectedReaction] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // 🚀 ૧. રિયલ-ટાઇમ ડેટાબેઝમાંથી બધા રિએક્શન્સના આંકડા લાવો
    const fetchStats = async () => {
      const docRef = doc(db, 'articles', articleId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setStats({
          likes: data.stats?.likes || 0,
          love: data.stats?.love || 0,
          fire: data.stats?.fire || 0,
          wow: data.stats?.wow || 0,
          sad: data.stats?.sad || 0,
          clap: data.stats?.clap || 0
        });
      }
    };
    fetchStats();

    // ૨. ચેક કરો કે આ યુઝરે કયું રિએક્શન આપ્યું છે
    const savedReaction = localStorage.getItem(`reaction_${articleId}`);
    if (savedReaction) setSelectedReaction(savedReaction);

    // ૩. ચેક કરો કે આ આર્ટિકલ બુકમાર્ક કરેલો છે કે નહિ
    const bookmarks = JSON.parse(localStorage.getItem('mihirsync_bookmarks') || '[]');
    if (bookmarks.includes(articleId)) setIsBookmarked(true);

    return () => {
      window.speechSynthesis.cancel(); // પેજ બદલાય તો બોલવાનું બંધ
    };
  }, [articleId]);

  // 🚀 રિએક્શન આપવા માટેનું ફંક્શન
  const handleReaction = async (reactionId: string) => {
    if (selectedReaction) return; // જો એક વાર રિએક્શન આપી દીધું હોય તો બીજી વાર નહિ અપાય

    setSelectedReaction(reactionId);
    setStats(prev => ({ ...prev, [reactionId]: prev[reactionId as keyof typeof prev] + 1 }));

    try {
      localStorage.setItem(`reaction_${articleId}`, reactionId);
      // ફાયરબેઝમાં અપડેટ કરો
      await updateDoc(doc(db, 'articles', articleId), {
        [`stats.${reactionId}`]: increment(1)
      });
    } catch (error) {
      console.error("Error updating reaction", error);
    }
  };

  // 🚀 આર્ટિકલ સાંભળવા (Listen) માટેનું ફંક્શન
  const toggleListen = () => {
    if (isListening) {
      window.speechSynthesis.cancel();
      setIsListening(false);
    } else {
      const cleanText = textToRead.replace(/<[^>]*>?/gm, ''); // HTML કાઢી નાખો
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = 'gu-IN'; // ગુજરાતી ભાષા માટે
      utterance.onend = () => setIsListening(false);
      window.speechSynthesis.speak(utterance);
      setIsListening(true);
    }
  };

  // 🚀 બુકમાર્ક કરવા માટેનું ફંક્શન
  const handleBookmark = () => {
    let bookmarks = JSON.parse(localStorage.getItem('mihirsync_bookmarks') || '[]');
    if (isBookmarked) {
      bookmarks = bookmarks.filter((id: string) => id !== articleId); // Remove
    } else {
      bookmarks.push(articleId); // Add
    }
    localStorage.setItem('mihirsync_bookmarks', JSON.stringify(bookmarks));
    setIsBookmarked(!isBookmarked);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, url: window.location.href });
      } catch (error) {}
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const formatNum = (num: number) => Intl.NumberFormat('en-US', { notation: "compact" }).format(num || 0);

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-6 w-full">
      
      {/* 🚀 Reactions Box */}
      <div className="flex flex-wrap items-center gap-2">
        {reactionsList.map((r) => {
          const isSelected = selectedReaction === r.id;
          const count = stats[r.id as keyof typeof stats];
          return (
            <button
              key={r.id}
              onClick={() => handleReaction(r.id)}
              disabled={!!selectedReaction}
              title={r.label}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full border text-sm font-bold transition-all duration-300 ${
                isSelected 
                  ? 'bg-blue-50 border-blue-300 text-blue-700 shadow-sm scale-105' 
                  : selectedReaction 
                    ? 'bg-slate-50 border-slate-100 text-slate-400 cursor-not-allowed opacity-50' 
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:scale-105 active:scale-95 hover:border-slate-300 shadow-sm hover:shadow'
              }`}
            >
              <span className="text-lg leading-none">{r.emoji}</span>
              <span className="ml-1">{formatNum(count)}</span>
            </button>
          );
        })}
      </div>

      {/* 🚀 Tools / Actions (Listen, Bookmark, Share) */}
      <div className="flex items-center gap-2.5 w-full md:w-auto justify-end">
        <button 
          onClick={toggleListen}
          className={`flex items-center justify-center w-11 h-11 rounded-full border shadow-sm transition-all ${isListening ? 'bg-blue-600 border-blue-600 text-white animate-pulse' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-blue-600'}`}
          title={isListening ? "Stop Listening" : "Listen to Article"}
        >
          {isListening ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>

        <button 
          onClick={handleBookmark}
          className={`flex items-center justify-center w-11 h-11 rounded-full border shadow-sm transition-all ${isBookmarked ? 'bg-slate-900 border-slate-900 text-white' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-blue-600'}`}
          title={isBookmarked ? "Remove Bookmark" : "Save Article"}
        >
          <Bookmark size={18} className={isBookmarked ? 'fill-current' : ''} />
        </button>

        <button 
          onClick={handleShare}
          className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-full font-bold text-sm hover:bg-blue-600 transition-colors shadow-md ml-1"
        >
          {copied ? <Check size={16} className="text-green-400" /> : <Share2 size={16} />}
          {copied ? 'Copied!' : 'Share'}
        </button>
      </div>

    </div>
  );
}