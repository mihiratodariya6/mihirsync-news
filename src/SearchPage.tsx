import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, SlidersHorizontal, ArrowRight, Zap, TrendingUp, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';
import { mockArticles } from './mockData';
import { NewsCard } from './components/NewsCard';
import SEO from './components/SEO';

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchTerm, setSearchTerm] = useState(query);
  
  const results = mockArticles.filter(a => 
    a.title.toLowerCase().includes(query.toLowerCase()) || 
    a.excerpt.toLowerCase().includes(query.toLowerCase()) ||
    a.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen pb-20">
      <SEO title={`Search: ${query}`} description={`Search results for "${query}" on MihirSync.`} />

      {/* Search Header */}
      <div className="bg-gray-50 dark:bg-white/5 py-12 border-b border-gray-100 dark:border-white/10">
        <div className="max-w-4xl mx-auto px-4 space-y-8">
          <Link 
            to="/" 
            className="inline-flex items-center text-gray-500 hover:text-brand-red transition-colors text-xs font-bold uppercase tracking-widest bg-gray-100 dark:bg-white/5 px-4 py-2 rounded-full"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
          </Link>

          <div className="relative group">
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white dark:bg-brand-dark border-2 border-gray-100 dark:border-white/10 rounded-2xl py-6 pl-16 pr-6 text-2xl font-display font-medium focus:outline-none focus:border-brand-red transition-all shadow-xl dark:shadow-none"
              placeholder="Searching for something specific?"
            />
            <Search className="absolute left-6 top-11 w-8 h-8 text-gray-300 group-focus-within:text-brand-red transition-colors" />
          </div>
          
          <div className="flex items-center justify-between mt-8 text-sm">
            <p className="text-gray-500">
              Showing <span className="font-bold text-brand-dark dark:text-white">{results.length}</span> results for <span className="text-brand-red font-bold">"{query}"</span>
            </p>
            <button className="flex items-center font-bold text-gray-400 hover:text-brand-red transition-colors">
              <SlidersHorizontal className="w-4 h-4 mr-2" /> Advanced Filters
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Results */}
        <div className="lg:col-span-8 space-y-12">
          {results.length > 0 ? (
            results.map((article) => (
              <NewsCard key={article.id} article={article} variant="large" />
            ))
          ) : (
            <div className="text-center py-20 bg-gray-50 dark:bg-white/5 rounded-3xl border-2 border-dashed border-gray-200 dark:border-white/10">
              <div className="w-20 h-20 bg-gray-100 dark:bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-10 h-10 text-gray-400" />
              </div>
              <h2 className="text-2xl font-display font-bold mb-2">No matches found</h2>
              <p className="text-gray-500 max-w-sm mx-auto">
                We couldn't find any stories matching your search. Try adjusting your keywords or browse our categories.
              </p>
              <div className="mt-8 flex justify-center gap-4">
                <Link to="/" className="bg-brand-red text-white px-6 py-3 rounded-xl font-bold">Try Again</Link>
                <Link to="/category/technology" className="bg-brand-dark text-white dark:bg-white dark:text-brand-dark px-6 py-3 rounded-xl font-bold">Browse Tech</Link>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-4 space-y-8">
          <div className="bg-linear-to-br from-brand-red to-brand-blue rounded-3xl p-8 text-white">
            <h3 className="font-display font-bold text-2xl mb-4 flex items-center">
              <Zap className="w-5 h-5 mr-2" /> AI Smart Search
            </h3>
            <p className="text-sm opacity-90 leading-relaxed mb-6">
              Our AI engine can find related topics even if they don't match your keywords exactly.
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 bg-white/10 p-3 rounded-xl cursor-not-allowed grayscale">
                <div className="w-2 h-2 rounded-full bg-green-400" />
                <span className="text-xs font-bold uppercase tracking-widest">Enhanced Neural Mapping</span>
              </div>
              <p className="text-[10px] uppercase font-bold tracking-[0.2em] opacity-60">Coming Soon</p>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="font-display font-bold text-xl flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-brand-red" /> Popular Topics
            </h3>
            <div className="flex flex-wrap gap-2">
              {['Artificial Intelligence', 'Green Energy', 'Web3', 'India Election', 'Market Pulse'].map(tag => (
                <button key={tag} className="bg-gray-100 dark:bg-white/5 px-4 py-2 rounded-full text-xs font-bold hover:bg-brand-red hover:text-white transition-all">
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
