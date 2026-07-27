'use client';

import React, { useEffect, useState } from 'react';
import { db } from '../../../lib/firebase';
import { collection, query, orderBy, getDocs, deleteDoc, doc } from 'firebase/firestore';
import Link from 'next/link';
import { Eye, Edit, Trash2, Search, Plus } from 'lucide-react';

export default function AllPostsPage() {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchArticles();
  }, []);

  // ફાયરબેઝમાંથી બધા ન્યૂઝ લાવવા
  const fetchArticles = async () => {
    try {
      const q = query(collection(db, 'articles'), orderBy('createdAt', 'desc'));
      const snap = await getDocs(q);
      setArticles(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // 🚀 ન્યૂઝ ડિલીટ કરવા માટેનું ફંક્શન
  const handleDelete = async (id: string) => {
    if (window.confirm('શું તમે ખરેખર આ ન્યૂઝ ડિલીટ કરવા માંગો છો? આ પાછી નહિ આવે!')) {
      try {
        await deleteDoc(doc(db, 'articles', id));
        // ડિલીટ થયા પછી લિસ્ટમાંથી તરત કાઢી નાખો
        setArticles(articles.filter(a => a.id !== id));
      } catch (error) {
        alert('એરર: ' + (error as Error).message);
      }
    }
  };

  // સર્ચ કરવા માટેનું લોજીક
  const filteredArticles = articles.filter(a => 
    a.translations?.en?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.translations?.gu?.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 h-full overflow-y-auto bg-slate-50 custom-scrollbar">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-black text-slate-900">All Articles</h1>
          <p className="text-slate-500 text-sm mt-1">Manage, edit, and delete your published news.</p>
        </div>
        <Link href="/admin" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-bold flex items-center gap-2 transition shadow-md">
          <Plus size={18} /> Create New Post
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        {/* Search Bar */}
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center gap-3">
          <Search size={18} className="text-slate-400" />
          <input 
            type="text" 
            placeholder="Search articles..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent border-none outline-none w-full text-sm font-bold text-slate-700"
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white border-b border-slate-100 text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                <th className="p-4 pl-6">Article</th>
                <th className="p-4">Category</th>
                <th className="p-4">Stats</th>
                <th className="p-4">Status</th>
                <th className="p-4 pr-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={5} className="p-8 text-center text-slate-400 font-bold">Loading Articles...</td></tr>
              ) : filteredArticles.length === 0 ? (
                <tr><td colSpan={5} className="p-8 text-center text-slate-400 font-bold">No articles found.</td></tr>
              ) : (
                filteredArticles.map((article) => (
                  <tr key={article.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors group">
                    <td className="p-4 pl-6 flex items-center gap-4">
                      <div className="w-16 h-12 rounded-lg bg-slate-200 overflow-hidden shrink-0 border border-slate-200">
                        {article.featuredImage ? (
                          <img src={article.featuredImage} alt="News" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs font-bold">No Img</div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-800 text-sm line-clamp-1">
                          {article.translations?.gu?.title || article.translations?.en?.title}
                        </h3>
                        <p className="text-[10px] font-bold text-slate-400 mt-1">
                          {article.createdAt ? new Date(article.createdAt.toMillis()).toLocaleDateString('en-GB') : 'Just now'}
                        </p>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="bg-blue-50 text-blue-600 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border border-blue-100">
                        {article.category}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1 text-slate-500 text-xs font-bold">
                        <Eye size={14} className="text-purple-400"/> {article.stats?.views || 0}
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-green-600 bg-green-50 px-2.5 py-1 rounded-md border border-green-100">
                        {article.status || 'Published'}
                      </span>
                    </td>
                    <td className="p-4 pr-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {/* 👁️ View Button */}
                        <Link href={`/en/post/${article.id}`} target="_blank" className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <Eye size={16} />
                        </Link>
                        {/* ✏️ Edit Button */}
                        <Link href={`/admin/edit/${article.id}`} className="p-2 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                          <Edit size={16} />
                        </Link>
                        {/* 🗑️ Delete Button */}
                        <button onClick={() => handleDelete(article.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}