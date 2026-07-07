// ============================================================
// Window.jsx — Draggable OS-style window component
// ============================================================

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const windowVariants = {
  hidden: { scale: 0.85, opacity: 0, y: 20 },
  visible: {
    scale: 1,
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 280, damping: 24 }
  },
  exit: {
    scale: 0.85,
    opacity: 0,
    y: 20,
    transition: { duration: 0.18 }
  }
};

export default function Window({
  id,
  title,
  children,
  isOpen,
  onClose,
  onMinimize,
  onFocus,
  zIndex,
  defaultPosition,
  defaultSize,
  accentColor,
}) {
  const [position, setPosition] = useState(defaultPosition || { x: 80, y: 60 });
  const [size] = useState(defaultSize || { w: 580, h: 440 });
  const [isMaximized, setIsMaximized] = useState(false);

  const dragging = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const windowRef = useRef(null);

  // Bring to front on click
  const handleWindowClick = () => onFocus?.(id);

  // Drag handlers
  const handleMouseDown = useCallback((e) => {
    if (isMaximized) return;
    dragging.current = true;
    dragOffset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y
    };
    onFocus?.(id);
    e.preventDefault();
  }, [position, isMaximized, id, onFocus]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!dragging.current) return;
      const newX = Math.max(0, Math.min(e.clientX - dragOffset.current.x, window.innerWidth - 200));
      const newY = Math.max(0, Math.min(e.clientY - dragOffset.current.y, window.innerHeight - 100));
      setPosition({ x: newX, y: newY });
    };
    const handleMouseUp = () => { dragging.current = false; };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  // Touch drag support
  const handleTouchStart = useCallback((e) => {
    if (isMaximized) return;
    const touch = e.touches[0];
    dragging.current = true;
    dragOffset.current = {
      x: touch.clientX - position.x,
      y: touch.clientY - position.y
    };
    onFocus?.(id);
  }, [position, isMaximized, id, onFocus]);

  useEffect(() => {
    const handleTouchMove = (e) => {
      if (!dragging.current) return;
      const touch = e.touches[0];
      const newX = Math.max(0, Math.min(touch.clientX - dragOffset.current.x, window.innerWidth - 200));
      const newY = Math.max(0, Math.min(touch.clientY - dragOffset.current.y, window.innerHeight - 100));
      setPosition({ x: newX, y: newY });
      e.preventDefault();
    };
    const handleTouchEnd = () => { dragging.current = false; };

    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);
    return () => {
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  const windowStyle = isMaximized
    ? { position: 'fixed', top: 0, left: 0, right: 0, bottom: 44, width: '100%', height: 'calc(100vh - 44px)', zIndex }
    : { position: 'absolute', top: position.y, left: position.x, width: size.w, height: size.h, zIndex };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={windowRef}
          className="os-window"
          style={windowStyle}
          variants={windowVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={handleWindowClick}
        >
          {/* Title Bar */}
          <div
            className="os-window-titlebar"
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            style={accentColor ? { background: accentColor } : {}}
          >
            <div className="os-window-buttons">
              <div
                className="os-window-btn close"
                onClick={(e) => { e.stopPropagation(); onClose?.(id); }}
                title="Close"
              />
              <div
                className="os-window-btn minimize"
                onClick={(e) => { e.stopPropagation(); onMinimize?.(id); }}
                title="Minimize"
              />
              <div
                className="os-window-btn maximize"
                onClick={(e) => { e.stopPropagation(); setIsMaximized(m => !m); }}
                title="Maximize"
              />
            </div>
            <span className="os-window-title">{title}</span>
            <div style={{ width: 37 }} /> {/* balance */}
          </div>

          {/* Content */}
          <div className="os-window-content">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
