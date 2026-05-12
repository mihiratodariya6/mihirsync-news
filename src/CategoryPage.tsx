import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Filter, ChevronDown, TrendingUp, Grid, List, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';
import { mockArticles } from './mockData';
import { NewsCard } from './components/NewsCard';
import SEO from './components/SEO';
import { cn } from './lib/utils';

export default function CategoryPage() {
  const { category } = useParams();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  const formattedCategory = category ? category.charAt(0).toUpperCase() + category.slice(1) : 'News';
  const categoryArticles = mockArticles.filter(a => a.category.toLowerCase() === category?.toLowerCase());
  
  // If no articles found for this specific category in mock data, show some defaults
  const displayArticles = categoryArticles.length > 0 ? categoryArticles : mockArticles.slice(0, 4);

  return (
    <div className="pb-20">
      <SEO 
        title={`${formattedCategory} News`} 
        description={`Latest ${formattedCategory} headlines, analysis, and breaking news updates on MihirSync.`} 
      />

      {/* Header */}
      <header className="bg-brand-dark text-white pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto space-y-8">
          <Link 
            to="/" 
            className="inline-flex items-center text-white/80 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest bg-white/10 backdrop-blur-md px-4 py-2 rounded-full"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-brand-red font-bold text-xs uppercase tracking-[0.2em]">
                <TrendingUp className="w-4 h-4" />
                <span>Global Coverage</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-display font-extrabold tracking-tight">
                {formattedCategory}
              </h1>
              <p className="text-gray-400 max-w-xl text-lg">
                Explore the latest updates and in-depth analysis from the world of {formattedCategory.toLowerCase()}.
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center bg-gray-100 dark:bg-white/10 p-1 rounded-lg">
                <button 
                  onClick={() => setViewMode('grid')}
                  className={cn(
                    "p-2 rounded-md transition-all",
                    viewMode === 'grid' ? "bg-brand-red text-white shadow-lg" : "text-gray-400 hover:text-white"
                  )}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  className={cn(
                    "p-2 rounded-md transition-all",
                    viewMode === 'list' ? "bg-brand-red text-white shadow-lg" : "text-gray-400 hover:text-white"
                  )}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
              <button className="flex items-center bg-white text-brand-dark font-bold px-6 py-3 rounded-lg hover:scale-105 transition-transform">
                <Filter className="w-4 h-4 mr-2" /> Filter <ChevronDown className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Sub-categories nav */}
      <div className="border-b border-gray-100 dark:border-white/5 sticky top-[72px] bg-white/80 dark:bg-brand-dark/80 backdrop-blur-md z-30">
        <div className="max-w-7xl mx-auto px-4 overflow-x-auto">
          <div className="flex space-x-8 py-4 whitespace-nowrap scrollbar-hide">
            {['All', 'Trending', 'Analaysis', 'Interviews', 'Opinion', 'Live Updates'].map((item) => (
              <button 
                key={item}
                className={cn(
                  "text-sm font-bold uppercase tracking-widest transition-colors",
                  item === 'All' ? "text-brand-red border-b-2 border-brand-red pb-4 -mb-4" : "text-gray-400 hover:text-brand-dark dark:hover:text-white"
                )}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {displayArticles.map((article) => (
              <NewsCard key={article.id} article={article} variant="medium" />
            ))}
            {/* Duplicate for visual density */}
            {displayArticles.map((article) => (
              <NewsCard key={`${article.id}-dup`} article={article} variant="medium" />
            ))}
          </div>
        ) : (
          <div className="max-w-4xl mx-auto space-y-12">
            {displayArticles.map((article) => (
              <NewsCard key={`${article.id}-list`} article={article} variant="large" />
            ))}
          </div>
        )}

        {/* Load More Button */}
        <div className="mt-20 text-center">
          <button className="bg-brand-dark text-white dark:bg-white dark:text-brand-dark font-bold px-12 py-4 rounded-xl hover:scale-105 active:scale-95 transition-all shadow-xl">
            LOAD MORE STORIES
          </button>
        </div>
      </main>
    </div>
  );
}
