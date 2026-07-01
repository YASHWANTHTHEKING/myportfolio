import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Calendar, ExternalLink, ShieldCheck, X, FileText, ChevronLeft, ChevronRight } from 'lucide-react';

const certs = [
  {
    id: 1,
    title: 'Neo4j Certified Professional',
    issuer: 'Neo4j Graph Database Association',
    date: 'February 2025',
    credentialId: 'NEO-10827361',
    color: 'from-blue-500/20 to-cyan-500/20',
    details: 'Demonstrated mastery of graph database concepts, Cypher querying optimization, graph modeling principles, and database management transactions.'
  },
  {
    id: 2,
    title: 'Neural Networks & Deep Learning',
    issuer: 'DeepLearning.AI (Coursera)',
    date: 'December 2024',
    credentialId: 'DL-82739174',
    color: 'from-indigo-500/20 to-purple-500/20',
    details: 'Covers foundational concepts of neural networks, backpropagation algorithms, vectorization, weights initialization, and model optimization metrics.'
  },
  {
    id: 3,
    title: 'Advanced Python Core Developer',
    issuer: 'Google Career Certificates',
    date: 'August 2024',
    credentialId: 'GOOG-PY-2736',
    color: 'from-amber-500/20 to-orange-500/20',
    details: 'Validated skills in concurrent execution threads, asynchronous programming, decorator engineering, context managers, and advanced class metaprogramming.'
  },
  {
    id: 4,
    title: 'Java Programming Foundations',
    issuer: 'Oracle Academy',
    date: 'April 2024',
    credentialId: 'ORA-JAVA-9182',
    color: 'from-red-500/20 to-rose-500/20',
    details: 'Validated expertise in Java OOP principles, JDBC controller models, data structures collections, inheritance hierarchies, and multithreading basics.'
  }
];

const Certifications = () => {
  const [selectedCert, setSelectedCert] = useState(null);
  const [startIndex, setStartIndex] = useState(0);

  const nextSlide = () => {
    setStartIndex((prev) => (prev + 1) % (certs.length - 1));
  };

  const prevSlide = () => {
    setStartIndex((prev) => (prev - 1 + (certs.length - 1)) % (certs.length - 1));
  };

  // View slice: 2 items on screen for desktop
  const visibleCerts = certs.slice(startIndex, startIndex + 2).concat(
    startIndex + 2 > certs.length ? certs.slice(0, (startIndex + 2) % certs.length) : []
  ).slice(0, 2);

  return (
    <motion.div 
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 30 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="max-w-4xl mt-12 xl:mt-24 ml-4 xl:ml-12 pointer-events-auto p-4"
    >
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-100 mb-2 tracking-tight">
            Certifications
          </h2>
          <p className="text-slate-400 text-sm md:text-base max-w-lg">
            Professional course credentials and tech validations. Click any card to load the secure verification simulator.
          </p>
        </div>

        {/* Carousel controls */}
        <div className="flex gap-2">
          <button 
            onClick={prevSlide}
            className="p-2.5 bg-white/5 hover:bg-indigo-600/20 border border-white/5 rounded-xl text-slate-300 transition-all"
            aria-label="Previous certificates"
          >
            <ChevronLeft size={18} />
          </button>
          <button 
            onClick={nextSlide}
            className="p-2.5 bg-white/5 hover:bg-indigo-600/20 border border-white/5 rounded-xl text-slate-300 transition-all"
            aria-label="Next certificates"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Horizontal Carousel View */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {visibleCerts.map((cert) => (
          <motion.div
            key={cert.id}
            layout
            onClick={() => setSelectedCert(cert)}
            className="glass-card p-6 rounded-3xl border border-white/5 cursor-pointer relative overflow-hidden flex flex-col justify-between h-64 hover:border-indigo-500/20 hover:scale-[1.01] transition-all duration-300"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${cert.color} opacity-0 hover:opacity-10 transition-opacity duration-300 blur-2xl`}></div>
            
            <div className="relative z-10">
              <span className="text-[9px] font-bold text-indigo-400 uppercase tracking-widest block mb-2">
                VERIFIED CREDENTIAL
              </span>
              <h3 className="text-lg font-bold text-slate-200 leading-snug">
                {cert.title}
              </h3>
              <p className="text-slate-400 text-xs mt-1 font-semibold">{cert.issuer}</p>
            </div>

            <div className="mt-4 relative z-10 flex-1">
              <p className="text-slate-400 text-xs leading-relaxed line-clamp-3">
                {cert.details}
              </p>
            </div>

            <div className="border-t border-white/5 pt-4 mt-auto flex items-center justify-between text-xs text-slate-500 font-semibold relative z-10">
              <span className="flex items-center gap-1.5">
                <Calendar size={13} />
                {cert.date}
              </span>
              <span className="text-indigo-400 flex items-center gap-1">
                Verify Document <ExternalLink size={12} />
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* PDF Simulator Modal Overlay */}
      <AnimatePresence>
        {selectedCert && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-10 pointer-events-auto">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCert(null)}
              className="absolute inset-0 bg-slate-950/70 backdrop-blur-md"
            />

            {/* Certificate frame */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="relative w-full max-w-2xl bg-white text-slate-900 rounded-[2rem] p-8 md:p-12 border-8 border-slate-900 shadow-2xl flex flex-col overflow-hidden select-none"
            >
              {/* Close button */}
              <button 
                onClick={() => setSelectedCert(null)}
                className="absolute top-4 right-4 p-2 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-600 transition-all"
              >
                <X size={16} />
              </button>

              {/* Certificate Inner Border */}
              <div className="border-2 border-dashed border-slate-300 p-6 md:p-8 flex flex-col items-center text-center">
                <ShieldCheck size={48} className="text-indigo-600 mb-4" />
                
                <span className="text-[10px] tracking-widest font-extrabold text-slate-400 uppercase">
                  CERTIFICATE OF COMPLETION
                </span>
                
                <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 mt-4 font-serif">
                  {selectedCert.title}
                </h3>
                
                <p className="text-sm text-slate-500 mt-2">
                  This secure credential validates that
                </p>
                
                <h4 className="text-xl font-bold text-slate-800 mt-3 underline decoration-indigo-500/30">
                  N.V. Yashwanth
                </h4>
                
                <p className="text-xs text-slate-500 max-w-md mt-4 leading-relaxed">
                  has successfully completed all coursework, evaluations, and projects required by the issuer for {selectedCert.issuer}.
                </p>

                {/* Seal and signature simulator */}
                <div className="flex justify-between items-center w-full mt-8 border-t border-slate-200 pt-6">
                  <div className="text-left font-mono text-[9px] text-slate-400">
                    <p>CREDENTIAL ID: {selectedCert.credentialId}</p>
                    <p>DATE: {selectedCert.date}</p>
                  </div>
                  
                  {/* Decorative Gold Seal */}
                  <div className="w-12 h-12 rounded-full bg-amber-400/20 border-4 border-amber-400 flex items-center justify-center relative rotate-12">
                    <Award size={18} className="text-amber-600" />
                  </div>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Certifications;
