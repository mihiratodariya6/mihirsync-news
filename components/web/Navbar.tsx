'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Search, Menu } from 'lucide-react';
import WeatherWidget from './WeatherWidget';
import { useParams, usePathname } from 'next/navigation';
import { db } from '../../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

export default function Navbar() {
  const params = useParams();
  const pathname = usePathname();
  const lang = (params.lang as string) || 'gu';

  // 🚀 ડાયનેમિક મેનુ માટે State (HOME હંમેશા રહેશે)
  const [navLinks, setNavLinks] = useState<{name: string, path: string}[]>([
    { name: 'HOME', path: `/${lang}` }
  ]);

  // ડેટાબેઝમાંથી કેટેગરી લાવવા માટે
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const snap = await getDocs(collection(db, 'categories'));
        const catData = snap.docs.map(doc => {
          const data = doc.data();
          return {
            name: data.name.toUpperCase(), // નામ કેપિટલમાં દેખાડવા
            path: `/${lang}/category/${data.slug}`
          };
        });

        // HOME ની પાછળ ડેટાબેઝવાળી બધી નવી કેટેગરી જોડી દો
        setNavLinks([
          { name: 'HOME', path: `/${lang}` },
          ...catData
        ]);
      } catch (error) {
        console.error("Error fetching categories for navbar:", error);
      }
    };
    
    fetchCategories();
  }, [lang]);

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-20">
          
          {/* 🟦 ડાબી બાજુ: Logo */}
          <Link href={`/${lang}`} className="flex items-center gap-2 group">
            <div className="bg-blue-600 text-white p-1.5 rounded-lg font-black text-xl leading-none group-hover:scale-105 transition-transform">M</div>
            <span className="text-2xl font-black text-slate-900 tracking-tight">MihirSync.</span>
          </Link>

          {/* 🔗 વચ્ચે: Desktop Menu (હવે ડાયનેમિક છે!) */}
          <div className="hidden md:flex items-center gap-6 overflow-x-auto">
            {navLinks.map((link) => {
              const isActive = pathname === link.path || (link.name === 'HOME' && pathname === `/${lang}`);
              return (
                <Link 
                  key={link.name} 
                  href={link.path} 
                  className={`text-sm font-bold tracking-wider whitespace-nowrap transition-all ${isActive ? 'text-blue-600 border-b-2 border-blue-600 pb-1' : 'text-slate-500 hover:text-blue-600'}`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* 🔍 જમણી બાજુ: Weather અને Search */}
          <div className="flex items-center gap-4">
            
            <div className="hidden lg:block">
              <WeatherWidget />
            </div>

            <button className="text-slate-500 hover:text-blue-600 transition-colors p-2 bg-slate-50 hover:bg-blue-50 rounded-full">
              <Search size={18} />
            </button>
            
            <button className="md:hidden text-slate-500 p-2">
              <Menu size={24} />
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
}