'use strict';

// Content transcribed from the supplied profile.md, projects.md, and experience.md.
// Artwork below is a custom schematic, not a screenshot of the underlying product.
window.portfolioProjects = [
  {
    id: 'distill', title: 'Distill', category: 'agents', categoryLabel: 'Agentic AI · Publishing', featured: true,
    summary: 'From a research feed to a considered piece of writing. An autonomous publishing system with an editorial process of its own.',
    outcome: 'Research → review → publication',
    tags: ['LangGraph', 'FastAPI', 'ChromaDB'],
    stack: ['Python', 'LangGraph', 'LangChain', 'FastAPI', 'Docker', 'Render', 'LangSmith', 'SQLite', 'ChromaDB', 'BM25', 'SentenceTransformer'],
    details: [
      'Orchestrates multi-source research discovery, deterministic triage, editorial evaluation, reflection, and QA/revision loops with LangGraph.',
      'Uses asynchronous scheduling and persistent hybrid memory across SQLite and ChromaDB to support operation over multiple publishing cycles.',
      'Combines BM25 and SentenceTransformer retrieval, with LangSmith observability and a containerized FastAPI backend deployed on Render.'
    ],
    github: 'https://github.com/NishantV28/Linkedin_Post_Generator-',
    note: 'An autonomous system with an explicit editorial review loop.'
  },
  {
    id: 'adhikar', title: 'Adhikar', category: 'agents', categoryLabel: 'Offline AI · Legal access', featured: true,
    summary: 'Legal information, closer to the people who need it. A multilingual assistant that keeps documents and conversations on-device.',
    outcome: '11 languages · Google Gemma Hackathon, Top 4',
    tags: ['Gemma', 'Ollama', 'RAG'],
    stack: ['Python', 'Flask', 'Google Gemma', 'Ollama', 'ChromaDB', 'RAG', 'PaddleOCR', 'Faster-Whisper', 'MMS-TTS'],
    details: [
      'Runs Gemma locally through Ollama and supports 11 Indian languages with text, document OCR, speech input, and speech output.',
      'Grounds responses in 6,845+ verified legal knowledge chunks, with claim verification against source statutes and citation-backed answers.',
      'Supports legal document analysis, evidence checklists, and draft generation through an offline pipeline. The project placed in the Top 4 at the Google Gemma Hackathon.'
    ],
    github: 'https://github.com/MAsTeRlssPd/AdhiKaar',
    note: 'Built for on-device privacy and source-grounded legal information.'
  },
  {
    id: 'airis', title: 'AIRIS', category: 'ml', categoryLabel: 'Machine learning · Climate', featured: true,
    summary: 'A more local picture of the air we breathe. Spatio-temporal forecasting across Delhi, with uncertainty built into the answer.',
    outcome: '289 Delhi wards · +24% skill vs. persistence baseline',
    tags: ['PyTorch', 'Graph Transformers', 'FastAPI'],
    stack: ['Python', 'PyTorch', 'Graph Transformers', 'RAG', 'FastAPI', 'Knowledge Graphs', 'Conformal Prediction'],
    details: [
      'Predicts hourly AQI at 24, 48, and 72-hour horizons for 289 Delhi municipal wards by combining pollutant measurements with ward-level spatial topology.',
      'Uses a four-member ensemble and conformal prediction intervals. The project reports 24% improvement in skill over a persistence baseline.',
      'Includes source attribution validated against CPCB sensor data and a RAG plus knowledge-graph advisor served through FastAPI.'
    ],
    github: 'https://github.com/mansi724/PROJECT-AQI',
    note: 'Forecasting performance is reported in the supplied project record.'
  },
  {
    id: 'research', title: 'Deep Research Agent', category: 'agents', categoryLabel: 'Agentic research · Evaluation', featured: true,
    summary: 'A research assistant that goes beyond retrieval. Planning, reflection, synthesis, and citation verification — with evaluation to match.',
    outcome: '544 papers · 19,000+ document chunks',
    tags: ['FAISS', 'BM25', 'RAGAS'],
    stack: ['Python', 'FAISS', 'BM25', 'LangChain', 'RAGAS', 'LLM-as-a-Judge', 'arXiv API'],
    details: [
      'Works over a corpus of 544 academic papers on LLM agents and more than 19,000 document chunks.',
      'Implements five stages: Planner, Hybrid Retriever, Reflector, Synthesizer, and Citation Verifier. Retrieval combines FAISS with BM25.',
      'Compares six agent configurations using RAGAS and LLM-as-a-Judge metrics to study the contribution of planning, reflection, retrieval, and verification to answer quality and faithfulness.'
    ],
    github: 'https://github.com/NishantV28/agentic-model-for-reaserch-',
    note: 'Research tooling paired with an ablation and evaluation framework.'
  },
  {
    id: 'twin', title: 'Andrew Ng Digital Twin', category: 'agents', categoryLabel: 'Conversational AI · Education',
    summary: 'A pedagogical AI project exploring structured deep-learning instruction through retrieval, conversational memory, and voice narration.',
    stack: ['Python', 'Gemini 2.5 Flash', 'RAG', 'Vector Embeddings', 'SQLite', 'Streamlit'],
    details: ['Combines a curated knowledge corpus and teaching-style corpus with Gemini 2.5 Flash and retrieval-augmented generation.', 'Integrates persistent SQLite memory, browser voice narration, and an evaluation pipeline covering five quality metrics for grounded, multi-turn conversations.'],
    github: 'https://github.com/NishantV28/andrew-ng_digital_twin',
    note: 'An independent educational project inspired by Andrew Ng’s teaching approach.'
  },
  {
    id: 'gesture', title: 'Desktop Control via Hand Gestures', category: 'ml', categoryLabel: 'Computer vision · Interaction',
    summary: 'Hands-free desktop interaction using real-time hand landmarks, custom gesture registration, and action mapping.',
    stack: ['Python', 'OpenCV', 'MediaPipe', 'Cosine Similarity', 'JSON', 'OS Automation'],
    details: ['Transforms 21 hand landmarks into 63-dimensional feature vectors and matches gestures using cosine similarity at greater than 0.90 matching confidence.', 'Maps gestures to system actions, volume, and screen brightness, with persistent JSON gesture storage and one-second debouncing to reduce false activations.'],
    note: 'A public repository is not yet listed for this project.'
  },
  {
    id: 'drone', title: 'Gesture-Controlled Drone', category: 'ml', categoryLabel: 'Computer vision · Flight control',
    summary: 'A real-time interface that translates hand gestures from a webcam into drone navigation commands.',
    stack: ['Python', 'OpenCV', 'MediaPipe', 'TensorFlow', 'Keras', 'Scikit-learn', 'Drone SDK'],
    details: ['Uses MediaPipe landmarks and a TensorFlow/Keras network with 128 → 64 → Softmax layers to classify six or more flight commands at over 80% prediction confidence.', 'Includes wrist-relative landmark extraction, StandardScaler normalization, stratified train-test splitting, class balancing, dropout, and saved .h5 models for deployment without retraining.'],
    github: 'https://github.com/NishantV28/gesture-control-for-drone',
    note: 'A complete gesture-classification and deployment pipeline.'
  },
  {
    id: 'hackps', title: 'HackPS', category: 'agents', categoryLabel: 'AI recommendations · Teamwork',
    summary: 'A hackathon recommendation and squad-matching platform that connects team capabilities to feasible problem statements.',
    stack: ['Python', 'Gemini API', 'OnDemand AI', 'Streamlit', 'Git API'],
    details: ['Models team skills, expertise, availability, and Git branches to recommend problem statements using Gemini and OnDemand AI.', 'Includes squad-synergy scoring, interactive analytics, and AI-generated solution plans and visual briefs for sponsor and open-innovation tracks.'],
    github: 'https://github.com/RishiiGamer2201/Hack-PS',
    note: 'Finalist, Brainwave Hackathon — On-Demand track.'
  },
  {
    id: 'speech', title: 'Unknown-Speaker Speech Separation', category: 'ml', categoryLabel: 'Deep learning · Audio',
    summary: 'Separating overlapping voices without requiring the number of speakers to be supplied at inference time.',
    stack: ['Python', 'PyTorch', 'MossFormer2', 'SepTDA', 'Hungarian Matching'],
    details: ['Combines MossFormer2 with Transformer Decoder Attractors to estimate speaker count and separate overlapping speech.', 'Explores confidence-guided attractor pruning, attractor repulsion loss, overlap-weighted separation loss, and Hungarian matching for permutation-invariant training.'],
    github: 'https://github.com/NishantV28/Speech-separation',
    note: 'Deep learning research into speech separation with an unknown speaker count.'
  },
  {
    id: 'disaster', title: 'Disaster Management AI', category: 'ml', categoryLabel: 'AI vision · Geo-analytics',
    summary: 'A crisis-assessment platform for evaluating landslide and flood risk from real-time scenarios.',
    stack: ['Python', 'AI Vision', 'Geo-analytics', 'Crisis Prediction'],
    details: ['Analyzes landslide and flood scenarios to assess disaster vulnerability and risk.', 'Won the Green Tag Case Competition at Apogee, BITS Pilani in 2026.'],
    note: 'Winner, Green Tag Case Competition — Apogee 2026, BITS Pilani.'
  },
  {
    id: 'munim', title: 'Munim AI', category: 'agents', categoryLabel: 'Financial reasoning · Automation',
    summary: 'An AI-powered project focused on financial reasoning and accounting automation.',
    stack: ['Python', 'LLMs', 'Accounting AI'],
    details: ['Explores financial reasoning and accounting automation with large language models. Further implementation details are available in the project repository.'],
    github: 'https://github.com/ghostiee-11/munim-ai',
    note: 'See the repository for the current scope and implementation.'
  }
];

