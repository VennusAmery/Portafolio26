import React, { useState, useRef } from 'react'; 
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiCopy, FiCheck } from 'react-icons/fi';
import { PROFILE } from '../data/portfolioData';
import emailjs from '@emailjs/browser';

export default function ContactWindow() {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: '', subject: '', message: '', email: '' }); 
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false); 
  const formRef = useRef();

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PROFILE.email).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY)
      .then(() => {
        setSent(true);
        setFormData({ name: '', subject: '', message: '', email: '' });
        setTimeout(() => setSent(false), 4000);
      })
      .catch((error) => {
        console.error('EmailJS Error:', error);
        alert('Oops! Algo salió mal.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const links = [
    { icon: <FiGithub size={22} />, label: 'GitHub', value: 'github.com/VennusAmery', href: PROFILE.github, color: 'var(--beige)' },
    { icon: <FiLinkedin size={22} />, label: 'LinkedIn', value: 'linkedin.com/in/bárbara-saldana', href: PROFILE.linkedin, color: 'var(--blue-light)' },
    { icon: <FiMail size={22} />, label: 'Email', value: PROFILE.email, href: `mailto:${PROFILE.email}`, color: 'var(--pink-light)' },
  ];

  return (
    <div className="window-pad">
      <div className="label" style={{ marginBottom: 14 }}>[ CONTACT.init ]</div>

      {/* Links */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
        {links.map((link, i) => (
          <motion.a
            key={i}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              padding: '10px 14px',
              background: link.color,
              border: 'var(--border)',
              borderRadius: 6,
              textDecoration: 'none',
              color: 'var(--black)',
              boxShadow: '2px 2px 0 var(--shadow-hard)',
              transition: 'all 0.15s',
            }}
            whileHover={{ x: -2, y: -2, boxShadow: '4px 4px 0 var(--shadow-hard)' }}
          >
            {link.icon}
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 14 }}>{link.label}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, opacity: 0.7 }}>{link.value}</div>
            </div>
          </motion.a>
        ))}
      </div>

      {/* Copy email */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35 }}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: '8px 12px',
          background: 'var(--paper)',
          border: 'var(--border-thin)',
          borderRadius: 4,
          marginBottom: 20,
        }}
      >
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, flex: 1 }}>{PROFILE.email}</span>
        <button
          className="retro-btn"
          onClick={handleCopyEmail}
          style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '4px 10px', fontSize: 12 }}
        >
          {copied ? <FiCheck size={14} /> : <FiCopy size={14} />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </motion.div>

      <hr className="retro-divider" />

      {/* Contact form */}
      <div className="label" style={{ marginBottom: 12 }}>[ SEND_MESSAGE.form ]</div>

      {sent ? (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          style={{
            padding: '20px',
            background: 'var(--mint-light)',
            border: 'var(--border)',
            borderRadius: 6,
            textAlign: 'center',
            fontFamily: 'var(--font-display)',
            fontSize: 16,
          }}
        >
          ✅ Message sent! I'll get back to you soon.
        </motion.div>
      ) : (

<form ref={formRef} onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          
          {/* Campo Nombre */}
          <div>
            <label style={{ fontFamily: 'var(--font-pixel)', fontSize: 14, display: 'block', marginBottom: 4 }}>
              Your name:
            </label>
            <input
              type="text"
              name="name" 
              required
              value={formData.name}
              onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
              style={inputStyle}
            />
          </div>

          {/* Campo Correo de Contacto  */}
          <div>
            <label style={{ fontFamily: 'var(--font-pixel)', fontSize: 14, display: 'block', marginBottom: 4 }}>
              Your Email:
            </label>
            <input
              type="email"
              name="email" 
              required
              value={formData.email}
              onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
              style={inputStyle}
            />
          </div>

          {/* Campo Asunto */}
          <div>
            <label style={{ fontFamily: 'var(--font-pixel)', fontSize: 14, display: 'block', marginBottom: 4 }}>
              Subject:
            </label>
            <input
              type="text"
              name="subject"
              required
              value={formData.subject}
              onChange={e => setFormData(p => ({ ...p, subject: e.target.value }))}
              style={inputStyle}
            />
          </div>

          {/* Campo Mensaje */}
          <div>
            <label style={{ fontFamily: 'var(--font-pixel)', fontSize: 14, display: 'block', marginBottom: 4 }}>
              Message:
            </label>
            <textarea
              rows={4}
              name="message"
              required
              value={formData.message}
              onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
              style={{
                ...inputStyle,
                resize: 'vertical',
              }}
            />
          </div>

          <button
            type="submit" 
            className="retro-btn"
            disabled={loading} 
            style={{ 
              alignSelf: 'flex-start', 
              background: loading ? 'var(--beige-dark)' : 'var(--mint)', 
              fontSize: 13,
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? '⏳ Sending...' : '▶ Send message'}
          </button>
        </form>
      )}
    </div>
  );
}

// Pequeño objeto para limpiar duplicación de estilos en los inputs
const inputStyle = {
  width: '100%',
  padding: '7px 10px',
  fontFamily: 'var(--font-mono)',
  fontSize: 13,
  background: 'var(--paper)',
  border: 'var(--border)',
  borderRadius: 4,
  color: 'var(--black)',
  outline: 'none',
  boxShadow: 'inset 1px 1px 0 var(--shadow)',
};