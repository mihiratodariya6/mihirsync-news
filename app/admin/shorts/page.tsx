'use client';

import React, { useState, useEffect } from 'react';
import { db } from '../../../lib/firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, serverTimestamp, query, orderBy, limit } from 'firebase/firestore';
import { Image as ImageIcon, Plus, Trash2, CheckCircle2, RefreshCw, Upload } from 'lucide-react';

export default function ShortsAdminPage() {
  const [shorts, setShorts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  
  const [title, setTitle] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState('');
  const [success, setSuccess] = useState('');

  const uploadImage = async (imageFile: File) => {
    // 👇 અહી તારી ImgBB ની API Key નાખજે
    const apiKey = '775db2a97e75d93de3b89abce9557a51'; 
    const formData = new FormData();
    formData.append('image', imageFile);

    const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: 'POST',
      body: formData
    });

    const data = await res.json();
    if (data.success) {
      return data.data.url;
    } else {
      throw new Error("ImgBB upload failed");
    }
  };

  const fetchShorts = async () => {
    try {
      setLoading(true);
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

  useEffect(() => {
    fetchShorts();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleAddShort = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    
    setAdding(true);
    setSuccess('');

    try {
      // 🚀 ઓટો-ડિલીટ લોજીક: ચેક કરો કે 10 કે તેથી વધુ શોર્ટ્સ છે?
      const checkQuery = query(collection(db, 'shorts'), orderBy('createdAt', 'asc')); // જૂના સૌથી પહેલા આવશે
      const snapCheck = await getDocs(checkQuery);
      
      if (snapCheck.docs.length >= 10) {
        // જો 10 થી વધુ હોય, તો જૂના ડિલીટ કરો જેથી નવી 1 માટે જગ્યા થાય
        const deleteCount = snapCheck.docs.length - 9; 
        for (let i = 0; i < deleteCount; i++) {
          await deleteDoc(doc(db, 'shorts', snapCheck.docs[i].id));
        }
      }

      const uploadedUrl = await uploadImage(file);

      await addDoc(collection(db, 'shorts'), {
        title: title || 'Short News',
        imageUrl: uploadedUrl,
        createdAt: serverTimestamp(),
      });

      setSuccess('Shorts Image added successfully! 📸');
      setTitle('');
      setFile(null);
      setPreview('');
      fetchShorts();
      
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      console.error("Error adding short: ", error);
      alert('Error adding short. Please try again.');
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

  const formatTime = (timestamp: any) => {
    if (!timestamp) return 'Just now';
    const date = timestamp.toDate();
    return new Intl.DateTimeFormat('en-IN', { 
      day: '2-digit', month: 'short', 
      hour: '2-digit', minute: '2-digit', hour12: true 
    }).format(date);
  };

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-black text-slate-800 flex items-center gap-3">
            <ImageIcon size={32} className="text-orange-500" /> Manage Shorts News
          </h1>
          <p className="text-slate-500 font-medium mt-1">Upload infographic images for quick news (Auto-deletes oldest when exceeding 10).</p>
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
                <label className="block text-sm font-bold text-slate-700 mb-2">Select Image (Gallery/PC)</label>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="imageUpload"
                />
                <label htmlFor="imageUpload" className="w-full flex flex-col items-center justify-center border-2 border-dashed border-slate-300 rounded-xl p-6 cursor-pointer hover:border-orange-500 hover:bg-orange-50 transition-all">
                  {preview ? (
                    <img src={preview} alt="Preview" className="h-40 object-contain rounded-lg" />
                  ) : (
                    <>
                      <Upload size={30} className="text-slate-400 mb-2" />
                      <span className="text-sm font-bold text-slate-600">Click to Browse Gallery</span>
                    </>
                  )}
                </label>
              </div>

              <button 
                type="submit" 
                disabled={adding || !file}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-3.5 rounded-xl hover:shadow-lg hover:shadow-orange-500/30 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {adding ? <><RefreshCw size={20} className="animate-spin" /> Uploading...</> : <><ImageIcon size={20} /> Upload to Shorts</>}
              </button>
            </form>
          </div>
        </div>

        {/* LIST OF SHORTS */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 min-h-[500px]">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                <ImageIcon size={20} className="text-slate-500"/> Uploaded Shorts ({shorts.length}/10)
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
                    <div className="absolute top-2 left-2 bg-black/70 text-white text-[10px] font-bold px-2 py-1 rounded-md">
                      {formatTime(short.createdAt)}
                    </div>
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3">
                      <button onClick={() => handleDelete(short.id)} className="self-end bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg shadow-lg">
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