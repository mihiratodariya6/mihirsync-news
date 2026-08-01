import { Metadata } from 'next';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../../lib/firebase'; // પાથ તારા પ્રોજેક્ટ મુજબ ચેક કરી લેજે

// 🚀 આ ફંક્શન સીધું Google ના Bots સાથે વાત કરશે
export async function generateMetadata({ params }: any): Promise<Metadata> {
  // તારા ફોલ્ડરનું નામ [id] હોય તો params.id લેશે, [slug] હોય તો params.slug લેશે
  const articleId = params.id || params.slug; 
  const lang = params.lang || 'gu';

  try {
    const docRef = doc(db, 'articles', articleId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const news = docSnap.data();

      // જે ભાષા સિલેક્ટ કરી હોય એનું જ ટાઈટલ અને વર્ણન લેશે
      const title = news?.translations?.[lang]?.title || news?.title || 'MihirSync News';
      const description = news?.translations?.[lang]?.shortDescription || news?.shortDescription || 'Explore the latest updates on MihirSync.';
      const image = news?.featuredImage || 'https://mihirsync.com/default-news-banner.jpg'; // અહીં તારો ડિફોલ્ટ લોગો મૂકી દેજે

      // 🌍 અલ્ટીમેટ SEO સેટિંગ
      return {
        title: `${title} | MihirSync`,
        description: description,
        openGraph: {
          title: title,
          description: description,
          images: [{ url: image }],
          type: 'article',
          siteName: 'MihirSync News',
        },
        twitter: {
          card: 'summary_large_image',
          title: title,
          description: description,
          images: [image],
        }
      };
    }
  } catch (error) {
    console.error("Error generating SEO metadata", error);
  }

  // જો કોઈ એરર આવે તો ડિફોલ્ટ SEO
  return {
    title: 'Breaking News | MihirSync',
    description: 'Latest News and Live Updates from India and World.',
  };
}

// આ તારા અસલી પેજ (page.tsx) ને એમનેમ બતાવશે, ખાલી ઉપરથી SEO નું કવર ચડાવી દેશે
export default function PostLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}