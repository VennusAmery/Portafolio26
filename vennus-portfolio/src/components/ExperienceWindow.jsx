// ============================================================
// ExperienceWindow.jsx 
// ============================================================

import React from 'react';
import { motion } from 'framer-motion';
import { TIMELINE } from '../data/portfolioData';

const TYPE_CONFIG = {
  education: { color: 'var(--blue-light)', icon: '🎓', border: 'var(--blue)' },
  project: { color: 'var(--pink-light)', icon: '💻', border: 'var(--pink)' },
  skill: { color: 'var(--mint-light)', icon: '⚡', border: 'var(--mint)' },
  research: { color: 'var(--lavender)', icon: '📖', border: 'var(--lavender)' },
  work: { color: 'var(--yellow)', icon: '💼', border: 'var(--yellow)' },
  present: { color: 'var(--mint-light)', icon: '🌟', border: 'var(--mint)' },
};

export default function ExperienceWindow() {
  return (
    <div className="window-pad">
      <div className="label" style={{ marginBottom: 20 }}>[ TIMELINE.log ]</div>

      <div style={{ position: 'relative' }}>
        {/* Vertical line */}
        <div
          style={{
            position: 'absolute',
            left: 30,
            top: 0,
            bottom: 0,
            width: 2,
            background: 'var(--beige-dark)',
            borderLeft: 'var(--border-thin)',
          }}
        />

        {TIMELINE.map((item, i) => {
          const config = TYPE_CONFIG[item.type] || TYPE_CONFIG.project;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              style={{
                display: 'flex',
                gap: 20,
                marginBottom: 20,
                position: 'relative',
              }}
            >
              {/* Year + dot */}
              <div style={{ width: 60, flexShrink: 0, position: 'relative', zIndex: 1 }}>
                <div
                  style={{
                    width: 32,
                    height: 32,
                    background: config.color,
                    border: `2px solid var(--black)`,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 16,
                    boxShadow: '2px 2px 0 var(--shadow-hard)',
                  }}
                >
                  {config.icon}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-pixel)',
                    fontSize: 13,
                    marginTop: 4,
                    opacity: 0.65,
                    paddingLeft: 2,
                  }}
                >
                  {item.year}
                </div>
              </div>

              {/* Content */}
              <div
                className="retro-card"
                style={{
                  flex: 1,
                  background: config.color,
                  borderLeft: `3px solid var(--black)`,
                  marginTop: 2,
                }}
              >
                <div className="display-title" style={{ fontSize: 15, marginBottom: 6 }}>
                  {item.title}
                </div>

                {item.University && (
                    <div 
                      className="pixel-text" 
                      style={{ 
                        fontFamily: 'var(--font-pixel)', 
                        fontSize: 12, 
                        opacity: 0.7, 
                        marginBottom: 6,
                        color: 'var(--black)' 
                      }}
                    >
                      🏫 {item.University}
                    </div>
                  )}

                <div className="mono-text" style={{ opacity: 0.82 }}>
                  {item.description}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Status footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        style={{
          marginTop: 8,
          padding: '10px 14px',
          background: 'var(--mint-light)',
          border: 'var(--border-thin)',
          borderRadius: 4,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <span style={{ animation: 'pulse 2s infinite', display: 'inline-block' }}>🟢</span>
        <span style={{ fontFamily: 'var(--font-pixel)', fontSize: 14 }}>
          Currently active — Building & learning every day
        </span>
      </motion.div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}
