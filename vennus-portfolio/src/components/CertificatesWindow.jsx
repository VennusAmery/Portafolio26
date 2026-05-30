// CertificatesWindow.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion'; 

const MY_CERTIFICATES = [
  {
    title: "Exploring Azure Storage for non-relational data",
    issuer: "Microsoft / Learn",
    date: "2024",
    skills: ["Azure Blob Storage", "Azure Data Lake Storage", "NoSQL Concepts"],
    pdfUrl: "/certificates/Exploración de Azure Storage para datos no relacionales.pdf", 
  },
  {
    title: "Exploring Core Relational Data Concepts",
    issuer: "Microsoft / Learn",
    date: "2024",
    skills: ["SQL", "Relational Databases", "Azure Data Factory"],
    pdfUrl: "/certificates/Exploración de conceptos fundamentales de datos relacionales.pdf",
  },
  {
    title: "Azure Cosmos DB Fundamentals",
    issuer: "Microsoft / Learn",
    date: "2024",
    skills: ["NoSQL", "Cosmos DB", "Global Distribution", "Latency Management"],
    pdfUrl: "/certificates/Exploración de los aspectos básicos de Azure Cosmos DBs.pdf",
  },
  {
    title: "Large Scale Data Analytics Foundations",
    issuer: "Microsoft / Learn",
    date: "2024",
    skills: ["Big Data", "Azure Synapse Analytics", "Data Lakes"],
    pdfUrl: "/certificates/Exploración de los aspectos básicos del análisis a gran escala.pdf",
  },
  {
    title: "Real-Time Data Analytics Streamlining",
    issuer: "Microsoft / Learn",
    date: "2024",
    skills: ["Stream Analytics", "Event Hubs", "Real-Time Querying"],
    pdfUrl: "/certificates/Exploración de los aspectos básicos del análisis en tiempo real.pdf",
  },
  {
    title: "Core Data Principles & Architectures",
    issuer: "Microsoft / Learn",
    date: "2024",
    skills: ["Data Concepts", "ETL Pipelines", "Data Visualization basics"],
    pdfUrl: "/certificates/Exploración de los conceptos de los datos principales.pdf",
  },
  {
    title: "Relational Database Services on Azure",
    issuer: "Microsoft / Learn",
    date: "2024",
    skills: ["Azure SQL", "Database Administration", "Cloud Infrastructure"],
    pdfUrl: "/certificates/Exploración de los servicios de bases de datos relacionales en Azure.pdf",
  },
  {
    title: "Data System Roles & Ecosystem Services",
    issuer: "Microsoft / Learn",
    date: "2024",
    skills: ["Data Engineering", "Data Analyst roles", "Data Governance"],
    pdfUrl: "/certificates/Exploración de roles y servicios de datos.pdf",
  },
  {
    title: "Data Visualization Core Aspects",
    issuer: "Microsoft / Learn",
    date: "2024",
    skills: ["Power BI", "Dashboard Design", "Reporting Insights"],
    pdfUrl: "/certificates/Explorar Los aspectos Basicos de la visualizacion de datos.pdf",
  },
  {
    title: "Python Programming for Beginners",
    issuer: "Ninehub",
    date: "2024",
    skills: ["Python OOP", "Automation Scripts", "Data Structures"],
    pdfUrl: "/certificates/Python para principiantes Ninehub.pdf",
  },
{
    title: "Python Immersive BootCamp",
    issuer: "Alura Latam",
    date: "2024",
    skills: ["Python OOP", "Automation Scripts", "Data Structures", "Algorithm Design"],
    pdfUrl: "/certificates/Certificado Inmersion Python.pdf",
  },
  {
    title: "Tech Innovation & Youth Leadership Program",
    issuer: "Corporación CPIL",
    date: "2026",
    skills: ["Civic Innovation", "Digital Sovereignty", "Democratic Solutions Design", "Tech Leadership (20h)"],
    pdfUrl: "/certificates/Certificado-DemosJovenes.pdf",
  },
];

