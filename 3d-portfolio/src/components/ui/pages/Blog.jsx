import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Calendar, Clock, BookOpen, ArrowLeft, ArrowRight, User } from 'lucide-react';

const articles = [
  {
    id: 1,
    title: 'Building Face Liveness Detection with Python & OpenCV',
    category: 'Computer Vision',
    date: 'May 12, 2025',
    readTime: '6 min read',
    summary: 'A deep-dive tutorial explaining how to protect biometric interfaces against spoofing attacks using face mesh and Eye Aspect Ratio thresholds.',
    content: `## Face Liveness Verification System

Biometric verification interfaces are highly vulnerable to presentation attacks (photos, videos shown to the lens). To circumvent this, we can implement eye blink triggers by analyzing localized landmarks.

### Landmark Extraction using Mediapipe
We extract indices for the eye contours to compute the Eye Aspect Ratio (EAR):

\`\`\`python
# Python snippet for EAR computation
def compute_ear(eye_landmarks):
    # Vertical distances
    A = dist.euclidean(eye_landmarks[1], eye_landmarks[5])
    B = dist.euclidean(eye_landmarks[2], eye_landmarks[4])
    # Horizontal distance
    C = dist.euclidean(eye_landmarks[0], eye_landmarks[3])
    
    # Calculate Eye Aspect Ratio
    ear = (A + B) / (2.0 * C)
    return ear
\`\`\`

When the EAR drops below a specific threshold (typically \`0.22\`) and remains there for 2-3 frames before bouncing back, it is logged as a valid physical blink.`,
  },
  {
    id: 2,
    title: 'An Introduction to Graph Databases & Neo4j Cypher Optimization',
    category: 'Databases',
    date: 'March 28, 2025',
    readTime: '8 min read',
    summary: 'Learn Cypher query syntax basics and best practices for optimizing index queries, relations matching, and node routing algorithms.',
    content: `## Cypher Query Optimizations in Neo4j

Relational database joins scale exponentially on complex connections. Graph databases solve this by storing direct relation pointers.

### Index Creation and Traversal
To search nodes efficiently, we construct constraints and use indexed labels:

\`\`\`cypher
// Create a unique index for user identities
CREATE CONSTRAINT FOR (u:User) REQUIRE u.id IS UNIQUE;

// Match recommendations based on social connections
MATCH (u:User {id: "yashwanth"})-[:FOLLOWS]->(f:User)-[:LIKES]->(m:Music)
WHERE NOT (u)-[:LIKES]->(m)
RETURN m.title, COUNT(*) AS recommendationScore
ORDER BY recommendationScore DESC
LIMIT 5;
\`\`\`

By ensuring relationships have explicit directions, the graph engine skips scanning whole node pools.`,
  },
  {
    id: 3,
    title: 'Understanding Convolutional Neural Networks (CNN) for Audio Classification',
    category: 'Deep Learning',
    date: 'January 15, 2025',
    readTime: '10 min read',
    summary: 'How to convert Mel WAV files into Mel Spectrogram images and feed them into a 2D CNN model for vocal sentiment classification.',
    content: `## Audio CNN Classification Pipeline

Raw audio waveform files are complex and non-stationary. By computing short-time Fourier transforms, we convert vocal patterns into images.

### Spectrogram Feature Processing with Librosa
We load the waveforms and calculate Mel representation features:

\`\`\`python
import librosa
import numpy as np

# Load audio waveform
y, sr = librosa.load("sample.wav", sr=22050)

# Compute Mel Spectrogram representation
mel_spec = librosa.feature.melspectrogram(y=y, sr=sr, n_mels=128)
mel_db = librosa.power_to_db(mel_spec, ref=np.max)
\`\`\`

These 2D images are fed into standard convolutional layers, treating emotional audio features similarly to spatial image structures.`,
  }
];

