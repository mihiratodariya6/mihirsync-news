'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { db } from '../../../../lib/firebase';
import { doc, getDoc, updateDoc, increment } from 'firebase/firestore'; 
import { Calendar, User, ChevronLeft, Eye, Clock, ShieldCheck, Share2, Tag, CheckCircle2 } from 'lucide-react'; 
import Link from 'next/link';
import Image from 'next/image';
import ArticleInteractions from '../../../../components/web/ArticleInteractions';
import CommentsSection from '../../../../components/web/CommentsSection';

// 🚀 નવો કમાલ: પ્રોગ્રેસ બારને આખા પેજથી અલગ કરી દીધી! (જેથી ટ્રાન્સલેટ રીફ્રેશ ના થાય)
const ScrollProgressBar = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;
      setScrollProgress(Number(scroll) * 100);
    }
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 h-1.5 bg-blue-600 z-[100] transition-all duration-150 ease-out" style={{ width: `${scrollProgress}%` }}></div>
  );
};

export default function SinglePostPage() {
  const params = useParams();
  const lang = (params.lang as 'en' | 'gu' | 'hi') || 'en';
  const postId = params.id as string;

  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [localViews, setLocalViews] = useState(0);
  const [readingTime, setReadingTime] = useState(1);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const docRef = doc(db, 'articles', postId);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const data = docSnap.data();
          setPost({ id: docSnap.id, ...data });
          
          setLocalViews(data.stats?.views || 0);

          // Calculate Reading Time
          const text = data.translations?.[lang]?.content || data.translations?.en?.content || '';
          const words = text.replace(/<[^>]*>?/gm, '').split(/\s+/).length;
          setReadingTime(Math.max(1, Math.ceil(words / 200))); // 200 words per min

          // View Counter Logic
          const viewKey = `viewed_${postId}`;
          if (!sessionStorage.getItem(viewKey)) {
            await updateDoc(docRef, { 'stats.views': increment(1) });
            sessionStorage.setItem(viewKey, 'true');
            setLocalViews((prev) => prev + 1);
          }
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [postId, lang]);

  const formatNumber = (num: number) => {
    if (!num) return '0';
    return Intl.NumberFormat('en-US', { notation: "compact", maximumFractionDigits: 1 }).format(num);
  };

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white space-y-4 pt-20">
      <div className="w-16 h-16 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
      <p className="font-bold text-slate-400 tracking-widest uppercase text-sm animate-pulse">Loading Premium Content...</p>
    </div>
  );
  
  if (!post) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
      <h1 className="text-4xl font-black text-slate-800 mb-4">404 - News Not Found</h1>
      <Link href={`/${lang}`} className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 transition">Go to Home</Link>
    </div>
  );

  const getTrans = (field: string) => {
    const val = post.translations[lang]?.[field];
    if (val && val.trim() !== '') return val;
    return post.translations['gu']?.[field] || post.translations['en']?.[field] || post.translations['hi']?.[field] || '';
  };

  const title = getTrans('title');
  const shortDesc = getTrans('shortDescription');
  const content = getTrans('content') || '';
  const postDate = post.createdAt ? new Date(post.createdAt.toMillis()).toLocaleDateString(lang === 'gu' ? 'gu-IN' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'Just Now';
  const initialLikes = post.stats?.likes || 0;
  const authorName = post.author || 'MihirSync Editorial';

  // 🚀 SMART RENDERER
  const displayContent = (content.includes('<p>') || content.includes('<br>')) 
    ? content 
    : content.split('\n').filter((p: string) => p.trim() !== '').map((p: string) => `<p>${p}</p>`).join('');

  return (
    <div className="bg-white min-h-screen pb-20 font-sans selection:bg-blue-200 selection:text-blue-900">
      
      {/* 🚀 અલગ કરેલી પ્રોગ્રેસ બાર અહીં મૂકી છે */}
      <ScrollProgressBar />
      
      {/* 🚀 HEADER SECTION */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 pt-12 pb-8">
        
        <div className="flex items-center gap-3 mb-6">
          <Link href={`/${lang}`} className="inline-flex items-center gap-1 text-slate-500 hover:text-blue-600 transition-colors text-sm font-bold">
            <ChevronLeft size={16} /> Home
          </Link>
          <span className="text-slate-300">•</span>
          <span className="bg-blue-50 text-blue-700 text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest border border-blue-100">
            {post.category || 'NEWS'}
          </span>
          {post.isBreaking && (
            <span className="bg-red-500 text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest flex items-center gap-1 animate-pulse">
              <span className="w-1.5 h-1.5 bg-white rounded-full"></span> Breaking
            </span>
          )}
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-[56px] font-black text-slate-900 leading-[1.15] mb-6 tracking-tight max-w-4xl">
          {title}
        </h1>

        {shortDesc && (
          <p className="text-xl md:text-2xl text-slate-500 font-medium leading-relaxed mb-8 max-w-4xl">
            {shortDesc}
          </p>
        )}
        
        <div className="flex flex-wrap items-center gap-6 text-slate-600 text-sm font-semibold border-y border-slate-100 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-blue-400 rounded-full flex items-center justify-center text-white font-bold shadow-md">
              {authorName.charAt(0)}
            </div>
            <div>
              <p className="text-slate-900 font-bold flex items-center gap-1">
                {authorName} <CheckCircle2 size={14} className="text-blue-500 fill-blue-50" />
              </p>
              <p className="text-xs text-slate-500">Premium Editor</p>
            </div>
          </div>
          
          <div className="h-8 w-px bg-slate-200 hidden md:block"></div>
          
          <span className="flex items-center gap-2"><Calendar size={16} className="text-slate-400"/> {postDate}</span>
          <span className="flex items-center gap-2"><Clock size={16} className="text-slate-400"/> {readingTime} Min Read</span>
          <span className="flex items-center gap-2 bg-slate-50 px-3 py-1 rounded-full border border-slate-200"><Eye size={16} className="text-slate-400"/> {formatNumber(localViews)} Views</span>
          <span className="flex items-center gap-1 text-green-600 ml-auto"><ShieldCheck size={16} /> Fact Checked</span>
        </div>
      </div>

      {/* 🚀 HERO IMAGE */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 mb-12">
        {post.featuredImage && (
          <div className="w-full relative group rounded-3xl overflow-hidden shadow-2xl bg-slate-100">
            <div className="aspect-video w-full relative">
              <img 
                src={post.featuredImage} 
                alt={title} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                loading="lazy"
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 pt-20">
              <p className="text-white/80 text-sm font-medium flex justify-between items-end">
                <span>{title}</span>
                <span className="text-xs uppercase tracking-widest text-white/60">Photo: MihirSync Network</span>
              </p>
            </div>
          </div>
        )}
      </div>

      {/* 🚀 MAIN CONTENT GRID */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left / Main Content Area (8 Cols) */}
        <div className="lg:col-span-8">
          
          {/* TOP Interactions Toolbar */}
          <div className="sticky top-14 z-40 bg-white/80 backdrop-blur-md py-4 border-b border-slate-100 mb-8 -mx-4 px-4 sm:mx-0 sm:px-0">
            <ArticleInteractions 
              articleId={postId} 
              initialLikes={initialLikes} 
              title={title} 
              textToRead={content} 
            />
          </div>

          {/* 🚀 Custom Prose Styles */}
          <style dangerouslySetInnerHTML={{__html: `
            .premium-content { font-size: 21px; line-height: 1.8; color: #334155; font-family: system-ui, -apple-system, sans-serif; }
            .premium-content p:first-of-type::first-letter { float: left; font-size: 4.5rem; line-height: 0.8; font-weight: 900; margin-right: 0.15em; color: #2563eb; font-family: Georgia, serif; }
            .premium-content p { margin-bottom: 1.8em; }
            .premium-content h2 { font-size: 1.75em; font-weight: 900; color: #0f172a; margin-top: 2em; margin-bottom: 0.8em; letter-spacing: -0.02em; }
            .premium-content h3 { font-size: 1.35em; font-weight: 800; color: #1e293b; margin-top: 1.5em; margin-bottom: 0.6em; }
            .premium-content a { color: #2563eb; text-decoration: underline; text-decoration-thickness: 2px; text-underline-offset: 4px; font-weight: 600; transition: all 0.2s; }
            .premium-content a:hover { color: #1d4ed8; background: #eff6ff; }
            .premium-content blockquote { border-left: 4px solid #2563eb; background: #f8fafc; padding: 1.5rem 2rem; margin: 2.5rem 0; font-size: 1.2em; font-style: italic; color: #0f172a; border-radius: 0 16px 16px 0; }
            .premium-content blockquote p { margin: 0; }
            .premium-content blockquote p::first-letter { font-size: inherit; float: none; color: inherit; font-weight: inherit; }
            .premium-content ul { list-style-type: none; padding-left: 0; margin-bottom: 2em; }
            .premium-content ul li { position: relative; padding-left: 1.8em; margin-bottom: 0.8em; }
            .premium-content ul li::before { content: '•'; position: absolute; left: 0; color: #2563eb; font-weight: bold; font-size: 1.5em; top: -0.2em; }
            .premium-content img { border-radius: 16px; margin: 2.5rem 0; box-shadow: 0 10px 40px -10px rgba(0,0,0,0.1); width: 100%; height: auto; }
            .premium-content strong { font-weight: 700; color: #0f172a; }
          `}} />
          
          <div 
            className="premium-content text-justify"
            dangerouslySetInnerHTML={{ __html: displayContent }} 
          />

          {/* Tags */}
          <div className="mt-12 pt-8 border-t border-slate-200 flex flex-wrap items-center gap-3">
            <span className="text-sm font-bold text-slate-500 mr-2 flex items-center gap-1"><Tag size={16}/> Tags:</span>
            {['News', post.category || 'Trending', 'MihirSync'].map((tag, i) => (
              <span key={i} className="px-4 py-1.5 bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-700 rounded-full text-sm font-bold cursor-pointer transition-colors border border-slate-200">
                #{tag}
              </span>
            ))}
          </div>

          {/* Bottom Toolbar & Author Box */}
          <div className="mt-12 bg-slate-50 p-8 rounded-3xl border border-slate-100 flex flex-col md:flex-row items-center gap-8">
            <div className="w-24 h-24 bg-slate-200 rounded-full overflow-hidden border-4 border-white shadow-lg shrink-0 flex items-center justify-center">
               <span className="text-3xl font-black text-slate-400">{authorName.charAt(0)}</span>
            </div>
            <div>
              <h4 className="text-xl font-black text-slate-900 flex items-center gap-2 mb-2">
                {authorName} <CheckCircle2 size={18} className="text-blue-500 fill-blue-50" />
              </h4>
              <p className="text-slate-500 font-medium text-sm leading-relaxed mb-4">
                Senior Editor at MihirSync. Covering breaking news, tech trends, and global affairs with verified facts and premium reporting standards.
              </p>
              <button className="text-blue-600 font-bold text-sm hover:underline">View all articles →</button>
            </div>
          </div>

          {/* Comments */}
          <div className="mt-16">
            <CommentsSection articleId={postId} />
          </div>

        </div>

        {/* 🚀 Right Sidebar (4 Cols) */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* Sticky Container for Sidebar */}
          <div className="sticky top-28 space-y-8">
            
            {/* 🚀 TARI LINK VALU FOLLOW BOX */}
            <div className="bg-slate-900 rounded-3xl p-6 shadow-xl border border-slate-800 text-white">
              <h3 className="text-lg font-black mb-1">Stay Updated!</h3>
              <p className="text-slate-400 text-sm mb-6 font-medium">Get breaking news directly on your favorite apps.</p>
              
              <div className="space-y-3">
                {/* WhatsApp */}
                <a href="https://whatsapp.com/channel/0029Vb97rLw8PgsDtL5Ieq04" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 rounded-2xl bg-[#25D366]/10 hover:bg-[#25D366] group transition-all border border-[#25D366]/20">
                  <div className="flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="text-[#25D366] group-hover:text-white transition-colors" viewBox="0 0 16 16"><path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/></svg>
                    <span className="font-bold group-hover:text-white transition-colors">WhatsApp</span>
                  </div>
                  <span className="bg-[#25D366] text-slate-900 text-xs font-bold px-2 py-1 rounded-md group-hover:bg-white group-hover:text-[#25D366]">Join</span>
                </a>
                
                {/* Instagram */}
                <a href="https://www.instagram.com/mihirsync?igsh=MW9jcnlpcWllcGNhZQ==" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-tr from-[#f09433]/10 via-[#dc2743]/10 to-[#bc1888]/10 hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] group transition-all border border-[#dc2743]/20">
                  <div className="flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="text-[#dc2743] group-hover:text-white transition-colors" viewBox="0 0 16 16"><path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"/></svg>
                    <span className="font-bold group-hover:text-white transition-colors">Instagram</span>
                  </div>
                  <span className="bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white text-xs font-bold px-2 py-1 rounded-md group-hover:bg-white group-hover:from-white group-hover:text-[#dc2743] bg-none">Follow</span>
                </a>

                {/* Facebook */}
                <a href="https://www.facebook.com/share/1Bf1TWK14p/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 rounded-2xl bg-[#1877F2]/10 hover:bg-[#1877F2] group transition-all border border-[#1877F2]/20">
                  <div className="flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="text-[#1877F2] group-hover:text-white transition-colors" viewBox="0 0 16 16"><path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951"/></svg>
                    <span className="font-bold group-hover:text-white transition-colors">Facebook</span>
                  </div>
                  <span className="bg-[#1877F2] text-white text-xs font-bold px-2 py-1 rounded-md group-hover:bg-white group-hover:text-[#1877F2]">Like</span>
                </a>
              </div>
            </div>
            
          </div>
        </div>

      </div>

    </div>
  );
}