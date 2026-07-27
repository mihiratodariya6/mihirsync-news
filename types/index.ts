// types/index.ts

export type Language = 'en' | 'gu' | 'hi';

export interface ArticleTranslation {
  headline: string;
  content: string;
  seoTitle: string;
  seoDescription: string;
}

export interface ArticleStats {
  views: number;
  likes: number;
  shares: number;
  comments: number;
  bookmarks: number;
  isManualMode: boolean; // જો true હોય તો એડમિનના નાખેલા આંકડા દેખાશે
}

export interface Article {
  id: string;
  slug: string;
  category: string;
  featuredImage: string;
  authorId: string;
  publishDate: string;
  updatedDate: string;
  readingTime: number;
  
  // ત્રણેય ભાષાનો ડેટા
  translations: {
    en?: ArticleTranslation;
    gu?: ArticleTranslation;
    hi?: ArticleTranslation;
  };
  
  // આંકડા કંટ્રોલ કરવા માટે
  stats: ArticleStats;
  
  tags: string[];
  status: 'draft' | 'published' | 'archived';
}