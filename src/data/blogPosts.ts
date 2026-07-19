// Blog post data — AI/ML articles written by N. V. Yashwanth

export interface BlogPost {
  slug: string
  title: string
  subtitle: string
  date: string
  readTime: string
  tags: string[]
  excerpt: string
  content: string // markdown-like sections as HTML string
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'understanding-large-language-models',
    title: 'Understanding Large Language Models: From Tokens to Intelligence',
    subtitle: 'A deep dive into how LLMs like GPT and Gemini actually work under the hood',
    date: 'July 15, 2025',
    readTime: '8 min read',
    tags: ['LLMs', 'NLP', 'AI', 'Deep Learning'],
    excerpt:
      'Large Language Models are reshaping how we interact with software. But what actually happens when you type a prompt? This article breaks down transformers, tokenization, and attention mechanisms in plain language.',
    content: `
<h2>What is a Large Language Model?</h2>
<p>A Large Language Model (LLM) is a neural network trained on massive datasets of text with one goal: predict the next token. That's it. The emergent capabilities — reasoning, coding, answering questions — arise from doing that simple task at enormous scale.</p>
<p>Models like Google's Gemini, OpenAI's GPT-4, and Meta's LLaMA are all variations of the <strong>Transformer architecture</strong>, introduced in the 2017 paper "Attention Is All You Need."</p>

<h2>Tokenization: How Text Becomes Numbers</h2>
<p>Before an LLM processes text, it must convert it into numbers. This is done through <strong>tokenization</strong>. The word "unbelievable" might be split into tokens: ["un", "believ", "able"]. Each token maps to an integer ID.</p>
<p>Common tokenizers like BPE (Byte Pair Encoding) learn which character sequences appear frequently and group them. This is why GPT-4 has a vocabulary of ~100,000 tokens.</p>

<h2>The Attention Mechanism</h2>
<p>The core innovation of Transformers is <strong>self-attention</strong>. For every token, the model asks: "Which other tokens in this sequence are most relevant to understanding me?" It then creates a weighted sum of all token representations, focusing on the most relevant ones.</p>
<p>Mathematically, attention is computed as:</p>
<pre><code>Attention(Q, K, V) = softmax(QK^T / √d_k) · V</code></pre>
<p>Where Q (queries), K (keys), and V (values) are learned linear projections of the input. <strong>Multi-head attention</strong> runs this in parallel across many "heads", allowing the model to attend to different aspects simultaneously.</p>

<h2>Training at Scale</h2>
<p>LLMs are pre-trained using <strong>next-token prediction</strong> (autoregressive language modeling) on trillions of tokens scraped from the internet, books, and code repositories. After pre-training, models go through:</p>
<ul>
<li><strong>Supervised Fine-Tuning (SFT)</strong> — trained on high-quality instruction-response pairs</li>
<li><strong>RLHF (Reinforcement Learning from Human Feedback)</strong> — humans rank outputs, and the model is optimized to produce higher-ranked responses</li>
</ul>

<h2>Prompt Engineering: Your Interface to Intelligence</h2>
<p>Since we can't retrain LLMs for every use case, <strong>prompt engineering</strong> is the skill of crafting inputs that elicit the best outputs. Key techniques:</p>
<ul>
<li><strong>Zero-shot</strong>: Ask directly without examples</li>
<li><strong>Few-shot</strong>: Provide 2–5 examples in the prompt</li>
<li><strong>Chain-of-Thought</strong>: Ask the model to "think step by step"</li>
<li><strong>System prompts</strong>: Set the model's persona and constraints</li>
</ul>

<h2>My Experience with the Gemini API</h2>
<p>While building the AI Resume Analyzer, I used Google's Gemini API to extract structured information from unstructured PDF resumes. The key was crafting a system prompt that instructed Gemini to return valid JSON with specific fields — skills, experience, education — and then validating the output with Pydantic models.</p>
<p>LLMs are powerful but non-deterministic. For production systems, always validate outputs and build fallback logic.</p>

<h2>Key Takeaway</h2>
<p>LLMs aren't magic — they're extraordinarily sophisticated pattern matchers trained on human knowledge. Understanding the architecture helps you use them more effectively, debug failures, and know their limitations.</p>
    `,
  },
  {
    slug: 'computer-vision-opencv-face-recognition',
    title: 'Building a Face Recognition System with OpenCV and Python',
    subtitle: 'How I built an automated attendance system using classical computer vision',
    date: 'June 28, 2025',
    readTime: '6 min read',
    tags: ['Computer Vision', 'OpenCV', 'Python', 'Face Recognition'],
    excerpt:
      `Face recognition seems like magic, but it's built on decades of research in linear algebra, signal processing, and machine learning. Here's how I built a real-time attendance system from scratch.`,
    content: `
<h2>Why Face Recognition?</h2>
<p>Manual attendance is slow, error-prone, and easy to manipulate (proxy attendance). A face recognition system eliminates all three problems — it's fast, accurate, and you can't send a friend to mark your attendance.</p>

<h2>The Computer Vision Pipeline</h2>
<p>A face recognition system works in stages:</p>
<ol>
<li><strong>Face Detection</strong> — Find where faces are in an image</li>
<li><strong>Alignment</strong> — Normalize face position and scale</li>
<li><strong>Feature Extraction</strong> — Convert the face to a compact numerical representation (embedding)</li>
<li><strong>Recognition</strong> — Compare embeddings to identify the person</li>
</ol>

<h2>Face Detection with HOG</h2>
<p>The <code>face_recognition</code> library (built on dlib) uses a <strong>Histogram of Oriented Gradients (HOG)</strong> + linear SVM to detect faces. HOG works by:</p>
<ol>
<li>Computing gradient directions for every pixel</li>
<li>Grouping pixels into cells and creating gradient histograms</li>
<li>Sliding a window across the image and classifying HOG features</li>
</ol>
<p>It's fast, accurate, and doesn't need a GPU — perfect for real-time webcam feeds.</p>

<h2>Face Embeddings: 128 Numbers Per Face</h2>
<p>dlib's face recognition model converts a face into a <strong>128-dimensional embedding vector</strong>. This is learned by training a deep neural network on millions of face pairs — the network learns to produce similar vectors for the same person and different vectors for different people.</p>
<pre><code>import face_recognition
import numpy as np

# Load known face
known_image = face_recognition.load_image_file("student.jpg")
known_encoding = face_recognition.face_encodings(known_image)[0]
# known_encoding is a numpy array of shape (128,)
</code></pre>

<h2>Recognition via Euclidean Distance</h2>
<p>To recognize a face, compute the Euclidean distance between the unknown face's embedding and all known embeddings. If the distance is below a threshold (~0.6), it's a match.</p>
<pre><code>results = face_recognition.compare_faces(known_encodings, unknown_encoding, tolerance=0.6)
distances = face_recognition.face_distance(known_encodings, unknown_encoding)
best_match_idx = np.argmin(distances)
</code></pre>

<h2>Real-time with OpenCV</h2>
<p>OpenCV captures frames from the webcam at ~30 FPS. For performance, I process every other frame and scale down by 25% before recognition, then scale bounding boxes back up for display.</p>

<h2>Lessons Learned</h2>
<ul>
<li><strong>Lighting matters enormously</strong> — bad lighting kills accuracy more than anything else</li>
<li><strong>More training images = better accuracy</strong> — use 5–10 photos per student from different angles</li>
<li><strong>HOG is CPU-bound</strong> — for large classrooms, consider switching to a CNN detector on GPU</li>
<li><strong>Privacy first</strong> — always store face embeddings, never raw face images in production</li>
</ul>
    `,
  },
  {
    slug: 'knowledge-graphs-neo4j-healthcare',
    title: 'Knowledge Graphs in Healthcare: Why Relationships Matter',
    subtitle: 'How I used Neo4j to model medical entities during my internship',
    date: 'June 10, 2025',
    readTime: '7 min read',
    tags: ['Neo4j', 'Knowledge Graphs', 'Healthcare', 'Graph Databases'],
    excerpt:
      'Traditional relational databases model data in tables. But medical data is fundamentally about relationships — diseases cause symptoms, drugs treat conditions, patients have histories. Knowledge graphs are the natural fit.',
    content: `
<h2>The Problem with Relational Databases in Healthcare</h2>
<p>In a SQL database, to find "all drugs that treat diseases caused by the BRCA1 gene mutation", you'd write complex multi-table JOINs across dozens of tables. The query is slow, brittle, and hard to maintain as the schema evolves.</p>
<p>Healthcare data is naturally a <strong>graph</strong>: patients, diseases, symptoms, drugs, genes, and clinical studies are all nodes. The relationships between them — treats, causes, interacts_with, contraindicated_in — are the real information.</p>

<h2>What is a Knowledge Graph?</h2>
<p>A knowledge graph represents information as triples: <strong>(Subject) → [Relationship] → (Object)</strong>.</p>
<ul>
<li>(Metformin) → [TREATS] → (Type 2 Diabetes)</li>
<li>(Type 2 Diabetes) → [CAUSES] → (Hyperglycemia)</li>
<li>(Insulin) → [INTERACTS_WITH] → (Metformin)</li>
</ul>
<p>Connecting these triples creates a rich semantic network that can answer complex questions efficiently.</p>

<h2>Neo4j: The Graph Database</h2>
<p>Neo4j stores data as nodes and relationships natively — not as an abstraction on top of tables. This means graph traversal queries run in <strong>O(relationship count)</strong> not <strong>O(table size)</strong>.</p>
<p>The query language is <strong>Cypher</strong>, which reads almost like natural language:</p>
<pre><code>// Find all drugs that treat diseases with symptom "fever"
MATCH (d:Drug)-[:TREATS]->(disease:Disease)-[:HAS_SYMPTOM]->(s:Symptom {name: "fever"})
RETURN d.name, disease.name
ORDER BY d.name
</code></pre>

<h2>Data Model Design</h2>
<p>During my internship at Quadruple Automation Services, I designed a healthcare knowledge graph with these node types:</p>
<ul>
<li><strong>Patient</strong> — demographics, medical history</li>
<li><strong>Disease</strong> — ICD-10 codes, description</li>
<li><strong>Symptom</strong> — clinical manifestations</li>
<li><strong>Drug</strong> — medications, dosage</li>
<li><strong>Gene</strong> — genetic markers</li>
<li><strong>Procedure</strong> — medical interventions</li>
</ul>
<p>And relationships like: HAS_SYMPTOM, TREATS, CAUSES, CONTRAINDICATED_WITH, CODED_BY, PERFORMED_ON.</p>

<h2>Loading Data with Python</h2>
<pre><code>from neo4j import GraphDatabase

driver = GraphDatabase.driver("bolt://localhost:7687", auth=("neo4j", "password"))

def create_disease_symptom(tx, disease, symptom):
    tx.run(
        "MERGE (d:Disease {name: $disease}) "
        "MERGE (s:Symptom {name: $symptom}) "
        "MERGE (d)-[:HAS_SYMPTOM]->(s)",
        disease=disease, symptom=symptom
    )

with driver.session() as session:
    session.execute_write(create_disease_symptom, "Diabetes", "Polyuria")
</code></pre>

<h2>Key Insights</h2>
<ul>
<li>Graph databases shine when <strong>relationship depth matters</strong> — drug interaction chains, disease comorbidities</li>
<li><strong>Schema-free</strong> doesn't mean schema-less — design your ontology carefully upfront</li>
<li>Neo4j's <strong>APOC library</strong> is essential for data loading, graph algorithms, and export</li>
<li>For production healthcare systems, <strong>FHIR</strong> is the standard data format to target</li>
</ul>
    `,
  },
  {
    slug: 'building-ai-web-apps-fastapi-react',
    title: 'Full Stack AI Apps: FastAPI + React + Gemini',
    subtitle: 'The architecture I use to ship AI-powered web applications fast',
    date: 'May 22, 2025',
    readTime: '5 min read',
    tags: ['FastAPI', 'React', 'Gemini API', 'Full Stack', 'AI'],
    excerpt:
      'Integrating AI into a web app introduces new challenges: async LLM calls, streaming responses, prompt management, and cost control. Here is the architecture I have settled on for AI-powered full stack projects.',
    content: `
<h2>The Stack</h2>
<p>After experimenting with several combinations, here's what I've settled on for AI web apps:</p>
<ul>
<li><strong>Frontend</strong>: React + Vite + TypeScript + Tailwind CSS</li>
<li><strong>Backend</strong>: FastAPI (Python) — async, fast, great for AI workloads</li>
<li><strong>AI Layer</strong>: Google Gemini API (gemini-1.5-flash for speed, gemini-1.5-pro for quality)</li>
<li><strong>Database</strong>: PostgreSQL for structured data, Redis for caching AI responses</li>
</ul>

<h2>Why FastAPI for AI Backends?</h2>
<p>FastAPI is built on <strong>async/await</strong> natively. LLM API calls can take 2–30 seconds — you never want to block your server on them. With async endpoints, FastAPI handles hundreds of concurrent requests while waiting for Gemini responses.</p>
<pre><code>from fastapi import FastAPI
from google import generativeai as genai

app = FastAPI()
model = genai.GenerativeModel('gemini-1.5-flash')

@app.post("/analyze-resume")
async def analyze_resume(text: str):
    prompt = f"Extract skills and experience from this resume:\\n{text}"
    response = await model.generate_content_async(prompt)
    return {"analysis": response.text}
</code></pre>

<h2>Streaming Responses</h2>
<p>For long AI responses, stream them to the frontend so users see output immediately instead of waiting.</p>
<pre><code>from fastapi.responses import StreamingResponse

@app.post("/stream")
async def stream_response(prompt: str):
    async def generator():
        async for chunk in model.generate_content_stream(prompt):
            yield chunk.text
    return StreamingResponse(generator(), media_type="text/plain")
</code></pre>
<p>On the React side, use the Fetch API with <code>ReadableStream</code> to consume the stream and update state incrementally.</p>

<h2>Prompt Management</h2>
<p>Never hardcode prompts in your route handlers. Store them in a dedicated <code>prompts.py</code> module:</p>
<pre><code># prompts.py
RESUME_ANALYZER_SYSTEM = """
You are an expert HR analyst. Extract the following from the resume:
- skills (list of strings)
- experience_years (integer)
- education (list of {degree, institution, year})
- top_strengths (list of 3 strings)

Return valid JSON only. No markdown.
"""
</code></pre>
<p>This makes prompts easy to version, test, and improve independently of application logic.</p>

<h2>Cost Control</h2>
<ul>
<li><strong>Cache responses</strong>: If the same resume is analyzed twice, return the cached result (Redis with 24h TTL)</li>
<li><strong>Truncate inputs</strong>: Limit resume text to 4000 tokens before sending to Gemini</li>
<li><strong>Use flash models</strong>: gemini-1.5-flash is 10x cheaper than pro and fast enough for most tasks</li>
<li><strong>Rate limiting</strong>: Use FastAPI middleware to limit per-user API calls</li>
</ul>

<h2>Deployment</h2>
<p>I deploy FastAPI on <strong>Railway</strong> or <strong>Render</strong> (free tier is generous), with environment variables for API keys. The React frontend goes on <strong>GitHub Pages</strong> or <strong>Vercel</strong>. CORS configuration in FastAPI connects them.</p>
    `,
  },
  {
    slug: 'getting-started-machine-learning-2025',
    title: 'Getting Started with Machine Learning in 2025: An Honest Guide',
    subtitle: 'What I wish I knew before diving into ML as a CS student',
    date: 'May 5, 2025',
    readTime: '6 min read',
    tags: ['Machine Learning', 'Python', 'Beginner', 'Career'],
    excerpt:
      'Every ML tutorial tells you to start with linear regression. That\'s fine. But there\'s a lot nobody tells you — about the math, the tooling, and the gap between tutorials and real projects. Here\'s the honest version.',
    content: `
<h2>The Math You Actually Need</h2>
<p>You've probably heard "you need calculus and linear algebra." That's true — but not all of it. Here's what actually matters:</p>
<ul>
<li><strong>Linear Algebra</strong>: Matrix multiplication, dot products, eigenvalues (for PCA). NumPy makes this practical.</li>
<li><strong>Calculus</strong>: Derivatives and the chain rule — that's 90% of what backpropagation needs.</li>
<li><strong>Statistics</strong>: Mean, variance, distributions, Bayes' theorem. This matters more than calculus for most ML work.</li>
<li><strong>Probability</strong>: Conditional probability, independence. Essential for understanding loss functions and model outputs.</li>
</ul>
<p>You don't need to be a mathematician. You need enough to understand what your model is actually doing.</p>

<h2>The Learning Path That Worked for Me</h2>
<ol>
<li><strong>Python fundamentals</strong> — NumPy, Pandas, Matplotlib (2 weeks)</li>
<li><strong>Scikit-learn</strong> — classification, regression, clustering on small datasets (2 weeks)</li>
<li><strong>Andrew Ng's ML Specialization</strong> on Coursera — the theory, explained well (1 month)</li>
<li><strong>Deep Learning with PyTorch</strong> — build a neural net from scratch, then use the framework (1 month)</li>
<li><strong>A real project</strong> — something you care about, with messy real-world data (ongoing)</li>
</ol>

<h2>The Biggest Mistake Beginners Make</h2>
<p>Spending too long on tutorials and not enough time on projects. Tutorials give you a false sense of progress — everything works because the data is clean and the problem is pre-defined.</p>
<p>Real ML projects involve: collecting data, cleaning it (80% of the work), choosing the right model, debugging why it won't converge, and then deploying it somewhere it can break in new and interesting ways.</p>
<p><strong>Start a real project by week 3.</strong> It will be frustrating. That frustration is learning.</p>

<h2>Tools Worth Learning in Order</h2>
<ol>
<li><strong>NumPy + Pandas</strong> — non-negotiable foundation</li>
<li><strong>Matplotlib + Seaborn</strong> — you need to see your data</li>
<li><strong>Scikit-learn</strong> — classical ML, preprocessing, pipelines</li>
<li><strong>PyTorch</strong> — deep learning (more Pythonic than TensorFlow, dominant in research)</li>
<li><strong>Hugging Face Transformers</strong> — fine-tune LLMs without starting from scratch</li>
<li><strong>Weights & Biases</strong> — experiment tracking (saves you from losing good results)</li>
</ol>

<h2>Kaggle is Underrated</h2>
<p>Kaggle competitions give you real datasets, a clear objective, and a leaderboard to measure against. More importantly, the <strong>solution notebooks</strong> after a competition ends are the best free ML education available. Read them religiously.</p>

<h2>On Career</h2>
<p>You don't need a PhD to work in ML. What matters is:</p>
<ul>
<li>A portfolio of projects with clear problem statements and results</li>
<li>Understanding of fundamentals (not just API calls)</li>
<li>Ability to communicate results to non-technical stakeholders</li>
<li>Experience with the full pipeline — data collection to deployment</li>
</ul>
<p>I'm still a student. But the projects I've built — the AI Resume Analyzer, the Face Recognition System, the Healthcare Knowledge Graph — have taught me more than any course.</p>
    `,
  },
]
