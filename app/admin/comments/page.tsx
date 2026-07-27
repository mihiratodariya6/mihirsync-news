'use client';

import React, { useEffect, useState } from 'react';
import { db } from '../../../../lib/firebase';
import { collection, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { MessageSquare, Trash2, CheckCircle, XCircle, Search, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function CommentsManager() {
  const params = useParams();
  const lang = (params.lang as string) || 'en';
  
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // 🚀 ડેટાબેઝમાંથી બધી કમેન્ટ્સ લાવો (હાલ પૂરતો ડેમો ડેટા સેટ કર્યો છે જો ફાયરબેઝમાં ના હોય તો)
  const fetchComments = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'comments'));
      const commentsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
      // જો હજુ સુધી કોઈ કમેન્ટ ના હોય તો ડેમો કમેન્ટ્સ બતાવો
      if (commentsData.length === 0) {
        setComments([
          { id: '1', userName: 'Rahul Patel', text: 'આ ન્યૂઝ બહુ જ સરસ છે! માહિતી માટે આભાર.', status: 'approved', articleId: 'demo1', date: 'Just Now' },
          { id: '2', userName: 'Spam Bot', text: 'Click here to win 1000$ free!!!', status: 'pending', articleId: 'demo2', date: '2 hours ago' }
        ]);
      } else {
        setComments(commentsData);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  // 🚀 કમેન્ટ ડિલીટ કરવાનું ફંક્શન
  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      try {
        await deleteDoc(doc(db, 'comments', id));
        setComments(comments.filter(c => c.id !== id));
      } catch (error) {
        console.log("Deleted locally for demo");
        setComments(comments.filter(c => c.id !== id));
      }
    }
  };

  // 🚀 કમેન્ટ Approve/Reject કરવાનું ફંક્શન
  const handleStatusUpdate = async (id: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, 'comments', id), { status: newStatus });
      setComments(comments.map(c => c.id === id ? { ...c, status: newStatus } : c));
    } catch (error) {
       console.log("Updated locally for demo");
       setComments(comments.map(c => c.id === id ? { ...c, status: newStatus } : c));
    }
  };

  const filteredComments = comments.filter(c => 
    c.text.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.userName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 md:p-10 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
              <MessageSquare className="text-blue-600" size={32} />
              Comments Manager
            </h1>
            <p className="text-slate-500 font-medium mt-1">Moderate user comments, approve, or delete spam.</p>
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search comments..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 w-full md:w-80 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all font-medium bg-white"
            />
          </div>
        </div>

        {/* Comments Table */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs uppercase tracking-wider font-bold">
                  <th className="p-4 pl-6">User & Comment</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right pr-6">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr><td colSpan={4} className="p-10 text-center text-slate-400 font-bold animate-pulse">Loading Comments...</td></tr>
                ) : filteredComments.length === 0 ? (
                  <tr><td colSpan={4} className="p-10 text-center text-slate-400 font-bold">No comments found.</td></tr>
                ) : (
                  filteredComments.map((comment) => (
                    <tr key={comment.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="p-4 pl-6 max-w-md">
                        <div className="flex flex-col gap-1">
                          <span className="font-bold text-slate-900 text-sm">{comment.userName}</span>
                          <p className="text-slate-600 text-sm line-clamp-2">{comment.text}</p>
                          <Link href={`/${lang}/post/${comment.articleId}`} target="_blank" className="text-blue-500 hover:text-blue-700 text-xs font-bold flex items-center gap-1 mt-1 w-fit">
                            View Article <ExternalLink size={12} />
                          </Link>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="text-sm font-medium text-slate-600">{comment.date || 'N/A'}</span>
                      </td>
                      <td className="p-4">
                        {comment.status === 'approved' ? (
                          <span className="bg-green-100 text-green-700 text-xs font-bold px-2.5 py-1 rounded-md uppercase tracking-wide flex items-center gap-1 w-fit">
                            <CheckCircle size={14} /> Approved
                          </span>
                        ) : (
                          <span className="bg-amber-100 text-amber-700 text-xs font-bold px-2.5 py-1 rounded-md uppercase tracking-wide flex items-center gap-1 w-fit">
                            <XCircle size={14} /> Pending
                          </span>
                        )}
                      </td>
                      <td className="p-4 pr-6 text-right space-x-2">
                        {comment.status !== 'approved' && (
                          <button 
                            onClick={() => handleStatusUpdate(comment.id, 'approved')}
                            className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-green-50 text-green-600 hover:bg-green-600 hover:text-white transition-colors"
                            title="Approve Comment"
                          >
                            <CheckCircle size={16} />
                          </button>
                        )}
                        <button 
                          onClick={() => handleDelete(comment.id)}
                          className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-colors"
                          title="Delete Comment"
                        >
                          <Trash2 size={16} />
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