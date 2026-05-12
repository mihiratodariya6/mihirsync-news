import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  article?: boolean;
  author?: string;
  publishDate?: string;
  category?: string;
  ogType?: 'website' | 'article';
  canonicalUrl?: string;
}

export default function SEO({ 
  title, 
  description, 
  image = 'https://images.unsplash.com/photo-1585829365234-683641040681?auto=format&fit=crop&q=80&w=1200', 
  article = false,
  author,
  publishDate,
  category,
  ogType,
  canonicalUrl
}: SEOProps) {
  const siteName = 'MihirSync';
  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;
  const currentUrl = window.location.href;
  const canonical = canonicalUrl || currentUrl;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:type" content={ogType || (article ? 'article' : 'website')} />
      <meta property="og:url" content={currentUrl} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {article && author && <meta name="author" content={author} />}
      {article && publishDate && <meta property="article:published_time" content={publishDate} />}
      {article && category && <meta property="article:section" content={category} />}
      
      {/* Schema.org markup for Google News */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": article ? "NewsArticle" : "WebPage",
          "headline": title.split('|')[0].trim(),
          "description": description,
          "image": [image],
          "datePublished": publishDate || new Date().toISOString(),
          "dateModified": new Date().toISOString(),
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": canonical
          },
          "author": [{
            "@type": "Organization",
            "name": author || "MihirSync Editorial",
            "url": canonical
          }],
          "publisher": {
            "@type": "Organization",
            "name": "MihirSync",
            "logo": {
              "@type": "ImageObject",
              "url": "https://mihirsync.com/logo.png"
            }
          }
        })}
      </script>
    </Helmet>
  );
}
