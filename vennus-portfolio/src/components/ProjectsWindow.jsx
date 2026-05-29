// ============================================================
// ProjectsWindow.jsx — Projects portfolio
// ============================================================

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS } from '../data/portfolioData';

const STATUS_CLASSES = {
  'Completed': 'completed',
  'In Development': 'development',
  'Prototype': 'prototype',
  'Research': 'research',
};

const CATEGORY_ICONS = {
  'LegalTech': '⚖️',
  'Healthcare': '🏥',
  'AI Legal': '🤖',
  'AI & Vision': '👁️',
  'Enterprise': '📦',
  'Blockchain': '🔗',
  'Cybersecurity': '🔐',
};

export default function ProjectsWindow() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="window-pad">
      <div className="label" style={{ marginBottom: 14 }}>[ PROJECTS — {PROJECTS.length} items ]</div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: 14,
        }}
      >
        {PROJECTS.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className="retro-card"
            style={{ cursor: 'pointer', background: project.color + '55', borderLeft: `4px solid ${project.color}` }}
            onClick={() => setSelected(selected?.id === project.id ? null : project)}
          >
            {/* Card header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <span style={{ fontSize: 22 }}>{CATEGORY_ICONS[project.category]}</span>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 15, lineHeight: 1.2 }}>
                  {project.name}
                </div>
                <div style={{ fontFamily: 'var(--font-pixel)', fontSize: 13, opacity: 0.65 }}>
                  {project.category}
                </div>
              </div>
            </div>

            {/* Status */}
            <div style={{ marginBottom: 8 }}>
              <span className={`status-dot ${STATUS_CLASSES[project.status]}`} />
              <span style={{ fontFamily: 'var(--font-pixel)', fontSize: 13 }}>{project.status}</span>
            </div>

            {/* Description preview */}
            <div
              className="mono-text"
              style={{ fontSize: 12, opacity: 0.8, lineHeight: 1.5, marginBottom: 10 }}
            >
              {project.description.slice(0, 80)}...
            </div>

            {/* Tech badges */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
              {project.tech.map(t => (
                <span
                  key={t}
                  style={{
                    fontFamily: 'var(--font-pixel)',
                    fontSize: 12,
                    padding: '1px 6px',
                    background: 'var(--paper)',
                    border: 'var(--border-thin)',
                    borderRadius: 2,
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Expanded project view */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{ overflow: 'hidden', marginTop: 16 }}
          >
            <div
              className="retro-card"
              style={{
                background: selected.color + '33',
                borderLeft: `4px solid ${selected.color}`,
                borderTop: '3px solid var(--black)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 8 }}>
                <div>
                  <div className="display-title">
                    {CATEGORY_ICONS[selected.category]} {selected.name}
                  </div>
                  <div style={{ fontFamily: 'var(--font-pixel)', fontSize: 14, opacity: 0.65 }}>
                    {selected.category} · <span className={`status-dot ${STATUS_CLASSES[selected.status]}`} />{selected.status}
                  </div>
                </div>
                <button
                  className="retro-btn"
                  onClick={() => setSelected(null)}
                  style={{ fontSize: 12, padding: '3px 10px' }}
                >
                  ✕ close
                </button>
              </div>
              <hr className="retro-divider" />
              <div className="mono-text" style={{ lineHeight: 1.7, marginBottom: 14 }}>
                {selected.description}
              </div>
              <div className="label" style={{ marginBottom: 8 }}>Stack:</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {selected.tech.map(t => (
                  <span key={t} className="retro-badge" style={{ background: 'var(--paper)' }}>{t}</span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
