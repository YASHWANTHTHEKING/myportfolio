import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Briefcase, Award, Code, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';

const timelineData = [
  {
    id: 1,
    category: 'Education',
    title: 'Bachelor of Engineering in CSE',
    subtitle: 'Prince Shri Venkateshwara Padmavathi Engineering College',
    date: '2023 - 2027',
    icon: BookOpen,
    color: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    details: 'Currently pursuing B.E. in Computer Science and Engineering. Focusing on Artificial Intelligence, Database Management Systems, Theory of Computation, and Software Engineering. Maintained a cumulative CGPA of 7.65.'
  },
  {
    id: 6,
    category: 'Internships',
    title: 'Data Specialization Intern',
    subtitle: 'Healthcare Research & Data Modeling',
    date: '2025',
    icon: Briefcase,
    color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
    details: 'Actively contributed to data modeling and algorithm development within the healthcare domain. Analyzed large-scale healthcare datasets to extract actionable insights, built efficient and structured data models, and explored data security considerations in healthcare systems.'
  },
  {
    id: 2,
    category: 'Projects',
    title: 'Real-Time Attentiveness Detection',
    subtitle: 'Research Project',
    date: '2025',
    icon: Code,
    color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
    details: 'Developed a system leveraging OpenCV and deep learning to assess classroom or work attentiveness using real-time face mesh analysis, eye aspect ratios, and head pose estimation. Published experimental literature survey.'
  },
  {
    id: 3,
    category: 'Certifications',
    title: 'Neo4j Certified Professional',
    subtitle: 'Graph Database Association',
    date: '2025',
    icon: Award,
    color: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
    details: 'Earned the official Neo4j Graph Database Developer certification. Excelled in Cypher query optimization, graph schema design, data imports, and utilizing graph algorithms for relationship routing.'
  },
  {
    id: 4,
    category: 'Achievements',
    title: 'LeetCode Milestone: 200+ Solved',
    subtitle: 'Problem Solving Platform',
    date: '2024 - 2025',
    icon: CheckCircle,
    color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    details: 'Solved over 200 algorithms and data structures problems on platforms like LeetCode and GFG. Gained deep proficiency in Dynamic Programming, Graph Traversals, Greedy Algorithms, and complex Arrays/Strings manipulation.'
  },
  {
    id: 5,
    category: 'Internships',
    title: 'Web Developer Intern',
    subtitle: 'Engineering Solution Simulation',
    date: '2024',
    icon: Briefcase,
    color: 'text-orange-400 bg-orange-500/10 border-orange-500/20',
    details: 'Assisted in building responsive component layouts using React, Tailwind CSS, and vanilla JS. Conducted unit tests and optimization checks, increasing page load speed by 20% on mock dashboards.'
  }
];

const ExperienceTimeline = () => {
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    if (expandedId === id) {
      setExpandedId(null);
    } else {
      setExpandedId(id);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="max-w-4xl mt-12 xl:mt-24 ml-4 xl:ml-12 pointer-events-auto p-4"
    >
      <h2 className="text-4xl md:text-5xl font-bold text-slate-100 mb-2 tracking-tight">
        Experience Timeline
      </h2>
      <p className="text-slate-400 text-sm md:text-base mb-10 max-w-lg">
        An interactive vertical log of academic milestones, certifications, internships, and key achievements. Click items to expand details.
      </p>

      {/* Vertical Timeline container */}
      <div className="relative border-l-2 border-slate-800 ml-4 md:ml-6 flex flex-col gap-8 pb-10">
        
        {timelineData.map((item, idx) => {
          const Icon = item.icon;
          const isExpanded = expandedId === item.id;
          
          return (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="relative pl-8 md:pl-10 group"
            >
              {/* Vertical Timeline node indicator */}
              <button
                onClick={() => toggleExpand(item.id)}
                className={`absolute -left-[17px] md:-left-[21px] top-1.5 w-8 h-8 md:w-10 md:h-10 rounded-full border-4 border-slate-950 flex items-center justify-center transition-all duration-300 z-10 ${item.color} group-hover:scale-110`}
              >
                <Icon size={14} className="md:size-4" />
              </button>

              {/* Card content */}
              <div 
                onClick={() => toggleExpand(item.id)}
                className="glass-card p-5 md:p-6 rounded-2xl border border-white/5 cursor-pointer hover:border-indigo-500/20 transition-all duration-300 relative select-none"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded">
                      {item.category}
                    </span>
                    <h3 className="text-base md:text-lg font-bold text-slate-200 mt-2">
                      {item.title}
                    </h3>
                    <p className="text-slate-400 text-xs md:text-sm font-medium mt-0.5">
                      {item.subtitle}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-3 self-start md:self-center">
                    <span className="text-xs font-semibold text-slate-500 bg-white/5 px-2.5 py-1 rounded-lg">
                      {item.date}
                    </span>
                    {isExpanded ? (
                      <ChevronUp size={16} className="text-indigo-400" />
                    ) : (
                      <ChevronDown size={16} className="text-slate-500 group-hover:text-indigo-400 transition-colors" />
                    )}
                  </div>
                </div>

                {/* Expandable details with Framer Motion */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0, marginTop: 0 }}
                      animate={{ height: 'auto', opacity: 1, marginTop: 16 }}
                      exit={{ height: 0, opacity: 0, marginTop: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden border-t border-white/5 pt-4"
                    >
                      <p className="text-slate-300 text-sm leading-relaxed">
                        {item.details}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}

      </div>
    </motion.div>
  );
};

export default ExperienceTimeline;
