import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, Award, CheckCircle, Brain, Calendar, 
  Terminal, Globe, Database, Cpu, Cloud, 
  Sparkles, Server, BarChart2, Eye, MessageSquare,
  Briefcase, ChevronRight, ExternalLink, X
} from 'lucide-react';

// Data from individual old components
const bioTags = [
  'AI Enthusiast', 'Machine Learning', 'Python', 'Java', 'C++',
  'Deep Learning', 'Problem Solving', 'Team Player', 'Fast Learner'
];

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

const skillsData = [
  {
    category: 'AI & Machine Learning',
    icon: Brain,
    items: ['Python', 'NumPy', 'Pandas', 'Matplotlib', 'Scikit-learn', 'TensorFlow', 'PyTorch', 'Keras', 'OpenCV', 'MediaPipe', 'Hugging Face', 'LangChain', 'LangGraph', 'Ollama', 'XGBoost', 'LightGBM', 'YOLOv8', 'Detectron2', 'RCNN', 'CNN', 'LSTM', 'RNN']
  },
  {
    category: 'Generative AI',
    icon: Sparkles,
    items: ['OpenAI API', 'Gemini API', 'Claude API', 'Llama', 'Mistral', 'Prompt Engineering', 'RAG', 'Vector Embeddings', 'Fine-tuning', 'Function Calling', 'AI Agents', 'Multi-Agent Systems']
  },
  {
    category: 'Databases',
    icon: Database,
    items: ['MySQL', 'PostgreSQL', 'SQLite', 'MongoDB', 'Redis', 'Neo4j', 'Pinecone', 'ChromaDB', 'FAISS', 'Weaviate']
  },
  {
    category: 'Programming Languages',
    icon: Terminal,
    items: ['Python', 'Java', 'C', 'C++', 'JavaScript', 'TypeScript', 'SQL', 'HTML5', 'CSS3']
  },
  {
    category: 'Frontend Development',
    icon: Globe,
    items: ['React', 'Next.js', 'Tailwind CSS', 'Bootstrap', 'Material UI', 'Three.js', 'Framer Motion', 'GSAP', 'Vite', 'Redux']
  },
  {
    category: 'Backend Development',
    icon: Server,
    items: ['Node.js', 'Express.js', 'FastAPI', 'Flask', 'Django', 'Spring Boot', 'REST API', 'GraphQL', 'JWT Auth', 'WebSockets']
  },
  {
    category: 'Cloud & DevOps',
    icon: Cloud,
    items: ['Git', 'GitHub', 'Docker', 'Kubernetes', 'AWS', 'Azure', 'Google Cloud', 'Firebase', 'Supabase', 'Vercel', 'Netlify', 'CI/CD', 'GitHub Actions']
  },
  {
    category: 'Data Science',
    icon: BarChart2,
    items: ['Data Cleaning', 'Feature Engineering', 'Data Visualization', 'Exploratory Data Analysis', 'Statistics', 'ML Pipelines', 'Model Evaluation', 'Hyperparameter Tuning']
  },
  {
    category: 'Computer Vision',
    icon: Eye,
    items: ['OpenCV', 'YOLO', 'RCNN', 'MediaPipe', 'Face Recognition', 'OCR', 'Object Detection', 'Image Segmentation', 'Pose Estimation']
  },
  {
    category: 'Speech & NLP',
    icon: MessageSquare,
    items: ['Speech Recognition', 'Whisper', 'NLTK', 'spaCy', 'Hugging Face', 'Transformers', 'BERT', 'GPT', 'Text Classification', 'Sentiment Analysis']
  }
];

