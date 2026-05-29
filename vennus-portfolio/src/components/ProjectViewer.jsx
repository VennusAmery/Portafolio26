// ============================================================
// ProjectViewer.jsx
// ============================================================

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

import commingSoon from '../videos/commingsoon.gif';

import scubacat from '../videos/scubacat-demo.mp4';
import screen1 from '../images//scubacat/gato-inicio.png';
import screen2 from '../images//scubacat/gato-sonrisa.png';
import screen3 from '../images//scubacat/gato-boca.png';
import screen4 from '../images//scubacat/gato-palma.png';
import screen5 from '../images//scubacat/gato-puno.png';


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
    description: 'Full legal management platform with AI-powered case tracking, document automation and jurisprudence analysis.',
    prototypeLabel: '▶️ Ver Demostración en Video',
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
      { label: 'Dashboard', 
        desc: 'Vista general: casos activos, alertas y estadísticas en tiempo real.' 
      },
      { label: 'Expedientes', 
        desc: 'Gestión completa de expedientes con filtros, búsqueda y acceso rápido.' 
      },
      { label: 'LEX AI', 
        desc: 'Chat con IA jurídica entrenada en legislación local y GDPR.' 
      },
      { label: 'Analytics', 
        desc: 'Métricas de rendimiento legal: tasa de éxito, documentos, consultas.' 
      },
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
    description: 'Sistema de visión artificial en tiempo real que utiliza redes neuronales ligeras para detectar expresiones faciales (sonrisas, apertura de boca) y gestos manuales (puño, palma). Mapea dinámicamente cada gesto para controlar la reproducción de videos interactivos e incluye calibración biométrica automatizada.',
    prototypeLabel: '▶️ Ver Demostración en Video',
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
      'README.md': `# CatIA - ScubaCat 🐱\n\nScript interactivo de reconocimiento gestual.
      \n\n## Requisitos de hardware\n- Cámara Web Integrada o USB (Capaz de resolver 640x480)
      \n\n## Ejecución\n\`\`\`bash\npip install -r requirements.txt\npython scubacat.py
      \n\`\`\`\n\n*Nota: El script se autocalibrará en los primeros 2.5 segundos. Quédate serio mirando a la pantalla.*`,
    },
    screenshots: [
      { label: 'Inicio', 
        desc: ' ',
        src: screen1
      },

      { label: 'Gato-Sonrisa', 
        desc: ' ',
        src: screen2 
      },

      { label: 'Gato-Boca', 
        desc: ' ',
        src: screen3 
      },

      { label: 'Gato-Palma', 
        desc: '',
        src: screen4
      },

      { label: 'Gato-Puno', 
        desc: ' ',
        src: screen5
      },
  
    ]
}
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

  const isDark = project.id === 'cyberlex';

  return (
    <div style={{
      height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      background: isDark ? '#000' : 'var(--cream)',
      fontFamily: 'var(--font-mono)', padding: 30, gap: 16,
    }}>
      <div style={{ fontSize: 48 }}>{project.icon}</div>
      <div style={{ fontFamily: 'var(--font-pixel)', fontSize: 28, color: isDark ? project.bootColor : 'var(--black)' }}>
        {project.name}
      </div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, width: 300 }}>
        {project.bootMessages.slice(0, lineIdx).map((msg, i) => (
          <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            style={{ color: isDark ? project.bootColor : 'var(--black)', marginBottom: 4, lineHeight: 1.6, opacity: i === lineIdx - 1 ? 1 : 0.4 }}>
            {isDark ? msg : `> ${msg}`}
          </motion.div>
        ))}
        {lineIdx < project.bootMessages.length && (
          <motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.5 }}
            style={{ color: project.bootColor }}>▋</motion.span>
        )}
      </div>
      <div style={{ width: 300, height: 16, border: '2px solid var(--black)', background: 'var(--paper)', borderRadius: 2, overflow: 'hidden' }}>
        <motion.div animate={{ width: `${progress}%` }} transition={{ duration: 0.3 }}
          style={{ height: '100%', background: project.bootColor, borderRight: '1px solid var(--black)' }} />
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
            Selecciona una carpeta →
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
              {project.files?.['architecture.txt'] || `CLIENT → ${project.tech[0]} Frontend\nBACKEND → ${project.tech[1] || 'API Layer'}\nDB → ${project.tech[2] || 'Database'}`}
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
              {project.screenshots && (
                <div>
                  <div style={{ fontFamily: 'var(--font-pixel)', fontSize: 16, marginBottom: 10 }}>VISTAS DEL SISTEMA</div>
                  {project.screenshots.map((s, i) => (
                    <div key={i} style={{ display: 'flex', gap: 10, padding: '8px 0', borderBottom: '1px solid rgba(26,22,18,.08)' }}>
                      <span style={{ fontFamily: 'var(--font-pixel)', fontSize: 14, width: 120, flexShrink: 0, color: project.bootColor !== '#f0e0a8' ? 'var(--black)' : 'var(--black)' }}>→ {s.label}</span>
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
  const statusClass = { Completed: 'completed', 'In Development': 'development', Prototype: 'prototype', Research: 'research' };

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
          {hovered ? project.prototypeLabel : '▶ Abrir proyecto'}
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
        💡 Haz click en cualquier proyecto para abrirlo como aplicación interactiva
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