const Blog = () => {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Computer Vision', 'Databases', 'Deep Learning'];

  const filteredArticles = articles.filter(art => {
    const matchesSearch = art.title.toLowerCase().includes(search.toLowerCase()) || 
                          art.summary.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || art.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="max-w-4xl mx-auto px-4 md:px-8 py-6 text-slate-100"
    >
      <AnimatePresence mode="wait">
        {!selectedArticle ? (
          // 1. Article List view
          <motion.div 
            key="list"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-2 tracking-tight">
                Latest Articles
              </h2>
              <p className="text-slate-400 text-sm max-w-xl">
                Sharing my notes, tech reviews, and computer science engineering insights.
              </p>
            </div>

            {/* Filter controls */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
              {/* Categories */}
              <div className="flex flex-wrap gap-2">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`text-xs px-3.5 py-1.5 rounded-md border transition-all font-semibold uppercase tracking-wider cursor-pointer ${selectedCategory === cat ? 'bg-accent-primary border-accent-primary text-[#0f1210]' : 'bg-white/5 border-white/5 text-slate-400 hover:text-slate-200'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Search Box */}
              <div className="flex items-center gap-2 bg-white/5 border border-white/5 px-3 py-2 rounded-md w-full sm:w-64">
                <Search size={14} className="text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search articles..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="bg-transparent border-none text-xs text-slate-100 placeholder-slate-400 focus:outline-none w-full font-sans"
                />
              </div>
            </div>

            {/* List */}
            <div className="space-y-4">
              {filteredArticles.length === 0 ? (
                <div className="text-center py-16 text-slate-400 font-semibold text-sm">
                  No articles found matching filters.
                </div>
              ) : (
                filteredArticles.map((art) => (
                  <div
                    key={art.id}
                    onClick={() => setSelectedArticle(art)}
                    className="glass-card p-6 rounded-md border border-white/5 cursor-pointer flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs text-slate-400 font-semibold mb-3">
                        <span className="text-accent-primary uppercase tracking-widest bg-accent-primary/10 border border-accent-primary/15 px-2 py-0.5 rounded">
                          {art.category}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="flex items-center gap-1"><Calendar size={12} /> {art.date}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1"><Clock size={12} /> {art.readTime}</span>
                        </div>
                      </div>

                      <h3 className="text-base md:text-lg font-bold text-slate-200 mt-2">
                        {art.title}
                      </h3>
                      <p className="text-slate-400 text-xs md:text-sm mt-2 leading-relaxed">
                        {art.summary}
                      </p>
                    </div>

                    <div className="border-t border-white/5 pt-3.5 mt-4 flex items-center justify-end text-xs text-accent-primary font-semibold">
                      <span className="flex items-center gap-1">Read Article <ArrowRight size={13} /></span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        ) : (
          // 2. Article Reader view
          <motion.div 
            key="reader"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Header / Actions */}
            <div className="flex items-center justify-between">
              <button 
                onClick={() => setSelectedArticle(null)}
                className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-slate-200 bg-white/5 border border-white/5 px-4 py-2.5 rounded-md transition-all cursor-pointer"
              >
                <ArrowLeft size={14} /> Back to Articles
              </button>

              <span className="text-xs text-accent-primary uppercase tracking-widest font-bold bg-accent-primary/10 px-3 py-1.5 rounded-md">
                {selectedArticle.category}
              </span>
            </div>

            {/* Article Card */}
            <div className="glass-card p-6 md:p-8 rounded-md border border-white/5 space-y-6">
              {/* Meta */}
              <div className="flex items-center gap-4 text-xs text-slate-400 font-semibold border-b border-white/5 pb-4">
                <span className="flex items-center gap-1.5"><Calendar size={13} /> {selectedArticle.date}</span>
                <span>•</span>
                <span className="flex items-center gap-1.5"><Clock size={13} /> {selectedArticle.readTime}</span>
                <span>•</span>
                <span className="flex items-center gap-1.5"><User size={13} /> By Yashwanth</span>
              </div>

              {/* Title */}
              <h1 className="text-xl md:text-3xl font-bold text-slate-100 tracking-tight leading-tight">
                {selectedArticle.title}
              </h1>

              {/* Markdown Content (Rendered dynamically) */}
              <div className="prose prose-invert max-w-none text-slate-300 text-xs md:text-sm leading-relaxed space-y-4 font-sans font-medium">
                {selectedArticle.content.split('\n\n').map((block, i) => {
                  if (block.startsWith('## ')) {
                    return <h2 key={i} className="text-base md:text-lg font-bold text-slate-100 mt-6 pt-4 border-t border-white/5">{block.replace('## ', '')}</h2>;
                  }
                  if (block.startsWith('### ')) {
                    return <h3 key={i} className="text-sm md:text-base font-bold text-slate-200 mt-4">{block.replace('### ', '')}</h3>;
                  }
                  if (block.startsWith('```')) {
                    const lines = block.split('\n');
                    const lang = lines[0].replace('```', '');
                    const code = lines.slice(1, -1).join('\n');
                    return (
                      <div key={i} className="bg-black/40 border border-white/5 rounded-md p-4 my-4 font-mono text-xs text-accent-primary overflow-x-auto custom-scrollbar relative">
                        <div className="absolute top-2 right-4 text-xs uppercase font-bold text-slate-400 select-none">
                          {lang || 'code'}
                        </div>
                        <pre className="outline-none"><code>{code}</code></pre>
                      </div>
                    );
                  }
                  return <p key={i}>{block}</p>;
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Blog;
