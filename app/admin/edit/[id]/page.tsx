'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { db } from '../../../../lib/firebase';
import { doc, getDoc, updateDoc, collection, getDocs, serverTimestamp } from 'firebase/firestore';
import { Sparkles, Save, Eye, Image as ImageIcon, CheckSquare, ArrowLeft, LayoutTemplate, BarChart2 } from 'lucide-react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });

export default function EditPostPage() {
  const params = useParams();
  const router = useRouter();
  const postId = params.id as string;

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [message, setMessage] = useState('');
  
  // 🚀 FIX: હવે ડિફોલ્ટ 'gu' (ગુજરાતી) ટેબ જ ખુલશે!
  const [activeLangTab, setActiveLangTab] = useState<'en' | 'gu' | 'hi'>('gu');

  const [dbCategories, setDbCategories] = useState<any[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState('');

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedCategorySlugs, setSelectedCategorySlugs] = useState<string[]>([]);

  const [postMeta, setPostMeta] = useState({
    author: 'Mihir Editorial',
    seoTitle: '',
    seoDescription: '',
    featuredImage: '' 
  });

  const [placement, setPlacement] = useState({ showOnHome: true, isFeatured: false, isTrending: false });
  const [stats, setStats] = useState({ views: 0, likes: 0, shares: 0 });

  const [translations, setTranslations] = useState({
    en: { title: '', shortDescription: '', content: '' },
    gu: { title: '', shortDescription: '', content: '' },
    hi: { title: '', shortDescription: '', content: '' }
  });

  const editorConfig = useMemo(() => ({
    readonly: false,
    height: 450,
    placeholder: 'અહીં તમારી ન્યૂઝ લખો (Bold, Italic, Color, Table વગેરે વાપરીને)...',
    style: { background: '#f8fafc', borderRadius: '0.5rem' },
    buttons: [
      'bold', 'italic', 'underline', 'strikethrough', '|',
      'ul', 'ol', '|',
      'font', 'fontsize', 'brush', 'paragraph', '|',
      'image', 'table', 'link', '|',
      'align', 'undo', 'redo', '|',
      'hr', 'eraser', 'fullsize'
    ]
  }), []);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const catSnap = await getDocs(collection(db, 'categories'));
        const catsData = catSnap.docs.map(d => ({ id: d.id, ...d.data() }));
        setDbCategories(catsData);

        const docRef = doc(db, 'articles', postId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setPostMeta({
            author: data.author || 'Mihir Editorial',
            seoTitle: data.seoTitle || '',
            seoDescription: data.seoDescription || '',
            featuredImage: data.featuredImage || ''
          });
          setImagePreview(data.featuredImage || '');
          setPlacement(data.placement || { showOnHome: true, isFeatured: false, isTrending: false });
          setStats(data.stats || { views: 0, likes: 0, shares: 0 });
          
          if (data.categories && data.categorySlugs) {
            setSelectedCategories(data.categories);
            setSelectedCategorySlugs(data.categorySlugs);
          } else if (data.category) {
            setSelectedCategories([data.category]);
            setSelectedCategorySlugs([data.categorySlug]);
          }

          if (data.translations) {
            setTranslations({
              en: data.translations.en || { title: '', shortDescription: '', content: '' },
              gu: data.translations.gu || { title: '', shortDescription: '', content: '' },
              hi: data.translations.hi || { title: '', shortDescription: '', content: '' },
            });
          }
        }
      } catch (error) {
        console.error("Error loading post:", error);
      } finally {
        setFetching(false);
      }
    };
    fetchInitialData();
  }, [postId]);

  const handleCategoryToggle = (catName: string, catSlug: string) => {
    if (selectedCategories.includes(catName)) {
      setSelectedCategories(selectedCategories.filter(c => c !== catName));
      setSelectedCategorySlugs(selectedCategorySlugs.filter(s => s !== catSlug));
    } else {
      setSelectedCategories([...selectedCategories, catName]);
      setSelectedCategorySlugs([...selectedCategorySlugs, catSlug]);
    }
  };

  const handleContentChange = (lang: 'en' | 'gu' | 'hi', field: string, value: string) => {
    setTranslations(prev => ({ ...prev, [lang]: { ...prev[lang], [field]: value } }));
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedCategories.length === 0) return alert("કૃપા કરીને ઓછામાં ઓછી એક કેટેગરી સિલેક્ટ કરો.");
    
    setLoading(true);
    setMessage('🔄 અપડેટ થઈ રહ્યું છે...');

    try {
      let finalImageUrl = postMeta.featuredImage;

      if (imageFile) {
        const formData = new FormData();
        formData.append('image', imageFile);
        const IMGBB_API_KEY = "અહીં_તારો_IMGBB_API_KEY_પેસ્ટ_કર"; // 👈 API KEY નાખજે
        const imgRes = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, { method: 'POST', body: formData });
        const imgData = await imgRes.json();
        if (imgData.success) finalImageUrl = imgData.data.url;
      }

      await updateDoc(doc(db, 'articles', postId), {
        categories: selectedCategories,
        categorySlugs: selectedCategorySlugs,
        category: selectedCategories[0] || '', 
        categorySlug: selectedCategorySlugs[0] || '',
        seoTitle: postMeta.seoTitle,
        seoDescription: postMeta.seoDescription,
        featuredImage: finalImageUrl,
        placement: placement,
        stats: stats,
        translations: translations,
        updatedAt: serverTimestamp() 
      });

      setMessage('✅ ન્યૂઝ સફળતાપૂર્વક અપડેટ થઈ ગઈ!');
      setTimeout(() => { router.push('/admin/posts'); }, 1500);

    } catch (error) {
      console.error(error);
      setMessage('❌ એરર: ' + (error as Error).message);
      setLoading(false);
    }
  };

  if (fetching) return <div className="h-full flex items-center justify-center font-bold text-slate-500">Loading Post Data...</div>;

  return (
    <div className="h-full flex flex-col bg-slate-50 overflow-hidden">
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center shrink-0 z-10 shadow-sm">
        <div className="flex items-center gap-4">
          <Link href="/admin/posts" className="p-2 hover:bg-slate-100 rounded-full transition"><ArrowLeft size={20}/></Link>
          <h1 className="text-xl font-black text-slate-800 tracking-tight flex items-center gap-2"><LayoutTemplate size={20} className="text-blue-600"/> Edit Post</h1>
        </div>
        <div className="flex gap-4 items-center">
          {message && <span className={`text-sm font-bold px-3 py-1 rounded-full ${message.includes('✅') ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>{message}</span>}
          <button onClick={handleUpdate} disabled={loading} className="px-6 py-2.5 font-bold text-white bg-green-600 hover:bg-green-700 rounded-lg shadow-lg shadow-green-500/30 transition-all active:scale-95 flex items-center gap-2">
            <Save size={18} /> {loading ? 'Updating...' : 'Update Article'}
          </button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
        <div className="h-full overflow-y-auto p-6 border-r border-slate-200 custom-scrollbar">
          <div className="space-y-6 max-w-2xl mx-auto">
            
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-bold text-slate-800 flex items-center gap-2"><ImageIcon size={18}/> Post Settings & Media</h3>
              
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Select Categories (Select Multiple)</label>
                <div className="flex flex-wrap gap-2 p-3 bg-slate-50 rounded-lg border border-slate-200">
                  {dbCategories.length === 0 ? <span className="text-sm text-slate-400">No categories found.</span> : dbCategories.map(cat => (
                    <label key={cat.id} className="flex items-center gap-2 cursor-pointer bg-white px-3 py-1.5 rounded-md border border-slate-200 hover:border-blue-400 shadow-sm transition">
                      <input 
                        type="checkbox" 
                        checked={selectedCategories.includes(cat.name)}
                        onChange={() => handleCategoryToggle(cat.name, cat.slug)}
                        className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500" 
                      />
                      <span className="text-sm font-bold text-slate-700 capitalize">{cat.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Change Photo</label>
                <input type="file" accept="image/*" onChange={handleImageSelect} className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer" />
              </div>

              <div className="pt-4 border-t border-slate-100">
                <h4 className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1 mb-3"><CheckSquare size={14}/> News Placement</h4>
                <div className="flex flex-col gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" checked={placement.showOnHome} onChange={(e) => setPlacement({...placement, showOnHome: e.target.checked})} className="w-4 h-4 text-blue-600 rounded border-slate-300" />
                    <span className="text-sm font-bold text-slate-700">Show on Main Home Page</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" checked={placement.isFeatured} onChange={(e) => setPlacement({...placement, isFeatured: e.target.checked})} className="w-4 h-4 text-blue-600 rounded border-slate-300" />
                    <span className="text-sm font-bold text-slate-700">Add to Top Slider</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" checked={placement.isTrending} onChange={(e) => setPlacement({...placement, isTrending: e.target.checked})} className="w-4 h-4 text-blue-600 rounded border-slate-300" />
                    <span className="text-sm font-bold text-slate-700">Add to Trending Sidebar</span>
                  </label>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <h4 className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1 mb-3 text-red-500"><BarChart2 size={14}/> Manual Stats Control</h4>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase mb-1 block">Views</label>
                    <input type="number" value={stats.views} onChange={(e) => setStats({...stats, views: Number(e.target.value)})} className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm font-bold text-slate-700" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase mb-1 block">Likes</label>
                    <input type="number" value={stats.likes} onChange={(e) => setStats({...stats, likes: Number(e.target.value)})} className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm font-bold text-slate-700" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase mb-1 block">Shares</label>
                    <input type="number" value={stats.shares} onChange={(e) => setStats({...stats, shares: Number(e.target.value)})} className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm font-bold text-slate-700" />
                  </div>
                </div>
              </div>

            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="flex bg-slate-50 border-b border-slate-200 justify-between items-center pr-2">
                <div className="flex">
                  {[ { id: 'en', label: 'English' }, { id: 'gu', label: 'ગુજરાતી' }, { id: 'hi', label: 'हिन्दी' } ].map((tab) => (
                    <button key={tab.id} onClick={() => setActiveLangTab(tab.id as 'en'|'gu'|'hi')} className={`px-6 py-3 font-bold text-sm transition-colors ${activeLangTab === tab.id ? 'bg-white text-blue-600 border-t-2 border-blue-600' : 'text-slate-500 hover:text-slate-800'}`}>
                      {tab.label}
                    </button>
                  ))}
                </div>
                {/* 🚀 FIX: અહીથી પેલું AI Translate બટન ઉડાડી દીધું છે! */}
              </div>
              
              <div className="p-5 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Headline ({activeLangTab.toUpperCase()})</label>
                  <input type="text" value={translations[activeLangTab].title} onChange={(e) => handleContentChange(activeLangTab, 'title', e.target.value)} className="w-full px-4 py-3 border border-slate-200 rounded-lg outline-none text-xl font-bold bg-slate-50 focus:bg-white" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Short Summary</label>
                  <textarea rows={2} value={translations[activeLangTab].shortDescription} onChange={(e) => handleContentChange(activeLangTab, 'shortDescription', e.target.value)} className="w-full px-4 py-3 border border-slate-200 rounded-lg outline-none resize-none bg-slate-50 focus:bg-white" />
                </div>
                
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1 text-blue-600 flex items-center gap-1"><Sparkles size={14}/> Full Story (Pro Editor)</label>
                  <div className="border border-slate-200 rounded-lg overflow-hidden shadow-sm">
                    <JoditEditor
                      value={translations[activeLangTab].content}
                      config={editorConfig}
                      onBlur={(newContent) => handleContentChange(activeLangTab, 'content', newContent)}
                    />
                  </div>
                  <p className="text-[10px] font-bold text-slate-400 mt-2">નોંધ: લખાણ ટાઈપ કર્યા પછી એડિટરની બહાર ખાલી જગ્યામાં ક્લિક કરશો, એટલે બાજુમાં લાઈવ પ્રીવ્યુ અપડેટ થઈ જશે.</p>
                </div>

              </div>
            </div>
          </div>
        </div>

        <div className="h-full bg-slate-100 p-6 overflow-y-auto hidden lg:block custom-scrollbar relative">
          <div className="max-w-xl mx-auto">
            <div className="flex justify-between items-center mb-4">
              <span className="bg-slate-800 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-2"><Eye size={14} className="text-green-400" /> Live Preview</span>
            </div>
            
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200 min-h-[600px] p-6">
              {imagePreview ? (
                <img src={imagePreview} alt="Featured" className="w-full h-56 object-cover rounded-xl mb-6 shadow-sm" />
              ) : (
                <div className="w-full h-56 bg-slate-50 rounded-xl mb-6 flex flex-col items-center justify-center text-slate-400 border border-slate-200 border-dashed">
                  <ImageIcon size={32} className="mb-2 opacity-50"/>
                </div>
              )}
              <span className="bg-blue-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
                {selectedCategories.length > 0 ? selectedCategories.join(', ') : "CATEGORY"}
              </span>
              <h1 className="text-3xl font-black text-slate-900 leading-tight mt-4 mb-3">{translations[activeLangTab].title}</h1>
              <p className="text-slate-500 font-medium mb-6 text-lg border-l-4 border-blue-600 pl-4">{translations[activeLangTab].shortDescription}</p>
              
              <style dangerouslySetInnerHTML={{__html: `
                .rich-text-content h1, .rich-text-content h2, .rich-text-content h3 { font-weight: 800; margin-bottom: 0.5em; color: #0f172a; }
                .rich-text-content ul { list-style-type: disc; padding-left: 2em; margin-bottom: 1.5em; }
                .rich-text-content ol { list-style-type: decimal; padding-left: 2em; margin-bottom: 1.5em; }
                .rich-text-content p { margin-bottom: 1.5em; }
                .rich-text-content a { color: #2563eb; text-decoration: underline; }
                .rich-text-content table { width: 100%; border-collapse: collapse; margin-bottom: 1.5em; }
                .rich-text-content th, .rich-text-content td { border: 1px solid #cbd5e1; padding: 0.75rem; text-align: left; }
                .rich-text-content blockquote { border-left: 4px solid #2563eb; padding-left: 1rem; font-style: italic; color: #475569; }
              `}} />
              <div className="rich-text-content text-slate-700 text-base leading-relaxed" dangerouslySetInnerHTML={{ __html: translations[activeLangTab].content }} />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}