# ✦ Vennus Portfolio — Retro OS Desktop

A creative portfolio built as an interactive retro desktop environment.
LegalTech · Cybersecurity · Development

---

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ installed
- npm or yarn

### Install & Run

```bash
# 1. Enter the project folder
cd vennus-portfolio

# 2. Install dependencies
npm install

# 3. Start development server
npm start

# Open http://localhost:3000
```

### Build for production
```bash
npm run build
```

---

## 🎨 Customizing Colors

All colors are CSS variables in `src/styles/global.css`:

```css
:root {
  --cream: #f5f0e8;      /* Main background */
  --pink: #f2b8c6;       /* Primary accent */
  --mint: #b8e0c8;       /* Secondary accent */
  --blue: #b8cfe0;       /* Tertiary accent */
  --yellow: #f0e0a8;     /* Highlights */
  /* ... */
}
```

Dark mode variables are in `[data-theme="dark"] {}`.

---

## 📂 Project Structure

```
src/
├── components/
│   ├── Window.jsx          # Draggable window wrapper
│   ├── LoadingScreen.jsx   # Boot animation
│   ├── AboutWindow.jsx     # About Me section
│   ├── ProjectsWindow.jsx  # Projects grid
│   ├── SkillsWindow.jsx    # Skills + progress bars
│   ├── ExperienceWindow.jsx# Timeline
│   ├── ContactWindow.jsx   # Contact + form
│   └── TerminalWindow.jsx  # Interactive CLI
├── data/
│   └── portfolioData.js    # ← Edit your content here
├── styles/
│   ├── global.css          # Base styles + variables
│   └── desktop.css         # Desktop environment styles
├── App.jsx                 # Main orchestrator
└── index.js                # Entry point
```

---

## ➕ Adding New Projects

In `src/data/portfolioData.js`, add to the `PROJECTS` array:

```js
{
  id: 7,
  name: "MyNewProject",
  category: "LegalTech",           // Affects icon display
  description: "What it does.",
  tech: ["React", "Node.js"],
  status: "In Development",        // Completed | In Development | Prototype | Research
  color: "#c5d8f9"                 // Tint color for the card
}
```

---

## 💻 Terminal Commands

Available commands in the terminal window:
- `help` — list commands
- `about` — personal info
- `skills` — tech stack
- `projects` — project list
- `contact` — contact info
- `whoami` — identity
- `easter` — secret
- `clear` — clear screen

Add custom commands in `src/data/portfolioData.js` → `TERMINAL_RESPONSES`.

---

## 📱 Responsive Notes

On mobile (<768px):
- Desktop icons move to a dock at the bottom
- Windows go fullscreen
- Taskbar adapts

---

## 🛠 Built With

- React 18
- Framer Motion (animations)
- React Icons
- CSS custom properties (no Tailwind)
- Google Fonts: VT323, Special Elite, Courier Prime

---

## ✦ Author

**Vennus** — LegalTech Developer & Cybersecurity Enthusiast  
Where code meets law.
