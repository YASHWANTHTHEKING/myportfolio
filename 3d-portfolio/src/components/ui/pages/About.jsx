import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Award, CheckCircle, Brain, Calendar } from 'lucide-react';

const About = () => {
  const bioTags = [
    'AI Enthusiast', 'Machine Learning', 'Python', 'Java', 'C++',
    'Deep Learning', 'Problem Solving', 'Team Player', 'Fast Learner'
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="max-w-4xl mt-12 xl:mt-24 ml-4 xl:ml-12 pointer-events-auto p-4"
    >
      <h2 className="text-4xl md:text-5xl font-bold text-slate-100 mb-8 tracking-tight">
        About Me
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Avatar & Bio Tags */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="relative group">
            {/* Animated border glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl blur opacity-30 group-hover:opacity-65 transition duration-1000 group-hover:duration-200"></div>
            
            {/* Styled Abstract Profile Avatar */}
            <div className="relative w-48 h-48 md:w-56 md:h-56 bg-slate-950 border border-white/10 rounded-3xl overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 via-purple-500/20 to-transparent"></div>
              <Brain size={80} className="text-indigo-400 animate-pulse relative z-10" />
              
              {/* Overlay Glass reflections */}
              <div className="absolute top-0 left-0 right-0 h-[50%] bg-white/5 skew-y-12 transform origin-top-left"></div>
            </div>
          </div>

          {/* Quick Bio Info */}
          <div className="mt-8 text-center">
            <h3 className="text-xl font-bold text-slate-200">N.V. Yashwanth</h3>
            <p className="text-slate-400 text-sm mt-1">Computer Science Student @ Chennai</p>
          </div>

          {/* Bio Tags Cloud */}
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {bioTags.map(tag => (
              <span 
                key={tag} 
                className="text-[11px] font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 px-3 py-1.5 rounded-xl uppercase tracking-wider"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Right Side: Bio Text & Education Timeline */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Glass Card for Bio */}
          <div className="glass-card p-6 md:p-8 rounded-3xl">
            <h3 className="text-lg font-bold text-slate-200 mb-3 flex items-center gap-2">
              <CheckCircle size={18} className="text-indigo-400" />
              Biography
            </h3>
            <p className="text-slate-300 leading-relaxed text-sm md:text-base">
              I am a driven Computer Science Engineering student with a deep passion for intelligence systems and backend infrastructure. 
              My journey centers around developing software that bridges artificial intelligence with robust full-stack development, 
              focusing on machine learning engineering, computer vision, and building performant APIs. I thrive on solving complex engineering challenges and am always eager to learn new technologies.
            </p>
          </div>

          {/* Glass Card for Education */}
          <div className="glass-card p-6 md:p-8 rounded-3xl">
            <h3 className="text-lg font-bold text-slate-200 mb-4 flex items-center gap-2">
              <BookOpen size={18} className="text-indigo-400" />
              Education
            </h3>
            
            <div className="relative border-l-2 border-indigo-500/20 pl-6 ml-1 flex flex-col gap-4">
              {/* Education Node */}
              <div className="relative">
                <span className="absolute -left-[31px] top-1.5 bg-indigo-600 w-4 h-4 rounded-full border-4 border-slate-950"></span>
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-1">
                  <h4 className="font-bold text-slate-200 text-base md:text-lg">
                    Prince Shri Venkateshwara Padmavathi Engineering College
                  </h4>
                  <span className="text-xs text-indigo-400 font-semibold bg-indigo-500/10 px-2.5 py-1 rounded-md mt-1 md:mt-0 flex items-center gap-1">
                    <Calendar size={12} />
                    2023 - 2027
                  </span>
                </div>
                <p className="text-slate-400 text-sm font-medium">B.E. Computer Science and Engineering</p>
                
                {/* GPA Highlight */}
                <div className="mt-3 flex items-center gap-2 bg-white/5 border border-white/5 rounded-xl p-3 w-fit">
                  <Award size={16} className="text-purple-400" />
                  <span className="text-slate-300 text-xs font-semibold">Cumulative CGPA: <strong className="text-slate-100 text-sm">7.65</strong></span>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonials Slider (Premium Glass Cards with 3D Perspective Hover) */}
          <Testimonials />

        </div>

      </div>
    </motion.div>
  );
};

// Testimonials Component
const Testimonials = () => {
  const testimonials = [
    {
      quote: "Yashwanth demonstrates remarkable analytical skills in computer vision and AI. His attentiveness system shows genuine research-level dedication.",
      author: "Prof. K. Ranganathan",
      role: "Department of CSE"
    },
    {
      quote: "A highly capable programmer. His ability to build robust machine learning architectures and translate them into full-stack dashboards is exceptional.",
      author: "Dr. S. Meera",
      role: "AI Lab Coordinator"
    },
    {
      quote: "Yashwanth is a great problem solver and team player. His graph database modeling in Neo4j was a major contributor to our project's performance.",
      author: "Ankit Sharma",
      role: "Team Collaborator"
    }
  ];

  const [active, setActive] = useState(0);

  return (
    <div className="glass-card p-6 md:p-8 rounded-3xl relative overflow-hidden select-none">
      <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/5 via-transparent to-transparent"></div>
      <h3 className="text-lg font-bold text-slate-200 mb-4 flex items-center gap-2">
        <Award size={18} className="text-indigo-400" />
        Recommendations & Testimonials
      </h3>

      <div className="relative min-h-[140px] flex items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, scale: 0.95, rotateY: -15 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            exit={{ opacity: 0, scale: 0.95, rotateY: 15 }}
            transition={{ duration: 0.4 }}
            className="perspective-1000 transform-style-3d hover:scale-[1.01] transition-transform duration-300 w-full"
          >
            <p className="text-slate-300 italic text-sm md:text-base leading-relaxed pl-4 border-l-2 border-indigo-500/40">
              "{testimonials[active].quote}"
            </p>
            <div className="mt-4 pl-4">
              <h4 className="font-bold text-slate-200 text-sm">{testimonials[active].author}</h4>
              <p className="text-slate-500 text-xs font-semibold">{testimonials[active].role}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Pagination bullets */}
      <div className="flex gap-1.5 justify-end mt-4">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`w-2 h-2 rounded-full transition-all ${active === i ? 'bg-indigo-500 w-4' : 'bg-slate-700 hover:bg-slate-500'}`}
            aria-label={`Go to testimonial ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default About;
