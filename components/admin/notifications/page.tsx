'use client';

import React, { useState, useEffect } from 'react';
import { db } from '../../../../lib/firebase'; // તારો સાચો પાથ સેટ કરજે
import { collection, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';
import { Send, Users, BellRing, Link as LinkIcon, History } from 'lucide-react';

export default function AdminNotificationsPage() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [link, setLink] = useState('');
  const [subscribers, setSubscribers] = useState(0);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<any[]>([]);

  // 🚀 ડેટાબેઝમાંથી ટોટલ Subscribers અને જૂના Notifications ખેંચો
  useEffect(() => {
    const fetchData = async () => {
      try {
        // ૧. ટોટલ સબસ્ક્રાઈબર્સ ગણો
        const tokensSnap = await getDocs(collection(db, 'fcm_tokens'));
        setSubscribers(tokensSnap.size);

        // ૨. મોકલેલા જૂના નોટિફિકેશનની હિસ્ટ્રી
        const historySnap = await getDocs(collection(db, 'notifications_history'));
        const historyData = historySnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        // સમય પ્રમાણે સોર્ટ કરો (નવા પહેલા)
        historyData.sort((a: any, b: any) => b.createdAt?.toMillis() - a.createdAt?.toMillis());
        setHistory(historyData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleSendNotification = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !body) return alert("Title and Body are required!");
    if (subscribers === 0) return alert("You have 0 subscribers right now.");

    setLoading(true);
    try {
      // 🚀 ૧. હિસ્ટ્રી માટે ફાયરબેઝમાં સેવ કરો
      const newNotif = {
        title,
        body,
        link,
        sentTo: subscribers,
        createdAt: serverTimestamp()
      };
      await addDoc(collection(db, 'notifications_history'), newNotif);

      // 🚀 અહી આપણે API કૉલ કરીશું જે બધા ફોનમાં રિયલ મેસેજ મોકલશે (જે આપણે નેક્સ્ટ સ્ટેપમાં બનાવીશું)
      // await fetch('/api/send-notification', { method: 'POST', body: JSON.stringify(newNotif) });

      alert("🎉 Breaking News Notification Sent Successfully!");
      setTitle('');
      setBody('');
      setLink('');
      
      // હિસ્ટ્રીમાં નવો ડેટા એડ કરો
      setHistory([{ ...newNotif, createdAt: { toDate: () => new Date() } }, ...history]);
    } catch (error) {
      console.error("Error sending notification:", error);
      alert("Failed to send notification.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 md:p-10 bg-slate-50 min-h-screen">
      <div className="max-w-5xl mx-auto">
        
        <div className="mb-8">
          <h1 className="text-3xl font-black text-slate-900 flex items-center gap-3 mb-2">
            <BellRing className="text-blue-600" size={32} /> Push Notifications
          </h1>
          <p className="text-slate-500 font-medium">Send breaking news alerts directly to your readers' devices.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* 🚀 Left Column: Form & Stats */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Stats Card */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-3xl p-8 text-white shadow-lg flex items-center justify-between">
              <div>
                <p className="text-blue-100 font-medium mb-1">Total Active Subscribers</p>
                <h2 className="text-4xl font-black">{subscribers}</h2>
              </div>
              <div className="bg-white/20 p-4 rounded-2xl">
                <Users size={32} className="text-white" />
              </div>
            </div>

            {/* Send Notification Form */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
              <h2 className="text-xl font-black text-slate-800 mb-6">Compose Message</h2>
              <form onSubmit={handleSendNotification} className="space-y-5">
                
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Notification Title (Headline)</label>
                  <input 
                    type="text" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. 🚨 Breaking: Massive Update!" 
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all font-medium"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Message Body (Short Description)</label>
                  <textarea 
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    placeholder="Enter the short news summary here..." 
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all font-medium resize-none"
                    required
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-1">
                    <LinkIcon size={16}/> Article Link (Optional)
                  </label>
                  <input 
                    type="url" 
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    placeholder="https://mihirsync.com/en/post/..." 
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all font-medium text-blue-600"
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={loading || subscribers === 0}
                  className="w-full bg-slate-900 hover:bg-blue-600 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                >
                  {loading ? 'Sending...' : 'Send Push Notification'} <Send size={18} />
                </button>

              </form>
            </div>
          </div>

          {/* 🚀 Right Column: History */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 h-fit max-h-[800px] overflow-y-auto">
            <h2 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2">
              <History size={20} className="text-slate-400" /> Recent Alerts
            </h2>
            
            <div className="space-y-4">
              {history.length === 0 ? (
                <p className="text-slate-500 font-medium text-sm text-center py-10 bg-slate-50 rounded-xl">No notifications sent yet.</p>
              ) : (
                history.map((item, idx) => (
                  <div key={idx} className="p-4 bg-slate-50 border border-slate-100 rounded-2xl hover:border-blue-200 transition-colors">
                    <h3 className="font-bold text-slate-800 text-sm mb-1">{item.title}</h3>
                    <p className="text-slate-600 text-xs mb-3 line-clamp-2">{item.body}</p>
                    <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      <span className="bg-slate-200 text-slate-600 px-2 py-0.5 rounded">Sent to {item.sentTo}</span>
                      <span>
                        {item.createdAt?.toDate ? item.createdAt.toDate().toLocaleDateString() : 'Just now'}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}