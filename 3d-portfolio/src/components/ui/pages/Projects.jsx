import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, X, Code, CheckCircle, Cpu, BookOpen, FileText } from 'lucide-react';

const Github = ({ size = 20, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
);

const projects = [
  {
    id: 1,
    title: 'Mood-Based Music Recommendation',
    category: 'Computer Vision & AI',
    stack: ['Python', 'OpenCV', 'TensorFlow', 'Spotify API', 'React'],
    desc: 'Analyzes user facial expressions in real-time to detect mood states and automatically recommends curated Spotify playlists matching their emotional state.',
    architecture: 'Webcam Stream → OpenCV Haar Cascade (Face Detection) → Deep CNN (Emotion Classification: Happy/Sad/Angry/Neutral) → Spotipy Client API → Dynamic Playlist Player UI',
    challenges: 'Handling variable lightning conditions and multi-face overlaps in webcam feeds. Resolved by implementing adaptive histogram equalization preprocessing.',
    features: ['Real-time facial expression tracking', 'Emotion prediction confidence meters', 'Spotify SDK integration', 'Emotion history charts'],
    github: 'https://github.com/YASHWANTHTHEKING/media-player'
  },
  {
    id: 2,
    title: 'Speech Emotion Recognition',
    category: 'Machine Learning & DSP',
    stack: ['Python', 'PyTorch', 'Librosa', 'Scikit-learn', 'FastAPI'],
    desc: 'An audio processing model that classifies speech waveforms into distinct emotional states (anger, joy, sadness, fear) using CNNs trained on RAVDESS and SAVEE datasets.',
    architecture: 'Microphone Audio Input → Librosa DSP (MFCC & Chroma Feature Extraction) → Convolutional Neural Network (PyTorch) → Softmax Classification → API Response',
    challenges: 'Overfitting due to limited speech datasets. Solved by implementing dynamic audio data augmentation (time-stretching, pitch-shifting, noise injection).',
    features: ['Waveform feature extraction visualizations', 'Real-time audio upload & parsing', 'Multi-class classification indicators', 'Support for WAV & MP3 formats'],
    github: 'https://github.com/YASHWANTHTHEKING/candidate-screening-bot'
  },
  {
    id: 3,
    title: 'Face Recognition Attendance System',
    category: 'Computer Vision & Database',
    stack: ['Python', 'OpenCV', 'Face Recognition Library', 'MySQL', 'Tkinter'],
    desc: 'A classroom attendance automation tool that scans video feeds, recognizes registered students, and updates a secure SQL database with timestamps.',
    architecture: 'IP Camera RTSP Stream → HOG Face Detector (dlib) → 128D Face Embeddings calculation → Euclidean Distance classification → MySQL Database transaction',
    challenges: 'Optimizing recognition speed for 60+ simultaneous students. Solved by frame-skipping (processing every 3rd frame) and multi-threading the database write queues.',
    features: ['Dual-camera input routing', 'Secure database record keeping', 'Export logs as CSV/Excel', 'Automatic registration console'],
    github: 'https://github.com/YASHWANTHTHEKING/smart-attendance-system'
  },
  {
    id: 4,
    title: 'Healthcare Biometric Authentication',
    category: 'AI & Security',
    stack: ['Python', 'PyTorch', 'Cryptography', 'MySQL', 'Node.js'],
    desc: 'A secure access portal utilizing biometrics (facial structures, iris scanning metrics) paired with AES-256 encryption to protect medical databases.',
    architecture: 'Biometric Scanner → Deep Biometric Encoder → High-Entropy Key Derivation → AES-256 Decryption of Health Records → Role-based Access Control',
    challenges: 'Preventing spoofing attacks (e.g., photos shown to camera). Resolved by adding a blinking liveness check using Eye Aspect Ratio (EAR) thresholds.',
    features: ['Biometric spoofing detection', 'End-to-end encrypted databases', 'Instant revoke tokens', 'Detailed audit logs for healthcare staff'],
    github: 'https://github.com/YASHWANTHTHEKING/candidate'
  },
  {
    id: 5,
    title: 'Virtual Voice Assistant',
    category: 'Natural Language Processing',
    stack: ['Python', 'SpeechRecognition', 'Pyttsx3', 'Wikipedia API', 'OS Lib'],
    desc: 'A localized NLP-driven desktop assistant capable of opening utilities, web surfing, taking notes, and reading system logs via spoken commands.',
    architecture: 'Microphone Audio → Google Speech Recognition API → Keyword Parser / NLP Engine → Command Execution Hook → Text-to-Speech (TTS Engine)',
    challenges: 'Executing asynchronous background routines while keeping the microphone responsive. Resolved with standard threading pools in Python.',
    features: ['Offline TTS synthesis', 'System level shortcuts integration', 'Smart fallback for web queries', 'Low CPU idle consumption'],
    github: 'https://github.com/YASHWANTHTHEKING/realtimechatgptsearch'
  },
  {
    id: 6,
    title: 'Quiz Management System',
    category: 'Software Engineering',
    stack: ['Java', 'MySQL', 'Java Swing', 'JDBC'],
    desc: 'A comprehensive educational platform for hosting, grading, and cataloging scholastic exams and quizzes, built using solid object-oriented principles.',
    architecture: 'Java Swing GUI → JDBC Controller → MySQL Relational DB (Questions, Users, Scores, Logs schema) → Reporting Module',
    challenges: 'Preventing application crash during concurrent local database calls. Resolved using connection pool limits and transactional isolation levels.',
    features: ['Admin dashboards for creating questions', 'Automatic immediate grading engines', 'Visual score progression charts', 'Time-limited session limits'],
    github: 'https://github.com/YASHWANTHTHEKING/api-test-generator'
  },
  {
    id: 7,
    title: 'Real-Time Multi-Face Attentiveness Detection',
    category: 'Computer Vision & Deep Learning',
    stack: ['Python', 'OpenCV', 'Mediapipe', 'TensorFlow', 'React'],
    desc: 'Monitors student or driver attentiveness levels in real-time by analyzing gaze direction, head pose yaw/pitch/roll, and blinking frequencies.',
    architecture: 'Video Capture → Mediapipe Face Mesh (468 landmarks) → Gaze Angle & Head Pose vectors math → Neural Network classifier → Attentiveness Score output',
    challenges: 'Converting raw 3D face mesh coordinates to actual angular gaze vectors. Solved using perspective-n-point (PnP) pose solving algorithms.',
    features: ['Multi-person tracking', 'Attention metrics dashboard', 'Auditory alerts for drowsiness', 'Dynamic report generation'],
    github: 'https://github.com/YASHWANTHTHEKING/smart-attendance-system'
  }
];

const researchPapers = [
  {
    id: 1,
    title: 'A Comparative Literature Survey on Face Attentiveness Detection Systems',
    domain: 'Computer Vision & Education',
    abstract: 'Synthesizes computational approaches evaluating student engagement. Compares convolution-based networks with vision transformers (ViTs) on head pose yaw/roll and gaze tracking algorithms.',
    date: '2025 Study',
    status: 'Literature Survey Published'
  },
  {
    id: 2,
    title: 'Secure Healthcare Data Acquisition & Cryptographic Hashing models',
    domain: 'Security & Health Informatics',
    abstract: 'Outlines architectures for safe acquisition of biometric health files. Integrates zero-knowledge hashes with cloud-encrypted records to enforce patient-consented access credentials.',
    date: '2024 Project',
    status: 'Research Working Paper'
  },
  {
    id: 3,
    title: 'Anti-Spoofing & Liveness Detection in Low-Cost Biometric Authentication',
    domain: 'AI & Security',
    abstract: 'Investigates low-latency eye aspect ratio (EAR) thresholds and micro-expression frequency to prevent photo and video replay biometric attacks on resource-constrained devices.',
    date: '2024 Research',
    status: 'Technical Project Review'
  }
];

const Projects = ({ selectedProjectId, clearSelectedProject }) => {
  const [activeTab, setActiveTab] = useState('projects'); // projects, research
  const [selectedProject, setSelectedProject] = useState(null);

  // Handle external project selections (e.g. from Command Palette)
  useEffect(() => {
    if (selectedProjectId) {
      const proj = projects.find(p => p.id === selectedProjectId);
      if (proj) {
        setActiveTab('projects');
        setSelectedProject(proj);
      }
    }
  }, [selectedProjectId]);

  const handleCloseModal = () => {
    setSelectedProject(null);
    if (clearSelectedProject) {
      clearSelectedProject();
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="max-w-5xl mx-auto px-4 md:px-8 py-6 text-slate-100"
    >
      <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2 mb-6">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-100">
            Portfolio Work
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Software projects and academic research outputs built using AI/ML, computer vision, and full-stack systems.
          </p>
        </div>
      </div>

      {/* Tab Switcher */}
      <div className="flex border-b border-white/10 mb-8 gap-1.5">
        <button
          onClick={() => setActiveTab('projects')}
          className={`px-4 py-2.5 text-sm font-semibold tracking-wide border-b-2 transition-all cursor-pointer ${activeTab === 'projects' ? 'border-accent-primary text-accent-primary' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
        >
          Featured Projects ({projects.length})
        </button>
        <button
          onClick={() => setActiveTab('research')}
          className={`px-4 py-2.5 text-sm font-semibold tracking-wide border-b-2 transition-all cursor-pointer ${activeTab === 'research' ? 'border-accent-primary text-accent-primary' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
        >
          Academic Research ({researchPapers.length})
        </button>
      </div>

      {/* Grid Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'projects' ? (
          <motion.div 
            key="projects"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {projects.map((project) => (
              <div 
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="glass-card p-6 rounded-md border border-white/5 cursor-pointer flex flex-col justify-between hover:border-accent-primary/20 hover:scale-[1.01] transition-all"
              >
                <div>
                  <span className="text-xs font-bold text-accent-primary bg-accent-primary/10 px-2.5 py-0.5 rounded uppercase tracking-wider">
                    {project.category}
                  </span>
                  
                  <h3 className="text-lg font-bold text-slate-200 mt-3 leading-snug">
                    {project.title}
                  </h3>
                  
                  {/* Lead with Description/Impact */}
                  <p className="text-slate-300 text-xs md:text-sm leading-relaxed mt-2.5 mb-5 font-sans font-medium line-clamp-3">
                    {project.desc}
                  </p>
                </div>
                
                {/* Tech Stack List */}
                <div className="flex flex-wrap gap-1.5 border-t border-white/5 pt-4 mt-auto">
                  {project.stack.map(tech => (
                    <span key={tech} className="text-xs bg-white/5 border border-white/5 text-slate-400 px-2 py-0.5 rounded uppercase tracking-wider font-semibold">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            key="research"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            {researchPapers.map((paper) => (
              <div 
                key={paper.id}
                className="glass-card p-6 rounded-md border border-white/5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start flex-wrap gap-2 mb-3">
                    <div>
                      <span className="text-xs font-bold text-accent-primary bg-accent-primary/10 px-2.5 py-0.5 rounded uppercase tracking-wider">
                        {paper.domain}
                      </span>
                      <h3 className="text-base md:text-lg font-bold text-slate-200 mt-2.5 leading-snug">
                        {paper.title}
                      </h3>
                    </div>
                    
                    <span className="text-xs font-bold text-slate-400 bg-white/5 px-2.5 py-1 rounded">
                      {paper.date}
                    </span>
                  </div>

                  <p className="text-slate-300 text-xs md:text-sm leading-relaxed mb-4">
                    {paper.abstract}
                  </p>
                </div>

                <div className="flex justify-between items-center border-t border-white/5 pt-4 text-xs font-semibold">
                  <span className="text-accent-primary flex items-center gap-1.5">
                    <FileText size={14} />
                    {paper.status}
                  </span>
                  
                  <span className="flex items-center gap-1 text-slate-400 hover:text-slate-200 cursor-pointer">
                    Read Document <ChevronRight size={14} />
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            {/* Modal backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm"
            />
            
            {/* Modal Content Box */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="relative w-full max-w-3xl max-h-[90vh] bg-slate-900 border border-white/10 rounded-md flex flex-col overflow-hidden text-slate-100 z-10"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 md:p-6 border-b border-white/5 bg-slate-950/30">
                <div>
                  <span className="text-xs font-bold text-accent-primary uppercase tracking-wider">
                    {selectedProject.category}
                  </span>
                  <h2 className="text-lg md:text-xl font-bold text-slate-100 mt-1">
                    {selectedProject.title}
                  </h2>
                </div>
                
                <button 
                  onClick={handleCloseModal}
                  className="p-1.5 hover:bg-white/5 border border-white/5 rounded-full text-slate-400 hover:text-slate-100 transition-all cursor-pointer"
                  aria-label="Close details"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 custom-scrollbar text-xs md:text-sm">
                
                {/* Description */}
                <div>
                  <h3 className="text-xs uppercase font-bold text-slate-400 tracking-wider mb-1.5">Description & Impact</h3>
                  <p className="text-slate-300 leading-relaxed font-medium">
                    {selectedProject.desc}
                  </p>
                </div>

                {/* Tech Stack List */}
                <div>
                  <h3 className="text-xs uppercase font-bold text-slate-400 tracking-wider mb-2.5">Technologies Used</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.stack.map(tech => (
                      <span key={tech} className="text-xs font-semibold bg-accent-primary/10 border border-accent-primary/20 text-accent-primary px-3 py-1 rounded-lg uppercase tracking-wider">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* System Architecture */}
                {selectedProject.architecture && (
                  <div>
                    <h3 className="text-xs uppercase font-bold text-slate-400 tracking-wider mb-2 flex items-center gap-1.5">
                      <Cpu size={14} className="text-accent-primary" />
                      System Architecture Flow
                    </h3>
                    <div className="bg-white/5 border border-white/5 rounded-md p-4 font-mono text-xs text-slate-300 leading-relaxed">
                      {selectedProject.architecture}
                    </div>
                  </div>
                )}

                {/* Features & Key Challenges */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="glass-card p-5 rounded-md border border-white/5">
                    <h4 className="text-xs uppercase font-bold text-accent-primary tracking-wider mb-2.5 flex items-center gap-1.5">
                      <CheckCircle size={14} />
                      Key Features
                    </h4>
                    <ul className="text-slate-300 space-y-1.5 list-disc list-inside">
                      {selectedProject.features.map((feature, i) => (
                        <li key={i}>{feature}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="glass-card p-5 rounded-md border border-white/5">
                    <h4 className="text-xs uppercase font-bold text-accent-primary tracking-wider mb-2.5 flex items-center gap-1.5">
                      <Cpu size={14} />
                      Challenges & Resolution
                    </h4>
                    <p className="text-slate-300 leading-relaxed font-medium">
                      {selectedProject.challenges}
                    </p>
                  </div>
                </div>

              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-between p-4 md:p-6 border-t border-white/5 bg-slate-950/30">
                <a 
                  href={selectedProject.github} 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center gap-2 text-xs md:text-sm font-semibold text-slate-300 hover:text-slate-100 transition-colors cursor-pointer"
                >
                  <Github size={16} /> View Source Code
                </a>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Projects;
