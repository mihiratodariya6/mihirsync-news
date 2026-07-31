'use client';

import React, { useState, useEffect } from 'react';
import { db } from '../../../lib/firebase';
import { collection, getDocs, addDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { FolderPlus, Trash2, Plus, Loader2, LayoutList } from 'lucide-react';

export default function CategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // નવો ડેટા નાખવા માટે
  const [newCategory, setNewCategory] = useState('');
  const [newSlug, setNewSlug] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [message, setMessage] = useState('');

  // પેજ ખુલે ત્યારે બધી કેટેગરી ડેટાબેઝમાંથી લઈ આવો
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const snap = await getDocs(collection(db, 'categories'));
      const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  // નામ લખે એટલે Slug જાતે જ બની જાય (દા.ત. Sports News -> sports-news)
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setNewCategory(val);
    setNewSlug(val.toLowerCase().trim().replace(/[\s_]+/g, '-').replace(/[^\w-]+/g, ''));
  };

  // નવી કેટેગરી સેવ કરવા માટે
  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategory || !newSlug) return;
    
    setIsAdding(true);
    setMessage('');
    
    try {
      await addDoc(collection(db, 'categories'), {
        name: newCategory,
        slug: newSlug,
        createdAt: serverTimestamp()
      });
      setMessage('✅ કેટેગરી સફળતાપૂર્વક ઉમેરાઈ ગઈ!');
      setNewCategory('');
      setNewSlug('');
      fetchCategories(); // લિસ્ટ અપડેટ કરો
      
      setTimeout(() => setMessage(''), 3000); // 3 સેકન્ડ પછી મેસેજ ગાયબ
    } catch (error: any) {
      setMessage('❌ એરર: ' + error.message);
    } finally {
      setIsAdding(false);
    }
  };

  // કેટેગરી ડિલીટ કરવા માટે
  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`શું તમે ખરેખર '${name}' કેટેગરી ડિલીટ કરવા માંગો છો?`)) return;
    
    try {
      await deleteDoc(doc(db, 'categories', id));
      fetchCategories(); // લિસ્ટ અપડેટ કરો
    } catch (error) {
      alert('Error deleting category');
    }
  };

  if (loading) return <div className="h-full flex items-center justify-center font-bold text-slate-500 gap-2"><Loader2 className="animate-spin"/> Loading Categories...</div>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-3 mb-8 border-b border-slate-200 pb-4">
        <LayoutList className="text-blue-600" size={28} />
        <h1 className="text-2xl font-black text-slate-800">Manage Categories</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* ડાબી બાજુ: નવી કેટેગરી ઉમેરવાનું ફોર્મ */}
        <div className="md:col-span-1">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm sticky top-6">
            <h2 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><FolderPlus size={18}/> Add New Category</h2>
            
            <form onSubmit={handleAddCategory} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Category Name</label>
                <input 
                  type="text" 
                  value={newCategory} 
                  onChange={handleNameChange}
                  placeholder="e.g. Technology" 
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:bg-white focus:border-blue-400 font-medium"
                  required
                />
              </div>
              
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Slug (URL)</label>
                <input 
                  type="text" 
                  value={newSlug} 
                  onChange={(e) => setNewSlug(e.target.value)}
                  placeholder="e.g. technology" 
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none font-mono text-sm text-slate-500"
                  required
                />
              </div>

              {message && <div className={`text-sm font-bold p-3 rounded-lg ${message.includes('✅') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>{message}</div>}

              <button 
                type="submit" 
                disabled={isAdding || !newCategory}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg shadow-md transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isAdding ? <Loader2 size={18} className="animate-spin" /> : <Plus size={18} />}
                {isAdding ? 'Saving...' : 'Add Category'}
              </button>
            </form>
          </div>
        </div>

        {/* જમણી બાજુ: કેટેગરી લિસ્ટ */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Category Name</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Slug</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {categories.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="px-6 py-8 text-center text-slate-400 font-bold">No categories found. Add one!</td>
                  </tr>
                ) : (
                  categories.map((cat) => (
                    <tr key={cat.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-bold text-slate-800">{cat.name}</td>
                      <td className="px-6 py-4 font-mono text-sm text-slate-500">{cat.slug}</td>
                      <td className="px-6 py-4 text-right">
                        <button 
                          onClick={() => handleDelete(cat.id, cat.name)}
                          className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete Category"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}