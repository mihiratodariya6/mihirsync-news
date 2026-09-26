import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

export async function GET() {
  try {
    // 1. બધી ન્યૂઝ ખેંચી લઈએ
    const q = query(collection(db, 'articles'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    const articles = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    
    // 2. એડમિન પેનલની બધી કેટેગરી ખેંચી લઈએ
    const categoriesSnapshot = await getDocs(collection(db, 'categories'));
    const categories = categoriesSnapshot.docs.map(doc => doc.data());

    // 3. બધું ભેગું કરીને એપને મોકલી દઈએ!
    return NextResponse.json({ success: true, articles, categories });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'API Error' }, { status: 500 });
  }
}