const timelineData = [
  {
    id: 1,
    category: 'Education',
    title: 'Bachelor of Engineering in CSE',
    subtitle: 'Prince Shri Venkateshwara Padmavathi Engineering College',
    date: '2023 - 2027',
    icon: BookOpen,
    color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
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
    details: 'Actively contributed to data data modeling and algorithm development within the healthcare domain. Analyzed large-scale healthcare datasets to extract actionable insights, built efficient and structured data models, and explored data security considerations in healthcare systems.'
  },
  {
    id: 2,
    category: 'Projects',
    title: 'Real-Time Attentiveness Detection',
    subtitle: 'Research Project',
    date: '2025',
    icon: Cpu,
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
    color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
    details: 'Earned the official Neo4j Graph Database Developer certification. Excelled in Cypher query optimization, graph schema design, data imports, and utilizing graph algorithms for relationship routing.'
  },
  {
    id: 4,
    category: 'Achievements',
    title: 'LeetCode Milestone: 200+ Solved',
    subtitle: 'Problem Solving Platform',
    date: '2024 - 2025',
    icon: CheckCircle,
    color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
    details: 'Solved over 200 algorithms and data structures problems on platforms like LeetCode and GFG. Gained deep proficiency in Dynamic Programming, Graph Traversals, Greedy Algorithms, and complex Arrays/Strings manipulation.'
  },
  {
    id: 5,
    category: 'Internships',
    title: 'Web Developer Intern',
    subtitle: 'Engineering Solution Simulation',
    date: '2024',
    icon: Briefcase,
    color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
    details: 'Assisted in building responsive component layouts using React, Tailwind CSS, and vanilla JS. Conducted unit tests and optimization checks, increasing page load speed by 20% on mock dashboards.'
  }
];

const certs = [
  {
    id: 1,
    title: 'Neo4j Certified Professional',
    issuer: 'Neo4j Graph Database Association',
    date: 'February 2025',
    credentialId: 'NEO-10827361',
    details: 'Demonstrated mastery of graph database concepts, Cypher querying optimization, graph modeling principles, and database management transactions.'
  },
  {
    id: 2,
    title: 'Neural Networks & Deep Learning',
    issuer: 'DeepLearning.AI (Coursera)',
    date: 'December 2024',
    credentialId: 'DL-82739174',
    details: 'Covers foundational concepts of neural networks, backpropagation algorithms, vectorization, weights initialization, and model optimization metrics.'
  },
  {
    id: 3,
    title: 'Advanced Python Core Developer',
    issuer: 'Google Career Certificates',
    date: 'August 2024',
    credentialId: 'GOOG-PY-2736',
    details: 'Validated skills in concurrent execution threads, asynchronous programming, decorator engineering, context managers, and advanced class metaprogramming.'
  },
  {
    id: 4,
    title: 'Java Programming Foundations',
    issuer: 'Oracle Academy',
    date: 'April 2024',
    credentialId: 'ORA-JAVA-9182',
    details: 'Validated expertise in Java OOP principles, JDBC controller models, data structures collections, inheritance hierarchies, and multithreading basics.'
  }
];

const profileLinks = [
  {
    name: 'GitHub',
    username: 'YASHWANTHTHEKING',
    url: 'https://github.com/YASHWANTHTHEKING',
    desc: 'Explore open-source repositories, current AI/ML models, computer vision systems, and full-stack software developments.',
    colorClass: 'text-indigo-400 border-indigo-500/25 hover:border-indigo-500/40 bg-indigo-500/5'
  },
  {
    name: 'LeetCode',
    username: 'yash123ace',
    url: 'https://leetcode.com/u/yash123ace/',
    desc: 'Review algorithm challenges, dynamic programming solutions, database query structures, and core data structure implementations.',
    colorClass: 'text-indigo-400 border-indigo-500/25 hover:border-indigo-500/40 bg-indigo-500/5'
  },
  {
    name: 'LinkedIn',
    username: 'Yashwanth N.V.',
    url: 'https://www.linkedin.com/in/yashwanth-nv-78b5502a4/',
    desc: 'Connect professionally, view academic credentials, professional certifications, career milestones, and industry updates.',
    colorClass: 'text-indigo-400 border-indigo-500/25 hover:border-indigo-500/40 bg-indigo-500/5'
  }
];

