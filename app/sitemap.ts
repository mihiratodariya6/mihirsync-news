import { MetadataRoute } from "next";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "../lib/firebase"; // ફાઈરબેઝનો સાચો પાથ

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://mihirsync-news-9nvx.vercel.app";
  
  // તમારી 3 ભાષાઓ
  const languages = ['en', 'gu', 'hi'];

  // સ્ક્રીનશોટ મુજબ તમારા બધા ફોલ્ડર્સ/પેજીસનું લિસ્ટ
  const staticPages = [
    '', // હોમપેજ માટે
    'about', 'advertise', 'apps', 'careers', 'category',
    'cookie-policy', 'correction-policy', 'disclaimer', 'dmca',
    'editorial-policy', 'fact-check', 'press', 'privacy-policy',
    'team', 'terms', 'trending'
  ];

  const staticRoutes: MetadataRoute.Sitemap = [];

  // લૂપ ફેરવીને 3 ભાષા અને બધા પેજીસની લિંક ઓટોમેટિક બનાવી દીધી
  languages.forEach((lang) => {
    staticPages.forEach((page) => {
      staticRoutes.push({
        url: page === '' ? `${baseUrl}/${lang}` : `${baseUrl}/${lang}/${page}`,
        lastModified: new Date(),
        changeFrequency: page === '' ? "daily" : "monthly",
        priority: page === '' ? 1.0 : 0.8,
      });
    });
  });

  let dynamicRoutes: MetadataRoute.Sitemap = [];

  try {
    // ફાયરબેઝમાંથી ન્યૂઝ લાવવા માટે (નોંધ: જો કલેક્શનનું નામ 'post' હોય તો 'news' ની જગ્યાએ 'post' લખજો)
    const newsRef = collection(db, "news"); 
    const newsQuery = query(newsRef, orderBy("createdAt", "desc"), limit(500));
    const querySnapshot = await getDocs(newsQuery);

    languages.forEach((lang) => {
      const routes = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        const lastModifiedDate = data.updatedAt?.toDate() || data.createdAt?.toDate() || new Date();
        
        return {
          // સ્ક્રીનશોટ મુજબ તમારું ફોલ્ડર 'post' છે, એટલે લિંકમાં 'post' વાપર્યું છે
          url: `${baseUrl}/${lang}/post/${doc.id}`,
          lastModified: lastModifiedDate,
          changeFrequency: "hourly" as const, 
          priority: 0.8,
        };
      });
      dynamicRoutes.push(...routes);
    });
  } catch (error) {
    console.error("Error fetching news for sitemap:", error);
  }

  // બધું ભેગું કરીને ગૂગલને આપી દો
  return [...staticRoutes, ...dynamicRoutes];
}