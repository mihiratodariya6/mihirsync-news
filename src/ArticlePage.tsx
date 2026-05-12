import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  User, 
  Share2, 
  Bookmark, 
  MessageSquare, 
  ArrowLeft,
  Sparkles,
  Send,
  Facebook,
  Twitter,
  Linkedin
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import { mockArticles } from './mockData';
import SEO from './components/SEO';
import { cn, formatDate } from './lib/utils';
import { NewsCard } from './components/NewsCard';
import { generateArticleSummary, askAiAboutArticle } from './services/geminiService';
import { newsService } from './services/newsService';
import { Loader2, ChevronLeft } from 'lucide-react';
import { NewsArticle } from './types';

export default function ArticlePage() {
  const { slug } = useParams();
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const [showAiSummary, setShowAiSummary] = useState(false);
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [aiSummary, setAiSummary] = useState('');
  const [chatMessage, setChatMessage] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'ai', text: string }[]>([]);
  const [isChatLoading, setIsChatLoading] = useState(false);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!slug) return;
      setLoading(true);
      try {
        const data = await newsService.getArticleBySlug(slug);
        if (data) {
          setArticle(data);
          newsService.incrementViews(data.id);
        } else {
          const mock = mockArticles.find(a => a.slug === slug);
          setArticle(mock || null);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
    window.scrollTo(0, 0);
  }, [slug]);

  const handleGenerateSummary = async () => {
    if (!article) return;
    setIsSummarizing(true);
    setShowAiSummary(true);
    const summary = await generateArticleSummary(article.title, article.excerpt);
    setAiSummary(summary || '');
    setIsSummarizing(false);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim() || !article) return;

    const userMsg = chatMessage;
    setChatMessage('');
    setChatHistory(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsChatLoading(true);

    const response = await askAiAboutArticle(article.title, article.content, userMsg);
    setChatHistory(prev => [...prev, { role: 'ai', text: response || '' }]);
    setIsChatLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-brand-red animate-spin" />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
        <h1 className="text-3xl font-bold">Article Not Found</h1>
        <Link to="/" className="text-brand-red font-bold flex items-center">
          <ChevronLeft className="w-4 h-4 mr-2" /> Back to Home
        </Link>
      </div>
    );
  }

  const relatedArticles = mockArticles.filter(a => a.id !== article.id).slice(0, 3);

  return (
    <div className="min-h-screen pb-20">
      <SEO 
        title={article.title} 
        description={article.excerpt} 
        image={article.image}
        article={true}
        author={article.author}
        publishDate={article.publishedAt}
        category={article.category}
      />

      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-brand-red z-50 origin-left"
        initial={{ scaleX: 0 }}
        style={{ scaleX: 0 }} // In real app use window scroll listener
      />

      {/* Hero Header */}
      <div className="relative w-full h-[60vh] md:h-[70vh] bg-gray-900">
        <img 
          src={article.image} 
          alt={article.title} 
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-linear-to-t from-brand-dark via-brand-dark/20 to-transparent" />
        
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 lg:p-20">
          <div className="max-w-4xl mx-auto space-y-6">
            <Link 
              to="/" 
              className="inline-flex items-center text-white/80 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest bg-white/10 backdrop-blur-md px-4 py-2 rounded-full"
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
            </Link>
            
            <div className="flex items-center space-x-3 text-brand-red font-display font-bold uppercase tracking-wider text-sm">
              <span className="bg-brand-red text-white px-2 py-0.5 rounded-sm">{article.category}</span>
              <span className="text-white/60">•</span>
              <span className="text-white/60">{article.readTime}</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-7xl font-display font-extrabold text-white leading-tight">
              {article.title}
            </h1>

            <div className="flex items-center space-x-6 text-white/80 pt-4 border-t border-white/10">
              <div className="flex items-center">
                <User className="w-5 h-5 mr-2 text-brand-red" />
                <span className="font-bold">{article.author}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-brand-red" />
                <span>{formatDate(article.publishedAt)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Main Content */}
        <article className="lg:col-span-8 space-y-8">
          {/* AI Features Trigger */}
          <div className="p-6 rounded-2xl bg-linear-to-br from-brand-red/10 to-brand-blue/10 border border-brand-red/20 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-brand-red rounded-xl flex items-center justify-center animate-pulse">
                <Sparkles className="text-white w-6 h-6" />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg">AI Assistant</h3>
                <p className="text-sm text-gray-500">Generate an instant summary or ask questions about this story.</p>
              </div>
            </div>
            <div className="flex space-x-3 w-full md:w-auto">
              <button 
                onClick={handleGenerateSummary}
                disabled={isSummarizing}
                className="flex-1 md:flex-none inline-flex items-center justify-center bg-brand-dark text-white font-bold px-6 py-3 rounded-xl hover:scale-105 active:scale-95 transition-all text-sm"
              >
                {isSummarizing ? 'Summarizing...' : 'AI Summary'}
              </button>
              <button 
                onClick={() => setIsChatOpen(true)}
                className="flex-1 md:flex-none inline-flex items-center justify-center bg-white border border-gray-200 dark:bg-gray-800 dark:border-white/10 font-bold px-6 py-3 rounded-xl hover:scale-105 active:scale-95 transition-all text-sm"
              >
                Ask AI
              </button>
            </div>
          </div>

          {/* AI Summary Section */}
          <AnimatePresence>
            {showAiSummary && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="bg-gray-50 dark:bg-white/5 rounded-2xl p-8 border-l-4 border-brand-red"
              >
                <div className="flex items-center space-x-2 text-brand-red mb-4">
                  <Sparkles className="w-5 h-5" />
                  <span className="font-bold text-sm uppercase tracking-widest">AI Generated Summary</span>
                </div>
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  <ReactMarkdown>{aiSummary}</ReactMarkdown>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Article Text */}
          <div className="prose prose-lg dark:prose-invert max-w-none leading-relaxed text-gray-700 dark:text-gray-300">
            <p className="text-xl font-medium text-brand-dark dark:text-white first-letter:text-5xl first-letter:font-bold first-letter:mr-3 first-letter:float-left">
              {article.excerpt}
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>
            <h3>The Technological Leap</h3>
            <p>
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.
            </p>
            <blockquote className="border-l-4 border-brand-red pl-6 italic text-2xl font-display text-brand-dark dark:text-white my-8">
              "The future of journalism isn't just about reporting events; it's about contextualizing them in real-time through the lens of human interest and AI precision."
            </blockquote>
            <p>
              Similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus.
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 py-8 border-t border-gray-100 dark:border-white/10">
            {article.tags.map(tag => (
              <span key={tag} className="bg-gray-100 dark:bg-white/5 px-4 py-2 rounded-full text-xs font-bold hover:bg-brand-red hover:text-white transition-colors cursor-pointer">
                #{tag}
              </span>
            ))}
          </div>

          {/* Share Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between p-8 rounded-2xl bg-gray-50 dark:bg-white/5 gap-6">
            <h4 className="font-display font-bold text-xl">Love this story? Share it with friends</h4>
            <div className="flex items-center space-x-4">
              <button className="w-12 h-12 flex items-center justify-center rounded-full bg-[#1877F2] text-white hover:scale-110 transition-transform shadow-lg"><Facebook className="w-5 h-5" /></button>
              <button className="w-12 h-12 flex items-center justify-center rounded-full bg-[#1DA1F2] text-white hover:scale-110 transition-transform shadow-lg"><Twitter className="w-5 h-5" /></button>
              <button className="w-12 h-12 flex items-center justify-center rounded-full bg-[#0A66C2] text-white hover:scale-110 transition-transform shadow-lg"><Linkedin className="w-5 h-5" /></button>
              <button className="w-12 h-12 flex items-center justify-center rounded-full bg-brand-red text-white hover:scale-110 transition-transform shadow-lg"><Share2 className="w-5 h-5" /></button>
            </div>
          </div>
        </article>

        {/* Sidebar */}
        <aside className="lg:col-span-4 space-y-12">
          {/* Related Stories */}
          <div className="sticky top-28 space-y-8">
            <div>
              <h2 className="font-display font-bold text-2xl mb-6 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-brand-red" /> Latest Tech
              </h2>
              <div className="space-y-6">
                {relatedArticles.map((a) => (
                  <NewsCard key={a.id} article={a} variant="minimal" />
                ))}
              </div>
            </div>

            {/* Newsletter Sidebox */}
            <div className="bg-brand-dark rounded-2xl p-8 text-white space-y-4">
              <h3 className="font-display font-bold text-xl leading-tight">Get curated news in your inbox</h3>
              <p className="text-gray-400 text-sm">No spam. Only the stories that matter to you.</p>
              <input 
                type="email" 
                placeholder="email@example.com"
                className="w-full bg-white/10 border border-white/20 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-1 focus:ring-brand-red"
              />
              <button className="w-full bg-brand-red text-white font-bold py-3 rounded-xl hover:bg-rose-700 transition-colors shadow-lg">SUBSCRIBE</button>
            </div>
          </div>
        </aside>
      </div>

      {/* AI Chat Drawer Overlay */}
      <AnimatePresence>
        {isChatOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsChatOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-white dark:bg-brand-dark z-[70] shadow-2xl flex flex-col"
            >
              <div className="p-6 border-b border-gray-100 dark:border-white/10 flex items-center justify-between bg-brand-red text-white">
                <div className="flex items-center space-x-3">
                  <Sparkles className="w-5 h-5" />
                  <span className="font-display font-bold">MihirSync AI Assistant</span>
                </div>
                <button onClick={() => setIsChatOpen(false)} className="hover:rotate-90 transition-transform">
                  <ArrowLeft className="w-6 h-6" />
                </button>
              </div>
              
              <div className="flex-grow p-6 overflow-y-auto space-y-6">
                <div className="bg-gray-100 dark:bg-white/5 p-4 rounded-2xl rounded-tl-none max-w-[85%]">
                  <p className="text-sm">Hello! I'm your AI news assistant. You can ask me anything about "<strong>{article.title}</strong>". How can I help you today?</p>
                </div>
                
                {chatHistory.map((msg, i) => (
                  <div 
                    key={i} 
                    className={cn(
                      "p-4 rounded-2xl max-w-[85%] text-sm",
                      msg.role === 'user' 
                        ? "bg-brand-red text-white ml-auto rounded-tr-none" 
                        : "bg-gray-100 dark:bg-white/5 rounded-tl-none"
                    )}
                  >
                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                  </div>
                ))}
                
                {isChatLoading && (
                  <div className="flex space-x-2 p-4 bg-gray-100 dark:bg-white/5 rounded-2xl rounded-tl-none w-16">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                )}
              </div>

              <div className="p-6 border-t border-gray-100 dark:border-white/10">
                <form onSubmit={handleSendMessage} className="relative">
                  <input 
                    type="text" 
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    placeholder="Ask a question..."
                    disabled={isChatLoading}
                    className="w-full bg-gray-100 dark:bg-white/5 border-none rounded-2xl py-4 pl-6 pr-12 text-sm focus:ring-2 focus:ring-brand-red transition-all disabled:opacity-50"
                  />
                  <button 
                    type="submit"
                    disabled={isChatLoading || !chatMessage.trim()}
                    className="absolute right-2 top-2 p-2 bg-brand-red text-white rounded-xl hover:scale-110 active:scale-95 transition-all shadow-md disabled:opacity-50 disabled:scale-100"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
