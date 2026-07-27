import React from 'react';
import { db } from '../../../../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

// 🚀 આ ફંક્શન WhatsApp, Facebook અને Google Search માટે ફોટો અને ટાઇટલ સેટ કરશે
export async function generateMetadata({ params }: any) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang || 'en';
  const postId = resolvedParams.id;

  try {
    const docRef = doc(db, 'articles', postId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const post = docSnap.data();
      
      // જે ભાષા સિલેક્ટ કરી હોય તેનું ટાઇટલ લાવો
      const title = post.translations?.[lang]?.title || post.translations?.['en']?.title || 'MihirSync News';
      const description = post.translations?.[lang]?.shortDescription || post.translations?.['en']?.shortDescription || '';
      const imageUrl = post.featuredImage || 'https://via.placeholder.com/1200x630';

      return {
        title: `${title} | MihirSync`,
        description: description,
        openGraph: {
          title: title,
          description: description,
          images: [imageUrl], // 👈 WhatsApp માં દેખાતો મોટો ફોટો
          type: 'article',
        },
        twitter: {
          card: 'summary_large_image',
          title: title,
          description: description,
          images: [imageUrl], // 👈 Twitter/X માં દેખાતો મોટો ફોટો
        }
      };
    }
  } catch (error) {
    console.error("SEO Error:", error);
  }

  return {
    title: 'News | MihirSync',
  };
}

export default function PostLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}