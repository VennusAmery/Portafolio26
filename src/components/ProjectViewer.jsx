// ============================================================
// ProjectViewer.jsx
// ============================================================

import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

import commingSoon from '../videos/commingsoon.gif';

import scubacat from '../videos/scubacat-demo.mp4';
import screen1 from '../images/scubacat/gato-inicio.png';
import screen2 from '../images/scubacat/gato-sonrisa.png';
import screen3 from '../images/scubacat/gato-boca.png';
import screen4 from '../images/scubacat/gato-palma.png';
import screen5 from '../images/scubacat/gato-puno.png';

import MergeIt from '../videos/MergeIt.mp4';
import mergingScreen1 from '../images/MergeIt/MergeIt1.png';
import mergingScreen2 from '../images/MergeIt/MergeIt2.png';
import mergingScreen3 from '../images/MergeIt/MergeIt3.png';

import LittleMe from '../videos/LittleMe.mp4';
import chibiScreen1 from '../images/LittleMe/LittleMe1.png';
import chibiScreen2 from '../images/LittleMe/LittleMe2.png';

import DCA from '../videos/API-DCA.mp4';
// ── Project Definitions ──────────────────────────────────────
const PROJECTS = [
  {
    id: 'lumes',
    name: 'LUMES',
    tagline: 'AI Legal Operating System',
    category: 'LegalTech',
    icon: '⚖️',
    status: 'In Development',
    statusColor: '#f0e0a8',
    accentColor: '#b8cfe0',
    tech: ['React', 'Node.js', 'MySQL', 'OpenAI'],
    githubUrl: '', 
    liveUrl: '', 
    description: 'Full legal management platform with AI-powered case tracking, document automation and jurisprudence analysis.',
    prototypeLabel: '▶️ Run Tool',
    bootMessages: [
      'Initializing LUMES OS...',
      'Loading legal modules [OK]',
      'Connecting to case database [OK]',
      'Mounting AI engine (LEX) [OK]',
      'LUMES ready.',
    ],
    bootColor: '#b8cfe0',
    prototype: () => (
      <div style={{ 
        height: '100%', 
        minHeight: '350px',
        background: '#121214', 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '12px',
        borderRadius: '8px',
        overflow: 'hidden'
      }}>
        <img 
          src={commingSoon} 
          alt="Coming Soon"
          style={{
            width: '100%',
            height: '100%',
            maxHeight: '450px',
            objectFit: 'contain', 
            borderRadius: '6px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
          }}
        />
      </div>
    ),
    files: {
      'README.md': '# LUMES\nLegal Management + AI System\n\n## Stack\nReact · Node.js · MySQL · OpenAI\n\n## Modules\n- Case Management\n- LEX AI Assistant\n- Document Repository\n- Analytics Dashboard',
      'architecture.txt': 'CLIENT → React SPA\nAPI → REST (Node/Express)\nAI → OpenAI GPT-4 fine-tuned\nDB → MySQL 8.0\nAUTH → JWT + refresh tokens',
    },
    screenshots: [
      { label: 'Dashboard', desc: 'Vista general: casos activos, alertas y estadísticas en tiempo real.' },
      { label: 'Expedientes', desc: 'Gestión completa de expedientes con filtros, búsqueda y acceso rápido.' },
      { label: 'LEX AI', desc: 'Chat con IA jurídica entrenada en legislación local y GDPR.' },
      { label: 'Analytics', desc: 'Métricas de rendimiento legal: tasa de éxito, documentos, consultas.' },
    ],
  },
  {
    id: 'scubacat',
    name: 'ScubaCat (CatIA)',
    tagline: 'Computer Vision & Gesture Recognition',
    category: 'AI & Vision', 
    icon: '🐱',
    status: 'Completed',
    statusColor: '#b8e0c8',
    accentColor: '#30699844', 
    tech: ['Python', 'OpenCV', 'MediaPipe', 'Math'],
    githubUrl: 'https://github.com/VennusAmery/IA-Gato', 
    liveUrl: '', 
    description: 'A real-time computer vision system utilizing lightweight neural networks to detect facial expressions (smiles, mouth aperture) and hand gestures (fist, open palm). It dynamically maps every gesture to control interactive video playback and features automated biometric calibration.',    prototypeLabel: '▶️ Run Tool',
    bootMessages: [
      'C:\\Users\\Vennus> python scubacat.py',
      'Initializing OpenCV video capture on dev(0)... [OK]',
      'Loading MediaPipe Hands & FaceMesh solutions... [OK]',
      'Warm-up phase completed (Resolution: 640x480).',
      'Playing execution demo... [OK]',
    ],
    bootColor: '#ffd43b', 
    prototype: () => (
      <div style={{ 
        height: '100%', 
        minHeight: '350px',
        background: '#121214', 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '12px',
        borderRadius: '8px',
        overflow: 'hidden'
      }}>
        <video 
          src={scubacat} 
          controls
          autoPlay
          muted
          loop
          style={{
            width: '100%',
            height: '100%',
            maxHeight: '450px',
            objectFit: 'contain', 
            borderRadius: '6px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
          }}
        />
      </div>
    ),
    files: {

      'README.md': `# CatIA - ScubaCat 🐱\n\nInteractive gesture recognition script.\n\n## Hardware Requirements\n- Integrated Webcam or USB Camera (Capable of 640x480 resolution)\n\n## Execution\n\`\`\`bash\npip install -r requirements.txt\npython scubacat.py\n\`\`\`\n\n*Note: The script will auto-calibrate during the first 2.5 seconds. Please look directly at the screen with a neutral expression.*`,    },
    
      screenshots: [
      { label: 'Main Interface', 
        desc: 'Initial system startup showing the camera feed setup and OpenCV canvas initialization.', 
        src: screen1 },
      { label: 'Smile Detection', 
        desc: 'Real-time facial mesh tracking capturing smile expressions to trigger character interactions.', 
        src: screen2 },
      { label: 'Mouth Tracking', 
        desc: 'Active monitoring of mouth geometry and aperture landmarks using MediaPipe FaceMesh.', 
        src: screen3 },
      { label: 'Open Palm Gesture', 
        desc: 'Hand landmark tracking recognizing an open palm gesture to execute system commands.', 
        src: screen4 },
      { label: 'Fist Gesture', 
        desc: 'Hand skeleton mapping detecting a closed fist gesture for interactive controls.', 
        src: screen5 }
    ]
  },

  {
    id: 'MergeIt',
    name: 'Merge It',
    tagline: 'Secure PDF Management',
    category: 'Web Utility / Web Tool',
    icon: '📑',
    status: 'Completed',
    statusColor: '#b8e0c8',
    accentColor: '#FFB6C144', 
    githubUrl: '', 
    liveUrl: 'https://vennusamery.github.io/MergeIt/',   
    tech: ["React", "TypeScript", "pdf-lib", "@dnd-kit/core", "Framer Motion"],
    description: 'A secure, client-side PDF management tool featuring interactive drag-and-drop file reordering, instant iframe document previews, and client-side compilation via pdf-lib, ensuring absolute data privacy by processing all files entirely within the users browser.',
    prototypeLabel: '▶️ Run Tool',
    bootMessages: [
      'C:\\Users\\Vennus> npm run start:mergeit',
      'Loading PDF-Lib binary processing core... [OK]',
      'Initializing Drag-and-Drop Context (@dnd-kit)... [OK]',
      'Setting up local blob memory allocation... [OK]',
      'Mounting interactive dinosaur UI... [OK]',
      'System ready. Privacy Shield Active: 100% Local execution.',
    ],
    bootColor: '#ffb6c1', 
    prototype: () => (
      <div style={{ 
        height: '100%', 
        minHeight: '350px',
        background: '#121214', 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '12px',
        borderRadius: '8px',
        overflow: 'hidden'
      }}>
        <video 
          src={MergeIt} 
          controls
          autoPlay
          muted
          loop
          style={{
            width: '100%',
            height: '100%',
            maxHeight: '450px',
            objectFit: 'contain', 
            borderRadius: '6px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
          }}
        />
      </div>
    ),
    
    files: {
      'README.md': `# 📑 Merge It\n\nInteractive tool to merge, reorder, and preview PDF files with 100% data privacy.\n\n## 🛡️ Privacy by Design\nAll processing takes place strictly inside your browser using **pdf-lib**.\n\n## 🚀 Key Features\n- Direct drag-and-drop file reordering.\n- Safe real-time iframe document previews.`,
    },
    screenshots: [
      { label: 'Home Screen', desc: 'Main retro interface with the interactive dinosaur guide, ready for document insertion.', src: mergingScreen1 },
      { label: 'File Upload', desc: 'Active file queue displaying the imported PDFs, enabled with drag-and-drop sortable items.', src: mergingScreen2 },
      { label: 'Download Preview', desc: 'Instant sandboxed iframe viewport overlay to securely verify PDF details before compilation.', src: mergingScreen3 }
    ]
  },

{
    id: 'chibidressup',
    name: 'Chibi Dress-Up',
    tagline: 'Interactive Character Customizer',
    category: 'Game / Web Tool',
    icon: '✨',
    status: 'Completed',
    statusColor: '#b8e0c8',
    accentColor: '#F5EFE6', 
    tech: ['React', 'Tailwind CSS', 'State Management', 'Framer Motion'],
    githubUrl: '', 
    liveUrl: 'https://vennusamery.github.io/Little_Me/',   
    description: 'A charming, interactive 2D character customization dress-up game. Features dynamic configuration state mapping that pairs structural outfit combinations to custom matrix-based artwork assets.',
    prototypeLabel: '▶️ Play Game',
    bootMessages: [
      'C:\\Users\\Vennus> npm run start:chibi-dressup',
      'Loading asset coordination matrix... [OK]',
      'Initializing closet layer engine (4-point config)... [OK]',
      'Mapping asset combination indexing (1 to 54)... [OK]',
      'Injecting dynamic Crayon UI textures... [OK]',
      'System ready. Welcome to the Chibi Closet!',
    ],
    bootColor: '#C4B29E', 
    prototype: () => (
      <div style={{ 
        height: '100%', 
        minHeight: '350px',
        background: '#121214', 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '12px',
        borderRadius: '8px',
        overflow: 'hidden'
      }}>
        <video 
          src={LittleMe} 
          controls
          autoPlay
          muted
          loop
          style={{
            width: '100%',
            height: '100%',
            maxHeight: '450px',
            objectFit: 'contain', 
            borderRadius: '6px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
          }}
        />
      </div>
    ),

    files: {
      'README.md': `# 🧸 Chibi Dress-Up\n\nAn interactive 2D avatar customization tool built with React and Tailwind CSS.\n\n## 🚀 Core Architecture\n- **Dynamic Configuration Matrix:** Manages synchronous state logic across 4 standalone slots (Tops, Bottoms, Hats, Footwear).\n- **Optimized Asset Pipeline:** Computes precise combinatorial mapping to resolve index requests against pre-rendered assets.`,
      'architecture.txt': 'UI FRAMEWORK → React 18\nSTYLING → Tailwind CSS (Crayon Canvas Theme)\nSTATE ENGINE → Reactive Configuration Hook\nASSET PIPELINE → Synchronous Layer Matrix Mapping\nTARGET DISPLAYS → 100% Responsive Touch Layout'
    },
    screenshots: [
      { label: 'Closet Interface', 
        desc: 'Main customizer window showing category tabs and the item thumbnail selection grid.',
        src: chibiScreen1 
      },

      { label: 'Avatar Preview', 
        desc: 'Real-time composition workspace rendering the current structural fashion outfit.',
        src: chibiScreen2
      }
    ]
  },

{
    id: 'dcascraper',
    name: 'DCA Automation Pipeline',
    tagline: 'Legal Gazette Scraper & OCR Text Extractor',
    category: 'Backend / LegalTech',
    icon: '📰',
    status: 'Completed',
    statusColor: '#b8e0c8',
    accentColor: '#1a120844', 
    tech: ['Python', 'OCR', 'PDF Processing', 'Automation'],
    githubUrl: 'https://github.com/VennusAmery/DCA',
    liveUrl: '',
    description: 'An automated legal data pipeline designed to track the "Diario de Centro América" (Official Gazette). It checks for new daily publications, downloads newly issued PDF files, handles deduplication states, tracks history logs, and converts documents into structured searchable text via image OCR pipelines.',
    prototypeLabel: '▶️ Execute Script',
    bootMessages: [
      'C:\\Users\\Vennus> python dca_pipeline.py',
      'Connecting to Diario de Centro América gateway... [OK]',
      'Fetching latest gazette publication metadata... [OK]',
      'Checking state history logs... [OK]',
      'Launching execution sequence...',
    ],
    bootColor: '#a8f0c0', 

    prototype: () => (
      <div style={{ 
        height: '100%', 
        minHeight: '350px',
        background: '#121214', 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '12px',
        borderRadius: '8px',
        overflow: 'hidden'
      }}>
        <video 
          src={DCA} 
          controls
          autoPlay
          muted
          loop
          style={{
            width: '100%',
            height: '100%',
            maxHeight: '450px',
            objectFit: 'contain', 
            borderRadius: '6px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
          }}
        />
      </div>
    ),

    files: {
      'README.md': `# 📰 DCA Legal Gazette Pipeline\n\nAutomated tracking solution to monitor, pull, partition, and process text data strings out of Guatemalas official legal gazette ("Diario de Centro América").\n\n## 🛠️ Internal Framework\n- **Scraper Engine:** Target endpoint analysis to monitor publication schedules.\n- **Deduplication Audit:** State check mechanisms to ignore redundant execution runs.\n- **OCR Core:** Converts structural image layouts into queryable raw text tokens.`,
      'architecture.txt': 'CORE ENGINE → Python 3.11\nSCRAPER PATTERN → Document Target Requests\nDEDUPLICATION → Local File System State Registry\nPROCESSING → PDF Binary to Image Array Mesh\nTRANSCRIPTION ENGINE → Layout-Aware Optical OCR Extraction'
    },

    screenshots: [
      { label: 'Scraper Scan', 
        desc: 'Validating the official gateway registry to spot publication schedule differences.',
      },

      { label: 'OCR Processing', 
        desc: 'Isolating layout grids to run translation matrix lookups across document files.',
      },

      { label: 'Database Write', 
        desc: 'Storing transcribed raw string outputs directly into clean system indexes.',
      }
    ]
  },

];

