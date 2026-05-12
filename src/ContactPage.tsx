import React, { useState } from 'react';
import { motion } from 'motion/react';
import SEO from './components/SEO';
import { Mail, Phone, MapPin, Send, MessageSquare, Loader2, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <SEO 
        title="Contact MihirSync | News Partnerships, Advertising & Support"
        description="Contact MihirSync for news partnerships, advertising, business inquiries, technical support, collaborations, and media opportunities."
        ogType="website"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Column: Info */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-12"
          >
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-display font-extrabold tracking-tight">
                Get in <span className="text-brand-red">Touch</span>
              </h1>
              <p className="text-xl text-gray-500 dark:text-gray-400 leading-relaxed">
                Have questions, partnership ideas, or advertising opportunities? Our team is here to help and collaborate.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-6 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/10 group hover:border-brand-red/50 transition-colors">
                <Mail className="w-8 h-8 text-brand-red mb-4" />
                <h3 className="font-bold mb-2">Support</h3>
                <p className="text-sm text-gray-500">support@mihirsync.com</p>
              </div>
              <div className="p-6 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/10 group hover:border-brand-red/50 transition-colors">
                <MessageSquare className="w-8 h-8 text-brand-red mb-4" />
                <h3 className="font-bold mb-2">Business</h3>
                <p className="text-sm text-gray-500">business@mihirsync.com</p>
              </div>
              <div className="p-6 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/10 group hover:border-brand-red/50 transition-colors">
                <CheckCircle2 className="w-8 h-8 text-brand-red mb-4" />
                <h3 className="font-bold mb-2">Advertising</h3>
                <p className="text-sm text-gray-500">advertise@mihirsync.com</p>
              </div>
              <div className="p-6 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/10 group hover:border-brand-red/50 transition-colors">
                <MapPin className="w-8 h-8 text-brand-red mb-4" />
                <h3 className="font-bold mb-2">Global Presence</h3>
                <p className="text-sm text-gray-500">Silicon Valley • Bengaluru • London</p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-display font-bold text-xl uppercase tracking-widest text-gray-400">Collaborate with us for:</h3>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm font-medium">
                <li>• Media Partnerships</li>
                <li>• Advertising Opportunities</li>
                <li>• Sponsored Content</li>
                <li>• Technical Support</li>
                <li>• News Tips</li>
                <li>• Collaboration Requests</li>
              </ul>
            </div>
          </motion.div>

          {/* Right Column: Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-white/5 rounded-3xl p-8 shadow-2xl border border-gray-100 dark:border-white/10 h-fit sticky top-24"
          >
            {isSubmitted ? (
              <div className="text-center py-12 space-y-6">
                <div className="w-20 h-20 bg-green-100 dark:bg-green-500/10 rounded-full flex items-center justify-center mx-auto text-green-500">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h2 className="text-3xl font-display font-bold">Message Sent!</h2>
                <p className="text-gray-500 leading-relaxed">
                  Thank you for reaching out. Our team will get back to you within 24-48 business hours.
                </p>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="text-brand-red font-bold hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Full Name</label>
                    <input 
                      required
                      type="text" 
                      className="w-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-red transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Email Address</label>
                    <input 
                      required
                      type="email" 
                      className="w-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-red transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Subject</label>
                  <select 
                    className="w-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-red transition-all"
                  >
                    <option>General Inquiry</option>
                    <option>Advertising & Sponsorship</option>
                    <option>Partnerships</option>
                    <option>Technical Support</option>
                    <option>News Tip</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Message</label>
                  <textarea 
                    required
                    rows={6}
                    className="w-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-red transition-all resize-none"
                    placeholder="Tell us how we can help..."
                  />
                </div>
                <button 
                  disabled={isSubmitting}
                  className="w-full bg-brand-red text-white py-4 rounded-xl font-bold flex items-center justify-center hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-brand-red/20 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" /> SEND MESSAGE
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
