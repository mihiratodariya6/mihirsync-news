'use client';

import React, { useEffect, useState } from 'react';
import { db } from '../../../lib/firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { Layers, Plus, Trash2, GitMerge } from 'lucide-react';

export default function CategoryManager() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // નવી કેટેગરી માટેનું સ્ટેટ
  const [newCat, setNewCat] = useState({
    name: '',
    slug: '',
    parentId: '' // આનાથી ખબર પડશે કે આ મેઈન છે કે કોઈની અંદર (દા.ત. સુરત નો parent ગુજરાત)
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  // ફાયરબેઝમાંથી બધી કેટેગરી લાવવા માટે
  const fetchCategories = async () => {
    try {
      const q = query(collection(db, 'categories'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      const cats = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCategories(cats);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  // નામ પરથી જાતે Slug (URL) બનાવવા માટે
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setNewCat({
      ...newCat,
      name: val,
      slug: val.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '') // "New York" -> "new-york"
    });
  };

  // કેટેગરી સેવ કરવાનું ફંક્શન
  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCat.name || !newCat.slug) return;
    
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'categories'), {
        name: newCat.name,
        slug: newCat.slug,
        parentId: newCat.parentId || null,
        createdAt: serverTimestamp()
      });
      setMessage('✅ કેટેગરી સફળતાપૂર્વક ઉમેરાઈ ગઈ!');
      setNewCat({ name: '', slug: '', parentId: '' });
      fetchCategories(); // લિસ્ટ અપડેટ કરો
    } catch (error) {
      setMessage('❌ એરર આવી: ' + (error as Error).message);
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  // કેટેગરી ડિલીટ કરવાનું ફંક્શન
  const handleDelete = async (id: string) => {
    if (!window.confirm("શું તમે ખરેખર આ કેટેગરી ડિલીટ કરવા માંગો છો?")) return;
    try {
      await deleteDoc(doc(db, 'categories', id));
      setCategories(categories.filter(c => c.id !== id));
      setMessage('🗑️ કેટેગરી ડિલીટ થઈ ગઈ.');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error(error);
    }
  };

  // મેઈન કેટેગરી અને સબ-કેટેગરી ગોઠવવા માટેનું લોજીક
  const mainCategories = categories.filter(c => !c.parentId);
  
  return (
    <div className="p-8 h-full overflow-y-auto bg-slate-50 custom-scrollbar">
      <div className="mb-8">
        <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2"><Layers size={24} className="text-blue-600"/> Category & Location Manager</h1>
        <p className="text-slate-500 text-sm mt-1">Add main categories (e.g. India) and sub-categories (e.g. Gujarat, Surat).</p>
      </div>

      {message && <div className="mb-6 p-4 rounded-lg bg-white border border-blue-200 text-blue-700 font-bold text-sm shadow-sm">{message}</div>}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* ડાબી બાજુ: ફોર્મ */}
        <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-slate-200 h-fit">
          <h2 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><Plus size={18}/> Add New Category</h2>
          <form onSubmit={handleAddCategory} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1">Category Name</label>
              <input type="text" placeholder="e.g. Gujarat or Technology" value={newCat.name} onChange={handleNameChange} className="w-full px-4 py-2 border border-slate-200 rounded-lg outline-none focus:border-blue-500" required />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1">Slug (URL)</label>
              <input type="text" value={newCat.slug} onChange={(e) => setNewCat({...newCat, slug: e.target.value})} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none text-slate-500" required />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1">Parent Category (Optional)</label>
              <select value={newCat.parentId} onChange={(e) => setNewCat({...newCat, parentId: e.target.value})} className="w-full px-4 py-2 border border-slate-200 rounded-lg outline-none focus:border-blue-500">
                <option value="">-- No Parent (Make Main Category) --</option>
                {categories.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
              <p className="text-[10px] text-slate-400 mt-1">If this is a city/state, select its parent (e.g. select 'Gujarat' if adding 'Surat').</p>
            </div>
            <button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-lg transition-all shadow-md">
              {isSubmitting ? 'Saving...' : 'Save Category'}
            </button>
          </form>
        </div>

        {/* જમણી બાજુ: લિસ્ટ */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-4 border-b border-slate-100 bg-slate-50 font-bold text-slate-700">Existing Categories</div>
          <div className="p-0">
            {loading ? <p className="p-6 text-center text-slate-500 font-bold">Loading...</p> : (
              <ul className="divide-y divide-slate-100">
                {mainCategories.length === 0 && <p className="p-6 text-center text-slate-400">No categories found. Create one!</p>}
                
                {mainCategories.map(main => (
                  <li key={main.id} className="p-0">
                    {/* Main Category Row */}
                    <div className="p-4 flex justify-between items-center hover:bg-slate-50 transition-colors">
                      <div>
                        <p className="font-black text-slate-800">{main.name}</p>
                        <p className="text-xs text-slate-400">/{main.slug}</p>
                      </div>
                      <button onClick={() => handleDelete(main.id)} className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={18}/></button>
                    </div>

                    {/* Sub Categories (Children) */}
                    <ul className="bg-slate-50/50">
                      {categories.filter(sub => sub.parentId === main.id).map(sub => (
                        <li key={sub.id} className="pl-12 pr-4 py-3 flex justify-between items-center border-t border-slate-100 hover:bg-slate-100 transition-colors">
                          <div className="flex items-center gap-2">
                            <GitMerge size={14} className="text-slate-400"/>
                            <div>
                              <p className="font-bold text-slate-700 text-sm">{sub.name}</p>
                              <p className="text-[10px] text-slate-400">/{sub.slug}</p>
                            </div>
                          </div>
                          <button onClick={() => handleDelete(sub.id)} className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-100 rounded-lg transition-colors"><Trash2 size={14}/></button>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}