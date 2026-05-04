import { useState, useEffect, useRef } from 'react';
import { 
  RiHome5Line, 
  RiBriefcase4Line, 
  RiCodeSSlashLine, 
  RiMailSendLine 
} from 'react-icons/ri';
import { HiSun, HiMoon } from 'react-icons/hi2';

/**
 * Water Droplet Liquid Glass Navigation Dock
 * Features:
 * - Liquid glass refraction with specular meniscus highlights
 * - Minimalist "Just Icons" layout with zero text clutter
 * - Smooth Bencho-inspired raised cosine magnification
 * - Micro floating tooltips on hover
 * - Auto scroll-spy detection
 */
export default function BottomDock({ 
  activeTab, 
  onSelectTab, 
  theme = 'dark',
  toggleTheme 
}) {
  const [active, setActive] = useState('home');
  const [mouseX, setMouseX] = useState(null);
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [bouncingId, setBouncingId] = useState(null);

  const dockRef = useRef(null);
  const itemRefs = useRef([]);
  const isLight = theme === 'light';

  const navItems = [
    { id: 'home', label: 'Home', icon: RiHome5Line, targetId: 'home' },
    { id: 'experience', label: 'Work', icon: RiBriefcase4Line, targetId: 'experience' },
    { id: 'skills', label: 'Skills', icon: RiCodeSSlashLine, targetId: 'skills' },
    { id: 'contact', label: 'Contact', icon: RiMailSendLine, targetId: 'contact' },
  ];

  // Auto-detect active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 220;

      if (window.scrollY < 180) {
        setActive('home');
        return;
      }

      const contactEl = document.getElementById('contact');
      if (contactEl && contactEl.getBoundingClientRect().top <= window.innerHeight * 0.75) {
        setActive('contact');
        return;
      }

      const skillsEl = document.getElementById('skills');
      const expEl = document.getElementById('experience') || document.getElementById('work');

      const sections = [
        { id: 'contact', el: contactEl },
        { id: 'skills', el: skillsEl },
        { id: 'experience', el: expEl },
        { id: 'home', el: document.getElementById('home') }
      ];

      for (const section of sections) {
        if (section.el && section.el.offsetTop <= scrollPosition) {
          setActive(section.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (item) => {
    setActive(item.id);
    setBouncingId(item.id);
    setTimeout(() => setBouncingId(null), 400);

    if (onSelectTab) onSelectTab(item.id);

    if (item.targetId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const el = document.getElementById(item.targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Raised Cosine Magnification for liquid glass feel
  const getMagnificationStyle = (idx) => {
    if (mouseX === null || !itemRefs.current[idx]) {
      return {
        transform: 'translateY(0px) scale(1)',
        transformOrigin: '50% 100%',
        transition: 'transform 200ms cubic-bezier(0.32, 0.72, 0.24, 1)'
      };
    }

    const rect = itemRefs.current[idx].getBoundingClientRect();
    const itemCenter = rect.left + rect.width / 2;
    const itemWidth = rect.width || 42;
    const distance = Math.abs(mouseX - itemCenter);
    const d = distance / itemWidth;
    const spread = 2.0;

    if (d > spread) {
      return {
        transform: 'translateY(0px) scale(1)',
        transformOrigin: '50% 100%',
        transition: 'transform 180ms cubic-bezier(0.32, 0.72, 0.24, 1)'
      };
    }

    const f = Math.max(0, (1 + Math.cos((Math.PI * d) / (spread + 1))) / 2);
    const lift = 7 * f;
    const scale = 1 + 0.32 * f;

    return {
      transform: `translateY(-${lift}px) scale(${scale})`,
      transformOrigin: '50% 100%',
      transition: 'transform 100ms cubic-bezier(0.32, 0.72, 0.24, 1)'
    };
  };

  return (
    <nav
      aria-label="Liquid Glass Navigation Droplet"
      className="fixed bottom-5 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-auto select-none"
    >
      <div 
        ref={dockRef}
        onMouseMove={(e) => setMouseX(e.clientX)}
        onMouseLeave={() => {
          setMouseX(null);
          setHoveredIdx(null);
        }}
        className="liquid-droplet-dock flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full relative transition-all duration-300 ring-1 ring-white/10 dark:ring-white/10"
      >
        {/* Navigation Icon Buttons (Just Icons, No Text Clutter) */}
        {navItems.map((item, idx) => {
          const Icon = item.icon;
          const isActive = active === item.id;
          const isBouncing = bouncingId === item.id;
          const glyphStyle = getMagnificationStyle(idx);

          return (
            <button
              key={item.id}
              ref={(el) => (itemRefs.current[idx] = el)}
              onClick={() => handleClick(item)}
              onMouseEnter={() => setHoveredIdx(idx)}
              className={`relative flex items-center justify-center w-10 sm:w-11 h-10 sm:h-11 rounded-full group cursor-pointer transition-colors ${
                isBouncing ? 'dock-item-active' : ''
              }`}
              title={item.label}
              aria-label={item.label}
            >
              {/* Floating Monospace Tooltip on Hover */}
              {hoveredIdx === idx && (
                <div 
                  className={`absolute -top-8 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-md text-[10px] font-mono tracking-wide pointer-events-none whitespace-nowrap shadow-xl z-30 animate-in fade-in zoom-in-95 duration-150 border ${
                    isLight 
                      ? 'bg-white/95 text-zinc-900 border-zinc-200/90 shadow-zinc-400/30' 
                      : 'bg-[#18181b]/95 text-zinc-100 border-white/15 shadow-black/80'
                  }`}
                >
                  {item.label}
                </div>
              )}

              {/* Magnifying Glyph */}
              <div 
                style={glyphStyle}
                className="flex items-center justify-center w-6 h-6"
              >
                <Icon 
                  className={`w-5 h-5 transition-colors duration-200 ${
                    isActive 
                      ? (isLight ? 'text-zinc-950' : 'text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.6)]') 
                      : (isLight ? 'text-zinc-500 group-hover:text-zinc-900' : 'text-zinc-400 group-hover:text-zinc-100')
                  }`} 
                />
              </div>

              {/* Liquid Droplet Running Indicator Bead */}
              {isActive && (
                <span 
                  className={`absolute bottom-1 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full transition-all ${
                    isLight 
                      ? 'bg-zinc-950 shadow-[0_0_6px_rgba(0,0,0,0.5)]' 
                      : 'bg-white shadow-[0_0_8px_#ffffff]'
                  }`} 
                />
              )}
            </button>
          );
        })}

        {/* Liquid Meniscus Divider */}
        <div className={`w-[1px] h-5 mx-0.5 self-center ${isLight ? 'bg-zinc-300' : 'bg-white/15'}`} />

        {/* Dark / Light Theme Toggle (Just Icon, Zero Text) */}
        {toggleTheme && (
          <button
            ref={(el) => (itemRefs.current[navItems.length] = el)}
            onClick={(e) => toggleTheme(e)}
            onMouseEnter={() => setHoveredIdx(navItems.length)}
            className="relative flex items-center justify-center w-10 sm:w-11 h-10 sm:h-11 rounded-full group cursor-pointer transition-colors"
            title={`Switch to ${isLight ? 'Dark' : 'Light'} Mode`}
            aria-label="Toggle Theme"
          >
            {/* Floating Tooltip */}
            {hoveredIdx === navItems.length && (
              <div 
                className={`absolute -top-8 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-md text-[10px] font-mono tracking-wide pointer-events-none whitespace-nowrap shadow-xl z-30 animate-in fade-in zoom-in-95 duration-150 border ${
                  isLight 
                    ? 'bg-white/95 text-zinc-900 border-zinc-200/90 shadow-zinc-400/30' 
                    : 'bg-[#18181b]/95 text-zinc-100 border-white/15 shadow-black/80'
                }`}
              >
                {isLight ? 'Dark Mode' : 'Light Mode'}
              </div>
            )}

            {/* Magnifying Glyph with Tactile Spin/Pop Transition */}
            <div 
              style={getMagnificationStyle(navItems.length)}
              className="flex items-center justify-center w-6 h-6 overflow-hidden"
            >
              <span key={isLight ? 'moon' : 'sun'} className="inline-flex items-center justify-center animate-icon-pop">
                {isLight ? (
                  <HiMoon className="w-5 h-5 text-zinc-800 hover:text-zinc-950 transition-colors" />
                ) : (
                  <HiSun className="w-5 h-5 text-amber-300 hover:text-amber-200 transition-colors" />
                )}
              </span>
            </div>
          </button>
        )}
      </div>
    </nav>
  );
}
