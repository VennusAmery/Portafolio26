// ============================================================
// PORTFOLIO DATA 
// ============================================================
import miFoto from '../images/me.jpg';

export const PROFILE = {
  name: "Vennus",
  
  avatar: miFoto,

  title: "LegalTech Developer & Cybersecurity Enthusiast",
  
  tagline: "Where code meets law. Building the future of digital governance.",
  
  bio: 
  `I'm a dual-degree student bridging Systems Engineering and Law — 
  building tools where technology serves justice. My work lives at the intersection 
  of LegalTech, AI, and ethical hacking, creating systems that are not only functional 
  but legally sound and human-centered.`,
  
  philosophy: 
  `Technology without ethics is just noise. 
  I build with purpose — every line of code aligned with legal principles, 
  every system designed with people in mind.`,
  
  objectives: [
    "Pioneer LegalTech solutions in Latin America",
    "Build AI systems that respect digital rights",
    "Make law more accessible through technology",
    "Bridge the gap between innovation and regulation"
  ],

  email: "saldanasgt@gmail.com",
  github: "https://github.com/VennusAmery",
  linkedin: "https://www.linkedin.com/in/bárbara-saldaña-9823582b0?utm_source=share_via&utm_content=profile&utm_medium=member_android"
};

export const PROJECTS = [
  {
    id: 1,
    name: "LUMES",
    category: "LegalTech",
    description: "Legal Management System — intelligent platform for case tracking, document automation and legal analytics powered by AI.",
    tech: ["React", "Node.js", "MySQL", "OpenAI API"],
    status: "In Development",
    color: "#f9c5d1"
  },

  {
    id: 2,
    name: "ScubaCat (CatIA)",
    category: "AI & Vision",
    description: "Computer Vision script programmed in Python using OpenCV and MediaPipe. Features face-mesh landmarks mapping and automated custom biomathematical threshold calibration for gesture tracking.",
    tech: ["Python", "OpenCV", "MediaPipe"],
    status: "Completed",
    color: "#c5e8d1"
  }
];

export const SKILLS = {
  frontend: [
    { name: "React", level: 85 },
    { name: "HTML/CSS", level: 90 },
    { name: "JavaScript", level: 82 },
    { name: "Bootstrap", level: 72 },
    { name: "Framer Motion", level: 70 }
  ],
  backend: [
    { name: "Node.js", level: 78 },
    { name: "C# / .NET", level: 72 },
    { name: "Express.js", level: 82 },
    { name: "Python", level: 68 },
    { name: "C++", level: 80 },
    { name: "REST APIs", level: 80 }
  ],
  databases: [
    { name: "MySQL", level: 82 },
    { name: "SQL Server", level: 75 },
  ],
  cybersecurity: [
    { name: "Ethical Hacking", level: 65 },
    { name: "Network Security", level: 60 },
    { name: "Vulnerability Analysis", level: 63 }
  ],
    DevOps: [
    { name: "Linux", level: 80 },
    { name: "Ubuntu", level: 78 },
    { name: "Kali Linux", level: 60 },
    { name: "Git/GitHub", level: 95 },
    { name: "Visual Studio Code", level: 90 }
  ],
  legal: [
    { name: "Cybercrime Law", level: 80 },
    { name: "Data Privacy (GDPR/local)", level: 78 },
    { name: "Smart Contracts Law", level: 70 },
    { name: "Digital Governance", level: 75 },
    { name: "AI Regulation", level: 72 }
  ]
};

export const TIMELINE = [
  {
    year: "2022",
    title: "Systems Engineering",
    University: "Mariano Galvez de Guatemala",
    description: "Began degree in Systems Engineering. Developed foundational skills in programming, databases, and software development.",
    type: "education"
  },
  {
    year: "2022",
    title: "Law Degree",
    University: "Mariano Galvez de Guatemala",
    description: "Began Law degree. Gained deep understanding of legal principles, with a focus on technology law, cybercrime, and digital rights.",
    type: "education"
  },
  {
    year: "2026",
    title: "First LegalTech Project",
    description: "Developed LUMES prototype — realized this was my calling. LegalTech became the mission.",
    type: "project"
  }
];

export const TERMINAL_RESPONSES = {
  help: `Available commands:
  about      → About Vennus
  skills     → Technical & legal skills
  projects   → Project portfolio
  contact    → Get in touch
  clear      → Clear terminal
  whoami     → Identity check
  easter     → ???`,
  
  about: `> Vennus — LegalTech Developer & Cybersecurity Enthusiast
> Dual-degree: Systems Engineering + Law
> Focus: Where code meets justice.
> Status: Building the future of digital governance.`,
  
  skills: `> TECHNICAL: React, Node.js, C#, Python, MySQL, SQL Server
> SECURITY: Ethical Hacking, OSINT, Network Security
> LEGAL: Cybercrime Law, Data Privacy, Smart Contracts, AI Regulation
> BONUS: Smart contracts, Digital governance, AI ethics`,
  
  projects: 
`> LUMES         [LegalTech]     — AI Legal Management System
> MediCore       [Healthcare]    — Medical Administration
> LexBot         [AI]            — Legal AI Assistant  
> CyberLex       [Cybersecurity] — Cybercrime Legal Toolkit`,
  
  contact: `> Email:    saldanasgt@gmail.com
> GitHub:   github.com/VennusAmery
> LinkedIn: linkedin.com/in/bárbara-saldaña
> Status:   Open to collaborations & opportunities`,
  
  whoami: `> root@vennus:~$ 
> Developer. Lawyer-in-training. Builder. 
> Threat model: antinomias jurídicas y código legacy.
> Mission: Technology that serves justice.`,
  
  easter: `> 🌸 You found the easter egg!
> "The law is reason free from passion" — Aristotle
> ...but code? Code is passion free from reason.
> Keep building. Keep questioning. 💻⚖️`
};
