import React from 'react';
import { Shield, Lock, ChevronRight, FileText, CheckCircle } from 'lucide-react';
import { Metadata } from 'next';

// 🚀 ADSENSE & SEO METADATA
export const metadata: Metadata = {
  title: "Privacy Policy | MihirSync Media",
  description: "Privacy Policy for MihirSync. Learn how we collect, use, and safeguard your data, and our compliance with Google AdSense, GDPR, and Indian IT Act.",
  keywords: "Privacy Policy MihirSync, MihirSync privacy, AdSense Privacy Policy, Google DART Cookie, GDPR compliance India, News portal privacy",
  openGraph: {
    title: "Privacy Policy | MihirSync",
    description: "Read our Privacy Policy to understand how we protect your information at MihirSync Media.",
    url: "https://mihirsync-news-9nvx.vercel.app/privacy-policy", // 👈 સાચું URL
    type: "website",
  }
};

export default async function PrivacyPolicyPage({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang || 'en';

  return (
    <div className="bg-slate-50 min-h-screen pb-20 font-sans selection:bg-blue-200 selection:text-blue-900">
      
      {/* 🚀 Header Section */}
      <div className="bg-[#0b1120] pt-24 pb-32 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(#3b82f6 1px, transparent 1px)", backgroundSize: "30px 30px" }}></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <Shield size={56} className="text-blue-500 mx-auto mb-6 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-slate-400 font-medium max-w-xl mx-auto text-lg">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
      </div>

      {/* 🚀 Main Legal Content Wrapper */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-20 relative z-20">
        <div className="bg-white rounded-3xl shadow-2xl shadow-slate-200/50 border border-slate-200 p-8 md:p-12 text-slate-700 leading-relaxed space-y-12">

          <section>
            <p className="font-medium text-lg text-slate-800">
              At <strong className="text-slate-900 font-black">MihirSync Media</strong>, accessible from mihirsync-news-9nvx.vercel.app, one of our main priorities is the privacy of our visitors. This Privacy Policy document details the types of information collected and recorded by MihirSync and how we use it.
            </p>
            <p className="mt-4 font-medium">
              If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact our compliance team at <a href="mailto:mihirsync1@gmail.com" className="text-blue-600 hover:underline font-bold">mihirsync1@gmail.com</a>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-4 flex items-center gap-2"><Lock size={24} className="text-blue-600"/> Consent</h2>
            <p className="text-slate-600">By using our website, you hereby consent to our Privacy Policy and agree to its terms. This policy applies strictly to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collect in MihirSync.</p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-4 flex items-center gap-2"><FileText size={24} className="text-blue-600"/> Information We Collect</h2>
            <p className="mb-4 text-slate-600">
              The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.
            </p>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <ul className="list-disc pl-5 space-y-3 text-slate-700 font-medium">
                <li>If you contact us directly, we may receive additional information such as your name, email address, phone number, the contents of the message and/or attachments.</li>
                <li>When you register for an Account or subscribe to our Newsletter, we may ask for your contact information (name, email address, etc.).</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-4 flex items-center gap-2"><CheckCircle size={24} className="text-blue-600"/> How We Use Your Information</h2>
            <p className="mb-4 text-slate-600">We use the information we collect in various ways, including to:</p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-slate-700 font-medium">
              {['Provide, operate, and maintain our website', 'Improve, personalize, and expand our website', 'Understand and analyze how you use our website', 'Develop new products, services, features, and functionality', 'Communicate with you for customer service and updates', 'Find and prevent fraud'].map((item, i) => (
                <li key={i} className="flex items-start gap-2 bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                  <ChevronRight size={20} className="text-blue-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-4">Log Files</h2>
            <p className="text-slate-600">
              MihirSync follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable.
            </p>
          </section>

          {/* 🚀 CRITICAL FOR ADSENSE APPROVAL */}
          <section className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-3xl border border-blue-100/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Shield size={100} className="text-blue-600"/>
            </div>
            <h2 className="text-2xl font-black text-slate-900 mb-4 relative z-10">Google DoubleClick DART Cookie & AdSense</h2>
            <p className="mb-4 text-slate-700 relative z-10">
              Google is a third-party vendor on our site. It uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to our site and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL:
            </p>
            <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="inline-block bg-white text-blue-600 font-bold px-6 py-3 rounded-xl shadow-sm border border-blue-100 hover:shadow-md hover:border-blue-300 transition-all relative z-10">
              Google Ad Policies →
            </a>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-4">Advertising Partners Privacy Policies</h2>
            <p className="mb-4 text-slate-600">
              Third-party ad servers or ad networks use technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on MihirSync, which are sent directly to users' browsers. They automatically receive your IP address when this occurs.
            </p>
            <p className="font-bold text-slate-800 bg-slate-50 p-4 rounded-xl border-l-4 border-blue-600">
              Note that MihirSync has no access to or control over these cookies that are used by third-party advertisers.
            </p>
          </section>

          {/* 🚀 ADDED FOR GOOGLE NEWS AND GLOBAL COMPLIANCE */}
          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-4">GDPR & Indian IT Act Compliance</h2>
            <p className="mb-4 text-slate-600">We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following under the GDPR and applicable laws (including the Information Technology Act, 2000 of India):</p>
            <ul className="list-disc pl-5 space-y-2 text-slate-700 font-medium mb-4">
              <li><strong>The right to access</strong> – You have the right to request copies of your personal data.</li>
              <li><strong>The right to rectification</strong> – You have the right to request that we correct any information you believe is inaccurate.</li>
              <li><strong>The right to erasure</strong> – You have the right to request that we erase your personal data, under certain conditions.</li>
            </ul>
          </section>

          {/* 🚀 ADDED FOR COPPA (CHILDREN'S PRIVACY) - VERY IMPORTANT FOR ADSENSE */}
          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-4">Children's Information</h2>
            <p className="text-slate-600">
              Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity. MihirSync does not knowingly collect any Personal Identifiable Information from children under the age of 13.
            </p>
          </section>

          <section className="text-center pt-8 border-t border-slate-100">
            <h2 className="text-2xl font-black text-slate-900 mb-4">Contact Us</h2>
            <p className="text-slate-600 mb-6">
              If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us.
            </p>
            <a href="mailto:mihirsync1@gmail.com" className="inline-block bg-slate-900 text-white font-bold px-8 py-4 rounded-full hover:bg-blue-600 transition-colors shadow-lg hover:shadow-blue-500/30">
              Email: mihirsync1@gmail.com
            </a>
          </section>

        </div>
      </div>
    </div>
  );
}