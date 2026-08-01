'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Search, Menu } from 'lucide-react';
import WeatherWidget from './WeatherWidget';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { db } from '../../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

export default function Navbar() {
  const params = useParams();
  const pathname = usePathname();
  const router = useRouter(); // 🚀 પેજ બદલવા માટે
  const lang = (params.lang as string) || 'gu';

  const [navLinks, setNavLinks] = useState<{name: string, path: string}[]>([
    { name: 'HOME', path: `/${lang}` }
  ]);
  
  const [searchQuery, setSearchQuery] = useState(''); // 🚀 સર્ચમાં શું લખ્યું એ સેવ કરવા

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const snap = await getDocs(collection(db, 'categories'));
        const catData = snap.docs.map(doc => ({
          name: doc.data().name.toUpperCase(),
          path: `/${lang}/category/${doc.data().slug}`
        }));
        setNavLinks([{ name: 'HOME', path: `/${lang}` }, ...catData]);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, [lang]);

  // 🚀 જ્યારે કોઈ એન્ટર મારે ત્યારે સર્ચ પેજ પર લઈ જશે
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim() !== '') {
      router.push(`/${lang}/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-20">
          
          <Link href={`/${lang}`} className="flex items-center gap-2 group">
            <div className="bg-blue-600 text-white p-1.5 rounded-lg font-black text-xl leading-none group-hover:scale-105 transition-transform">M</div>
            <span className="text-2xl font-black text-slate-900 tracking-tight">MihirSync.</span>
          </Link>

          <div className="hidden md:flex items-center gap-6 overflow-x-auto">
            {navLinks.map((link) => {
              const isActive = pathname === link.path || (link.name === 'HOME' && pathname === `/${lang}`);
              return (
                <Link 
                  key={link.name} href={link.path} 
                  className={`text-sm font-bold tracking-wider whitespace-nowrap transition-all ${isActive ? 'text-blue-600 border-b-2 border-blue-600 pb-1' : 'text-slate-500 hover:text-blue-600'}`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden lg:block">
              <WeatherWidget />
            </div>

            {/* 🔍 અસલી Search Box */}
            <form onSubmit={handleSearch} className="relative hidden sm:flex items-center">
              <input 
                type="text" 
                placeholder="Search news..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-4 pr-10 py-2 rounded-full border border-slate-200 bg-slate-50 text-sm font-bold text-slate-700 outline-none focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all w-40 lg:w-56"
              />
              <button type="submit" className="absolute right-3 text-slate-400 hover:text-blue-600 transition-colors">
                <Search size={18} />
              </button>
            </form>

            <button className="md:hidden text-slate-500 p-2">
              <Menu size={24} />
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
}