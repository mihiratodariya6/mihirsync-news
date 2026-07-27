import { MetadataRoute } from 'next';
import { db } from '../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // તારી લાઈવ Vercel ની લિંક (જ્યારે કસ્ટમ ડોમેઇન લો ત્યારે અહી બદલી દેવાનું)
  const baseUrl = 'https://mihirsync-news.vercel.app'; 

  // મેઈન પેજ (Home Pages)
  const routes = [
    { url: `${baseUrl}/en`, lastModified: new Date(), changeFrequency: 'always' as const, priority: 1 },
    { url: `${baseUrl}/gu`, lastModified: new Date(), changeFrequency: 'always' as const, priority: 1 },
    { url: `${baseUrl}/hi`, lastModified: new Date(), changeFrequency: 'always' as const, priority: 1 },
  ];

  try {
    // 🚀 ફાયરબેઝમાંથી બધી ન્યૂઝ ખેંચીને એની લિંક સાઇટમેપમાં નાખશે
    const querySnapshot = await getDocs(collection(db, 'articles'));
    const articles = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    const articleRoutes = articles.flatMap((post: any) => {
      const date = post.createdAt ? new Date(post.createdAt.toMillis()) : new Date();
      return [
        { url: `${baseUrl}/en/post/${post.id}`, lastModified: date, changeFrequency: 'hourly' as const, priority: 0.8 },
        { url: `${baseUrl}/gu/post/${post.id}`, lastModified: date, changeFrequency: 'hourly' as const, priority: 0.8 },
        { url: `${baseUrl}/hi/post/${post.id}`, lastModified: date, changeFrequency: 'hourly' as const, priority: 0.8 },
      ];
    });

    return [...routes, ...articleRoutes];
  } catch (e) {
    console.error("Sitemap error:", e);
    return routes;
  }
}