/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  content: string;
  summary?: string;
  excerpt: string;
  author: string;
  category: string;
  image: string;
  publishedAt: string;
  isTrending: boolean;
  isBreaking: boolean;
  views: number;
  readTime: string;
  tags: string[];
}

export type Category = 
  | 'India' 
  | 'World' 
  | 'Technology' 
  | 'AI' 
  | 'Business' 
  | 'Finance' 
  | 'Sports' 
  | 'Entertainment' 
  | 'Startups' 
  | 'Crypto' 
  | 'Space' 
  | 'Politics';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  isAdmin?: boolean;
  role: 'user' | 'admin';
  bookmarks: string[];
}
