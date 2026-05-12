import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, 
  Menu, 
  X, 
  Moon, 
  Sun, 
  Bell, 
  TrendingUp, 
  Zap, 
  Mic,
  LogOut,
  User as UserIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';
import { useFirebase } from './FirebaseProvider';

export default function Navbar() {
  const { user, loginWithGoogle, logout } = useFirebase();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const categories = [
    'India', 'World', 'Technology', 'AI', 'Business', 'Finance', 'Sports', 'Entertainment'
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  return (
    <>
      <nav className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled ? "glass shadow-lg py-2" : "bg-white dark:bg-brand-dark py-4"
      )}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <span className="font-display text-2xl font-bold tracking-tight">
                Mihir<span className="text-brand-red">Sync</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-6">
              {categories.slice(0, 5).map((category) => (
                <Link 
                  key={category} 
                  to={`/category/${category.toLowerCase()}`}
                  className="text-sm font-medium hover:text-brand-red transition-colors"
                >
                  {category}
                </Link>
              ))}
            </div>

            {/* Search and Actions */}
            <div className="flex items-center space-x-4">
              <form onSubmit={handleSearch} className="relative hidden md:block">
                <input
                  type="text"
                  placeholder="Search news..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-gray-100 dark:bg-gray-800 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-red w-48 lg:w-64 transition-all"
                />
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                <button type="button" className="absolute right-3 top-2.5">
                  <Mic className="w-4 h-4 text-gray-400 hover:text-brand-red transition-colors" />
                </button>
              </form>

              <div className="flex items-center space-x-1 sm:space-x-2">
                <button 
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  {isDarkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5" />}
                </button>
                <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors hidden sm:block">
                   <Bell className="w-5 h-5" />
                 </button>


                <button 
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="lg:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Breaking News Ticker (Secondary bar) */}
        <div className="bg-brand-dark/5 dark:bg-white/5 py-1.5 border-b border-gray-100 dark:border-white/5 relative">
          <div className="max-w-7xl mx-auto px-4 flex items-center relative gap-2">
            <div className="relative z-20 flex items-center bg-brand-red text-white text-[10px] font-bold px-3 py-1.5 rounded-sm uppercase tracking-wider shrink-0 shadow-lg">
              Breaking
            </div>
            
            <div className="flex-grow overflow-hidden relative z-10">
              {/* Fade gradient to prevent sudden text appearance */}
              <div className="absolute left-0 top-0 bottom-0 w-8 bg-linear-to-r from-gray-50/50 dark:from-brand-dark/50 to-transparent z-20 pointer-events-none md:block hidden" />
              
              <div className="flex animate-marquee whitespace-nowrap pl-4">
                <span className="text-xs font-medium mr-12 text-gray-700 dark:text-gray-300 transition-colors">• AI Revolution: MihirSync launches global news automation engine</span>
                <span className="text-xs font-medium mr-12 text-gray-700 dark:text-gray-300 transition-colors">• Global Markets: Tech stocks rally as inflation cools down</span>
                <span className="text-xs font-medium mr-12 text-gray-700 dark:text-gray-300 transition-colors">• Space: NASA discovers potential water sources on Mars moon</span>
                <span className="text-xs font-medium mr-12 text-gray-700 dark:text-gray-300 transition-colors">• AI Revolution: MihirSync launches global news automation engine</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass fixed w-full z-40 top-[72px]"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {categories.map((category) => (
                <Link
                  key={category}
                  to={`/category/${category.toLowerCase()}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-2 text-base font-medium border-b border-gray-100 dark:border-gray-800"
                >
                  {category}
                </Link>
              ))}
              <div className="pt-4">
                <form onSubmit={handleSearch} className="relative">
                  <input
                    type="text"
                    placeholder="Search news..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-gray-100 dark:bg-gray-800 rounded-lg py-3 pl-12 pr-4 focus:outline-none"
                  />
                  <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                </form>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}} />
    </>
  );
}
