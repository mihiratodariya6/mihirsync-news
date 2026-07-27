import Script from 'next/script'; // 👈 ૧. આ લાઈન સૌથી ઉપર નાખજે
import { Noto_Sans, Noto_Sans_Gujarati, Noto_Sans_Devanagari } from "next/font/google";
import "../globals.css";
import { Globe } from 'lucide-react';
import Link from "next/link";
import GoogleTranslate from "../../components/web/GoogleTranslate"; // 👈 ગૂગલ ટ્રાન્સલેટ
import Navbar from "../../components/web/Navbar"; // 👈 ડાયનેમિક મેનુ
import Footer from "../../components/web/Footer"; // 👈 નવું પ્રીમિયમ ફૂટર જે આપણે બનાવ્યું

// 🌟 પ્રીમિયમ ન્યૂઝ ફોન્ટ્સનું સેટિંગ
const fontEn = Noto_Sans({ subsets: ["latin"], weight: ['400', '500', '600', '700', '800'] });
const fontGu = Noto_Sans_Gujarati({ subsets: ["gujarati"], weight: ['400', '500', '600', '700', '800'] });
const fontHi = Noto_Sans_Devanagari({ subsets: ["devanagari"], weight: ['400', '500', '600', '700', '800'] });

export const metadata = {
  title: "MihirSync | Enterprise News Portal",
  description: "World-class news portal providing fast and reliable updates.",
  verification: {
    google: "<meta name="google-site-verification" content="pjKA46T4ncyqwpbR0O5NiDIQzxRj3ui0BP3sSBmFjbY" />", // 👈 (દા.ત. જો ગૂગલનો કોડ <meta name="..." content="abc123xyz" /> હોય, તો તારે ખાલી abc123xyz જ અહી નાખવાનું છે)
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

  // જે ભાષા સિલેક્ટ થાય, તેનો પ્રીમિયમ ફોન્ટ ઓટોમેટિક લાગી જશે
  const currentFont = lang === 'gu' ? fontGu.className : (lang === 'hi' ? fontHi.className : fontEn.className);

  return (
    <html lang={lang}>
      <head>
        
        {/* 🚀 ગૂગલ એડસેન્સ (Google AdSense) નો કોડ અહી એડ કર્યો છે */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-તારો_એડસેન્સ_કોડ_અહીંયા_નાખજે"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />

        {/* 🚀 ગૂગલ સર્ચ કન્સોલનો સાબિતી વાળો (Verification) કોડ અહી નાખ્યો છે */}
        <meta name="google-site-verification" content="<meta name="google-site-verification" content="pjKA46T4ncyqwpbR0O5NiDIQzxRj3ui0BP3sSBmFjbY" />" />

      </head>
      <body className={`${currentFont} bg-slate-50 text-slate-900 antialiased flex flex-col min-h-screen`}>
        
        {/* Top Bar - Language Switcher */}
        <div className="bg-slate-950 text-white text-xs py-2 px-4 sm:px-6 flex justify-between items-center z-50 relative h-10">
          <div className="flex gap-4 items-center">
            <span className="hidden sm:inline font-medium text-slate-300">📅 {new Date().toLocaleDateString('gu-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Globe size={14} className="text-blue-500" />
            <span className="font-bold text-slate-300 mr-1">Language:</span>
            {/* 🚀 Google Translate Widget */}
            <GoogleTranslate />
          </div>
        </div>

        {/* 🚀 PREMIUM HEADER */}
        <Navbar lang={lang} />

        <main className="flex-grow">
          {children}
        </main>

        {/* 🚀 PREMIUM FOOTER (આપણે બનાવેલી નવી Footer.tsx ફાઈલ અહીં આવી ગઈ) */}
        <Footer lang={lang} />

      </body>
    </html>
  );
}