export default function CertificatesWindow() {
  const [activePdf, setActivePdf] = useState(null);

  const handlePdfToggle = (cert) => {
    if (activePdf && activePdf.pdfUrl === cert.pdfUrl) {
      setActivePdf(null);
    } else {
      setActivePdf(cert);
    }
  };

  return (
    <div style={{
      padding: '16px',
      fontFamily: 'var(--font-mono)',
      color: 'var(--black)',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
    }}>

      {/* Header log */}
      <div style={{
        fontSize: '12px',
        borderBottom: '1px dashed var(--black)',
        paddingBottom: '8px',
        marginBottom: '16px',
        letterSpacing: '0.04em',
        flexShrink: 0,
        fontWeight: 'bold',
        color: 'var(--black)',
      }}>
        [CERTIFICATES.log ]
      </div>

      {/* PDF Viewer inline */}
      {activePdf && (
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          border: 'var(--border)',
          borderRadius: '6px',
          overflow: 'hidden',
          marginBottom: '12px',
          background: '#ffffff',
          minHeight: '550px',
        }}>

          {/* Viewer Top Bar */}
          <div style={{
            background: 'var(--beige)',
            borderBottom: 'var(--border-thin)',
            padding: '6px 12px',
            display: 'flex',
            justify: 'space-between',
            alignItems: 'center',
            flexShrink: 0,
          }}>

            <span style={{ fontFamily: 'var(--font-pixel)', fontSize: '13px', opacity: 0.8 }}>
              📄 {activePdf.title}
            </span>
            <div style={{ display: 'flex', gap: '8px' }}>
              <a 
                href={encodeURI(activePdf.pdfUrl)} 
                target="_blank" 
                rel="noreferrer"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  textDecoration: 'underline',
                  color: 'var(--blue)',
                  alignSelf: 'center',
                  marginRight: '8px'
                }}
              >
                [External Open]
              </a>

              <button
                onClick={() => setActivePdf(null)}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  fontWeight: 'bold',
                  background: 'none',
                  border: 'var(--border-thin)',
                  borderRadius: '3px',
                  padding: '2px 8px',
                  cursor: 'pointer',
                  color: 'var(--black)',
                }}
              >
                [✕ Close]
              </button>
            </div>
          </div>

          {/* PDF iframe viewport */}
          <iframe
            src={encodeURI(activePdf.pdfUrl)}
            title={activePdf.title}
            style={{
              flex: 1,
              width: '100%',
              height: '100%',
              border: 'none',
              background: '#ffffff',
            }}
          />
        </div>
      )}

      {/* Certificates Grid List */}
      <div style={{ overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
        {MY_CERTIFICATES.map((cert, i) => {
          const isCurrentActive = activePdf?.pdfUrl === cert.pdfUrl;
          return (
            <div
              key={i}
              className="retro-card"
              style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '10px' }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '14px', color: 'black' }}>
                  {cert.title}
                </span>
                <span style={{
                  fontFamily: 'var(--font-pixel)',
                  fontSize: '15px',
                  background: 'rgba(0,0,0,0.06)',
                  border: 'var(--border-thin)',
                  padding: '1px 6px',
                  borderRadius: '3px',
                  whiteSpace: 'nowrap',
                }}>
                  {cert.date}
                </span>
              </div>

              <div style={{ fontSize: '12px', fontWeight: 'bold', opacity: 0.85 }}>
                Issuer: <span style={{ color: 'var(--black)' }}>{cert.issuer}</span>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginTop: '4px' }}>
                {cert.skills.map((skill, j) => (
                  <span key={j} style={{
                    fontFamily: 'var(--font-pixel)',
                    fontSize: '12px',
                    padding: '1px 6px',
                    background: 'var(--beige)',
                    border: 'var(--border-thin)',
                    borderRadius: '2px'
                  }}>
                    {skill}
                  </span>
                ))}
              </div>

              {/* Action triggers */}
              <div style={{
                marginTop: '8px',
                borderTop: '1px dashed currentColor',
                paddingTop: '6px',
                display: 'flex',
                justify: 'space-between',
                alignItems: 'center',
              }}>
                {cert.pdfUrl && (
                  <motion.button
                    onClick={() => handlePdfToggle(cert)}

                    // Animación al pasar el mouse por encima
                    whileHover={{ 
                      scale: 1.01, 
                      backgroundColor: isCurrentActive ? 'var(--mint-light)' : '#f2b8c6',
                      boxShadow: 'rgba(26, 22, 18, 0.4) 4px 4px 0px' 
                    }}

                    // Animación al hacer click
                    whileTap={{ 
                      scale: 0.98,
                      boxShadow: 'rgba(26, 22, 18, 0.1) 1px 1px 0px'
                    }}

                    // Transición suave para los cambios de color y sombras
                    style={{
                      width: '100%',
                      padding: '8px',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '12px',
                      border: 'var(--border)',
                      borderRadius: '3px',
                      cursor: 'pointer',
                      color: 'var(--black)',
                      boxShadow: 'rgba(26, 22, 18, 0.25) 2px 2px 0px',
                      background: isCurrentActive ? 'var(--mint-light)' : 'var(--beige)',
                    }}
                  >
                    {isCurrentActive ? '[▲ Hide PDF Portfolio]' : '[▼ View PDF Certificate]'}
                  </motion.button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}