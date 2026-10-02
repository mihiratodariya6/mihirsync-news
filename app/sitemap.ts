import { MetadataRoute } from "next";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "../lib/firebase"; // 👈 તમારો સાચો ફાઈરબેઝ પાથ

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://mihirsync-news-9nvx.vercel.app";

  // 1. Static Pages (AdSense માટે જરૂરી પેજીસ સાથે)
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/en`, lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
    { url: `${baseUrl}/gu`, lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
    { url: `${baseUrl}/hi`, lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
    { url: `${baseUrl}/about-us`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/privacy-policy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.5 },
    { url: `${baseUrl}/terms-of-service`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.5 },
  ];

  let dynamicRoutes: MetadataRoute.Sitemap = [];

  try {
    // 2. ડેટાબેઝમાંથી ન્યૂઝ લાવવા માટે
    // નોંધ: જો તમારા કલેક્શનનું નામ 'news' ના બદલે કંઈ બીજું હોય તો અહીં બદલી નાખજો
    const newsRef = collection(db, "news"); 
    const newsQuery = query(newsRef, orderBy("createdAt", "desc"), limit(500));
    const querySnapshot = await getDocs(newsQuery);

    dynamicRoutes = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      const lastModifiedDate = data.updatedAt?.toDate() || data.createdAt?.toDate() || new Date();
      
      return {
        url: `${baseUrl}/gu/news/${doc.id}`,
        lastModified: lastModifiedDate,
        changeFrequency: "hourly", 
        priority: 0.8,
      };
    });
  } catch (error) {
    console.error("Error fetching news for sitemap:", error);
  }

  // બન્ને રૂટ્સ ભેગા કરી દો
  return [...staticRoutes, ...dynamicRoutes];
}