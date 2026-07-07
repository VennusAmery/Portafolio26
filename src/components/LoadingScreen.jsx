// ============================================================
// LoadingScreen.jsx 
// ============================================================

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BOOT_MESSAGES = [
  'Initializing Vennus OS...',
  'Loading legal modules...',
  'Mounting cybersecurity layer...',
  'Connecting to LegalTech core...',
  'Compiling portfolio assets...',
  'Starting desktop environment...',
  'Welcome. ✦',
];

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [msgIndex, setMsgIndex] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 18 + 8;
      if (p >= 100) {
        p = 100;
        clearInterval(interval);
        setTimeout(() => {
          setDone(true);
          setTimeout(onComplete, 600);
        }, 400);
      }
      setProgress(p);
      setMsgIndex(Math.min(Math.floor(p / (100 / BOOT_MESSAGES.length)), BOOT_MESSAGES.length - 1));
    }, 260);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Decorative circles */}
          <div style={{ position: 'absolute', top: '15%', left: '12%', width: 120, height: 120, borderRadius: '50%', background: 'var(--pink-light)', border: 'var(--border)', opacity: 0.5 }} />
          <div style={{ position: 'absolute', bottom: '20%', right: '10%', width: 80, height: 80, borderRadius: '50%', background: 'var(--mint-light)', border: 'var(--border)', opacity: 0.5 }} />
          <div style={{ position: 'absolute', top: '30%', right: '20%', width: 50, height: 50, borderRadius: '50%', background: 'var(--blue-light)', border: 'var(--border)', opacity: 0.4 }} />

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: 'center' }}
          >
            {/* Logo */}
            <div className="loading-logo">VENNUS</div>
            <div className="loading-subtitle" style={{ marginBottom: 32 }}>
              LegalTech · Cybersecurity · Development
            </div>

            {/* Progress bar */}
            <div className="loading-bar-wrap" style={{ margin: '0 auto 14px' }}>
              <div
                className="loading-bar-fill"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Status */}
            <div className="loading-status">
              {BOOT_MESSAGES[msgIndex]}
            </div>

            <div
              style={{
                marginTop: 32,
                fontFamily: 'var(--font-pixel)',
                fontSize: 14,
                opacity: 0.35,
              }}
            >
              © Vennus OS 2025 · All rights reserved
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
