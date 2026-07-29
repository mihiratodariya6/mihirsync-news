'use client';

import React, { useState, useEffect } from 'react';
import { db } from '../../../lib/firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, serverTimestamp, query, orderBy, limit } from 'firebase/firestore';
import { Video, Plus, Trash2, CheckCircle2, Film, Link as LinkIcon, RefreshCw } from 'lucide-react'; // 👈 અહીં Film કરી દીધું
import Link from 'next/link';

export default function ReelsAdminPage() {
  const [reels, setReels] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [success, setSuccess] = useState('');

  const fetchReels = async () => {
    try {
      setLoading(true);
      const q = query(collection(db, 'reels'), orderBy('createdAt', 'desc'), limit(10));
      const querySnapshot = await getDocs(q);
      const reelsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setReels(reelsData);
    } catch (error) {
      console.error("Error fetching reels: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReels();
  }, []);

  const handleAddReel = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url || !title) return;
    
    setAdding(true);
    setSuccess('');

    try {
      let embedUrl = url;
      if (url.includes('instagram.com/reel/')) {
        const reelId = url.split('/reel/')[1].split('/')[0];
        embedUrl = `https://www.instagram.com/reel/${reelId}/embed`;
      }

      await addDoc(collection(db, 'reels'), {
        title,
        originalUrl: url,
        embedUrl,
        createdAt: serverTimestamp(),
        platform: 'instagram'
      });

      setSuccess('Reel added successfully! 🔥');
      setTitle('');
      setUrl('');
      fetchReels();
      
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      console.error("Error adding reel: ", error);
      alert('Error adding reel. Please try again.');
    } finally {
      setAdding(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this reel?')) return;
    
    try {
      await deleteDoc(doc(db, 'reels', id));
      setReels(reels.filter(reel => reel.id !== id));
    } catch (error) {
      console.error("Error deleting reel: ", error);
    }
  };

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-black text-slate-800 flex items-center gap-3">
            <Film size={32} className="text-pink-600" /> Manage Trending Reels 
          </h1>
          <p className="text-slate-500 font-medium mt-1">Add Instagram reels to display on your homepage (Max 5 will be shown).</p>
        </div>
        <Link href="/admin/dashboard" className="text-sm font-bold bg-slate-100 text-slate-600 px-4 py-2 rounded-lg hover:bg-slate-200 transition text-center">
          ← Back to Dashboard
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-1">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 sticky top-8">
            <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <Plus size={20} className="text-blue-600"/> Add New Reel
            </h2>

            {success && (
              <div className="bg-green-50 text-green-700 p-4 rounded-xl mb-6 font-bold flex items-center gap-2 border border-green-200">
                <CheckCircle2 size={20} /> {success}
              </div>
            )}

            <form onSubmit={handleAddReel} className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Reel Title / Caption</label>
                <input 
                  type="text" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Trump New Tariff Rules Explained"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition font-medium"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Instagram Link</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <LinkIcon size={16} className="text-slate-400" />
                  </div>
                  <input 
                    type="url" 
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://www.instagram.com/reel/..."
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition font-medium"
                    required
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={adding}
                className="w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold py-3.5 rounded-xl hover:shadow-lg hover:shadow-pink-500/30 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {adding ? <><RefreshCw size={20} className="animate-spin" /> Adding...</> : <><Video size={20} /> Add to Homepage</>}
              </button>
            </form>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 min-h-[500px]">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                <Video size={20} className="text-slate-500"/> Added Reels ({reels.length})
              </h2>
              <button onClick={fetchReels} className="text-slate-400 hover:text-blue-600 p-2"><RefreshCw size={18}/></button>
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <RefreshCw size={30} className="animate-spin text-slate-300 mb-4" />
                <p className="text-slate-400 font-medium">Loading reels...</p>
              </div>
            ) : reels.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                  <Film size={30} className="text-slate-300" />
                </div>
                <h3 className="text-slate-700 font-bold mb-1">No reels added yet</h3>
                <p className="text-slate-500 text-sm max-w-sm">Add an Instagram reel link from the left to display it on your homepage.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {reels.map((reel, idx) => (
                  <div key={reel.id} className="relative group rounded-2xl border border-slate-200 overflow-hidden bg-slate-50">
                    <div className="aspect-[9/16] w-full bg-slate-100 flex items-center justify-center">
                       <iframe 
                          src={reel.embedUrl} 
                          className="w-full h-full"
                          frameBorder="0" 
                          scrolling="no" 
                          allowTransparency={true} 
                          title={reel.title}
                       ></iframe>
                    </div>
                    <div className="absolute top-2 left-2 bg-black/60 text-white text-xs font-bold px-2 py-1 rounded-md">
                      #{idx + 1}
                    </div>
                    <button 
                      onClick={() => handleDelete(reel.id)}
                      className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Delete Reel"
                    >
                      <Trash2 size={16} />
                    </button>
                    <div className="p-3 bg-white border-t border-slate-200">
                      <h4 className="font-bold text-slate-800 text-sm truncate" title={reel.title}>{reel.title}</h4>
                      <a href={reel.originalUrl} target="_blank" rel="noreferrer" className="text-xs text-blue-500 hover:underline truncate block mt-1">View Original</a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}