import { useState, useEffect, useRef } from 'react';
import { TwitterIcon, GithubIcon, LinkedinIcon, DiscordIcon, FileTextIcon, MailIcon } from './Icons';
import { 
  RiSearchLine, 
  RiArrowRightLine, 
  RiCheckLine, 
  RiCommandLine, 
  RiCalendarLine,
  RiSunLine,
  RiMoonLine
} from 'react-icons/ri';
import { profileData } from '../data/portfolioData';

export default function CommandPaletteModal({ isOpen, onClose, theme = 'dark', toggleTheme }) {
  const [query, setQuery] = useState('');
  const [copied, setCopied] = useState(false);
  const inputRef = useRef(null);
  const isLight = theme === 'light';

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onClose(!isOpen);
      }
      if (e.key === 'Escape' && isOpen) {
        onClose(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profileData.email);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      onClose(false);
    }, 1200);
  };

  const navItems = [
    { label: 'View Featured Projects', icon: RiCommandLine, badge: 'Projects', action: () => { document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' }); onClose(false); } },
    { label: 'Explore Tech Stack', icon: RiCommandLine, badge: 'Skills', action: () => { document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' }); onClose(false); } },
    { label: 'Experience & Internships', icon: RiCommandLine, badge: 'Krify / Freelance', action: () => { document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' }); onClose(false); } },
    { label: 'Education & Degree', icon: RiCommandLine, badge: 'Pragati University', action: () => { document.getElementById('education')?.scrollIntoView({ behavior: 'smooth' }); onClose(false); } },
    { label: 'Schedule a Free Call (30 min)', icon: RiCalendarLine, badge: 'Cal.com', action: () => { window.open(profileData.calUrl, '_blank'); onClose(false); } },
    { 
      label: `Switch to ${isLight ? 'Dark' : 'Light'} Mode`, 
      icon: isLight ? RiMoonLine : RiSunLine, 
      badge: isLight ? 'Dark Theme' : 'Light Theme', 
      action: (e) => { 
        if (toggleTheme) toggleTheme(e); 
        onClose(false); 
      } 
    },
    { label: 'Get in Touch / Mail Form', icon: MailIcon, badge: 'Contact', action: () => { document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); onClose(false); } },
    { label: 'GitHub Contributions', icon: GithubIcon, badge: 'kalyanSrinivas-G21', action: () => { document.getElementById('heatmap')?.scrollIntoView({ behavior: 'smooth' }); onClose(false); } },
    { label: copied ? 'Email Copied!' : 'Copy Email Address', icon: copied ? RiCheckLine : MailIcon, badge: profileData.email, action: handleCopyEmail },
    { label: 'Open Twitter / X Profile', icon: TwitterIcon, badge: '@OopaQuest', action: () => { window.open(profileData.twitter, '_blank'); onClose(false); } },
    { label: 'Open GitHub Profile', icon: GithubIcon, badge: '@github', action: () => { window.open(profileData.github, '_blank'); onClose(false); } },
    { label: 'Open LinkedIn Profile', icon: LinkedinIcon, badge: '@linkedin', action: () => { window.open(profileData.linkedin, '_blank'); onClose(false); } },
    { label: 'Open Discord Profile', icon: DiscordIcon, badge: '@discord', action: () => { window.open(profileData.discord, '_blank'); onClose(false); } },
    { label: 'Request / View Resume', icon: FileTextIcon, badge: 'PDF / Email', action: () => { window.location.href = profileData.resume; onClose(false); } },
  ];

  const filtered = navItems.filter(item =>
    item.label.toLowerCase().includes(query.toLowerCase()) ||
    item.badge.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-black/60 dark:bg-black/75 backdrop-blur-md"
      onClick={() => onClose(false)}
    >
      <div
        className={`apple-card w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150 border ${
          isLight ? 'bg-white border-zinc-200 shadow-zinc-300/60' : 'border-white/15'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className={`flex items-center px-4 border-b ${isLight ? 'border-zinc-200 bg-zinc-50/50' : 'border-white/10 bg-white/[0.02]'}`}>
          <RiSearchLine className="h-4 w-4 text-zinc-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or jump to link... (Esc to close)"
            className={`w-full py-3.5 px-3 bg-transparent text-sm focus:outline-none font-sans ${
              isLight ? 'text-zinc-900 placeholder-zinc-400' : 'text-zinc-100 placeholder-zinc-500'
            }`}
          />
          <kbd className={`hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-mono rounded-md border ${
            isLight ? 'text-zinc-500 bg-zinc-100 border-zinc-200' : 'text-zinc-400 bg-white/5 border-white/10'
          }`}>
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filtered.map((item, idx) => {
            const Icon = item.icon;
            return (
              <button
                key={idx}
                onClick={item.action}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded-xl transition-all group text-left cursor-pointer border ${
                  isLight 
                    ? 'text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100/90 border-transparent hover:border-zinc-200' 
                    : 'text-zinc-200 hover:text-white hover:bg-white/[0.08] border-transparent hover:border-white/10'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="h-3.5 w-3.5 text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white" />
                  <span className={copied && idx === 2 ? 'text-emerald-500 font-medium' : ''}>{item.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`font-mono text-[10px] px-1.5 py-0.5 rounded-md border ${
                    isLight ? 'text-zinc-500 bg-zinc-100 border-zinc-200' : 'text-zinc-400 bg-white/5 border-white/10'
                  }`}>
                    {item.badge}
                  </span>
                  <RiArrowRightLine className="h-3 w-3 text-zinc-400 group-hover:text-zinc-700 dark:group-hover:text-zinc-200" />
                </div>
              </button>
            );
          })}

          {filtered.length === 0 && (
            <div className="py-6 text-center text-xs text-zinc-500 font-mono">
              No matching commands found.
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className={`flex items-center justify-between px-4 py-2.5 text-[10px] font-mono border-t ${
          isLight ? 'text-zinc-500 bg-zinc-50 border-zinc-200' : 'text-zinc-400 bg-white/[0.02] border-white/10'
        }`}>
          <span>{profileData.fullName} · Palette</span>
          <div className="flex items-center gap-2">
            <span>↵ Select</span>
            <span>·</span>
            <span>ESC Close</span>
          </div>
        </div>
      </div>
    </div>
  );
}
