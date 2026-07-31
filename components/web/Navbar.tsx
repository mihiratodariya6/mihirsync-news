'use client';

import React from 'react';
import Link from 'next/link';
import { Search, Menu } from 'lucide-react';
import WeatherWidget from './WeatherWidget'; // 🚀 આ રહ્યું આપણું જાદુઈ વેધર વિજેટ
import { useParams, usePathname } from 'next/navigation';

export default function Navbar() {
  const params = useParams();
  const pathname = usePathname();
  const lang = (params.lang as string) || 'gu';

  // 🗺️ નેવિગેશન લિંક્સ
  const navLinks = [
    { name: 'HOME', path: `/${lang}` },
    { name: 'WORLD', path: `/${lang}/category/world` },
    { name: 'INDIA', path: `/${lang}/category/india` },
    { name: 'SPORTS', path: `/${lang}/category/sports` },
  ];

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-20">
          
          {/* 🟦 ડાબી બાજુ: Logo */}
          <Link href={`/${lang}`} className="flex items-center gap-2 group">
            <div className="bg-blue-600 text-white p-1.5 rounded-lg font-black text-xl leading-none group-hover:scale-105 transition-transform">M</div>
            <span className="text-2xl font-black text-slate-900 tracking-tight">MihirSync.</span>
          </Link>

          {/* 🔗 વચ્ચે: Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              // કયું પેજ ખુલ્લું છે એ ચેક કરવા (ભૂરી લીટી માટે)
              const isActive = pathname === link.path || (link.name === 'HOME' && pathname === `/${lang}`);
              
              return (
                <Link 
                  key={link.name} 
                  href={link.path} 
                  className={`text-sm font-bold tracking-wider transition-all ${isActive ? 'text-blue-600 border-b-2 border-blue-600 pb-1' : 'text-slate-500 hover:text-blue-600'}`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* 🔍 જમણી બાજુ: Weather અને Search */}
          <div className="flex items-center gap-4">
            
            {/* 🌤️ અહીં વેધર દેખાશે (મોબાઈલમાં જગ્યા બચાવવા હાઈડ કર્યું છે, ડેસ્કટોપમાં દેખાશે) */}
            <div className="hidden lg:block">
              <WeatherWidget />
            </div>

            <button className="text-slate-500 hover:text-blue-600 transition-colors p-2 bg-slate-50 hover:bg-blue-50 rounded-full">
              <Search size={18} />
            </button>
            
            {/* 📱 મોબાઈલ મેનુ આઇકોન */}
            <button className="md:hidden text-slate-500 p-2">
              <Menu size={24} />
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
}