// ── Boot Screen ──────────────────────────────────────────────
function BootScreen({ project, onComplete }) {
  const [lineIdx, setLineIdx] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const msgs = project.bootMessages;
    const perMsg = 100 / msgs.length;
    if (lineIdx < msgs.length) {
      const t = setTimeout(() => {
        setLineIdx(i => i + 1);
        setProgress(p => Math.min(p + perMsg, 100));
      }, 300);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(onComplete, 400);
      return () => clearTimeout(t);
    }
  }, [lineIdx, project.bootMessages, onComplete]);

  const isDark = project.id === 'scubacat' || project.id === 'lumes';

  return (
    <div style={{
      height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      background: isDark ? '#121214' : 'var(--cream, #f5f2eb)',
      fontFamily: 'var(--font-mono)', padding: 30, gap: 16,
    }}>
      <div style={{ fontSize: 48 }}>{project.icon}</div>
      <div style={{ fontFamily: 'var(--font-pixel)', fontSize: 28, color: isDark ? project.bootColor : 'var(--black, #1a1612)' }}>
        {project.name}
      </div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, width: 300 }}>
        {project.bootMessages.slice(0, lineIdx).map((msg, i) => (
          <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            style={{ color: isDark ? project.bootColor : 'var(--black, #1a1612)', marginBottom: 4, lineHeight: 1.6, opacity: i === lineIdx - 1 ? 1 : 0.4 }}>
            {isDark ? msg : `> ${msg}`}
          </motion.div>
        ))}
        {lineIdx < project.bootMessages.length && (
          <motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.5 }}
            style={{ color: project.bootColor }}>▋</motion.span>
        )}
      </div>
      <div style={{ width: 300, height: 16, border: '2px solid var(--black, #1a1612)', background: 'var(--paper, #fff)', borderRadius: 2, overflow: 'hidden' }}>
        <motion.div animate={{ width: `${progress}%` }} transition={{ duration: 0.3 }}
          style={{ height: '100%', background: project.bootColor, borderRight: '1px solid var(--black, #1a1612)' }} />
      </div>
    </div>
  );
}

