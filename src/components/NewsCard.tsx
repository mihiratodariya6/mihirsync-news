import { Link } from 'react-router-dom';
import { Bookmark, Share2, Clock, Eye, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { NewsArticle } from '@/src/types';
import { cn, formatDate } from '@/src/lib/utils';

interface NewsCardProps {
  article: NewsArticle;
  variant?: 'large' | 'medium' | 'small' | 'minimal' | 'short';
}

export function NewsCard({ article, variant = 'medium' }: NewsCardProps) {
  if (variant === 'minimal') {
    return (
      <Link 
        to={`/article/${article.slug}`}
        className="group flex gap-4 items-start py-4 border-b border-gray-100 dark:border-white/5 opacity-80 hover:opacity-100 transition-all"
      >
        <span className="text-xl font-bold text-gray-200 dark:text-gray-800 shrink-0 mt-1">
          {article.id.padStart(2, '0')}
        </span>
        <div>
          <h3 className="font-semibold text-sm line-clamp-2 leading-snug group-hover:text-brand-red transition-colors">
            {article.title}
          </h3>
          <div className="flex items-center space-x-2 mt-2 text-[10px] text-gray-500 uppercase tracking-widest font-bold">
            <span>{article.category}</span>
            <span>•</span>
            <span>{article.readTime}</span>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === 'short') {
    return (
      <motion.div 
        whileHover={{ y: -4 }}
        className="glass rounded-xl overflow-hidden h-full flex flex-col group"
      >
        <div className="relative aspect-video overflow-hidden">
          <img 
            src={article.image} 
            alt={article.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 left-3">
            <span className="bg-brand-red text-white text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase">60s READ</span>
          </div>
        </div>
        <div className="p-4 flex-grow flex flex-col justify-between">
          <div>
            <Link to={`/article/${article.slug}`}>
              <h3 className="font-display font-bold text-lg mb-2 line-clamp-2 leading-tight hover:text-brand-red transition-colors">
                {article.title}
              </h3>
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-3 mb-4 leading-relaxed">
              {article.excerpt}
            </p>
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-white/5">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-semibold text-brand-red">{article.category}</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-400">
              <button className="hover:text-brand-red transition-colors"><Bookmark className="w-4 h-4" /></button>
              <button className="hover:text-brand-red transition-colors"><Share2 className="w-4 h-4" /></button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  const isLarge = variant === 'large';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={cn(
        "group relative flex flex-col transition-all duration-300",
        isLarge ? "col-span-1 lg:col-span-2" : ""
      )}
    >
      <div className={cn(
        "relative overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800 mb-4",
        isLarge ? "aspect-[16/9]" : "aspect-[4/3]"
      )}>
        <img 
          src={article.image} 
          alt={article.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute top-4 left-4 flex gap-2">
          {article.isBreaking && (
            <span className="bg-brand-red text-white text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider">Breaking</span>
          )}
          <span className="bg-white/90 dark:bg-black/90 backdrop-blur-sm text-brand-dark dark:text-white text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider">{article.category}</span>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center space-x-3 text-xs text-brand-red font-bold uppercase tracking-widest">
          <Link to={`/category/${article.category.toLowerCase()}`} className="hover:underline">{article.category}</Link>
          <span className="text-gray-300 dark:text-gray-700">|</span>
          <span className="text-gray-500 dark:text-gray-400 flex items-center">
            <Clock className="w-3 h-3 mr-1" /> {article.readTime}
          </span>
        </div>

        <Link to={`/article/${article.slug}`}>
          <h2 className={cn(
            "font-display font-bold leading-tight group-hover:text-brand-red transition-colors",
            isLarge ? "text-2xl md:text-3xl lg:text-4xl" : "text-xl"
          )}>
            {article.title}
          </h2>
        </Link>

        {isLarge && (
          <p className="text-gray-600 dark:text-gray-400 line-clamp-3 text-sm md:text-base leading-relaxed">
            {article.excerpt}
          </p>
        )}

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-brand-red bg-linear-to-tr from-brand-red to-brand-blue flex items-center justify-center text-white text-[10px] font-bold shadow-lg">
              {article.author.charAt(0)}
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold">{article.author}</span>
              <span className="text-[10px] text-gray-500">{formatDate(article.publishedAt)}</span>
            </div>
          </div>
          <div className="flex items-center space-x-4 text-gray-400">
            <div className="flex items-center space-x-1 text-[10px] font-bold">
              <Eye className="w-3 h-3" />
              <span>{Math.round(article.views / 100) / 10}K</span>
            </div>
            <button className="hover:text-brand-red transition-colors"><Bookmark className="w-4 h-4" /></button>
            <button className="hover:text-brand-red transition-colors"><Share2 className="w-4 h-4" /></button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
