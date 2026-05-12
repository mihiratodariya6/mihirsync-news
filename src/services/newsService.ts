import { 
  collection, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  limit, 
  onSnapshot,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  increment,
  addDoc,
  serverTimestamp 
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { NewsArticle } from '../types';

const ARTICLES_COLLECTION = 'articles';

export const newsService = {
  async getArticles(category?: string, trending?: boolean, breaking?: boolean, limitCount: number = 10) {
    let q = query(collection(db, ARTICLES_COLLECTION), orderBy('publishedAt', 'desc'), limit(limitCount));
    
    if (category) {
      q = query(collection(db, ARTICLES_COLLECTION), where('category', '==', category), orderBy('publishedAt', 'desc'), limit(limitCount));
    }
    
    if (trending) {
      q = query(collection(db, ARTICLES_COLLECTION), where('isTrending', '==', true), orderBy('publishedAt', 'desc'), limit(limitCount));
    }

    if (breaking) {
      q = query(collection(db, ARTICLES_COLLECTION), where('isBreaking', '==', true), orderBy('publishedAt', 'desc'), limit(limitCount));
    }

    try {
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as NewsArticle));
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, ARTICLES_COLLECTION);
      return [];
    }
  },

  async getArticleBySlug(slug: string) {
    const q = query(collection(db, ARTICLES_COLLECTION), where('slug', '==', slug), limit(1));
    try {
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) return null;
      const docData = querySnapshot.docs[0];
      return { id: docData.id, ...docData.data() } as NewsArticle;
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, ARTICLES_COLLECTION);
      return null;
    }
  },

  async incrementViews(articleId: string) {
    const articleRef = doc(db, ARTICLES_COLLECTION, articleId);
    try {
      await updateDoc(articleRef, {
        views: increment(1)
      });
    } catch (error) {
      // Silently fail as views aren't critical
      console.error("View increment failed:", error);
    }
  },

  async toggleBookmark(userId: string, articleId: string, isBookmarked: boolean) {
    const userRef = doc(db, 'users', userId);
    try {
      // This logic should ideally use arrayUnion/arrayRemove
      // But for simplicity in this helper:
      const userDoc = await getDoc(userRef);
      if (!userDoc.exists()) return;
      
      const bookmarks = userDoc.data().bookmarks || [];
      const newBookmarks = isBookmarked 
        ? bookmarks.filter((id: string) => id !== articleId)
        : [...bookmarks, articleId];
        
      await updateDoc(userRef, { bookmarks: newBookmarks });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `users/${userId}`);
    }
  }
};