const About = () => {
  const [activeTab, setActiveTab] = useState('profile'); // profile, skills, experience, certs
  const [selectedCert, setSelectedCert] = useState(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const tabs = [
    { id: 'profile', label: 'Profile' },
    { id: 'skills', label: 'Technical Skills' },
    { id: 'experience', label: 'Experience Timeline' },
    { id: 'certs', label: 'Certifications' }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="max-w-5xl mx-auto px-4 md:px-8 py-6 text-slate-100"
    >
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-100 mb-2">
        About Me
      </h2>
      <p className="text-slate-400 text-sm md:text-base mb-8">
        A central look into my academic background, technical competencies, and professional credentials.
      </p>

      {/* Tabs list */}
      <div className="flex border-b border-white/10 mb-8 overflow-x-auto no-scrollbar gap-1.5">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2.5 text-sm font-semibold tracking-wide border-b-2 transition-all cursor-pointer whitespace-nowrap ${activeTab === tab.id ? 'border-indigo-500 text-indigo-400' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Contents */}
      <div>
        <AnimatePresence mode="wait">
          {activeTab === 'profile' && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              {/* Left Column: Brief details */}
              <div className="lg:col-span-4 flex flex-col items-center glass-card p-6 rounded-2xl">
                <div className="w-32 h-32 md:w-36 md:h-36 bg-slate-950 border border-white/10 rounded-2xl flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 to-transparent"></div>
                  <Brain size={56} className="text-indigo-400 relative z-10" />
                </div>

                <div className="mt-5 text-center">
                  <h3 className="text-lg font-bold text-slate-200">N.V. Yashwanth</h3>
                  <p className="text-slate-400 text-xs mt-1 font-medium">Computer Science Student @ Chennai</p>
                </div>

                <div className="mt-5 flex flex-wrap justify-center gap-1.5">
                  {bioTags.map(tag => (
                    <span 
                      key={tag} 
                      className="text-xs bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 px-2.5 py-1 rounded-lg uppercase font-semibold tracking-wider"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Column: Bio & Education */}
              <div className="lg:col-span-8 space-y-6">
                {/* Biography card */}
                <div className="glass-card p-6 md:p-8 rounded-2xl">
                  <h3 className="text-base font-bold text-slate-200 mb-3 flex items-center gap-2">
                    <CheckCircle size={16} className="text-indigo-400" />
                    Biography
                  </h3>
                  <p className="text-slate-300 text-sm md:text-base leading-relaxed font-medium">
                    I am a driven Computer Science Engineering student with a deep passion for intelligent systems and backend infrastructure. 
                    My journey centers around developing software that bridges artificial intelligence with robust full-stack development, 
                    focusing on machine learning engineering, computer vision, and building performant APIs. I thrive on solving complex engineering challenges and am always eager to learn new technologies.
                  </p>
                </div>

                {/* Education card */}
                <div className="glass-card p-6 md:p-8 rounded-2xl">
                  <h3 className="text-base font-bold text-slate-200 mb-4 flex items-center gap-2">
                    <BookOpen size={16} className="text-indigo-400" />
                    Education
                  </h3>
                  
                  <div className="border-l-2 border-indigo-500/20 pl-4 ml-1">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-1">
                      <h4 className="font-bold text-slate-200 text-sm md:text-base">
                        Prince Shri Venkateshwara Padmavathi Engineering College
                      </h4>
                      <span className="text-xs text-indigo-400 font-semibold bg-indigo-500/10 px-2.5 py-1 rounded-md shrink-0 flex items-center gap-1">
                        <Calendar size={12} />
                        2023 - 2027
                      </span>
                    </div>
                    <p className="text-slate-400 text-xs md:text-sm font-medium mt-1">B.E. Computer Science and Engineering</p>
                    
                    <div className="mt-3.5 flex items-center gap-2 bg-white/5 border border-white/5 rounded-xl p-3 w-fit">
                      <Award size={16} className="text-indigo-400" />
                      <span className="text-slate-300 text-xs font-semibold">Cumulative CGPA: <strong className="text-slate-100 text-sm">7.65</strong></span>
                    </div>
                  </div>
                </div>

                {/* Testimonials Slider */}
                <div className="glass-card p-6 rounded-2xl relative">
                  <h3 className="text-base font-bold text-slate-200 mb-4 flex items-center gap-2">
                    <Award size={16} className="text-indigo-400" />
                    Recommendations & Testimonials
                  </h3>

                  <div className="min-h-[100px] flex items-center">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeTestimonial}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="w-full"
                      >
                        <p className="text-slate-300 italic text-sm leading-relaxed pl-4 border-l-2 border-indigo-500/40">
                          "{testimonials[activeTestimonial].quote}"
                        </p>
                        <div className="mt-3 pl-4">
                          <h4 className="font-bold text-slate-200 text-xs md:text-sm">{testimonials[activeTestimonial].author}</h4>
                          <p className="text-slate-400 text-xs font-semibold mt-0.5">{testimonials[activeTestimonial].role}</p>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  <div className="flex gap-1.5 justify-end mt-4">
                    {testimonials.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveTestimonial(i)}
                        className={`w-2 h-2 rounded-full transition-all cursor-pointer ${activeTestimonial === i ? 'bg-indigo-500 w-4' : 'bg-slate-700 hover:bg-slate-500'}`}
                        aria-label={`Go to testimonial ${i + 1}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Coding Profiles Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {profileLinks.map((profile) => (
                    <div 
                      key={profile.name}
                      className={`glass-card p-5 rounded-2xl border flex flex-col justify-between space-y-4 ${profile.colorClass}`}
                    >
                      <div>
                        <h4 className="text-sm font-bold text-slate-200">{profile.name}</h4>
                        <span className="text-xs text-slate-400 font-mono block mt-1">@{profile.username}</span>
                        <p className="text-xs text-slate-400 leading-relaxed font-medium mt-2">
                          {profile.desc}
                        </p>
                      </div>

                      <a 
                        href={profile.url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold py-2.5 px-3 rounded-lg transition-all cursor-pointer shrink-0"
                      >
                        <span>Visit {profile.name}</span>
                        <ExternalLink size={12} />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'skills' && (
            <motion.div
              key="skills"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-5"
            >
              {skillsData.map((group) => {
                const Icon = group.icon;
                return (
                  <div
                    key={group.category}
                    className="glass-card p-6 rounded-2xl relative overflow-hidden border border-white/5"
                  >
                    <div className="flex items-center gap-2.5 mb-4 relative z-10">
                      <div className="p-2 bg-white/5 border border-white/10 rounded-lg text-slate-200">
                        <Icon size={16} />
                      </div>
                      <h3 className="text-sm font-bold text-slate-200">{group.category}</h3>
                    </div>

                    <div className="flex flex-wrap gap-1.5 relative z-10">
                      {group.items.map(skill => (
                        <span 
                          key={skill}
                          className="text-xs bg-slate-950/50 hover:bg-indigo-600/10 text-slate-300 hover:text-indigo-300 border border-white/5 hover:border-indigo-500/20 px-2.5 py-1.5 rounded-lg transition-all"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </motion.div>
          )}

          {activeTab === 'experience' && (
            <motion.div
              key="experience"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="relative border-l border-slate-800 ml-4 flex flex-col gap-6"
            >
              {timelineData.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.id} className="relative pl-6 group">
                    <span className="absolute -left-[13px] top-1.5 w-6 h-6 rounded-full border-2 border-slate-950 flex items-center justify-center text-indigo-400 bg-indigo-500/10 z-10">
                      <Icon size={12} />
                    </span>

                    <div className="glass-card p-5 rounded-2xl border border-white/5">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-1">
                        <div>
                          <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded">
                            {item.category}
                          </span>
                          <h3 className="text-base font-bold text-slate-200 mt-2">
                            {item.title}
                          </h3>
                          <p className="text-slate-400 text-xs font-medium mt-0.5">
                            {item.subtitle}
                          </p>
                        </div>
                        
                        <span className="text-xs font-semibold text-slate-400 bg-white/5 px-2.5 py-1 rounded-md self-start md:self-center shrink-0">
                          {item.date}
                        </span>
                      </div>
                      
                      <p className="text-slate-300 text-xs md:text-sm leading-relaxed mt-3 border-t border-white/5 pt-3">
                        {item.details}
                      </p>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          )}

          {activeTab === 'certs' && (
            <motion.div
              key="certs"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-5"
            >
              {certs.map((cert) => (
                <div
                  key={cert.id}
                  onClick={() => setSelectedCert(cert)}
                  className="glass-card p-5 rounded-2xl border border-white/5 cursor-pointer flex flex-col justify-between hover:border-indigo-500/20 transition-all duration-200"
                >
                  <div>
                    <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest block mb-2">
                      VERIFIED CREDENTIAL
                    </span>
                    <h3 className="text-base font-bold text-slate-200 leading-snug">
                      {cert.title}
                    </h3>
                    <p className="text-slate-400 text-xs font-semibold mt-0.5">{cert.issuer}</p>
                    <p className="text-slate-300 text-xs leading-relaxed mt-3">
                      {cert.details}
                    </p>
                  </div>

                  <div className="border-t border-white/5 pt-3 mt-4 flex items-center justify-between text-xs text-slate-400 font-semibold">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={12} />
                      {cert.date}
                    </span>
                    <span className="text-indigo-400 flex items-center gap-1 hover:text-indigo-300">
                      Verify <ChevronRight size={12} />
                    </span>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Certification Verification Drawer / Modal */}
      <AnimatePresence>
        {selectedCert && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCert(null)}
              className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="relative w-full max-w-md max-h-[90vh] overflow-y-auto custom-scrollbar bg-slate-900 border border-white/10 rounded-2xl p-5 md:p-6 shadow-2xl z-10 text-slate-100"
            >
              <button 
                onClick={() => setSelectedCert(null)}
                className="absolute top-4 right-4 p-1.5 hover:bg-white/5 rounded-full text-slate-400 hover:text-slate-100 transition-all cursor-pointer"
              >
                <X size={16} />
              </button>

              <div className="flex flex-col items-center text-center mt-2">
                <Award size={36} className="text-indigo-400 mb-3" />
                <span className="text-[10px] tracking-widest font-extrabold text-slate-400 uppercase">
                  CERTIFICATE CREDENTIAL
                </span>
                
                <h3 className="text-lg font-bold text-slate-200 mt-2.5 px-2">
                  {selectedCert.title}
                </h3>
                
                <p className="text-xs text-slate-400 mt-1 font-semibold">
                  Issued by {selectedCert.issuer}
                </p>
                
                <p className="text-xs text-slate-300 mt-4 leading-relaxed bg-white/5 p-4 rounded-xl border border-white/5">
                  This secure registry record confirms that N.V. Yashwanth successfully completed all evaluations, criteria, and practical benchmarks required for the title of {selectedCert.title}.
                </p>

                <div className="w-full mt-5 pt-4 border-t border-white/5 flex flex-col gap-1.5 items-start font-mono text-xs text-slate-400">
                  <div className="flex justify-between w-full">
                    <span>CREDENTIAL ID:</span>
                    <span className="text-slate-200">{selectedCert.credentialId}</span>
                  </div>
                  <div className="flex justify-between w-full">
                    <span>DATE:</span>
                    <span className="text-slate-200">{selectedCert.date}</span>
                  </div>
                  <div className="flex justify-between w-full">
                    <span>STATUS:</span>
                    <span className="text-emerald-400 font-bold font-sans">✓ Verified Active</span>
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

export default About;
