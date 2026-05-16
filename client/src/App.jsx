import { useState } from 'react';
import DitherBanner from './components/DitherBanner';
import ProfileHeader from './components/ProfileHeader';
import BioSection from './components/BioSection';
import GithubHeatmap from './components/GithubHeatmap';
import FeaturedProjects from './components/FeaturedProjects';
import TechStack from './components/TechStack';
import Experience from './components/Experience';
import Education from './components/Education';
import ContactFooter from './components/ContactFooter';
import BottomDock from './components/BottomDock';
import CommandPaletteModal from './components/CommandPaletteModal';
import { useTheme } from './hooks/useTheme';

export default function App() {
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-[var(--bg-canvas)] text-[var(--ink-primary)] selection:bg-zinc-800 selection:text-white dark:selection:bg-zinc-100 dark:selection:text-zinc-950 font-sans relative pb-28 overflow-x-hidden transition-colors duration-250">
      
      {/* 1. Full-Width Monochromatic Pixel Water Banner with Fading Background */}
      <DitherBanner theme={theme} />

      {/* 2. Main Centered Architectural Column (680px editorial width) */}
      <main className="max-w-[680px] mx-auto px-4 sm:px-6 relative z-10 -mt-16 sm:-mt-20 space-y-9">
        
        {/* Profile Header (Avatar + Silkscreen Pixel Name + Location + [ ⌘ K | ☀️ ] Pill) */}
        <section id="home">
          <ProfileHeader
            onOpenCommand={setIsCommandOpen}
            theme={theme}
            toggleTheme={toggleTheme}
          />
        </section>

        {/* High-Signal Bio + Links */}
        <BioSection theme={theme} />

        {/* GitHub Contributions Matrix (Direct inline display, 100% width matching) */}
        <section id="heatmap">
          <GithubHeatmap theme={theme} />
        </section>

        {/* Featured Projects Bento Grid with Apple Surface */}
        <section id="work" className="relative bg-column-grid pb-2">
          <FeaturedProjects />
        </section>

        {/* Tech Stack: Core, Frameworks, Tools */}
        <TechStack />

        {/* Experience: Krify & Freelancing */}
        <Experience />

        {/* Education: Pragati University */}
        <Education />

        {/* Contact Form & Footer with Swimming Pixel Fish */}
        <ContactFooter />
      </main>

      {/* 3. Fluid Floating Bottom Navigation Dock (Bencho-Style Magnifying Dock) */}
      <BottomDock 
        activeTab={activeTab} 
        onSelectTab={setActiveTab} 
        theme={theme}
        toggleTheme={toggleTheme}
        onOpenCommand={() => setIsCommandOpen(true)}
      />

      {/* 4. Command Palette Modal (Cmd+K) */}
      <CommandPaletteModal
        isOpen={isCommandOpen}
        onClose={setIsCommandOpen}
        theme={theme}
        toggleTheme={toggleTheme}
      />
    </div>
  );
}
