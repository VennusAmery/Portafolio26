// ============================================================
// SkillsWindow.jsx — Skills with retro progress bars
// ============================================================

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { SKILLS } from '../data/portfolioData';

const CATEGORIES = [
  { key: 'frontend',      label: 'Frontend', emoji: '🖥️', color: 'var(--blue-light)' },
  { key: 'backend',       label: 'Backend', emoji: '⚙️', color: 'var(--mint-light)' },
  { key: 'databases',     label: 'Databases', emoji: '🗄️', color: 'var(--yellow)' },
  { key: 'cybersecurity', label: 'Cybersecurity', emoji: '🔐', color: 'var(--pink-light)' },
  { key: 'legal',         label: 'Legal Areas', emoji: '⚖️', color: 'var(--lavender)' },
  { key: 'DevOps',        label: 'DevOps', emoji: '⚙️', color: 'var(--blue-light)' }
];

function SkillBar({ name, level, color, delay }) {
  const [animated, setAnimated] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), delay * 100);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>{name}</span>
        <span style={{ fontFamily: 'var(--font-pixel)', fontSize: 14, opacity: 0.7 }}>{level}%</span>
      </div>
      <div className="retro-progress" ref={ref}>
        <div
          className="retro-progress-fill"
          style={{
            width: animated ? `${level}%` : '0%',
            background: color
              ? `repeating-linear-gradient(90deg, ${color} 0px, ${color} 6px, transparent 6px, transparent 8px)`
              : undefined,
          }}
        />
      </div>
    </div>
  );
}

export default function SkillsWindow() {
  const [activeTab, setActiveTab] = useState('frontend');
  const active = CATEGORIES.find(c => c.key === activeTab);
  const skills = SKILLS[activeTab] || [];

  return (
    <div className="window-pad">
      <div className="label" style={{ marginBottom: 14 }}>[ SKILLS.sys ]</div>

      {/* Tab bar */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 6,
          marginBottom: 20,
          padding: '8px',
          background: 'var(--paper)',
          border: 'var(--border-thin)',
          borderRadius: 4,
        }}
      >
        {CATEGORIES.map(cat => (
          <button
            key={cat.key}
            className="retro-btn"
            onClick={() => setActiveTab(cat.key)}
            style={{
              fontSize: 12,
              padding: '3px 10px',
              background: activeTab === cat.key ? active?.color || 'var(--pink-light)' : 'var(--beige)',
              fontWeight: activeTab === cat.key ? 'bold' : 'normal',
            }}
          >
            {cat.emoji} {cat.label}
          </button>
        ))}
      </div>

      {/* Skills list */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, x: 12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.25 }}
      >
        <div
          style={{
            padding: '14px',
            background: active?.color || 'var(--paper)',
            border: 'var(--border-thin)',
            borderRadius: 6,
            marginBottom: 16,
          }}
        >
          <div className="display-title" style={{ marginBottom: 14 }}>
            {active?.emoji} {active?.label}
          </div>
          {skills.map((skill, i) => (
            <SkillBar
              key={skill.name}
              name={skill.name}
              level={skill.level}
              color={
                activeTab === 'cybersecurity' ? '#f2b8c6' :
                activeTab === 'legal' ? '#d4b8e0' :
                activeTab === 'backend' ? '#b8e0c8' :
                activeTab === 'databases' ? '#f0e0a8' :
                activeTab === 'DevOps' ? '#a8d0f0' :
                '#b8cfe0'
              }
              delay={i}
            />
          ))}
        </div>
      </motion.div>

      {/* Terminal-style summary */}
      <div
        style={{
          background: 'var(--black)',
          color: 'var(--mint)',
          fontFamily: 'var(--font-mono)',
          fontSize: 12,
          padding: '12px',
          borderRadius: 4,
          border: 'var(--border-thin)',
          lineHeight: 1.7,
        }}
      >
        <span style={{ color: 'var(--pink)' }}>vennus@portfolio</span>
        <span style={{ color: 'var(--cream)' }}>:~$ </span>
        <span>cat skills_summary.txt</span>
        <br />
        <span style={{ opacity: 0.8 }}>
          → 5 skill domains · {Object.values(SKILLS).flat().length} technologies<br />
          → Bridging law and code since 2022<br />
          → Currently learning: Solidity, ML for legal analytics
        </span>
      </div>
    </div>
  );
}
