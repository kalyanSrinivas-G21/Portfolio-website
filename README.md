# Kalyan Srinivas Gurugubelli — Portfolio

Personal website and developer portfolio built with React 19, Tailwind CSS v4, and Vite.

---

## Overview

A high-performance, single-column architectural developer portfolio focused on typography, systems engineering, and clean proof-of-work telemetry.

### Highlights
- **Interactive Dither Banner**: Dynamic 60fps ASCII pixel creature canvas with cursor physics and real-time theme synchronization.
- **View Transitions Theme Engine**: Smooth circular expansion ripple between Light and Dark modes (`document.startViewTransition`) with fluid CSS fallback.
- **Featured Projects**: Bento grid showcasing systems and AI projects (AgentFlow, Spec2Assert, Pocket-QC, CAIRO UI, AI-Simulation) with interactive preview frames and live links.
- **GitHub Contribution Matrix**: Real-time contribution matrix with week-level telemetry and active hover status.
- **Liquid Glass Navigation**: Floating bottom dock with raised-cosine magnification and scroll-spy tracking.
- **Command Palette (`Cmd + K`)**: Keyboard-driven modal for quick navigation, contact shortcuts, and clipboard actions.
- **Performance & Zero CLS**: Preloaded critical assets, layout skeleton placeholders, and optimized immutable asset caching for Vercel.

---

## Tech Stack

- **Frontend:** [React 19](https://react.dev/)
- **Bundler:** [Vite 8](https://vite.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons:** [React Icons](https://react-icons.github.io/react-icons/)
- **Animations:** View Transitions API, Canvas 2D, CSS Keyframes
- **Deployment:** [Vercel](https://vercel.com/)

---

## Project Structure

```
├── client/
│   ├── src/
│   │   ├── assets/         # Bundled images & graphics
│   │   ├── components/     # Modular UI sections (Banner, Header, Projects, Dock, etc.)
│   │   ├── data/           # Portfolio data & project schemas
│   │   ├── hooks/          # Custom hooks (useTheme, View Transitions)
│   │   ├── App.jsx         # Main column layout
│   │   ├── main.jsx        # React root entry
│   │   └── index.css       # Tailwind v4 theme variables & utilities
│   ├── public/             # Static favicons & preloaded assets
│   ├── vercel.json         # Subdirectory Vercel deployment config
│   └── vite.config.js      # Vite build & asset optimization
├── package.json            # Root deployment scripts
├── vercel.json             # Root Vercel SPA rewrites & cache headers
└── README.md
```

---

## Getting Started

### Local Development

```bash
# Install dependencies
npm --prefix client install

# Start development server
npm --prefix client run dev
```

The application runs locally at `http://localhost:5173`.

### Production Build

```bash
# Build production bundle
npm run build

# Preview build locally
npm run preview
```

---

## License

MIT © [Kalyan Srinivas Gurugubelli](https://github.com/kalyanSrinivas-G21)
