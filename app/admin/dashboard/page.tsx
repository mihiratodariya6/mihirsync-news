'use client';

import React, { useEffect, useState } from 'react';
import { db } from '../../../lib/firebase';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { FileText, Eye, ThumbsUp, TrendingUp, ArrowUpRight, Clock, Globe, Activity } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalPosts: 0,
    publishedPosts: 0,
    totalViews: 0,
    totalLikes: 0,
  });
  const [loading, setLoading] = useState(true);

  // Firebase માંથી લાઈવ ડેટા ખેંચવા માટે
  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const articlesRef = collection(db, 'articles');
        const querySnapshot = await getDocs(articlesRef);
        
        let total = 0;
        let published = 0;
        let views = 0;
        let likes = 0;

        querySnapshot.forEach((doc) => {
          total++;
          const data = doc.data();
          if (data.status === 'published') published++;
          if (data.stats) {
            views += (data.stats.views || 0);
            likes += (data.stats.likes || 0);
          }
        });

        setStats({ totalPosts: total, publishedPosts: published, totalViews: views, totalLikes: likes });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  if (loading) {
    return (
      <div className="flex-1 h-full flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Activity className="animate-spin text-blue-600" size={32} />
          <p className="text-slate-500 font-bold text-sm">Loading Live Analytics...</p>
        </div>
      </div>
    );
  }

  // કાર્ડ બનાવવા માટેનો વારંવાર વપરાતો કમ્પોનન્ટ
  const StatCard = ({ title, value, icon: Icon, colorClass }: any) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">{title}</p>
          <h3 className="text-3xl font-black text-slate-800">{value.toLocaleString('en-IN')}</h3>
        </div>
        <div className={`p-3 rounded-xl ${colorClass}`}>
          <Icon size={24} />
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2 text-xs font-bold text-emerald-500">
        <ArrowUpRight size={16} /> <span>Live from Firebase</span>
      </div>
    </div>
  );

  return (
    <div className="p-8 h-full overflow-y-auto custom-scrollbar">
      <div className="mb-8">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Overview Dashboard</h1>
        <p className="text-slate-500 text-sm font-medium mt-1">Welcome back! Here's what's happening on your news portal today.</p>
      </div>

      {/* 📈 Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Articles" value={stats.totalPosts} icon={FileText} colorClass="bg-blue-50 text-blue-600" />
        <StatCard title="Total Views" value={stats.totalViews} icon={Eye} colorClass="bg-purple-50 text-purple-600" />
        <StatCard title="Total Likes" value={stats.totalLikes} icon={ThumbsUp} colorClass="bg-pink-50 text-pink-600" />
        <StatCard title="Published Posts" value={stats.publishedPosts} icon={Globe} colorClass="bg-emerald-50 text-emerald-600" />
      </div>

      {/* 🚀 System Status & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-bold text-slate-800 flex items-center gap-2"><TrendingUp size={18} className="text-blue-600"/> Traffic Overview</h2>
            <select className="bg-slate-50 border border-slate-200 text-xs font-bold text-slate-600 px-3 py-1.5 rounded-lg outline-none">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          {/* Placeholder for future Recharts/Chart.js */}
          <div className="h-64 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center text-slate-400 font-medium">
            <p className="flex items-center gap-2"><Activity size={18}/> Traffic Analytics Chart will be integrated here</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <h2 className="font-bold text-slate-800 flex items-center gap-2 mb-6"><Clock size={18} className="text-blue-600"/> System Status</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
              <span className="text-sm font-bold text-slate-600">Database Connection</span>
              <span className="px-2 py-1 bg-green-100 text-green-700 text-[10px] font-black rounded-md uppercase">Connected</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
              <span className="text-sm font-bold text-slate-600">AI Translation Engine</span>
              <span className="px-2 py-1 bg-blue-100 text-blue-700 text-[10px] font-black rounded-md uppercase">Ready</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
              <span className="text-sm font-bold text-slate-600">Storage Status</span>
              <span className="px-2 py-1 bg-green-100 text-green-700 text-[10px] font-black rounded-md uppercase">Optimal</span>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Quick Actions</h3>
            <button className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm py-3 rounded-xl transition-colors shadow-md">
              + Draft New Article
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}