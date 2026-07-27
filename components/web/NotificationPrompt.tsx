'use client';

import React, { useState, useEffect } from 'react';
import { BellRing, X } from 'lucide-react';
import { db } from '../../lib/firebase';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { getMessaging, getToken } from 'firebase/messaging';

// 🚀 તારી VAPID Key અહી પેસ્ટ કરજે (જે આપણે કાઢી હતી)
const VAPID_KEY = "BAm_ebH5CA60uEHfoI3jgw1QC1Sj4w9FhJd4r3xjLYpXIHYK9FfUyTkRO8aUWBldfchPgrHB_i5YBcgRWHpXvFo"; 

export default function NotificationPrompt() {
  const [showPrompt, setShowPrompt] = useState(false);
  const [isClient, setIsClient] = useState(false); // Next.js ના એરર બચાવવા માટે

  useEffect(() => {
    setIsClient(true);
    
    // ૧. જો બ્રાઉઝરમાં નોટિફિકેશન સપોર્ટ ના હોય તો રિટર્ન થઈ જાઓ
    if (!('Notification' in window)) return;

    // ૨. જો બ્રાઉઝર લેવલ પર પહેલેથી Allow (granted) કે Block (denied) કરેલું હોય, તો પ્રોમ્પ્ટ ના બતાવો
    if (Notification.permission === 'granted' || Notification.permission === 'denied') {
      return;
    }

    // ૩. લોકલ સ્ટોરેજ ચેક કરો (જો યુઝરે અગાઉ ક્રોસ [X] દબાવીને બંધ કર્યું હોય તો ના બતાવો)
    const isDismissed = localStorage.getItem('push_dismissed');
    const isSubscribed = localStorage.getItem('push_subscribed');
    
    if (isDismissed === 'true' || isSubscribed === 'true') {
      return;
    }

    // જો બધું બરાબર હોય તો જ 5 સેકન્ડ પછી પ્રોમ્પ્ટ બતાવો
    const timer = setTimeout(() => setShowPrompt(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleSubscribe = async () => {
    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        const messaging = getMessaging();
        const token = await getToken(messaging, { vapidKey: VAPID_KEY });
        
        if (token) {
          const tokensRef = collection(db, 'fcm_tokens');
          const q = query(tokensRef, where('token', '==', token));
          const querySnapshot = await getDocs(q);

          // જો ટોકન ડેટાબેઝમાં ના હોય તો જ સેવ કરો
          if (querySnapshot.empty) {
            await addDoc(tokensRef, {
              token: token,
              createdAt: new Date(),
              device: navigator.userAgent
            });
          }

          localStorage.setItem('push_subscribed', 'true');
          setShowPrompt(false); // પ્રોમ્પ્ટ બંધ કરો
          alert("✅ Notifications Enabled Successfully!");
        }
      } else {
        // જો યુઝરે બ્રાઉઝરમાંથી "Block" કર્યું
        localStorage.setItem('push_dismissed', 'true');
        setShowPrompt(false);
      }
    } catch (error) {
      console.error('Error subscribing to notifications:', error);
    }
  };

  // 🚀 જો યુઝર "X" બટન દબાવે તો એને કાયમ માટે છુપાવી દો
  const handleDismiss = () => {
    localStorage.setItem('push_dismissed', 'true');
    setShowPrompt(false);
  };

  if (!isClient || !showPrompt) return null;

  return (
    <div className="fixed bottom-4 left-4 md:bottom-8 md:left-8 z-50 animate-fade-in-up">
      <div className="bg-slate-900 text-white p-5 rounded-2xl shadow-2xl flex items-center gap-4 max-w-sm border border-slate-700 relative">
        {/* 🚀 X બટન પર હવે કાયમ માટે બંધ થવાનું ફંક્શન લાગેલું છે */}
        <button 
          onClick={handleDismiss} 
          className="absolute -top-2 -right-2 bg-slate-700 hover:bg-red-500 rounded-full p-1 transition-colors z-10 shadow-md"
        >
          <X size={16} />
        </button>
        
        <div className="bg-blue-600 p-3 rounded-full animate-bounce shrink-0">
          <BellRing size={24} className="text-white" />
        </div>
        
        <div>
          <h4 className="font-bold text-lg leading-tight mb-1">Get Breaking News!</h4>
          <p className="text-xs text-slate-400 mb-3">Be the first to know what's happening around the world.</p>
          <button 
            onClick={handleSubscribe}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1.5 px-4 rounded-full text-sm transition-colors"
          >
            Allow Notifications
          </button>
        </div>
      </div>
    </div>
  );
}