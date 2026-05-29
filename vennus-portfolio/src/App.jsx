// ============================================================
// App.jsx 
// ============================================================

import React, { useState, useCallback, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import Window from './components/Window';
import LoadingScreen from './components/LoadingScreen';
import AboutWindow from './components/AboutWindow';
import ProjectViewer from './components/ProjectViewer';
import SkillsWindow from './components/SkillsWindow';
import ExperienceWindow from './components/ExperienceWindow';
import ContactWindow from './components/ContactWindow';
import TerminalWindow from './components/TerminalWindow';

import fotoPerrito from './images/perrito.jpeg';

import './styles/global.css';
import './styles/desktop.css';

// ── Window Definitions ──────────────────────────────────────
const WINDOWS_CONFIG = [
  {
    id: 'about',
    title: '✦ About Me',
    icon: '🌸',
    label: 'About.me',
    color: 'var(--pink-light)',
    defaultPosition: { x: 60, y: 40 },
    defaultSize: { w: 540, h: 500 },
    component: AboutWindow,
  },
  {
    id: 'projects',
    title: '📂 Projects',
    icon: '📂',
    label: 'Projects',
    color: 'var(--yellow)',
    defaultPosition: { x: 80, y: 50 },
    defaultSize: { w: 780, h: 580 },
    component: ProjectViewer,
  },
  {
    id: 'skills',
    title: '⚡ Skills',
    icon: '⚡',
    label: 'Skills.sys',
    color: 'var(--mint-light)',
    defaultPosition: { x: 200, y: 60 },
    defaultSize: { w: 520, h: 480 },
    component: SkillsWindow,
  },
  {
    id: 'experience',
    title: '📋 Experience',
    icon: '📋',
    label: 'Timeline',
    color: 'var(--blue-light)',
    defaultPosition: { x: 180, y: 50 },
    defaultSize: { w: 500, h: 500 },
    component: ExperienceWindow,
  },
  {
    id: 'contact',
    title: '📬 Contact',
    icon: '📬',
    label: 'Contact',
    color: 'var(--lavender)',
    defaultPosition: { x: 250, y: 80 },
    defaultSize: { w: 480, h: 520 },
    component: ContactWindow,
  },
  {
    id: 'terminal',
    title: '💻 Terminal',
    icon: '💻',
    label: 'Terminal',
    color: '#1a1208',
    defaultPosition: { x: 100, y: 100 },
    defaultSize: { w: 560, h: 420 },
    component: TerminalWindow,
  },
];

// ── Clock ────────────────────────────────────────────────────
function Clock() {
  const [time, setTime] = useState('');
  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));
    };
    update();
    const t = setInterval(update, 30000);
    return () => clearInterval(t);
  }, []);
  return <div className="taskbar-time">{time}</div>;
}