// ── File Explorer ────────────────────────────────────────────
function FileExplorer({ project }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const folders = [
    { id: 'readme', icon: '📄', label: 'README' },
    { id: 'arch', icon: '🗂️', label: 'Architecture' },
    { id: 'screens', icon: '🖼️', label: 'Screenshots' },
  ];

  return (
    <div style={{ display: 'flex', height: '100%', fontFamily: 'var(--font-mono)', fontSize: 13 }}>
      {/* Sidebar */}
      <div style={{ width: 160, background: 'var(--beige)', borderRight: 'var(--border)', flexShrink: 0 }}>
        <div style={{ padding: '8px 10px', borderBottom: 'var(--border-thin)', fontFamily: 'var(--font-display)', fontSize: 13 }}>
          📁 {project.name}
        </div>
        {folders.map(f => (
          <div key={f.id} onClick={() => setSelectedFile(f.id)}
            style={{ padding: '8px 12px', cursor: 'pointer', background: selectedFile === f.id ? 'var(--pink-light)' : 'transparent', borderBottom: '1px solid rgba(26,22,18,.08)', display: 'flex', gap: 8, alignItems: 'center', fontSize: 12 }}>
            {f.icon} {f.label}
          </div>
        ))}
      </div>

      {/* Content */}
      <div style={{ flex: 1, padding: 16, overflow: 'auto', background: 'var(--paper)' }}>
        {!selectedFile && (
          <div style={{ opacity: 0.4, fontFamily: 'var(--font-pixel)', fontSize: 15, textAlign: 'center', marginTop: 40 }}>
            Select a folder →
          </div>
        )}
        
        {selectedFile === 'readme' && (
          <pre style={{ fontFamily: 'var(--font-mono)', fontSize: 12, lineHeight: 1.7, whiteSpace: 'pre-wrap', color: 'var(--black)' }}>
            {project.files?.['README.md'] || '# No README found'}
          </pre>
        )}
        
        {selectedFile === 'arch' && (
          <div>
            <div style={{ fontFamily: 'var(--font-pixel)', fontSize: 16, marginBottom: 12 }}>System Architecture</div>
            <pre style={{ fontFamily: 'var(--font-mono)', fontSize: 12, lineHeight: 1.7, whiteSpace: 'pre-wrap', background: 'var(--beige)', border: 'var(--border-thin)', padding: 12, borderRadius: 4 }}>

              {project.files?.['architecture.txt'] || `CLIENT → ${project.tech[0]} Frontend\nPROCESSING → 100% Client-Side / Local`}
            </pre>
          </div>
        )}
        
        {selectedFile === 'screens' && (
          <div>
            <div style={{ fontFamily: 'var(--font-pixel)', fontSize: 16, marginBottom: 12 }}>
              Screenshots ({project.screenshots?.length || 0})
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 14 }}>
              {(project.screenshots || []).map((s, i) => (
                <motion.div key={i} whileHover={{ y: -2 }}
                  style={{ border: 'var(--border)', borderRadius: 4, overflow: 'hidden', background: 'var(--beige)', boxShadow: '2px 2px 0 var(--shadow-hard)', cursor: 'default' }}>
                  <div style={{ height: 110, background: `linear-gradient(135deg, ${project.accentColor}88, var(--beige))`, display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: 'var(--border-thin)', overflow: 'hidden' }}>
                    {s.src ? (
                      <img src={s.src} alt={s.label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <span style={{ fontSize: 28 }}>{project.icon}</span>
                    )}
                  </div>
                  <div style={{ padding: '8px 10px' }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 13, color: 'var(--black)' }}>{s.label}</div>
                    <div style={{ fontSize: 11, opacity: 0.6, marginTop: 3, lineHeight: 1.4, color: 'var(--black)' }}>{s.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Portal Modal ─────────────────────────────────────────────
function ProjectModal({ project, onClose }) {
  const [tab, setTab] = useState('prototype');
  const [booted, setBooted] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [pos, setPos] = useState({ x: Math.max(40, window.innerWidth / 2 - 440), y: Math.max(20, window.innerHeight / 2 - 300) });
  const dragOffset = useRef({});
  const Prototype = project.prototype;

  const onMouseDown = (e) => {
    setDragging(true);
    dragOffset.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
    e.preventDefault();
  };
  useEffect(() => {
    const onMove = (e) => { if (!dragging) return; setPos({ x: Math.max(0, e.clientX - dragOffset.current.x), y: Math.max(0, e.clientY - dragOffset.current.y) }); };
    const onUp = () => setDragging(false);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp); };
  }, [dragging]);

  const tabs = [
    { id: 'prototype', label: '▶ Live Demo' },
    { id: 'explorer', label: '📂 Explorer' },
    { id: 'info', label: 'ℹ️ Info' },
  ];

  return createPortal(
    <motion.div
      initial={{ scale: 0.85, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.85, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 26 }}
      style={{
        position: 'fixed', top: pos.y, left: pos.x,
        width: 860, height: 560,
        zIndex: 8000,
        display: 'flex', flexDirection: 'column',
        background: 'var(--cream)', border: 'var(--border)',
        borderRadius: 8, boxShadow: '6px 6px 0 rgba(26,22,18,.35)',
        overflow: 'hidden',
        maxWidth: 'calc(100vw - 20px)',
        maxHeight: 'calc(100vh - 60px)',
      }}
    >
      {/* Title bar */}
      <div onMouseDown={onMouseDown}
        style={{ background: project.accentColor || 'var(--beige)', borderBottom: 'var(--border)', padding: '7px 12px', display: 'flex', alignItems: 'center', gap: 10, cursor: 'grab', flexShrink: 0, userSelect: 'none' }}>
        <div style={{ display: 'flex', gap: 5 }}>
          <div onClick={onClose} style={{ width: 12, height: 12, borderRadius: '50%', background: '#f2b8b8', border: '1.5px solid #1a1612', cursor: 'pointer' }} />
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#f0e0a8', border: '1.5px solid #1a1612' }} />
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#b8e0c8', border: '1.5px solid #1a1612' }} />
        </div>
        <span style={{ flex: 1, textAlign: 'center', fontFamily: 'var(--font-display)', fontSize: 14 }}>
          {project.icon} {project.name} — {project.tagline}
        </span>
        <span style={{ fontSize: 11, opacity: 0.5, fontFamily: 'var(--font-mono)' }}>{project.category}</span>
      </div>

      {/* Sub-tabs */}
      <div style={{ display: 'flex', borderBottom: 'var(--border)', background: 'var(--beige)', flexShrink: 0 }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => { setTab(t.id); if (t.id === 'prototype') setBooted(false); }}
            style={{ padding: '6px 16px', fontFamily: 'var(--font-mono)', fontSize: 12, cursor: 'pointer', background: tab === t.id ? 'var(--cream)' : 'transparent', border: 'none', borderRight: 'var(--border-thin)', borderBottom: tab === t.id ? '2px solid var(--black)' : 'none', color: 'var(--black)', fontWeight: tab === t.id ? 'bold' : 'normal' }}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflow: 'hidden' }}>
        <AnimatePresence mode="wait">
          {tab === 'prototype' && (
            <motion.div key="proto" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ height: '100%' }}>
              {!booted ? (
                <BootScreen project={project} onComplete={() => setBooted(true)} />
              ) : (
                <div style={{ height: '100%', overflow: 'auto' }}>
                  <Prototype />
                </div>
              )}
            </motion.div>
          )}
          {tab === 'explorer' && (
            <motion.div key="exp" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ height: '100%' }}>
              <FileExplorer project={project} />
            </motion.div>
          )}
          {tab === 'info' && (
            <motion.div key="info" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ padding: 20, overflow: 'auto', height: '100%' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, marginBottom: 6 }}>{project.icon} {project.name}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, opacity: 0.7, marginBottom: 16 }}>{project.description}</div>
              
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 18 }}>
                {project.tech.map(t => (
                  <span key={t} style={{ fontFamily: 'var(--font-pixel)', fontSize: 15, padding: '2px 10px', border: 'var(--border-thin)', background: 'var(--paper)', borderRadius: 3 }}>{t}</span>
                ))}
              </div>
              
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 18 }}>
                <span style={{ padding: '3px 10px', background: project.statusColor, border: 'var(--border-thin)', borderRadius: 3, fontFamily: 'var(--font-pixel)', fontSize: 14 }}>{project.status}</span>
                <span style={{ padding: '3px 10px', background: 'var(--beige)', border: 'var(--border-thin)', borderRadius: 3, fontFamily: 'var(--font-pixel)', fontSize: 14 }}>{project.category}</span>
              </div>

              {/* LINKS EXTERNOS */}
              {(project.githubUrl || project.liveUrl) && (
                <div style={{ display: 'flex', gap: 12, marginBottom: 22 }}>
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noreferrer" className="retro-btn" style={{ fontSize: 12, padding: '5px 12px', background: 'var(--beige)', textDecoration: 'none', color: 'black', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                      📂 View Source Code
                    </a>
                  )}
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noreferrer" className="retro-btn" style={{ fontSize: 12, padding: '5px 12px', background: '#b8e0c8', textDecoration: 'none', color: 'black', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                      🌐 Launch Application
                    </a>
                  )}
                </div>
              )}

              {project.screenshots && (
                <div>
                  <div style={{ fontFamily: 'var(--font-pixel)', fontSize: 16, marginBottom: 10 }}>SYSTEM SCREENSHOTS</div>
                  {project.screenshots.map((s, i) => (
                    <div key={i} style={{ display: 'flex', gap: 10, padding: '8px 0', borderBottom: '1px solid rgba(26,22,18,.08)' }}>
                      <span style={{ fontFamily: 'var(--font-pixel)', fontSize: 14, width: 140, flexShrink: 0 }}>→ {s.label}</span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, opacity: 0.7 }}>{s.desc}</span>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>,
    document.body
  );
}

// ── Project Card ─────────────────────────────────────────────
function ProjectCard({ project, onOpen }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -3, boxShadow: '5px 5px 0 rgba(26,22,18,.35)' }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        background: 'var(--paper)', border: 'var(--border)', borderRadius: 6,
        boxShadow: '3px 3px 0 rgba(26,22,18,.25)', overflow: 'hidden', cursor: 'pointer',
      }}
      onClick={() => onOpen(project)}
    >
      {/* Card "screen" */}
      <div style={{
        height: 90, background: `linear-gradient(135deg, ${project.accentColor}66 0%, var(--beige) 100%)`,
        borderBottom: 'var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 42, position: 'relative', overflow: 'hidden',
      }}>
        <motion.div animate={{ scale: hovered ? 1.15 : 1 }} transition={{ duration: 0.2 }}>
          {project.icon}
        </motion.div>

        {/* Fake window dots */}
        <div style={{ position: 'absolute', top: 8, left: 10, display: 'flex', gap: 4 }}>
          {['#f2b8b8','#f0e0a8','#b8e0c8'].map((c, i) => (
            <div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: c, border: '1px solid rgba(26,22,18,.3)' }} />
          ))}
        </div>
        <div style={{ position: 'absolute', bottom: 8, right: 10 }}>
          <span style={{ fontFamily: 'var(--font-pixel)', fontSize: 13, padding: '1px 8px', background: project.statusColor, border: '1px solid rgba(26,22,18,.4)', borderRadius: 2 }}>
            {project.status}
          </span>
        </div>
      </div>

      {/* Card body */}
      <div style={{ padding: '12px 14px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 6, marginBottom: 4 }}>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, lineHeight: 1.2 }}>{project.name}</div>
            <div style={{ fontFamily: 'var(--font-pixel)', fontSize: 13, opacity: 0.55, marginTop: 1 }}>{project.category}</div>
          </div>
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, opacity: 0.7, lineHeight: 1.5, marginBottom: 10 }}>
          {project.description.slice(0, 72)}...
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 10 }}>
          {project.tech.map(t => (
            <span key={t} style={{ fontFamily: 'var(--font-pixel)', fontSize: 12, padding: '1px 6px', background: 'var(--beige)', border: 'var(--border-thin)', borderRadius: 2 }}>{t}</span>
          ))}
        </div>
        <motion.button
          animate={{ background: hovered ? '#f2b8c6' : 'var(--beige)' }}
          style={{ width: '100%', padding: '6px', fontFamily: 'var(--font-mono)', fontSize: 12, border: 'var(--border)', borderRadius: 3, cursor: 'pointer', color: 'var(--black)', boxShadow: '2px 2px 0 rgba(26,22,18,.25)' }}>
          {hovered ? project.prototypeLabel : '▶ Open Project'}
        </motion.button>
      </div>
    </motion.div>
  );
}

