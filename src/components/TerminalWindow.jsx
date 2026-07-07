// ============================================================
// TerminalWindow.jsx — Interactive fake terminal
// ============================================================

import React, { useState, useRef, useEffect } from 'react';
import { TERMINAL_RESPONSES } from '../data/portfolioData';

export default function TerminalWindow() {
  const [history, setHistory] = useState([
    { type: 'system', text: 'Vennus OS v2.5 — LegalTech Terminal' },
    { type: 'system', text: 'Type "help" for available commands.' },
    { type: 'system', text: '─────────────────────────────' },
  ]);
  const [input, setInput] = useState('');
  const [cmdHistory, setCmdHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (cmd) => {
    const trimmed = cmd.trim().toLowerCase();
    const newHistory = [...history, { type: 'input', text: `vennus@portfolio:~$ ${cmd}` }];

    if (trimmed === 'clear') {
      setHistory([{ type: 'system', text: 'Terminal cleared. Type "help" for commands.' }]);
      setInput('');
      return;
    }

    const response = TERMINAL_RESPONSES[trimmed];
    if (response) {
      const lines = response.split('\n');
      lines.forEach(line => {
        newHistory.push({ type: 'output', text: line });
      });
    } else if (trimmed === '') {
      // do nothing
    } else {
      newHistory.push({
        type: 'error',
        text: `Command not found: "${trimmed}". Type "help" for available commands.`
      });
    }

    setHistory(newHistory);
    setCmdHistory(prev => [cmd, ...prev.filter(c => c !== cmd)]);
    setHistoryIndex(-1);
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const newIndex = Math.min(historyIndex + 1, cmdHistory.length - 1);
      setHistoryIndex(newIndex);
      setInput(cmdHistory[newIndex] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const newIndex = Math.max(historyIndex - 1, -1);
      setHistoryIndex(newIndex);
      setInput(newIndex === -1 ? '' : cmdHistory[newIndex]);
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const commands = Object.keys(TERMINAL_RESPONSES);
      const match = commands.find(c => c.startsWith(input.toLowerCase()));
      if (match) setInput(match);
    }
  };

  const getTextColor = (type) => {
    switch (type) {
      case 'input': return '#b8e0c8';
      case 'error': return '#f2b8b8';
      case 'system': return '#b8cfe0';
      default: return '#f5f0e8';
    }
  };

  return (
    <div
      style={{
        background: '#0d0a06',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'var(--font-mono)',
        fontSize: 13,
        padding: '14px',
        minHeight: 300,
        cursor: 'text',
      }}
      onClick={() => inputRef.current?.focus()}
    >
      {/* Output */}
      <div style={{ flex: 1, overflowY: 'auto', marginBottom: 10 }}>
        {history.map((line, i) => (
          <div
            key={i}
            style={{
              color: getTextColor(line.type),
              lineHeight: 1.65,
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-all',
            }}
          >
            {line.text}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input line */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, borderTop: '1px solid #2a2218', paddingTop: 10 }}>
        <span style={{ color: '#f2b8c6', flexShrink: 0 }}>vennus@portfolio</span>
        <span style={{ color: '#f5f0e8', flexShrink: 0 }}>:~$</span>
        <input
          ref={inputRef}
          autoFocus
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: '#b8e0c8',
            fontFamily: 'var(--font-mono)',
            fontSize: 13,
            caretColor: '#b8e0c8',
          }}
          spellCheck={false}
          autoComplete="off"
          placeholder="type a command..."
        />
      </div>

      {/* Quick buttons */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 10, borderTop: '1px solid #2a2218', paddingTop: 10 }}>
        {['help', 'about', 'skills', 'projects', 'contact', 'whoami'].map(cmd => (
          <button
            key={cmd}
            onClick={() => handleCommand(cmd)}
            style={{
              fontFamily: 'var(--font-pixel)',
              fontSize: 13,
              padding: '2px 10px',
              background: '#1a1208',
              border: '1px solid #3a3020',
              borderRadius: 3,
              color: '#b8cfe0',
              cursor: 'pointer',
              transition: 'background 0.15s',
            }}
            onMouseEnter={e => e.target.style.background = '#2a2218'}
            onMouseLeave={e => e.target.style.background = '#1a1208'}
          >
            {cmd}
          </button>
        ))}
      </div>
    </div>
  );
}
