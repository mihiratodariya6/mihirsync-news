'use client';

import React, { useEffect, useState } from 'react';
import { db } from '../../lib/firebase';
import { collection, getDocs, query } from 'firebase/firestore'; // 🚀 અહીથી orderBy કાઢી નાખ્યું
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar({ lang }: { lang: string }) {
  const [categories, setCategories] = useState<any[]>([]);
  const pathname = usePathname(); 

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // 🚀 FIX: સીધી જ બધી કેટેગરી મંગાવી લીધી (કોઈ ફિલ્ટર વગર)
        const q = query(collection(db, 'categories'));
        const snap = await getDocs(q);
        setCategories(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Menu fetch error:", error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        
        {/* LOGO */}
        <Link href={`/${lang}`} className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white shadow-md">M</div>
          <span className="text-2xl font-black tracking-tight text-slate-800">Mihir<span className="text-blue-600">Sync.</span></span>
        </Link>

        {/* DYNAMIC MENU */}
        <nav className="hidden md:flex gap-8">
          <Link 
            href={`/${lang}`} 
            className={`text-sm font-bold uppercase tracking-widest transition-colors ${
              pathname === `/${lang}` ? 'text-blue-600 border-b-2 border-blue-600 pb-1' : 'text-slate-600 hover:text-blue-600'
            }`}
          >
            HOME
          </Link>
          
          {categories.map(cat => {
            const catUrl = `/${lang}/category/${cat.slug || cat.name.toLowerCase()}`;
            const isActive = pathname === catUrl; 
            return (
              <Link 
                key={cat.id} 
                href={catUrl} 
                className={`text-sm font-bold uppercase tracking-widest transition-colors ${
                  isActive ? 'text-blue-600 border-b-2 border-blue-600 pb-1' : 'text-slate-600 hover:text-blue-600'
                }`}
              >
                {cat.name}
              </Link>
            )
          })}
        </nav>

        {/* SEARCH ICON */}
        <div className="flex items-center">
          <button className="p-2 text-slate-500 hover:text-blue-600 transition-colors"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg></button>
        </div>
        
      </div>
    </header>
  );
}