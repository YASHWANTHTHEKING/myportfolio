import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ArrowLeft, X, Play, Code, CheckCircle, Cpu } from 'lucide-react';

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
    demoState: 'Facial scanning: Active... Emotion: Happy (92%)',
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
    demoState: 'Audio frequency parsed: 44.1kHz... Classification: Joy (88%)',
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
    demoState: 'Registered students: 54... Detected: Yashwanth... Marked Present',
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
    demoState: 'Biometric authorization: Verified... Liveness check: Passed',
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
    demoState: 'Voice prompt: "What is AI?"... TTS Response playing...',
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
    demoState: 'Exam status: Completed... Score: 95/100... Database: Logged',
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
    demoState: 'Tracking: 3 persons... Attention Index: 89% (High)',
    github: 'https://github.com/YASHWANTHTHEKING/smart-attendance-system'
  }
];

const ProjectOverlay = ({ onBack, selectedProjectId, clearSelectedProject }) => {
  const [selectedProject, setSelectedProject] = useState(null);

  // Handle external project selections (e.g. from Command Palette)
  useEffect(() => {
    if (selectedProjectId) {
      const proj = projects.find(p => p.id === selectedProjectId);
      if (proj) {
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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="absolute inset-0 flex items-center justify-center pointer-events-none p-4 z-20"
    >
      <div className="bg-slate-900/60 backdrop-blur-3xl border border-white/10 w-full max-w-5xl h-[85vh] rounded-[2rem] shadow-2xl flex flex-col pointer-events-auto overflow-hidden text-slate-100">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 md:p-8 border-b border-white/5 bg-slate-900/30 backdrop-blur-sm sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button 
              onClick={onBack}
              className="p-3 bg-white/5 hover:bg-indigo-600/20 border border-white/5 rounded-full text-slate-300 hover:text-slate-100 transition-all shadow-sm"
              aria-label="Back to Desk"
            >
              <ArrowLeft size={18} />
            </button>
            <h2 className="text-xl md:text-2xl font-bold tracking-tight">Featured Projects</h2>
          </div>
          <span className="text-xs font-semibold text-slate-400 bg-white/5 border border-white/5 px-4 py-1.5 rounded-full">
            {projects.length} Items
          </span>
        </div>

        {/* Project Grid */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {projects.map((project, idx) => (
              <motion.div 
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + idx * 0.08 }}
                onClick={() => setSelectedProject(project)}
                className="glass-card p-6 rounded-3xl relative overflow-hidden border border-white/5 cursor-pointer hover:border-indigo-500/30 hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full"
              >
                <div className="mb-4 relative z-10">
                  <span className="text-[10px] uppercase font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded">
                    {project.category}
                  </span>
                  
                  <h3 className="text-lg font-bold text-slate-200 mt-3 group-hover:text-indigo-400 transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-slate-400 text-xs leading-relaxed mt-2 line-clamp-3">
                    {project.desc}
                  </p>
                </div>
                
                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5 mb-6 relative z-10">
                  {project.stack.slice(0, 3).map(tech => (
                    <span key={tech} className="text-[9px] font-semibold bg-white/5 border border-white/5 text-slate-400 px-2 py-0.5 rounded-md uppercase tracking-wider">
                      {tech}
                    </span>
                  ))}
                  {project.stack.length > 3 && (
                    <span className="text-[9px] font-semibold bg-white/5 border border-white/5 text-indigo-400 px-2 py-0.5 rounded-md">
                      +{project.stack.length - 3}
                    </span>
                  )}
                </div>
                
                {/* Expand Button indicator */}
                <div className="mt-auto pt-4 flex items-center justify-between border-t border-white/5 text-xs text-indigo-400 font-semibold group-hover:text-indigo-300 transition-colors">
                  <span>Explore Architecture</span>
                  <ExternalLink size={14} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>

      {/* Detailed Fullscreen Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-10 pointer-events-auto">
            {/* Modal backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="absolute inset-0 bg-slate-950/70 backdrop-blur-md"
            />
            
            {/* Modal Content Box */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 25 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="relative w-full max-w-4xl max-h-[85vh] bg-slate-900 border border-white/10 rounded-[2rem] shadow-2xl flex flex-col overflow-hidden text-slate-100"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/5 bg-slate-950/30 sticky top-0 z-10">
                <div>
                  <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">
                    {selectedProject.category}
                  </span>
                  <h2 className="text-xl md:text-2xl font-bold text-slate-100 mt-1">
                    {selectedProject.title}
                  </h2>
                </div>
                
                <button 
                  onClick={handleCloseModal}
                  className="p-2 hover:bg-white/5 border border-white/5 rounded-full text-slate-400 hover:text-slate-100 transition-all"
                  aria-label="Close details"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar space-y-8">
                
                {/* Description */}
                <div>
                  <h3 className="text-xs uppercase font-bold text-slate-400 tracking-wider mb-2">Description</h3>
                  <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                    {selectedProject.desc}
                  </p>
                </div>

                {/* Tech Stack List */}
                <div>
                  <h3 className="text-xs uppercase font-bold text-slate-400 tracking-wider mb-3">Technologies Used</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.stack.map(tech => (
                      <span key={tech} className="text-xs font-semibold bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 px-3.5 py-1.5 rounded-xl uppercase tracking-wider">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Interactive Demo Simulator (Looks extremely premium!) */}
                <div className="glass-card p-6 rounded-3xl border border-white/5 bg-black/40 overflow-hidden relative">
                  <div className="absolute top-2 right-4 flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/80"></span>
                  </div>
                  <h3 className="text-xs uppercase font-bold text-indigo-400 tracking-wider flex items-center gap-1.5 mb-4">
                    <Play size={12} className="animate-pulse" />
                    Live Demo Simulator
                  </h3>
                  
                  <div className="font-mono text-xs md:text-sm text-green-400/90 space-y-1">
                    <p className="text-slate-500">// Simulating project engine runtime</p>
                    <p className="text-indigo-400">$ npm run start:dev</p>
                    <p className="text-slate-400">&gt; Starting local webserver at http://localhost:3000...</p>
                    <p className="text-slate-400">&gt; Loading machine learning weights...</p>
                    <p className="text-emerald-400">✓ System status: Online [Active]</p>
                    <p className="text-slate-300 font-bold border-l-2 border-indigo-500 pl-3.5 py-1 my-3 bg-white/5 rounded">
                      {selectedProject.demoState}
                    </p>
                  </div>
                </div>

                {/* System Architecture */}
                <div>
                  <h3 className="text-xs uppercase font-bold text-slate-400 tracking-wider mb-3 flex items-center gap-2">
                    <Cpu size={14} className="text-indigo-400" />
                    System Architecture Flow
                  </h3>
                  <div className="bg-white/5 border border-white/5 rounded-2xl p-4 font-medium text-xs md:text-sm text-slate-300 leading-relaxed">
                    {selectedProject.architecture}
                  </div>
                </div>

                {/* Features & Key Challenges */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="glass-card p-5 rounded-2xl border border-white/5">
                    <h4 className="text-xs uppercase font-bold text-emerald-400 tracking-wider mb-3 flex items-center gap-1.5">
                      <CheckCircle size={14} />
                      Key Features
                    </h4>
                    <ul className="text-slate-300 text-xs md:text-sm space-y-2 list-disc list-inside">
                      {selectedProject.features.map((feature, i) => (
                        <li key={i}>{feature}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="glass-card p-5 rounded-2xl border border-white/5">
                    <h4 className="text-xs uppercase font-bold text-indigo-400 tracking-wider mb-3 flex items-center gap-1.5">
                      <Cpu size={14} />
                      Challenges & Resolution
                    </h4>
                    <p className="text-slate-300 text-xs md:text-sm leading-relaxed">
                      {selectedProject.challenges}
                    </p>
                  </div>
                </div>

              </div>

              {/* Modal Footer (Code / Live Buttons) */}
              <div className="flex items-center justify-between p-6 border-t border-white/5 bg-slate-950/30 sticky bottom-0 z-10">
                <a 
                  href={selectedProject.github} 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center gap-2 text-sm font-semibold text-slate-300 hover:text-slate-100 transition-colors"
                >
                  <Github size={18} /> View Source Code
                </a>
                
                <a 
                  href="#"
                  className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-lg shadow-indigo-600/10 hover:shadow-indigo-600/25 transition-all"
                >
                  Launch Simulator <ExternalLink size={14} />
                </a>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ProjectOverlay;
