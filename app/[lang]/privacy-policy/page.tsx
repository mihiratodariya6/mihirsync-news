import React from 'react';
import Link from 'next/link';
import { Shield, Lock, ChevronRight } from 'lucide-react';
import { Metadata } from 'next';

// 🚀 ADSENSE & SEO METADATA
export const metadata: Metadata = {
  title: "Privacy Policy | MihirSync Media",
  description: "Privacy Policy for MihirSync. Learn how we collect, use, and safeguard your data, and our compliance with Google AdSense and global privacy laws.",
  keywords: "Privacy Policy MihirSync, MihirSync privacy, AdSense Privacy Policy, Google DART Cookie, GDPR compliance India, News portal privacy",
  openGraph: {
    title: "Privacy Policy | MihirSync",
    description: "Read our Privacy Policy to understand how we protect your information at MihirSync Media.",
    url: "https://mihirsync.com/privacy-policy",
    type: "website",
  }
};

export default async function PrivacyPolicyPage({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang || 'en';

  return (
    <div className="bg-slate-50 min-h-screen pb-20 font-sans">
      
      {/* 🚀 Header Section */}
      <div className="bg-[#0b1120] pt-24 pb-28 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(#3b82f6 1px, transparent 1px)", backgroundSize: "30px 30px" }}></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <Shield size={48} className="text-blue-500 mx-auto mb-6 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
          <h1 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-slate-400 font-medium max-w-xl mx-auto">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
      </div>

      {/* 🚀 Main Legal Content Wrapper */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-16 relative z-20">
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 p-8 md:p-12 text-slate-700 leading-relaxed space-y-10">

          <section>
            <p className="font-medium">
              At <strong className="text-slate-900">MihirSync</strong>, accessible from mihirsync.com, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by MihirSync and how we use it.
            </p>
            <p className="mt-4 font-medium">
              If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us at <a href="mailto:mihirsync1@gmail.com" className="text-blue-600 hover:underline font-bold">mihirsync1@gmail.com</a>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-4 flex items-center gap-2"><Lock size={20} className="text-blue-600"/> Consent</h2>
            <p>By using our website, you hereby consent to our Privacy Policy and agree to its terms.</p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-4">Information We Collect</h2>
            <p className="mb-4">
              The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-slate-600">
              <li>If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us.</li>
              <li>When you register for an Account or subscribe to our Newsletter, we may ask for your contact information, including items such as name, company name, address, email address, and telephone number.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-4">How We Use Your Information</h2>
            <p className="mb-4">We use the information we collect in various ways, including to:</p>
            <ul className="list-none space-y-3 text-slate-600">
              {['Provide, operate, and maintain our website', 'Improve, personalize, and expand our website', 'Understand and analyze how you use our website', 'Develop new products, services, features, and functionality', 'Communicate with you for customer service, updates, and marketing', 'Send you emails', 'Find and prevent fraud'].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <ChevronRight size={18} className="text-blue-500 shrink-0 mt-1" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-4">Log Files</h2>
            <p>
              MihirSync follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable.
            </p>
          </section>

          {/* 🚀 CRITICAL FOR ADSENSE APPROVAL */}
          <section className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
            <h2 className="text-2xl font-black text-slate-900 mb-4">Google DoubleClick DART Cookie (AdSense)</h2>
            <p className="mb-4">
              Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to our site and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL: <br/>
              <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-blue-600 font-bold hover:underline mt-2 inline-block">
                https://policies.google.com/technologies/ads
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-4">Advertising Partners Privacy Policies</h2>
            <p className="mb-4">
              You may consult this list to find the Privacy Policy for each of the advertising partners of MihirSync.
            </p>
            <p>
              Third-party ad servers or ad networks uses technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on MihirSync, which are sent directly to users' browser. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit.
            </p>
            <p className="mt-4 font-bold text-slate-800">
              Note that MihirSync has no access to or control over these cookies that are used by third-party advertisers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-4">GDPR & CCPA Data Protection Rights</h2>
            <p className="mb-4">We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:</p>
            <ul className="list-disc pl-5 space-y-2 text-slate-600 mb-4">
              <li><strong>The right to access</strong> – You have the right to request copies of your personal data.</li>
              <li><strong>The right to rectification</strong> – You have the right to request that we correct any information you believe is inaccurate.</li>
              <li><strong>The right to erasure</strong> – You have the right to request that we erase your personal data, under certain conditions.</li>
            </ul>
            <p>If you would like to exercise any of these rights, please contact us.</p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-4">Contact Us</h2>
            <p>
              If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us at <a href="mailto:mihirsync1@gmail.com" className="text-blue-600 font-bold hover:underline">mihirsync1@gmail.com</a>.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}