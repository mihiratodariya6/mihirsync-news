'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { auth } from '../../lib/firebase';
import { signOut } from 'firebase/auth';
// 🚀 અહી BellRing આઈકન એડ કર્યું
import { LayoutDashboard, FileEdit, FileText, Layers, Image as ImageIcon, MessageSquare, Users, Settings, LogOut, BellRing, Video } from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  // સાઇડબારના મેનુ
  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
    { name: 'AI Editor', icon: FileEdit, path: '/admin/' }, // અત્યારે આપણું એડિટર અહીં છે
    { name: 'All Posts', icon: FileText, path: '/admin/posts' },
    { name: 'Trending Reels', icon: Video, path: '/admin/reels' }, // 🚀 આપણું નવું Reels બટન
    { name: 'Categories', icon: Layers, path: '/admin/categories' },
    { name: 'Media Library', icon: ImageIcon, path: '/admin/media' },
    { name: 'Comments', icon: MessageSquare, path: '/admin/comments' },
    { name: 'Notifications', icon: BellRing, path: '/admin/notifications' }, // 🚀 અહીં આપણું નવું પેજ એડ કર્યું
    { name: 'Users & Roles', icon: Users, path: '/admin/users' },
    { name: 'Settings', icon: Settings, path: '/admin/settings' },
  ];

  // લોગઆઉટ ફંક્શન
  const handleLogout = async () => {
    await signOut(auth);
    router.push('/admin/login');
  };

  return (
    <div className="w-64 bg-slate-950 h-screen flex flex-col text-slate-300 border-r border-slate-800 shrink-0">
      
      {/* Logo Area */}
      <div className="p-6 border-b border-slate-800 flex items-center gap-3">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-black text-white shadow-lg shadow-blue-500/20">M</div>
        <div>
          <h2 className="text-white font-black text-lg tracking-tight leading-none">Mihir<span className="text-blue-500">Sync</span></h2>
          <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500">Workspace</span>
        </div>
      </div>
      
      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1 custom-scrollbar">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.path;
          return (
            <Link key={item.name} href={item.path} className={`flex items-center gap-3 px-3 py-3 rounded-lg font-medium text-sm transition-all ${isActive ? 'bg-blue-600/15 text-blue-400' : 'hover:bg-slate-900 hover:text-white'}`}>
              <Icon size={18} className={isActive ? 'text-blue-500' : 'text-slate-500'} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-slate-800">
        <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-3 w-full rounded-lg font-bold text-sm text-red-400 hover:bg-red-500/10 transition-all">
          <LogOut size={18} />
          Secure Logout
        </button>
      </div>
    </div>
  );
}