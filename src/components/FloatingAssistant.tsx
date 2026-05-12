import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, X, Send, Bot, User } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { cn } from '../lib/utils';
import { askAiAboutArticle } from '../services/geminiService';

export default function FloatingAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'ai' | 'user', text: string }[]>([
    { role: 'ai', text: "Hi! I'm MihirSync AI. I can recommend trending topics or summarize any news for you. How can I help?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userText = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setIsLoading(true);

    // Using a more general context for the global assistant
    const response = await askAiAboutArticle("General News Assistant", "You are the general help assistant for MihirSync, a premium news platform.", userText);
    
    setMessages(prev => [...prev, { role: 'ai', text: response || "I'm sorry, I couldn't process that." }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="mb-4 w-80 sm:w-96 h-[500px] bg-white dark:bg-brand-dark rounded-3xl shadow-2xl border border-gray-100 dark:border-white/10 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-linear-to-r from-brand-red to-brand-blue text-white flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Bot className="w-5 h-5" />
                <span className="font-display font-bold">MihirSync AI</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:rotate-90 transition-transform">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-grow p-4 overflow-y-auto space-y-4 bg-gray-50/50 dark:bg-transparent">
              {messages.map((msg, i) => (
                <div 
                  key={i} 
                  className={cn(
                    "p-3 rounded-2xl text-sm max-w-[85%]",
                    msg.role === 'user' 
                      ? "bg-brand-red text-white ml-auto rounded-tr-none" 
                      : "bg-white dark:bg-white/5 shadow-sm rounded-tl-none border border-gray-100 dark:border-white/5"
                  )}
                >
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                </div>
              ))}
              {isLoading && (
                <div className="flex space-x-1 p-2 bg-white dark:bg-white/5 rounded-full w-12 justify-center">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" />
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              )}
            </div>

            {/* Input */}
            <form onSubmit={handleSend} className="p-4 border-t border-gray-100 dark:border-white/10">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask anything..."
                  className="w-full bg-gray-100 dark:bg-white/5 border-none rounded-xl py-3 pl-4 pr-10 text-xs focus:ring-1 focus:ring-brand-red"
                />
                <button 
                  type="submit"
                  disabled={isLoading}
                  className="absolute right-1.5 top-1.5 p-1.5 bg-brand-red text-white rounded-lg shadow-lg hover:scale-110 active:scale-95 transition-all"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "p-4 rounded-full shadow-2xl transition-all duration-300 flex items-center justify-center group",
          isOpen ? "bg-brand-dark text-white" : "bg-brand-red text-white hover:scale-110 rotate-0 hover:rotate-12"
        )}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Sparkles className="w-6 h-6 group-hover:animate-pulse" />}
      </button>
    </div>
  );
}
