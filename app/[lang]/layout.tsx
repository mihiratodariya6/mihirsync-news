import Script from 'next/script'; 
import { Noto_Sans, Noto_Sans_Gujarati, Noto_Sans_Devanagari } from "next/font/google";
import "../globals.css";
import { Globe } from 'lucide-react';
import Link from "next/link";
import GoogleTranslate from "../../components/web/GoogleTranslate"; 
import Navbar from "../../components/web/Navbar"; 
import Footer from "../../components/web/Footer"; 

const fontEn = Noto_Sans({ subsets: ["latin"], weight: ['400', '500', '600', '700', '800'] });
const fontGu = Noto_Sans_Gujarati({ subsets: ["gujarati"], weight: ['400', '500', '600', '700', '800'] });
const fontHi = Noto_Sans_Devanagari({ subsets: ["devanagari"], weight: ['400', '500', '600', '700', '800'] });

// 🚀 ગૂગલ વેરીફિકેશન માટેની સાચી જગ્યા!
export const metadata = {
  title: "MihirSync | Enterprise News Portal",
  description: "World-class news portal providing fast and reliable updates.",
  verification: {
    google: "pjKA46T4ncyqwpb122O5NiDIQzxRj3ui0BP3sSBmFjbY",
  },
};


export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: 'en' | 'gu' | 'hi' }>;
}) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang || 'en';

  const currentFont = lang === 'gu' ? fontGu.className : (lang === 'hi' ? fontHi.className : fontEn.className);

  return (
    <html lang={lang}>
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-LZ9F932JYK"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-LZ9F932JYK');
  </script>
        {/* ગૂગલ એડસેન્સ કોડ */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub- ca-pub-9566636476372749"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className={`${currentFont} bg-slate-50 text-slate-900 antialiased flex flex-col min-h-screen`}>
        
        {/* Top Bar */}
        <div className="bg-slate-950 text-white text-xs py-2 px-4 sm:px-6 flex justify-between items-center z-50 relative h-10">
          <div className="flex gap-4 items-center">
            <span className="hidden sm:inline font-medium text-slate-300">📅 {new Date().toLocaleDateString('gu-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
          <div className="flex items-center gap-2">
            <Globe size={14} className="text-blue-500" />
            <span className="font-bold text-slate-300 mr-1">Language:</span>
            <GoogleTranslate />
          </div>
        </div>

        <Navbar lang={lang} />
        <main className="flex-grow">{children}</main>
        <Footer lang={lang} />
      </body>
    </html>
  );
}