// ── Backdrop ─────────────────────────────────────────────────
function Backdrop({ onClose }) {
  return createPortal(
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
      style={{ position: 'fixed', inset: 0, background: 'rgba(26,22,18,.45)', zIndex: 7999, backdropFilter: 'blur(1px)' }} />,
    document.body
  );
}

// ── Main Component ───────────────────────────────────────────
export default function ProjectViewer() {
  const [openProject, setOpenProject] = useState(null);
  const [filter, setFilter] = useState('all');
  const categories = ['all', ...new Set(PROJECTS.map(p => p.category))];
  const filtered = filter === 'all' ? PROJECTS : PROJECTS.filter(p => p.category === filter);

  return (
    <div className="window-pad" style={{ position: 'relative' }}>
      {/* Header */}
      <div style={{ marginBottom: 16 }}>
        <div className="label" style={{ marginBottom: 10 }}>[ PROJECTS — {PROJECTS.length} sistemas ]</div>
        {/* Filter tabs */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {categories.map(cat => (
            <button key={cat} className="retro-btn"
              onClick={() => setFilter(cat)}
              style={{ fontSize: 12, padding: '3px 10px', background: filter === cat ? 'var(--pink)' : 'var(--beige)', fontWeight: filter === cat ? 'bold' : 'normal' }}>
              {cat === 'all' ? '✦ All' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 14 }}>
        {filtered.map((project, i) => (
          <motion.div key={project.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
            <ProjectCard project={project} onOpen={setOpenProject} />
          </motion.div>
        ))}
      </div>

      {/* Hint */}
      <div style={{ marginTop: 16, padding: '8px 12px', background: 'var(--yellow)', border: 'var(--border-thin)', borderRadius: 4, fontFamily: 'var(--font-pixel)', fontSize: 14 }}>
        💡 Click on any project to open it as an interactive application      
      </div>

      {/* Modal + Backdrop */}
      <AnimatePresence>
        {openProject && (
          <>
            <Backdrop onClose={() => setOpenProject(null)} />
            <ProjectModal project={openProject} onClose={() => setOpenProject(null)} />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}