'use client';

import React, { useState, useEffect } from 'react';
import { db } from '../../lib/firebase';
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { MessageSquare, Send, UserCircle } from 'lucide-react';

export default function CommentsSection({ articleId }: { articleId: string }) {
  const [comments, setComments] = useState<any[]>([]);
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  // 🚀 Firebase Real-time Listener for Comments
  useEffect(() => {
    if (!articleId) return;
    const commentsRef = collection(db, 'articles', articleId, 'comments');
    const q = query(commentsRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedComments = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setComments(fetchedComments);
    });

    return () => unsubscribe();
  }, [articleId]);

  // 🚀 Submit Comment to Firebase
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return alert("Please enter name and comment!");
    
    setLoading(true);
    try {
      const commentsRef = collection(db, 'articles', articleId, 'comments');
      await addDoc(commentsRef, {
        name: name,
        text: text,
        createdAt: serverTimestamp()
      });
      setText(''); // ક્લિયર ટેક્સ્ટબોક્સ
    } catch (error) {
      console.error("Error adding comment: ", error);
      alert("Failed to post comment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-12 bg-white rounded-3xl shadow-sm border border-slate-200 p-6 md:p-10">
      <h3 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-2">
        <MessageSquare className="text-blue-600"/> Comments ({comments.length})
      </h3>

      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="mb-10 bg-slate-50 p-6 rounded-2xl border border-slate-100">
        <div className="mb-4">
          <input 
            type="text" 
            placeholder="Your Name" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-blue-500 font-medium"
            required
          />
        </div>
        <div className="mb-4">
          <textarea 
            placeholder="Write your comment here..." 
            rows={3}
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-blue-500 font-medium resize-none"
            required
          ></textarea>
        </div>
        <button 
          type="submit" 
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3 rounded-full flex items-center gap-2 transition-all disabled:opacity-50"
        >
          {loading ? 'Posting...' : 'Post Comment'} <Send size={16}/>
        </button>
      </form>

      {/* Comments List */}
      <div className="space-y-6">
        {comments.length === 0 ? (
          <p className="text-slate-500 font-medium text-center py-6">No comments yet. Be the first to share your thoughts!</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="flex gap-4 p-5 bg-white border border-slate-100 rounded-2xl shadow-sm">
              <UserCircle size={40} className="text-slate-300 shrink-0" />
              <div>
                <h4 className="font-bold text-slate-800">{comment.name}</h4>
                <p className="text-xs text-slate-400 mb-2">
                  {comment.createdAt?.toDate ? comment.createdAt.toDate().toLocaleDateString() : 'Just now'}
                </p>
                <p className="text-slate-600 font-medium leading-relaxed">{comment.text}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}