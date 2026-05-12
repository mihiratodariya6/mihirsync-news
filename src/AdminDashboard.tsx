import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  Settings, 
  BarChart3, 
  Plus, 
  Search, 
  MoreVertical,
  Edit,
  Trash2,
  ExternalLink,
  Users,
  AlertCircle,
  Database,
  Loader2,
  CheckCircle2,
  ArrowLeft,
  TrendingUp,
  Filter,
  ChevronDown,
  Lock,
  Zap
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { mockArticles } from './mockData';
import { cn, formatDate } from './lib/utils';
import { useFirebase } from './components/FirebaseProvider';
import { db } from './lib/firebase';
import { collection, addDoc, serverTimestamp, getDocs, query, limit, orderBy, onSnapshot } from 'firebase/firestore';
import { NewsArticle } from './types';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('articles');
  const { user, isAdmin, loading: authLoading, loginWithGoogle, logout } = useFirebase();
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [dbLoading, setDbLoading] = useState(true);
  const [isSeeding, setIsSeeding] = useState(false);
  const [seedSuccess, setSeedSuccess] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: 'Technology',
    image: '',
    content: '',
    excerpt: '',
    author: '',
    isTrending: false,
    isBreaking: false,
    readTime: '5 min',
    tags: ['news', 'sync']
  });

  useEffect(() => {
    if (!isAdmin) return;
    
    const q = query(collection(db, 'articles'), orderBy('publishedAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetched = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as NewsArticle));
      setArticles(fetched);
      setDbLoading(false);
    }, (error) => {
      console.error("Firestore error:", error);
      setArticles(mockArticles as any);
      setDbLoading(false);
    });

    return () => unsubscribe();
  }, [isAdmin]);

  if (authLoading) return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="w-12 h-12 text-brand-red animate-spin" />
    </div>
  );

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-brand-dark flex items-center justify-center p-4 pt-[72px]">
        <div className="bg-white dark:bg-gray-900 w-full max-w-md rounded-2xl shadow-2xl p-8 text-center space-y-6">
          <div className="w-16 h-16 bg-brand-red/10 rounded-full flex items-center justify-center mx-auto">
            <Lock className="w-8 h-8 text-brand-red" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold font-display">Admin Portal</h1>
            <p className="text-gray-500 text-sm">Please log in with an authorized account to access the news terminal.</p>
          </div>
          
          {user ? (
            <div className="space-y-6 text-left">
              <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg text-red-600 text-[10px] font-bold uppercase tracking-wider text-center">
                Access Denied: ({user.email}) is not an admin.
              </div>
              
              <div className="bg-gray-50 dark:bg-white/5 p-4 rounded-xl space-y-3">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest text-center">Admin Access Auto-Detection</p>
                <p className="text-[10px] text-gray-500 text-center italic">
                  I've implemented a direct bypass for <strong>{user.email}</strong>. 
                  If you are still seeing this, please ensure you are logged in with that exact account.
                </p>
                <div className="h-px bg-gray-200 dark:bg-white/10 my-2" />
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Manual Setup (Alternative):</p>
                <ol className="text-xs text-gray-500 space-y-2 list-decimal ml-4">
                  <li>Go to your <a href="https://console.firebase.google.com/" target="_blank" rel="noreferrer" className="text-brand-red underline">Firebase Console</a>.</li>
                  <li>Open <strong>Firestore Database</strong>.</li>
                  <li>Ensure you have selected the database ID: <code className="bg-gray-200 dark:bg-white/10 px-1 rounded">ai-studio-cabd326a-834a-4e5a-99a9-f42e3e5ed7d0</code>.</li>
                  <li>Create a collection named <code className="bg-gray-200 dark:bg-white/10 px-1 rounded">admins</code>.</li>
                  <li>Create a document with ID: <code className="bg-brand-red/10 text-brand-red px-1 rounded font-mono select-all">{user.uid}</code></li>
                  <li>Add a field: <code className="font-mono">email</code> (string) with value <code className="font-mono">{user.email}</code>.</li>
                </ol>
              </div>

              <button 
                onClick={() => logout()}
                className="w-full py-3 px-6 rounded-xl border border-gray-200 dark:border-white/10 font-bold text-sm hover:bg-gray-50 dark:hover:bg-white/5 transition-all"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <button 
              onClick={() => loginWithGoogle()}
              className="w-full bg-brand-red text-white font-bold py-4 rounded-xl flex items-center justify-center hover:scale-105 transition-transform shadow-lg"
            >
              <Zap className="w-5 h-5 mr-2" /> SIGN IN WITH GOOGLE
            </button>
          )}

          <Link to="/" className="inline-block text-gray-400 hover:text-brand-red text-xs font-bold transition-colors">
            ← RETURN TO WEBSITE
          </Link>
        </div>
      </div>
    );
  }

  if (dbLoading) return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="w-12 h-12 text-brand-red animate-spin" />
    </div>
  );

  const handleCreateArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const slug = formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      await addDoc(collection(db, 'articles'), {
        ...formData,
        slug,
        author: formData.author || 'Admin',
        publishedAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        views: 0,
      });
      setIsModalOpen(false);
      setFormData({
        title: '',
        category: 'Technology',
        image: '',
        content: '',
        excerpt: '',
        author: '',
        isTrending: false,
        isBreaking: false,
        readTime: '5 min',
        tags: ['news', 'sync']
      });
      alert('Article created successfully!');
    } catch (error) {
      console.error('Error adding document: ', error);
      alert('Failed to create article.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSeedData = async () => {
    setIsSeeding(true);
    try {
      const q = query(collection(db, 'articles'), limit(1));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        alert("Articles already exist in database!");
        setIsSeeding(false);
        return;
      }

      for (const article of mockArticles) {
        const { id, ...data } = article;
        await addDoc(collection(db, 'articles'), {
          ...data,
          publishedAt: serverTimestamp(),
          views: Math.floor(Math.random() * 5000)
        });
      }
      setSeedSuccess(true);
      setTimeout(() => setSeedSuccess(false), 3000);
    } catch (error) {
      console.error("Seeding failed:", error);
      alert("Failed to seed data. Check console.");
    } finally {
      setIsSeeding(false);
    }
  };

  const renderArticles = () => (
    <>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-3xl font-display font-extrabold">Article Management</h1>
          <p className="text-gray-500 text-sm mt-1">Manage, edit and publish your news stories.</p>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={handleSeedData}
            disabled={isSeeding}
            className={cn(
              "bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-xs font-bold px-4 py-3 rounded-xl flex items-center hover:scale-105 transition-transform shadow-lg disabled:opacity-50",
              seedSuccess && "text-green-500 border-green-500"
            )}
          >
            {isSeeding ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : seedSuccess ? <CheckCircle2 className="w-4 h-4 mr-2" /> : <Database className="w-4 h-4 mr-2" />}
            {seedSuccess ? "DATA SEEDED" : "SEED INITIAL DATA"}
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-brand-red text-white font-bold px-6 py-3 rounded-xl flex items-center hover:scale-105 transition-transform shadow-lg"
          >
            <Plus className="w-5 h-5 mr-2" /> CREATE NEW ARTICLE
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl overflow-hidden shadow-xs">
        <div className="p-6 border-b border-gray-200 dark:border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search articles..."
              className="bg-gray-50 dark:bg-brand-dark border-none rounded-xl py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-brand-red w-full md:w-64"
            />
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
          </div>
          <div className="flex items-center space-x-2">
            <select className="bg-gray-50 dark:bg-brand-dark border-none rounded-xl py-2 px-4 text-sm focus:ring-2 focus:ring-brand-red">
              <option>All Categories</option>
              <option>Technology</option>
              <option>World</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 dark:bg-white/5 text-gray-500 text-[10px] uppercase font-bold tracking-widest">
              <tr>
                <th className="px-6 py-4">Article</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-center">Views</th>
                <th className="px-6 py-4 text-center">Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-white/5">
              {articles.map((article) => (
                <tr key={article.id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-4">
                      <img src={article.image} className="w-12 h-12 rounded-lg object-cover" alt="" />
                      <div>
                        <p className="font-bold text-sm line-clamp-1">{article.title}</p>
                        <p className="text-xs text-gray-500">{article.category}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="bg-green-500/10 text-green-500 text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider">Published</span>
                  </td>
                  <td className="px-6 py-4 text-center text-sm font-bold">
                    {Math.round(article.views / 100) / 10}K
                  </td>
                  <td className="px-6 py-4 text-center text-xs text-gray-500">
                    {formatDate(article.publishedAt)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="p-2 hover:bg-brand-red/10 hover:text-brand-red rounded-lg transition-colors"><Edit className="w-4 h-4" /></button>
                      <button className="p-2 hover:bg-rose-500/10 hover:text-rose-500 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                      <button className="p-2 hover:bg-gray-200 dark:hover:bg-white/10 rounded-lg transition-colors"><ExternalLink className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-6 border-t border-gray-200 dark:border-white/10 flex items-center justify-between text-xs text-gray-500">
          <p>Showing 1 to {articles.length} of {articles.length} entries</p>
          <div className="flex space-x-2">
            <button className="px-3 py-1 bg-gray-100 dark:bg-white/5 rounded-md hover:bg-gray-200 transition-colors">Prev</button>
            <button className="px-3 py-1 bg-brand-red text-white rounded-md">1</button>
            <button className="px-3 py-1 bg-gray-100 dark:bg-white/5 rounded-md hover:bg-gray-200 transition-colors">Next</button>
          </div>
        </div>
      </div>
    </>
  );

  const renderOverview = () => (
    <>
      <div className="mb-12">
        <h1 className="text-3xl font-display font-extrabold">Dashboard Overview</h1>
        <p className="text-gray-500 text-sm mt-1">Platform-wide performance and key metrics.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {[
          { label: 'Total Articles', value: articles.length.toLocaleString(), trend: '+12%', icon: FileText },
          { label: 'Avg. Views', value: '45.2K', trend: '+8.4%', icon: BarChart3 },
          { label: 'Reach', value: '2.4M', trend: '+24%', icon: TrendingUp },
          { label: 'Subscribers', value: '542K', trend: '+5.2%', icon: Users },
        ].map((stat, i) => (
          <div key={i} className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 p-6 rounded-2xl shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-brand-red/10 text-brand-red rounded-xl">
                <stat.icon className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-green-500 bg-green-500/10 px-2 py-1 rounded-sm">{stat.trend}</span>
            </div>
            <h3 className="text-gray-500 text-sm font-medium">{stat.label}</h3>
            <p className="text-3xl font-display font-bold mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-6">
          <h2 className="text-lg font-bold mb-6">Traffic Analysis</h2>
          <div className="h-64 flex items-end justify-between space-x-2">
            {[40, 70, 45, 90, 65, 80, 50, 95, 75, 85, 60, 100].map((h, i) => (
              <div key={i} className="flex-1 space-y-2">
                <div 
                  className="bg-brand-red rounded-t-lg transition-all hover:bg-brand-red/80 cursor-pointer" 
                  style={{ height: `${h}%` }}
                />
                <p className="text-[10px] text-gray-400 text-center uppercase">{['J','F','M','A','M','J','J','A','S','O','N','D'][i]}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-6">
          <h2 className="text-lg font-bold mb-6">Content Distribution</h2>
          <div className="space-y-4">
            {[
              { label: 'Technology', val: 45, color: '#FF3B30' },
              { label: 'Business', val: 25, color: '#34C759' },
              { label: 'World', val: 15, color: '#007AFF' },
              { label: 'Other', val: 15, color: '#FF9500' },
            ].map((cat, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between text-xs font-bold">
                  <span>{cat.label}</span>
                  <span>{cat.val}%</span>
                </div>
                <div className="h-2 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${cat.val}%`, backgroundColor: cat.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );

  const renderAnalytics = () => (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-display font-extrabold">Analytics Terminal</h1>
        <p className="text-gray-500 text-sm mt-1">Deep dive into reader behavior and engagement.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Real-time Readers', value: '1,492', sub: 'Last 30 mins', icon: Zap },
          { label: 'Avg. Retention', value: '4m 32s', sub: '+12s vs last week', icon: Loader2 },
          { label: 'Bounce Rate', value: '24.2%', sub: '-2.4% optimized', icon: TrendingUp },
        ].map((item, i) => (
          <div key={i} className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-brand-red/10 text-brand-red rounded-lg">
                <item.icon className="w-5 h-5" />
              </div>
            </div>
            <h3 className="text-gray-500 text-xs font-bold uppercase tracking-widest">{item.label}</h3>
            <p className="text-3xl font-display font-bold mt-2">{item.value}</p>
            <p className="text-[10px] text-green-500 font-bold mt-2">{item.sub}</p>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-8">
        <h2 className="text-xl font-bold mb-8">Performance Heatmap</h2>
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: 49 }).map((_, i) => (
            <div 
              key={i} 
              className="aspect-square rounded-sm transition-all hover:scale-110 cursor-pointer"
              style={{ backgroundColor: `rgba(255, 59, 48, ${Math.random()})` }}
              title={`Engagement Score: ${Math.floor(Math.random() * 100)}`}
            />
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between text-[10px] text-gray-500 font-bold uppercase tracking-widest">
          <span>Less Engagement</span>
          <span>More Engagement</span>
        </div>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="space-y-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-extrabold">User Directory</h1>
          <p className="text-gray-500 text-sm mt-1">Manage platform contributors and subscribers.</p>
        </div>
        <button className="bg-black dark:bg-white dark:text-black font-bold px-6 py-3 rounded-xl flex items-center hover:scale-105 transition-transform shadow-lg">
          <Plus className="w-5 h-5 mr-2" /> INVITE CONTRIBUTOR
        </button>
      </div>

      <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 dark:bg-white/5 text-gray-500 text-[10px] uppercase font-bold tracking-widest">
            <tr>
              <th className="px-6 py-4">User</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Subscription</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-white/5">
            {[
              { name: 'Mihir Atodariya', email: 'mihiratodariya6@gmail.com', role: 'Admin', sub: 'Enterprise', img: 'https://github.com/shadcn.png' },
              { name: 'Sarah Wilson', email: 'sarah@example.com', role: 'Editor', sub: 'Pro', img: 'https://i.pravatar.cc/150?u=sarah' },
              { name: 'James Chen', email: 'james@example.com', role: 'Contributor', sub: 'Free', img: 'https://i.pravatar.cc/150?u=james' },
            ].map((u, i) => (
              <tr key={i} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <img src={u.img} className="w-10 h-10 rounded-full border-2 border-brand-red/20" alt="" />
                    <div>
                      <p className="font-bold text-sm tracking-tight">{u.name}</p>
                      <p className="text-xs text-gray-500">{u.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm font-medium">{u.role}</td>
                <td className="px-6 py-4">
                  <span className={cn(
                    "text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider",
                    u.sub === 'Enterprise' ? "bg-purple-500/10 text-purple-500" : u.sub === 'Pro' ? "bg-brand-red/10 text-brand-red" : "bg-gray-500/10 text-gray-500"
                  )}>{u.sub}</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-gray-400 hover:text-brand-red transition-colors">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-brand-dark pt-[72px]">
      {/* Sidebar */}
      <aside className="w-64 border-r border-gray-200 dark:border-white/10 hidden lg:flex flex-col p-6 space-y-6">
        <div className="space-y-1">
          <button 
            onClick={() => setActiveTab('overview')}
            className={cn(
              "w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-sm font-bold transition-all",
              activeTab === 'overview' ? "bg-brand-red text-white shadow-lg" : "text-gray-500 hover:bg-gray-100 dark:hover:bg-white/5"
            )}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span>Overview</span>
          </button>
          <button 
            onClick={() => setActiveTab('articles')}
            className={cn(
              "w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-sm font-bold transition-all",
              activeTab === 'articles' ? "bg-brand-red text-white shadow-lg" : "text-gray-500 hover:bg-gray-100 dark:hover:bg-white/5"
            )}
          >
            <FileText className="w-5 h-5" />
            <span>Articles</span>
          </button>
          <button 
            onClick={() => setActiveTab('analytics')}
            className={cn(
              "w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-sm font-bold transition-all",
              activeTab === 'analytics' ? "bg-brand-red text-white shadow-lg" : "text-gray-500 hover:bg-gray-100 dark:hover:bg-white/5"
            )}
          >
            <BarChart3 className="w-5 h-5" />
            <span>Analytics</span>
          </button>
          <button 
            onClick={() => setActiveTab('users')}
            className={cn(
              "w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-sm font-bold transition-all",
              activeTab === 'users' ? "bg-brand-red text-white shadow-lg" : "text-gray-500 hover:bg-gray-100 dark:hover:bg-white/5"
            )}
          >
            <Users className="w-5 h-5" />
            <span>Users</span>
          </button>
        </div>
        
        <div className="mt-auto space-y-2 pt-6 border-t border-gray-200 dark:border-white/10">
          <Link to="/" className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-sm font-bold text-gray-500 hover:bg-gray-100 dark:hover:bg-white/5 transition-all">
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Site</span>
          </Link>
          <button className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-sm font-bold text-gray-500 hover:bg-gray-100 dark:hover:bg-white/5 transition-all">
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow overflow-y-auto p-8">
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'articles' && renderArticles()}
        {activeTab === 'analytics' && renderAnalytics()}
        {activeTab === 'users' && renderUsers()}

        {/* Create Article Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white dark:bg-brand-dark w-full max-w-2xl rounded-2xl p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold font-display">Create New Article</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-brand-red transition-colors">
                  <MoreVertical className="w-6 h-6 rotate-45" />
                </button>
              </div>

              <form onSubmit={handleCreateArticle} className="space-y-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Title</label>
                      <input 
                        type="text" 
                        required
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                        className="w-full bg-gray-50 dark:bg-white/5 border-none rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-brand-red"
                        placeholder="Article Headline"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Category</label>
                      <select 
                        value={formData.category}
                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                        className="w-full bg-gray-50 dark:bg-white/5 border-none rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-brand-red"
                      >
                        <option>Technology</option>
                        <option>India</option>
                        <option>World</option>
                        <option>Business</option>
                        <option>Sports</option>
                        <option>Entertainment</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Image URL</label>
                    <input 
                      type="url" 
                      required
                      value={formData.image}
                      onChange={(e) => setFormData({...formData, image: e.target.value})}
                      className="w-full bg-gray-50 dark:bg-white/5 border-none rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-brand-red"
                      placeholder="https://images.unsplash.com/..."
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Excerpt</label>
                    <textarea 
                      required
                      value={formData.excerpt}
                      onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                      className="w-full bg-gray-50 dark:bg-white/5 border-none rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-brand-red min-h-[80px]"
                      placeholder="Short summary for preview..."
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Content (Markdown)</label>
                    <textarea 
                      required
                      value={formData.content}
                      onChange={(e) => setFormData({...formData, content: e.target.value})}
                      className="w-full bg-gray-50 dark:bg-white/5 border-none rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-brand-red min-h-[200px]"
                      placeholder="Full article body..."
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Author</label>
                      <input 
                        type="text" 
                        value={formData.author}
                        onChange={(e) => setFormData({...formData, author: e.target.value})}
                        className="w-full bg-gray-50 dark:bg-white/5 border-none rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-brand-red"
                        placeholder="Mihir Atodariya"
                      />
                    </div>
                    <div className="flex items-center gap-6 pt-6">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={formData.isTrending}
                          onChange={(e) => setFormData({...formData, isTrending: e.target.checked})}
                          className="w-4 h-4 text-brand-red rounded border-gray-300 focus:ring-brand-red"
                        />
                        <span className="text-sm font-bold text-gray-500">Trending</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={formData.isBreaking}
                          onChange={(e) => setFormData({...formData, isBreaking: e.target.checked})}
                          className="w-4 h-4 text-brand-red rounded border-gray-300 focus:ring-brand-red"
                        />
                        <span className="text-sm font-bold text-gray-500">Breaking</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button 
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 py-3 px-6 rounded-xl border border-gray-200 dark:border-white/10 font-bold text-sm hover:bg-gray-50 dark:hover:bg-white/5 transition-all"
                  >
                    CANCEL
                  </button>
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 py-3 px-6 rounded-xl bg-brand-red text-white font-bold text-sm hover:scale-105 transition-all shadow-lg flex items-center justify-center disabled:opacity-50"
                  >
                    {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'PUBLISH ARTICLE'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
