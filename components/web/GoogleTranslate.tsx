'use client';

import React, { useEffect } from 'react';

export default function GoogleTranslate() {
  useEffect(() => {
    // 🚀 MASTER HACK: React અને Google Translate ના ક્રેશને રોકવા માટે!
    if (typeof Node === 'function' && Node.prototype) {
      const originalRemoveChild = Node.prototype.removeChild;
      Node.prototype.removeChild = function (child) {
        if (child.parentNode !== this) {
          console.warn('Google Translate DOM fix: prevented removeChild crash.');
          return child;
        }
        return originalRemoveChild.apply(this, arguments as any);
      };

      const originalInsertBefore = Node.prototype.insertBefore;
      Node.prototype.insertBefore = function (newNode, referenceNode) {
        if (referenceNode && referenceNode.parentNode !== this) {
          console.warn('Google Translate DOM fix: prevented insertBefore crash.');
          return newNode;
        }
        return originalInsertBefore.apply(this, arguments as any);
      };
    }

    // 🌐 ગૂગલ ટ્રાન્સલેટ સ્ક્રિપ્ટ લોડ કરો
    if (!document.getElementById('google-translate-script')) {
      const script = document.createElement('script');
      script.id = 'google-translate-script';
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);

      // @ts-ignore
      window.googleTranslateElementInit = () => {
        // @ts-ignore
        new window.google.translate.TranslateElement(
          { 
            pageLanguage: 'gu', // ડીફોલ્ટ ગુજરાતી
            includedLanguages: 'en,gu,hi,mr,ta,te,bn,ur,fr,es,ar,ru', 
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE 
          },
          'google_translate_element'
        );
      };
    }
  }, []);

  return (
    <>
      <div id="google_translate_element"></div>
      
      {/* 🚀 CSS જાદુ: ડાર્ક થીમ પ્રીમિયમ વિજેટ */}
      <style dangerouslySetInnerHTML={{__html: `
        .skiptranslate iframe { display: none !important; }
        body { top: 0 !important; }
        
        .goog-te-gadget { color: transparent !important; font-size: 0 !important; }
        .goog-te-gadget img { display: none !important; }
        .goog-te-gadget .goog-te-combo { margin: 0 !important; }

        .goog-te-combo {
          background-color: #0f172a !important; 
          color: #60a5fa !important; 
          border: 1px solid #334155 !important;
          border-radius: 6px !important;
          padding: 4px 8px !important;
          font-size: 13px !important;
          font-family: inherit !important;
          font-weight: bold !important;
          outline: none !important;
          cursor: pointer !important;
        }
      `}} />
    </>
  );
}