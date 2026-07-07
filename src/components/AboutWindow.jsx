// ============================================================
// AboutWindow.jsx — About Me section
// ============================================================

import React from 'react';
import { motion } from 'framer-motion';
import { PROFILE } from '../data/portfolioData';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } }
};
const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

export default function AboutWindow() {
  return (
    <motion.div
      className="window-pad"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div variants={itemVariants} style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18, flexWrap: 'wrap' }}>
          
          {/* CONTENEDOR DE FOTO */}
          <div style={{ flexShrink: 0 }}>
            <img 
              src={PROFILE.avatar} 
              alt={PROFILE.name}
              style={{
                width: '80px',
                height: '80px',
                objectFit: 'cover',
                borderRadius: '20%', 
                border: '3px solid var(--pink, #f9c5d1)', 
                boxShadow: '2px 2px 0px rgba(0,0,0,0.15)'
              }}
            />
          </div>

          {/* CONTENEDOR DE TU TEXTO */}
          <div style={{ flex: 1, minWidth: '200px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 4 }}>
              <div className="pixel-title" style={{ margin: 0 }}>{PROFILE.name}_</div>
              <div className="retro-badge" style={{ background: 'var(--pink-light)', padding: '2px 8px' }}>
                🌸 she/her
              </div>
            </div>
            <div className="display-title" style={{ opacity: 0.75, fontSize: 15 }}>
              {PROFILE.title}
            </div>
          </div>

        </div>
      </motion.div>
      <hr className="retro-divider" />

      {/* Bio */}
      <motion.div variants={itemVariants} style={{ marginBottom: 18 }}>
        <div className="label" style={{ marginBottom: 8 }}>[ ABOUT.txt ]</div>
        <div className="mono-text" style={{ lineHeight: 1.7 }}>
          {PROFILE.bio}
        </div>
      </motion.div>

      {/* Tagline */}
      <motion.div variants={itemVariants}>
        <div
          className="retro-card"
          style={{ background: 'var(--pink-light)', marginBottom: 18 }}
        >
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, lineHeight: 1.4 }}>
            "{PROFILE.tagline}"
          </div>
        </div>
      </motion.div>

      {/* Philosophy */}
      <motion.div variants={itemVariants} style={{ marginBottom: 18 }}>
        <div className="label" style={{ marginBottom: 8 }}>[ PHILOSOPHY.exe ]</div>
        <div className="mono-text" style={{ opacity: 0.85, fontStyle: 'italic' }}>
          {PROFILE.philosophy}
        </div>
      </motion.div>

      {/* Objectives */}
      <motion.div variants={itemVariants}>
        <div className="label" style={{ marginBottom: 10 }}>[ OBJECTIVES[] ]</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {PROFILE.objectives.map((obj, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 10,
                padding: '8px 12px',
                background: 'var(--paper)',
                border: 'var(--border-thin)',
                borderRadius: 4,
              }}
            >
              <span style={{ fontFamily: 'var(--font-pixel)', fontSize: 15, flexShrink: 0, color: 'var(--pink)' }}>
                ▶
              </span>
              <span className="mono-text">{obj}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Focus Areas */}
      <motion.div variants={itemVariants} style={{ marginTop: 18 }}>
        <div className="label" style={{ marginBottom: 10 }}>[ FOCUS_AREAS[] ]</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {['LegalTech', 'Cybersecurity', 'AI + Law', 'Smart Contracts', 'Data Privacy', 'Digital Governance', 'Ethical Hacking', 'Web Dev'].map(tag => (
            <span
              key={tag}
              className="retro-badge"
              style={{
                background: tag.includes('Legal') || tag.includes('Law') || tag.includes('Gov')
                  ? 'var(--mint-light)'
                  : tag.includes('Cyber') || tag.includes('Hack')
                    ? 'var(--pink-light)'
                    : 'var(--blue-light)'
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
