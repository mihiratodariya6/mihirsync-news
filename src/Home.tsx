import React, { useState, useEffect } from 'react';
import { NewsCard } from './components/NewsCard';
import { mockArticles } from './mockData';
import { NewsArticle } from './types';
import { TrendingUp, Zap, ArrowRight, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import SEO from './components/SEO';
import { db, OperationType, handleFirestoreError } from './lib/firebase';
import { collection, onSnapshot, query, orderBy, limit } from 'firebase/firestore';

export default function Home() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'articles'), orderBy('publishedAt', 'desc'), limit(20));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (snapshot.empty) {
        setArticles(mockArticles as any);
      } else {
        const fetchedArticles = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as NewsArticle[];
        setArticles(fetchedArticles);
      }
      setLoading(false);
    }, (error) => {
      console.error("Firestore error:", error);
      handleFirestoreError(error, OperationType.LIST, 'articles');
      setArticles(mockArticles as any);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const trendingArticles = articles.filter(a => a.isTrending);
  const breakingArticles = articles.filter(a => a.isBreaking);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-brand-red animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-16 pb-16">
      <SEO 
        title="World News at Lightning Speed" 
        description="Stay updated with the latest in technology, AI, business, and world news powered by MihirSync's advanced news engine."
      />

      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Headline */}
          <div className="lg:col-span-2">
            {articles[0] && <NewsCard article={articles[0]} variant="large" />}
          </div>

          {/* Trending Sidebar */}
          <div className="space-y-1">
            <div className="flex items-center justify-between mb-6 border-b border-gray-100 dark:border-white/5 pb-2">
              <h2 className="font-display font-bold text-xl flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-brand-red" /> Trending
              </h2>
              <Link to="/search?q=trending" className="text-xs font-bold text-brand-red hover:underline">VIEW ALL</Link>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-white/5">
              {trendingArticles.slice(0, 5).map((article) => (
                <NewsCard key={article.id} article={article} variant="minimal" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories Bar */}
      <section className="bg-brand-dark text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display font-bold text-2xl">Browse by Category</h2>
            <div className="flex space-x-2">
              <button className="p-2 border border-white/10 rounded-full hover:bg-white/5 transition-colors"><ChevronLeft className="w-4 h-4" /></button>
              <button className="p-2 border border-white/10 rounded-full hover:bg-white/5 transition-colors"><ChevronRight className="w-4 h-4" /></button>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {['Technology', 'AI', 'Finance', 'India', 'Startups', 'Space'].map((cat) => (
              <Link 
                key={cat} 
                to={`/category/${cat.toLowerCase()}`}
                className="group relative h-32 rounded-xl overflow-hidden bg-white/5 border border-white/10 flex items-center justify-center p-4 text-center hover:border-brand-red transition-all"
              >
                <div className="absolute inset-0 bg-linear-to-b from-transparent to-black/60 group-hover:bg-brand-red/20 transition-all" />
                <span className="relative z-10 font-bold group-hover:scale-110 transition-transform">{cat}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Special: Inshorts Style Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex flex-col">
            <h2 className="font-display font-bold text-3xl">60-Second News</h2>
            <p className="text-gray-500 text-sm mt-1">Get the gist of the story in under a minute.</p>
          </div>
          <button className="flex items-center text-brand-red font-bold text-sm hover:translate-x-1 transition-transform">
            VIEW ALL <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.slice(1, 4).map((article) => (
            <NewsCard key={article.id} article={article} variant="short" />
          ))}
        </div>
      </section>

      {/* India News Section */}
      <section className="bg-gray-50 dark:bg-black/20 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            <div className="lg:col-span-1 space-y-4">
              <h2 className="font-display font-bold text-4xl leading-tight">India <span className="text-brand-red">Direct</span></h2>
              <p className="text-gray-500 text-sm leading-relaxed">
                Comprehensive coverage of national politics, economy, and technological leaps from the Indian subcontinent.
              </p>
              <Link to="/category/india" className="inline-flex items-center bg-brand-red text-white font-bold py-3 px-6 rounded-lg text-sm hover:scale-105 transition-transform">
                Read All India News <ArrowRight className="w-4 h-4 ml-2 transition-transform" />
              </Link>
            </div>
            <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-8">
              {articles.slice(3, 5).map((article) => (
                <NewsCard key={article.id} article={article} variant="medium" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* AI Newsletter Section */}
      <section className="px-4">
        <div className="max-w-5xl mx-auto bg-brand-red rounded-3xl p-8 md:p-16 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <Zap className="w-64 h-64 absolute -top-20 -left-20 rotate-12" />
            <TrendingUp className="w-64 h-64 absolute -bottom-20 -right-20 -rotate-12" />
          </div>
          
          <div className="relative z-10 space-y-6">
            <h2 className="font-display font-extrabold text-3xl md:text-5xl lg:text-6xl tracking-tight">Sync With the Future</h2>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              Join 500,000+ subscribers getting their daily AI-curated news dose. No fluff, just facts.
            </p>
            <form className="max-w-lg mx-auto flex flex-col sm:flex-row gap-4 pt-4">
              <input 
                type="email" 
                placeholder="Enter your email address"
                className="flex-grow bg-white text-brand-dark rounded-xl py-4 px-6 focus:outline-none focus:ring-4 focus:ring-rose-500/30"
              />
              <button className="bg-brand-dark text-white font-bold py-4 px-8 rounded-xl hover:scale-105 active:scale-95 transition-all shadow-xl">
                SUBSCRIBE NOW
              </button>
            </form>
            <p className="text-[10px] opacity-60 uppercase tracking-widest font-bold">
              Unsubscribe anytime • Privacy policy protected
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
