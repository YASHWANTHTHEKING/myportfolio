import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mail, MapPin, CheckCircle, AlertCircle } from 'lucide-react';

const Github = ({ size = 20, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
);

const Linkedin = ({ size = 20, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
);

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error'

  const validateForm = () => {
    const tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      tempErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Invalid email format';
    }
    if (!formData.subject.trim()) tempErrors.subject = 'Subject is required';
    if (!formData.message.trim()) tempErrors.message = 'Message is required';
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    if (errors[id]) {
      setErrors(prev => ({ ...prev, [id]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    // Simulate API call to email server / EmailJS
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      // Reset status after a few seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    }, 1800);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="max-w-6xl mt-12 xl:mt-24 ml-4 xl:ml-12 pointer-events-auto p-4"
    >
      <h2 className="text-4xl md:text-5xl font-bold text-slate-100 mb-2 tracking-tight">
        Get In Touch
      </h2>
      <p className="text-slate-400 text-sm md:text-base mb-10 max-w-xl">
        Have a question or want to work together? Fill out the contact form or reach out directly.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Modern Form */}
        <div className="lg:col-span-7 glass-card p-6 md:p-8 rounded-[2rem] border border-white/5 relative">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 ml-1">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-5 py-3.5 bg-slate-950/40 border ${errors.name ? 'border-red-500/50' : 'border-white/5'} text-slate-100 rounded-2xl focus:outline-none focus:border-indigo-500 transition-all text-sm`}
                  placeholder="John Doe"
                />
                {errors.name && <span className="text-[10px] text-red-400 mt-1 ml-1 flex items-center gap-1"><AlertCircle size={10} />{errors.name}</span>}
              </div>
              
              <div>
                <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 ml-1">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-5 py-3.5 bg-slate-950/40 border ${errors.email ? 'border-red-500/50' : 'border-white/5'} text-slate-100 rounded-2xl focus:outline-none focus:border-indigo-500 transition-all text-sm`}
                  placeholder="john@example.com"
                />
                {errors.email && <span className="text-[10px] text-red-400 mt-1 ml-1 flex items-center gap-1"><AlertCircle size={10} />{errors.email}</span>}
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 ml-1">Subject</label>
              <input 
                type="text" 
                id="subject" 
                value={formData.subject}
                onChange={handleChange}
                className={`w-full px-5 py-3.5 bg-slate-950/40 border ${errors.subject ? 'border-red-500/50' : 'border-white/5'} text-slate-100 rounded-2xl focus:outline-none focus:border-indigo-500 transition-all text-sm`}
                placeholder="Collaboration opportunity..."
              />
              {errors.subject && <span className="text-[10px] text-red-400 mt-1 ml-1 flex items-center gap-1"><AlertCircle size={10} />{errors.subject}</span>}
            </div>

            <div>
              <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 ml-1">Message</label>
              <textarea 
                id="message" 
                rows="4" 
                value={formData.message}
                onChange={handleChange}
                className={`w-full px-5 py-3.5 bg-slate-950/40 border ${errors.message ? 'border-red-500/50' : 'border-white/5'} text-slate-100 rounded-2xl focus:outline-none focus:border-indigo-500 transition-all resize-none text-sm`}
                placeholder="Hi Yashwanth, I'd like to talk about..."
              ></textarea>
              {errors.message && <span className="text-[10px] text-red-400 mt-1 ml-1 flex items-center gap-1"><AlertCircle size={10} />{errors.message}</span>}
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="mt-2 w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-4 rounded-2xl font-bold shadow-lg shadow-indigo-600/10 hover:shadow-indigo-600/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span>Sending Message...</span>
              ) : (
                <>
                  <span>Send Message</span>
                  <Send size={16} />
                </>
              )}
            </button>
          </form>

          {/* Form Submit Status Toast */}
          <AnimatePresence>
            {submitStatus === 'success' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute inset-x-6 bottom-6 bg-emerald-500/90 backdrop-blur border border-emerald-400/20 p-4 rounded-2xl flex items-center gap-3 text-white text-xs font-semibold shadow-lg"
              >
                <CheckCircle size={18} />
                <span>Thank you! Your message has been sent successfully. I will get back to you soon.</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Side: Interactive Chennai Map Widget */}
        <div className="lg:col-span-5 glass-card p-6 md:p-8 rounded-[2rem] border border-white/5 flex flex-col justify-center items-center relative overflow-hidden select-none">
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/5 via-transparent to-transparent"></div>
          
          <h3 className="text-base font-bold text-slate-200 mb-4 z-10 flex items-center gap-2">
            <MapPin className="text-indigo-400" size={18} />
            Location: Chennai, India
          </h3>

          {/* Chennai Interactive Pulse Map (Visual SVG representation) */}
          <div className="w-full h-[240px] bg-slate-950/40 border border-white/5 rounded-2xl relative flex items-center justify-center overflow-hidden z-10">
            {/* Dynamic Radar Ring grids */}
            <div className="absolute w-[180px] h-[180px] border border-dashed border-slate-800 rounded-full animate-ping-slow"></div>
            <div className="absolute w-[120px] h-[120px] border border-dashed border-slate-800 rounded-full"></div>
            <div className="absolute w-[60px] h-[60px] border border-dashed border-slate-800 rounded-full"></div>
            
            {/* Compass overlay */}
            <div className="absolute inset-4 border border-white/5 rounded-full flex items-center justify-center font-mono text-[9px] text-slate-600">
              <span className="absolute top-2">N</span>
              <span className="absolute bottom-2">S</span>
              <span className="absolute right-2">E</span>
              <span className="absolute left-2">W</span>
            </div>

            {/* Glowing Map Coordinates */}
            <div className="absolute bottom-3 left-4 font-mono text-[10px] text-slate-500">
              COORD: 13.0827° N, 80.2707° E
            </div>

            {/* Location Pulse Node */}
            <div className="relative flex items-center justify-center">
              {/* Concentric rings */}
              <span className="absolute w-12 h-12 bg-indigo-500/20 rounded-full animate-ping"></span>
              <span className="absolute w-6 h-6 bg-indigo-500/35 rounded-full animate-pulse"></span>
              <span className="w-3.5 h-3.5 bg-indigo-400 border-2 border-slate-900 rounded-full relative z-10 shadow-lg shadow-indigo-500/50"></span>
            </div>
          </div>

          {/* Social connections */}
          <div className="w-full mt-6 pt-6 border-t border-white/5 flex items-center justify-around z-10">
            <a 
              href="https://github.com/YASHWANTHTHEKING" 
              target="_blank" 
              rel="noreferrer"
              className="flex flex-col items-center gap-1.5 text-xs text-slate-400 hover:text-indigo-400 transition-colors"
            >
              <Github size={20} />
              <span>GitHub</span>
            </a>
            <a 
              href="https://www.linkedin.com/in/yashwanth-nv-78b5502a4/" 
              target="_blank" 
              rel="noreferrer"
              className="flex flex-col items-center gap-1.5 text-xs text-slate-400 hover:text-indigo-400 transition-colors"
            >
              <Linkedin size={20} />
              <span>LinkedIn</span>
            </a>
            <a 
              href="mailto:yash123ace@gmail.com" 
              className="flex flex-col items-center gap-1.5 text-xs text-slate-400 hover:text-indigo-400 transition-colors"
            >
              <Mail size={20} />
              <span>Email</span>
            </a>
          </div>
        </div>

      </div>
    </motion.div>
  );
};

export default Contact;
