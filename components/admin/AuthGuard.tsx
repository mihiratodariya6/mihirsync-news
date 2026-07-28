'use client';

import { useEffect, useState } from 'react';
import { auth } from '../../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter, usePathname } from 'next/navigation';
import Sidebar from './Sidebar'; // 👈 સાઇડબાર ઈમ્પોર્ટ કર્યું

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user && pathname !== '/admin/login') {
        router.replace('/admin/login');
      } else if (user && pathname === '/admin/login') {
        router.replace('/admin');
      } else {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [pathname, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-white">
        <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center font-black text-2xl mb-4 animate-bounce shadow-lg shadow-blue-500/20">M</div>
        <div className="animate-pulse font-bold text-slate-400 text-sm tracking-widest uppercase">Securing Connection...</div>
      </div>
    );
  }

  // જો યુઝર લોગીન પેજ પર હોય તો સાઇડબાર બતાવવાની જરૂર નથી
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  // બાકીના બધા પેજ પર ડાબી બાજુ સાઇડબાર અને જમણી બાજુ કન્ટેન્ટ બતાવો
  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-100">
      <Sidebar />
      <main className="flex-1 h-full overflow-hidden flex flex-col">
        {children}
      </main>
    </div>
  );
}