// ── Main App ─────────────────────────────────────────────────
export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [openWindows, setOpenWindows] = useState({});
  const [minimizedWindows, setMinimizedWindows] = useState({});
  const [zIndices, setZIndices] = useState({});
  const [topZ, setTopZ] = useState(100);
  const [theme, setTheme] = useState('light');
  const [notification, setNotification] = useState(null);

  // Apply theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Welcome notification after load
  const handleLoaded = useCallback(() => {
    setLoaded(true);
    setTimeout(() => {
      setNotification({ title: 'Vennus OS', message: 'Desktop ready. Double-click icons to open windows.' });
      setTimeout(() => setNotification(null), 4000);
    }, 500);
  }, []);

  const openWindow = useCallback((id) => {
    setMinimizedWindows(prev => ({ ...prev, [id]: false }));
    setOpenWindows(prev => ({ ...prev, [id]: true }));
    setTopZ(z => z + 1);
    setZIndices(prev => ({ ...prev, [id]: topZ + 1 }));
  }, [topZ]);

  const closeWindow = useCallback((id) => {
    setOpenWindows(prev => ({ ...prev, [id]: false }));
  }, []);

  const minimizeWindow = useCallback((id) => {
    setMinimizedWindows(prev => ({ ...prev, [id]: true }));
  }, []);

  const focusWindow = useCallback((id) => {
    setTopZ(z => z + 1);
    setZIndices(prev => ({ ...prev, [id]: topZ + 1 }));
  }, [topZ]);

  const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light');

  return (
    <>
      {/* Boot screen */}
      {!loaded && <LoadingScreen onComplete={handleLoaded} />}

      {/* Desktop */}
      <div className="desktop">

        {/* ── Desktop Icons — Right column ── */}
        <div className="desktop-icons">
          {WINDOWS_CONFIG.map(win => (
            <div
              key={win.id}
              className={`desktop-icon${openWindows[win.id] ? ' selected' : ''}`}
              onDoubleClick={() => openWindow(win.id)}
              onClick={() => openWindow(win.id)} // single tap on mobile
              title={`Open ${win.label}`}
            >
              <div className="icon-image">{win.icon}</div>
              <div className="icon-label">{win.label}</div>
            </div>
          ))}
        </div>

        {/* ── Sticky note ── */}
        <div
          className="sticky-note"
          style={{ top: 80, left: 120 }}
        >
          <strong>TODO:</strong>
          <br />— Finish LUMES project
          <br />— Study smart contracts
          <br />— Coffee ☕
        </div>

        {/*"Do it for him" */}
        <div
          className="sticky-note dog-motivation"
          style={{ 
            top: 260, 
            left: 120, 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            gap: '8px',
            textAlign: 'center'
          }}
        >
          <img 
            src={fotoPerrito} 
            alt="Do it for him" 
            style={{ 
              width: '100%', 
              maxHeight: '140px', 
              objectFit: 'cover', 
              borderRadius: '4px' 
            }}

          />
          <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 'bold', fontSize: '13px' }}>
            DOING IT FOR HIM
          </span>
        </div>


        {/* ── Windows ── */}
        {WINDOWS_CONFIG.map(win => {
          const Component = win.component;
          const isOpen = openWindows[win.id] && !minimizedWindows[win.id];
          return (
            <Window
              key={win.id}
              id={win.id}
              title={win.title}
              isOpen={isOpen}
              onClose={closeWindow}
              onMinimize={minimizeWindow}
              onFocus={focusWindow}
              zIndex={zIndices[win.id] || 100}
              defaultPosition={win.defaultPosition}
              defaultSize={win.defaultSize}
              accentColor={win.color}
            >
              <Component />
            </Window>
          );
        })}

        {/* ── Toast notification ── */}
        <AnimatePresence>
          {notification && (
            <motion.div
              className="notification"
              initial={{ opacity: 0, y: 20, x: 20 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, y: 20 }}
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}
            >
              {/* Contenedor de los textos */}
              <div style={{ flex: 1 }}>
                <div className="notification-title">{notification.title}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>{notification.message}</div>
              </div>

              {/* Botón de cierre X */}
              <button
                onClick={() => setNotification(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'inherit',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  lineHeight: '1',
                  padding: '2px 6px',
                  opacity: 0.6,
                  transition: 'opacity 0.2s',
                  fontFamily: 'var(--font-mono)'
                }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                onMouseLeave={(e) => e.currentTarget.style.opacity = '0.6'}
                title="Cerrar notificación"
              >
                ×
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Taskbar ── */}
        <div className="taskbar">
          <button
            className="taskbar-start"
            onClick={() => setNotification({ title: '✦ Vennus', message: 'LegalTech Developer & Cybersecurity Enthusiast' })}
          >
            ✦ Vennus
          </button>

          <div className="taskbar-divider" />

          {/* Open window buttons */}
          {WINDOWS_CONFIG.filter(w => openWindows[w.id]).map(win => (
            <button
              key={win.id}
              className={`taskbar-btn${!minimizedWindows[win.id] ? ' active' : ''}`}
              onClick={() => {
                if (minimizedWindows[win.id]) {
                  setMinimizedWindows(prev => ({ ...prev, [win.id]: false }));
                  focusWindow(win.id);
                } else {
                  minimizeWindow(win.id);
                }
              }}
            >
              {win.icon} {win.label}
            </button>
          ))}

          <div style={{ flex: 1 }} />

          <button className="theme-toggle" onClick={toggleTheme} title="Toggle theme">
            {theme === 'light' ? '🌙' : '☀️'}
          </button>

          <Clock />
        </div>
      </div>
    </>
  );
}
