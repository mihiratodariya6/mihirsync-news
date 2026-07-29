'use client';

import React, { useState, useEffect } from 'react';
import { db } from '../../../lib/firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, serverTimestamp, query, orderBy, limit } from 'firebase/firestore';
import { Image as ImageIcon, Plus, Trash2, CheckCircle2, RefreshCw, Link as LinkIcon } from 'lucide-react';
import Link from 'next/link';

export default function ShortsAdminPage() {
  const [shorts, setShorts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  
  const [imageUrl, setImageUrl] = useState('');
  const [title, setTitle] = useState(''); // ઈમેજને યાદ રાખવા માટે નાનું નામ
  const [success, setSuccess] = useState('');

  const fetchShorts = async () => {
    try {
      setLoading(true);
      const q = query(collection(db, 'shorts'), orderBy('createdAt', 'desc'), limit(15));
      const querySnapshot = await getDocs(q);
      const shortsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setShorts(shortsData);
    } catch (error) {
      console.error("Error fetching shorts: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShorts();
  }, []);

  const handleAddShort = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageUrl) return;
    
    setAdding(true);
    setSuccess('');

    try {
      await addDoc(collection(db, 'shorts'), {
        title: title || 'Short News',
        imageUrl,
        createdAt: serverTimestamp(),
      });

      setSuccess('Shorts Image added successfully! 📸');
      setTitle('');
      setImageUrl('');
      fetchShorts();
      
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      console.error("Error adding short: ", error);
      alert('Error adding short. Please check Firebase rules.');
    } finally {
      setAdding(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this Short Image?')) return;
    try {
      await deleteDoc(doc(db, 'shorts', id));
      setShorts(shorts.filter(short => short.id !== id));
    } catch (error) {
      console.error("Error deleting short: ", error);
    }
  };

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-black text-slate-800 flex items-center gap-3">
            <ImageIcon size={32} className="text-orange-500" /> Manage Shorts News
          </h1>
          <p className="text-slate-500 font-medium mt-1">Upload infographic images for quick news (Max 10 shown on home).</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* ADD SHORT FORM */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 sticky top-8">
            <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <Plus size={20} className="text-orange-500"/> Add New Short
            </h2>

            {success && (
              <div className="bg-green-50 text-green-700 p-4 rounded-xl mb-6 font-bold flex items-center gap-2 border border-green-200">
                <CheckCircle2 size={20} /> {success}
              </div>
            )}

            <form onSubmit={handleAddShort} className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Short Title (Optional)</label>
                <input 
                  type="text" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Today's Market Update"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition font-medium"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Image Link (URL)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <LinkIcon size={16} className="text-slate-400" />
                  </div>
                  <input 
                    type="url" 
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition font-medium"
                    required
                  />
                </div>
                <p className="text-xs text-slate-400 mt-2">Paste the image link here. (You can copy image address from your media library).</p>
              </div>

              <button 
                type="submit" 
                disabled={adding}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-3.5 rounded-xl hover:shadow-lg hover:shadow-orange-500/30 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {adding ? <><RefreshCw size={20} className="animate-spin" /> Adding...</> : <><ImageIcon size={20} /> Add to Shorts</>}
              </button>
            </form>
          </div>
        </div>

        {/* LIST OF SHORTS */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 min-h-[500px]">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                <ImageIcon size={20} className="text-slate-500"/> Uploaded Shorts ({shorts.length})
              </h2>
              <button onClick={fetchShorts} className="text-slate-400 hover:text-orange-500 p-2"><RefreshCw size={18}/></button>
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <RefreshCw size={30} className="animate-spin text-slate-300 mb-4" />
              </div>
            ) : shorts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                  <ImageIcon size={30} className="text-slate-300" />
                </div>
                <h3 className="text-slate-700 font-bold mb-1">No shorts added yet</h3>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {shorts.map((short) => (
                  <div key={short.id} className="relative group rounded-2xl border border-slate-200 overflow-hidden bg-slate-50 aspect-[3/4]">
                    <img src={short.imageUrl} alt={short.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3">
                      <button 
                        onClick={() => handleDelete(short.id)}
                        className="self-end bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg shadow-lg"
                        title="Delete Short"
                      >
                        <Trash2 size={16} />
                      </button>
                      <span className="text-white font-bold text-xs truncate">{short.title}</span>
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