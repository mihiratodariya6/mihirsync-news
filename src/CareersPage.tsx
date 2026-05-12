import React from 'react';
import { motion } from 'motion/react';
import SEO from './components/SEO';
import { Briefcase, MapPin, Clock, ArrowRight, Sparkles, Brain, Code, Palette } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CareersPage() {
  const jobs = [
    { title: 'Senior News Writer', type: 'Full-time', location: 'Remote / Global', category: 'Editorial', icon: <Briefcase /> },
    { title: 'SEO Content Specialist', type: 'Full-time', location: 'Remote', category: 'Marketing', icon: <Sparkles /> },
    { title: 'React Frontend Developer', type: 'Full-time', location: 'Remote', category: 'Engineering', icon: <Code /> },
    { title: 'UI/UX Designer', type: 'Full-time', location: 'Remote', category: 'Design', icon: <Palette /> },
    { title: 'AI Research Engineer', type: 'Full-time', location: 'Hybrid', category: 'Engineering', icon: <Brain /> },
  ];

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <SEO 
        title="Careers at MihirSync | Join Our AI-Powered Media Team"
        description="Explore career opportunities at MihirSync. Join our fast-growing AI-powered media platform and help shape the future of digital journalism."
        ogType="website"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-6"
        >
          <h1 className="text-5xl md:text-7xl font-display font-extrabold tracking-tight">
            Build the <span className="text-brand-red">Future</span> of Media
          </h1>
          <p className="text-xl text-gray-500 max-w-3xl mx-auto leading-relaxed">
            MihirSync is redefining how the world consumes news. Join our fast-growing team 
            of creators, engineers, and journalists.
          </p>
          <div className="flex justify-center pt-8">
            <a href="#positions" className="bg-brand-red text-white px-10 py-5 rounded-full font-bold text-lg hover:scale-105 transition-all shadow-2xl shadow-brand-red/30">
              View Open Positions
            </a>
          </div>
        </motion.div>

        {/* Benefits Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-4 p-8 bg-gray-50 dark:bg-white/5 rounded-3xl">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold">Remote-First Culture</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              We empower our team to work from anywhere in the world. Creative freedom and flexibility are at our core.
            </p>
          </div>
          <div className="space-y-4 p-8 bg-gray-50 dark:bg-white/5 rounded-3xl">
            <div className="w-12 h-12 bg-brand-red/10 rounded-2xl flex items-center justify-center text-brand-red">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold">Cutting-Edge Tech</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Work with modern technology stacks, AI automation, and advanced data systems to shape global journalism.
            </p>
          </div>
          <div className="space-y-4 p-8 bg-gray-50 dark:bg-white/5 rounded-3xl">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-500/10 rounded-2xl flex items-center justify-center text-green-500">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold">Global Impact</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Your work will reach millions of readers across continents, making information accurate and accessible.
            </p>
          </div>
        </div>

        {/* Open Positions */}
        <div id="positions" className="space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <h2 className="text-4xl font-display font-bold">Open Roles</h2>
              <p className="text-gray-500">Join the next generation of digital media.</p>
            </div>
            <div className="flex gap-4">
              <span className="text-xs font-bold bg-gray-100 dark:bg-white/5 px-4 py-2 rounded-full">Engineering (2)</span>
              <span className="text-xs font-bold bg-gray-100 dark:bg-white/5 px-4 py-2 rounded-full">Editorial (1)</span>
            </div>
          </div>

          <div className="space-y-4">
            {jobs.map((job, index) => (
              <motion.div 
                key={job.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group flex flex-col md:flex-row md:items-center justify-between p-6 bg-white dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/10 hover:border-brand-red transition-all cursor-pointer shadow-lg hover:shadow-xl"
              >
                <div className="flex items-center space-x-6">
                  <div className="w-12 h-12 bg-gray-50 dark:bg-white/10 rounded-xl flex items-center justify-center text-gray-500 group-hover:text-brand-red transition-colors">
                    {job.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold group-hover:text-brand-red transition-colors">{job.title}</h3>
                    <div className="flex items-center space-x-4 mt-1 text-xs text-gray-400 font-bold uppercase tracking-wider">
                      <span className="flex items-center"><MapPin className="w-3 h-3 mr-1" /> {job.location}</span>
                      <span className="flex items-center"><Clock className="w-3 h-3 mr-1" /> {job.type}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 md:mt-0 flex items-center text-brand-red font-bold text-sm">
                  Apply Now <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer CTA */}
        <div className="bg-brand-dark rounded-3xl p-12 text-center text-white space-y-6">
          <h2 className="text-3xl font-display font-bold">Don't see a role that fits?</h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            We are always looking for passionate people to join us. Send your resume to <span className="text-white font-bold">careers@mihirsync.com</span> and we'll keep you in mind for future openings.
          </p>
        </div>
      </div>
    </div>
  );
}

// Helper icons that were missing in import but used
import { Globe, Cpu, TrendingUp } from 'lucide-react';