const svgStart = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 440" fill="none" aria-hidden="true">';
window.projectArtwork = {
  distill: svgStart + `
    <path d="M60 220H540M300 50V390" stroke="#b5a78e" stroke-width=".6" stroke-dasharray="3 7"/>
    <circle cx="300" cy="217" r="141" stroke="#c9bda7" stroke-width=".6"/>
    <g transform="translate(129 77) rotate(-9 150 130)">
      <rect x="23" y="20" width="310" height="236" rx="9" fill="#c5b69b" opacity=".3"/>
      <rect x="13" y="10" width="310" height="236" rx="9" fill="#e5d8c0" stroke="#cbbda6"/>
      <rect width="310" height="236" rx="9" fill="#faf7f0" stroke="#d0c6b3"/>
      <path d="M0 44H310" stroke="#d9d0c2"/>
      <circle cx="21" cy="23" r="3" fill="#ed512b"/><circle cx="33" cy="23" r="3" fill="#d3cbbc"/><circle cx="45" cy="23" r="3" fill="#d3cbbc"/>
      <text x="285" y="26" text-anchor="end" font-family="monospace" font-size="8" fill="#7b7160">EDITORIAL ENGINE</text>
      <text x="25" y="98" font-family="Georgia,serif" font-size="43" font-style="italic" fill="#292823">distill.</text>
      <path d="M26 119H239M26 129H266M26 139H179" stroke="#d2c9ba" stroke-width="4"/>
      <g font-family="monospace" font-size="7" fill="#5c5447" text-anchor="middle">
        <rect x="25" y="165" width="70" height="32" rx="4" stroke="#bdb2a0"/><text x="60" y="184">RESEARCH</text>
        <path d="M97 181h18m-4-3 4 3-4 3" stroke="#897a64"/>
        <rect x="119" y="165" width="70" height="32" rx="4" stroke="#bdb2a0"/><text x="154" y="184">REFLECT</text>
        <path d="M191 181h18m-4-3 4 3-4 3" stroke="#897a64"/>
        <rect x="214" y="165" width="70" height="32" rx="4" fill="#eb512b"/><text x="249" y="184" fill="#fff8ed">PUBLISH ↗</text>
      </g>
    </g>
    <g transform="translate(76 276) rotate(5)"><rect width="157" height="45" rx="7" fill="#fffaf0" fill-opacity=".86" stroke="#fffaf0"/><circle cx="20" cy="22" r="5" fill="#eb512b"/><text x="35" y="26" font-family="monospace" font-size="8" fill="#4d453a">THOUGHTFULLY AUTOMATED</text></g>
    </svg>`,
  adhikar: svgStart + `
    <circle cx="300" cy="220" r="156" stroke="#c8bdcf" stroke-width=".7"/>
    <circle cx="300" cy="220" r="121" stroke="#c8bdcf" stroke-width=".7" stroke-dasharray="2 7"/>
    <g transform="translate(185 75) rotate(8 120 140)">
      <rect x="9" y="10" width="225" height="279" rx="9" fill="#c8bcd0" opacity=".5"/>
      <rect width="225" height="279" rx="9" fill="#faf7f9" stroke="#c9bfcd"/>
      <path d="M22 38H203M22 225H203" stroke="#dcd2df"/>
      <text x="23" y="26" font-family="monospace" font-size="8" fill="#76657c">ADHIKAR / अधिकार</text>
      <circle cx="195" cy="23" r="3" fill="#8c7996"/>
      <path d="M112 71v88m-29 0h58M72 91h80M112 69l-8 10h16zM72 91l-20 40h40L72 91zm80 0-20 40h40l-20-40z" stroke="#85718f" stroke-width="2.5" stroke-linejoin="round"/>
      <path d="M52 131c2 17 38 17 40 0M132 131c2 17 38 17 40 0" fill="#d1c3d9" stroke="#85718f" stroke-width="2"/>
      <text x="112" y="191" text-anchor="middle" font-family="Georgia,serif" font-size="23" fill="#3d3246">Access, without</text>
      <text x="112" y="215" text-anchor="middle" font-family="Georgia,serif" font-style="italic" font-size="23" fill="#3d3246">compromise.</text>
      <rect x="22" y="242" width="16" height="13" rx="2" stroke="#85718f"/><path d="M26 242v-4a4 4 0 0 1 8 0v4" stroke="#85718f"/>
      <text x="49" y="252" font-family="monospace" font-size="7" fill="#76657c">ON DEVICE. BY DESIGN.</text>
    </g>
    <g transform="translate(77 110) rotate(-8)"><rect width="128" height="48" rx="7" fill="#f8f3fc" fill-opacity=".9" stroke="#fff"/><text x="64" y="21" text-anchor="middle" font-family="Georgia,serif" font-size="18" fill="#51415e">11 languages.</text><text x="64" y="36" text-anchor="middle" font-family="monospace" font-size="7" fill="#897591">ONE CONVERSATION</text></g>
    <g transform="translate(360 282) rotate(-4)"><rect width="129" height="42" rx="7" fill="#f8f3fc" fill-opacity=".9" stroke="#fff"/><text x="64" y="25" text-anchor="middle" font-family="monospace" font-size="8" fill="#51415e">6,845+ LAW CHUNKS</text></g>
    </svg>`,
  airis: svgStart + `
    <g transform="translate(70 53)">
      <path d="M0 245 220 361 466 224M0 201 220 317 466 180M0 157 220 273 466 136M0 113 220 229 466 92M0 69 220 185 466 48M44 46 264 162 264 339M88 22 308 138 308 315M132 0 352 116 352 291" stroke="#c1c0b5" stroke-width=".6"/>
      <g stroke="#a5a294" stroke-width="1.3" stroke-linejoin="round" fill="#dddcd0">
        <path d="m109 105 39-21 40 21-39 21zM149 126v60l-40-21v-60M149 186l39-21v-60"/>
        <path d="m188 147 39-21 40 21-39 21zM228 168v60l-40-21v-60M228 228l39-21v-60"/>
        <path d="m268 146 39-21 40 21-39 21zM308 167v61l-40-21v-61M308 228l39-21v-61"/>
      </g>
      <g stroke="#cb512e" stroke-width="1.1" stroke-linejoin="round">
        <path d="m148 72 39-21 40 21-39 21z" fill="#fc9672"/><path d="m148 72 40 21v114l-40-21z" fill="#ed6036"/><path d="m188 93 39-21v114l-39 21z" fill="#d84a25"/>
        <path d="m227 60 39-21 40 21-39 21z" fill="#fc9672"/><path d="m227 60 40 21v126l-40-21z" fill="#ed6036"/><path d="m267 81 39-21v126l-39 21z" fill="#d84a25"/>
        <path d="m188 145 39-21 40 21-39 21z" fill="#ffac88"/><path d="m188 145 40 21v83l-40-21z" fill="#ee7950"/><path d="m228 166 39-21v83l-39 21z" fill="#d96542"/>
      </g>
      <path d="m86 226 53-27 49 23 39-28 42 9 41-35 62 13" stroke="#6c6b5d" stroke-width="1.4"/><g fill="#faf7ed" stroke="#6c6b5d"><circle cx="86" cy="226" r="4"/><circle cx="139" cy="199" r="4"/><circle cx="188" cy="222" r="4"/><circle cx="227" cy="194" r="4"/><circle cx="269" cy="203" r="4"/><circle cx="310" cy="168" r="4"/><circle cx="372" cy="181" r="4"/></g>
    </g>
    <g transform="translate(374 89)"><rect width="139" height="64" rx="7" fill="#fbfaf4" fill-opacity=".9" stroke="#fff"/><text x="15" y="24" font-family="monospace" font-size="8" fill="#68675c">DELHI / FORECAST</text><text x="15" y="47" font-family="Arial" font-size="19" fill="#33332b">24h / 48h / 72h</text></g>
    </svg>`,
  research: svgStart + `
    <g stroke="#5c5b51" stroke-width=".7"><circle cx="300" cy="218" r="145"/><circle cx="300" cy="218" r="103" stroke-dasharray="2 6"/><path d="M80 218h440M300 42v352" stroke-dasharray="2 8"/></g>
    <g stroke="#bab4a7" stroke-width="1.1"><path d="m153 150 147 68 143-69M300 218l-106 98m106-98 111 95M153 150l41 166M443 149l-32 164"/></g>
    <g fill="#373733" stroke="#777568"><rect x="94" y="125" width="118" height="51" rx="7"/><rect x="385" y="125" width="118" height="51" rx="7"/><rect x="132" y="291" width="125" height="51" rx="7"/><rect x="348" y="291" width="125" height="51" rx="7"/></g>
    <g font-family="monospace" text-anchor="middle" font-size="10" fill="#e4e0d4"><text x="153" y="147">01 / PLAN</text><text x="444" y="147">02 / RETRIEVE</text><text x="194" y="313">04 / SYNTHESIZE</text><text x="411" y="313">05 / VERIFY</text></g>
    <g stroke="#7d7a6d"><path d="M124 159h58M414 159h58M165 325h58M383 325h58"/></g>
    <circle cx="300" cy="218" r="49" fill="#eb512b" stroke="#ff8d60"/><circle cx="300" cy="218" r="40" stroke="#ffb28c" stroke-opacity=".45"/>
    <path d="M288 217a13 13 0 1 1 6 12m-6-12-2-10m2 10 10-3" stroke="#fff3de" stroke-width="2"/>
    <text x="300" y="248" text-anchor="middle" font-family="monospace" font-size="6" fill="#fff3de">03 / REFLECT</text>
    <g fill="#efcc9d"><circle cx="229" cy="185" r="3"/><circle cx="369" cy="184" r="3"/><circle cx="248" cy="266" r="3"/><circle cx="354" cy="264" r="3"/></g>
    <text x="300" y="76" text-anchor="middle" font-family="monospace" font-size="8" fill="#b2ad9f">A QUESTION DESERVES A TRACEABLE ANSWER.</text>
    </svg>`
};
