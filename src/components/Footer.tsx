import { Link } from 'react-router-dom';
import { 
  Zap, 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube, 
  Linkedin,
  Mail,
  ArrowRight
} from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-dark text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand info */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center">
              <span className="font-display text-2xl font-bold tracking-tight text-white">
                Mihir<span className="text-brand-red">Sync</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              MihirSync is your premier destination for global news, powered by AI and delivered at lightning speed. We bridge the gap between events and your awareness.
            </p>
            <div className="flex items-center space-x-4">
              <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-brand-red transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-brand-red transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-brand-red transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-brand-red transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="font-display font-semibold text-lg">Categories</h4>
            <ul className="grid grid-cols-2 gap-3 text-sm text-gray-400">
              <li><Link to="/category/india" className="hover:text-white transition-colors">India</Link></li>
              <li><Link to="/category/world" className="hover:text-white transition-colors">World</Link></li>
              <li><Link to="/category/technology" className="hover:text-white transition-colors">Technology</Link></li>
              <li><Link to="/category/ai" className="hover:text-white transition-colors">AI</Link></li>
              <li><Link to="/category/business" className="hover:text-white transition-colors">Business</Link></li>
              <li><Link to="/category/finance" className="hover:text-white transition-colors">Finance</Link></li>
              <li><Link to="/category/sports" className="hover:text-white transition-colors">Sports</Link></li>
              <li><Link to="/category/startups" className="hover:text-white transition-colors">Startups</Link></li>
            </ul>
          </div>

          {/* Useful Links */}
          <div className="space-y-6">
            <h4 className="font-display font-semibold text-lg">Company</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link to="/about-us" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link to="/careers" className="hover:text-white transition-colors">Careers</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link to="/advertise" className="hover:text-white transition-colors">Advertise</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-6">
            <h4 className="font-display font-semibold text-lg">Newsletter</h4>
            <p className="text-gray-400 text-sm">
              Get the most important stories delivered to your inbox every morning.
            </p>
            <form className="relative">
              <input
                type="email"
                placeholder="email@example.com"
                className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-sm focus:outline-none focus:ring-1 focus:ring-brand-red pr-12 transition-all"
              />
              <button className="absolute right-1 top-1 h-8 w-10 bg-brand-red rounded-md flex items-center justify-center hover:bg-rose-700 transition-colors">
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 space-y-4 md:space-y-0">
          <p>© {currentYear} MihirSync Media Group. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <span>Powered by Gemini AI</span>
            <span>Made with ❤️ for Global Readers</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
