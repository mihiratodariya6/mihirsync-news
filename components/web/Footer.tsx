'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { db } from '../../lib/firebase';
import { collection, getDocs, query, limit } from 'firebase/firestore';
import { Mail, MapPin, Send, ArrowRight, Smartphone, Apple } from 'lucide-react';

export default function Footer({ lang = 'en' }: { lang?: string }) {
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const q = query(collection(db, 'categories'), limit(12));
        const snap = await getDocs(q);
        setCategories(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      } catch (error) {
        console.error("Error fetching footer categories:", error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <footer className="bg-[#0b1120] text-slate-300 pt-16 mt-20 border-t-[6px] border-blue-600 font-sans">
      
      {/* 🔝 TOP SECTION: Newsletter & App Download */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-12 pb-12 border-b border-slate-800/80 flex flex-col lg:flex-row justify-between items-center gap-8">
        
        {/* 🚀 Newsletter Form (Direct to Email) */}
        <div className="w-full lg:w-1/2">
          <h3 className="text-2xl font-black text-white mb-2 flex items-center gap-2">
            <Mail className="text-blue-500" /> Stay Updated
          </h3>
          <p className="text-sm text-slate-400 mb-4">Subscribe to our newsletter for the latest breaking news and exclusive content.</p>
          
          <form action="https://formsubmit.co/mihirsync1@gmail.com" method="POST" target="_blank" className="flex w-full max-w-md bg-slate-900 rounded-full p-1 border border-slate-700 focus-within:border-blue-500 transition-colors">
            {/* FormSubmit Configuration */}
            <input type="hidden" name="_subject" value="New Subscriber for MihirSync!" />
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_template" value="table" />
            
            <input type="email" name="Subscriber Email" placeholder="Enter your Email Address" className="w-full bg-transparent px-4 text-sm text-white outline-none" required />
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 transition-colors">
              Subscribe <Send size={14} />
            </button>
          </form>
        </div>

        {/* 🚀 App Downloads (Link to Coming Soon Page) */}
        <div className="w-full lg:w-auto flex flex-col sm:flex-row gap-4">
          <Link href={`/${lang}/apps`} className="flex items-center gap-3 bg-slate-900 hover:bg-slate-800 border border-slate-700 px-6 py-3 rounded-xl transition-colors">
            <Smartphone size={24} className="text-green-400" />
            <div className="text-left">
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Download on</div>
              <div className="text-sm font-black text-white leading-tight">Android App</div>
            </div>
          </Link>
          <Link href={`/${lang}/apps`} className="flex items-center gap-3 bg-slate-900 hover:bg-slate-800 border border-slate-700 px-6 py-3 rounded-xl transition-colors">
            <Apple size={24} className="text-white" />
            <div className="text-left">
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Download on</div>
              <div className="text-sm font-black text-white leading-tight">iPhone App</div>
            </div>
          </Link>
        </div>
      </div>

      {/* 📰 MIDDLE SECTION: Main Links Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
        
        {/* Column 1: Brand & Contact */}
        <div className="lg:col-span-2">
          <Link href={`/${lang}`} className="flex items-center gap-2 mb-6 inline-flex">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-black text-xl text-white shadow-lg shadow-blue-600/20">M</div>
            <span className="text-3xl font-black tracking-tight text-white">Mihir<span className="text-blue-500">Sync.</span></span>
          </Link>
          <p className="text-sm font-medium text-slate-400 mb-8 leading-relaxed max-w-md">
            Your Trusted Source for Breaking News, Technology, AI, Business, Sports and Global Updates. Fastest and most accurate news.
          </p>
          
          <ul className="space-y-4 text-sm font-medium text-slate-400">
            {/* 🚀 કોન્ટેક્ટ નંબર કાઢીને ઈમેલ મૂક્યું */}
            <li className="flex items-center gap-3"><Mail size={16} className="text-blue-500"/> mihirsync1@gmail.com</li>
            <li className="flex items-center gap-3"><MapPin size={16} className="text-blue-500"/> Surat, Gujarat, India - 395006</li>
          </ul>
        </div>

        {/* Column 2: 🚀 DYNAMIC CATEGORIES */}
        <div>
          <h4 className="text-white font-black uppercase tracking-widest text-sm mb-6 flex items-center gap-2">
            Categories
          </h4>
          <ul className="space-y-3 text-sm font-medium">
            {categories.length > 0 ? (
              categories.map((cat) => (
                <li key={cat.id}>
                  <Link href={`/${lang}/category/${cat.slug}`} className="hover:text-blue-400 transition-colors flex items-center gap-1 group">
                    <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-500 -ml-3 group-hover:ml-0"/>
                    <span className="capitalize">{cat.name}</span>
                  </Link>
                </li>
              ))
            ) : (
              <li className="text-slate-500 italic">Loading categories...</li>
            )}
          </ul>
        </div>

        {/* Column 3: Company & Quick Links */}
        <div>
          <h4 className="text-white font-black uppercase tracking-widest text-sm mb-6">Company</h4>
          <ul className="space-y-3 text-sm font-medium">
            <li><Link href={`/${lang}/about`} className="hover:text-blue-400 transition-colors">About Us</Link></li>
            <li><Link href={`/${lang}/team`} className="hover:text-blue-400 transition-colors">Our Team</Link></li>
            <li><Link href={`/${lang}/careers`} className="hover:text-blue-400 transition-colors">Careers / Jobs</Link></li>
            <li><Link href={`/${lang}/advertise`} className="hover:text-blue-400 transition-colors">Advertise With Us</Link></li>
            <li><Link href={`/${lang}/contact`} className="hover:text-blue-400 transition-colors">Contact Sales</Link></li>
            <li><Link href={`/${lang}/press`} className="hover:text-blue-400 transition-colors">Press & Media Kit</Link></li>
            <li><Link href={`/${lang}/trending`} className="hover:text-blue-400 transition-colors text-blue-300 font-bold">Trending News</Link></li>
          </ul>
        </div>

        {/* Column 4: Legal & Policies */}
        <div>
          <h4 className="text-white font-black uppercase tracking-widest text-sm mb-6">Legal Policy</h4>
          <ul className="space-y-3 text-sm font-medium">
            <li><Link href={`/${lang}/privacy-policy`} className="hover:text-blue-400 transition-colors">Privacy Policy</Link></li>
            <li><Link href={`/${lang}/terms`} className="hover:text-blue-400 transition-colors">Terms & Conditions</Link></li>
            <li><Link href={`/${lang}/disclaimer`} className="hover:text-blue-400 transition-colors">Disclaimer</Link></li>
            <li><Link href={`/${lang}/editorial-policy`} className="hover:text-blue-400 transition-colors">Editorial Policy</Link></li>
            <li><Link href={`/${lang}/correction-policy`} className="hover:text-blue-400 transition-colors">Correction Policy</Link></li>
            <li><Link href={`/${lang}/fact-check`} className="hover:text-blue-400 transition-colors">Fact Check Policy</Link></li>
            <li><Link href={`/${lang}/cookie-policy`} className="hover:text-blue-400 transition-colors">Cookie Policy</Link></li>
            <li><Link href={`/${lang}/dmca`} className="hover:text-blue-400 transition-colors">DMCA Policy</Link></li>
          </ul>
        </div>

      </div>

      {/* 🏷️ TRENDING TAGS (SEO Power) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 border-b border-slate-800/80">
        <div className="flex flex-wrap items-center gap-3 text-xs font-bold text-slate-500">
          <span className="uppercase tracking-widest text-slate-400 mr-2">Trending Searches:</span>
          {['AI', 'OpenAI', 'Google', 'Apple', 'Tesla', 'ISRO', 'IPL', 'Cricket', 'Bitcoin', 'Business', 'Technology', 'Health', 'Education', 'Auto'].map((tag) => (
            <Link key={tag} href={`/${lang}/search?q=${tag.toLowerCase()}`} className="px-3 py-1 bg-slate-900 border border-slate-800 rounded-md hover:border-blue-500 hover:text-blue-400 transition-colors">
              {tag}
            </Link>
          ))}
        </div>
      </div>

      {/* ⬇️ BOTTOM SECTION: Social Icons & Copyright */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Copyright */}
        <div className="text-sm font-medium text-slate-500 text-center md:text-left">
          <p>© {new Date().getFullYear()} MihirSync Media. All Rights Reserved.</p>
        </div>

        {/* Social Follow Icons */}
        <div className="flex items-center gap-4">
          <a href="https://www.facebook.com/share/1Bf1TWK14p/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-[#1877F2] hover:text-white transition-all" title="Facebook">
             <svg width="18" height="18" fill="currentColor" viewBox="0 0 16 16"><path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951"/></svg>
          </a>
          <a href="https://www.instagram.com/mihirsync?igsh=MW9jcnlpcWllcGNhZQ==" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-[#E1306C] hover:text-white transition-all" title="Instagram">
             <svg width="18" height="18" fill="currentColor" viewBox="0 0 16 16"><path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"/></svg>
          </a>
          <a href="https://whatsapp.com/channel/0029Vb97rLw8PgsDtL5Ieq04" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-[#25D366] hover:text-white transition-all" title="WhatsApp Channel">
             <svg width="18" height="18" fill="currentColor" viewBox="0 0 16 16"><path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/></svg>
          </a>
          <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-[#FF0000] hover:text-white transition-all" title="YouTube">
             <svg width="18" height="18" fill="currentColor" viewBox="0 0 16 16"><path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.052-.072 1.972l-.008.104-.022.261-.01.104c-.048.519-.119 1.023-.22 1.402a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z"/></svg>
          </a>
          <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-[#000000] hover:text-white transition-all" title="X (Twitter)">
             <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865l8.875 11.633Z"/></svg>
          </a>
        </div>

      </div>
    </footer>
  );
}