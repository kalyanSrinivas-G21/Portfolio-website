import { useState } from 'react';
import { MapPinIcon, PronounsIcon, CommandIcon } from './Icons';
import { HiSun, HiMoon } from 'react-icons/hi2';
import { profileData } from '../data/portfolioData';
import profileImg from '../assets/profile.jpg';

export default function ProfileHeader({ onOpenCommand, theme, toggleTheme }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const isLight = theme === 'light';

  return (
    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-5 pb-6">
      {/* Left Avatar + Title Info */}
      <div className="flex items-start gap-4 sm:gap-5">
        {/* Rounded-Square Photo Avatar with Smooth Shimmer Skeleton & Zero Layout Shift */}
        <div className="h-24 w-24 sm:h-28 sm:w-28 rounded-2xl p-1 shrink-0 overflow-hidden shadow-xl relative flex items-center justify-center bg-zinc-200/70 dark:bg-zinc-900/80 border border-zinc-200 dark:border-white/15">
          {!imageLoaded && (
            <div className="absolute inset-1 rounded-xl bg-gradient-to-br from-zinc-200 via-zinc-300/50 to-zinc-200 dark:from-zinc-800 dark:via-zinc-700/50 dark:to-zinc-800 animate-pulse" />
          )}
          <img
            src={profileImg || "/profile.jpg"}
            alt={profileData.name}
            width="112"
            height="112"
            fetchPriority="high"
            decoding="async"
            onLoad={() => setImageLoaded(true)}
            className={`w-full h-full object-cover object-top rounded-xl transition-opacity duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </div>

        {/* Text Details */}
        <div className="space-y-1 sm:space-y-1.5 pt-0.5 min-w-0">
          {/* Eyebrow */}
          <div className="text-zinc-500 dark:text-zinc-400 text-sm font-sans flex items-center gap-1.5">
            <span>{profileData.eyebrow}</span>
            <span className="inline-block animate-wave origin-[70%_70%]">👋</span>
          </div>

          {/* Name in Architectural Design Typography */}
          <h1 className="font-design text-2xl sm:text-3xl font-bold text-zinc-950 dark:text-white tracking-tight leading-tight py-0.5">
            {profileData.name}
          </h1>

          {/* Improved Location & Pronouns (crisp icons + enhanced font size) */}
          <div className="flex items-center gap-2.5 text-xs sm:text-[13px] text-zinc-700 dark:text-zinc-300 font-sans font-medium pt-1">
            <div className="flex items-center gap-1.5">
              <MapPinIcon className="h-4 w-4 text-zinc-600 dark:text-zinc-400 shrink-0" />
              <span>{profileData.location}</span>
            </div>
            <span className="text-zinc-400 dark:text-zinc-600">·</span>
            <div className="flex items-center gap-1.5">
              <PronounsIcon className="h-4 w-4 text-zinc-600 dark:text-zinc-400 shrink-0" />
              <span>{profileData.pronouns}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Utility: [ ⌘ K | ☀️/🌙 ] Tactile Pill */}
      <div className="apple-card flex items-center self-start sm:self-auto gap-1 p-1 rounded-xl shadow-md border border-zinc-200 dark:border-white/10">
        <button
          onClick={() => onOpenCommand(true)}
          className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white rounded-lg transition-colors cursor-pointer"
          title="Open Command Palette (Cmd+K)"
        >
          <CommandIcon className="h-3 w-3 text-zinc-600 dark:text-zinc-400" />
          <span>K</span>
        </button>

        <div className="h-3.5 w-[1px] bg-zinc-300 dark:bg-white/10" />

        <button
          onClick={(e) => toggleTheme(e)}
          className="p-1.5 text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white rounded-lg transition-colors cursor-pointer"
          title="Toggle Dark / Light Theme"
          aria-label="Toggle Theme"
        >
          <span key={isLight ? 'moon' : 'sun'} className="inline-flex items-center justify-center animate-icon-pop">
            {isLight ? (
              <HiMoon className="h-3.5 w-3.5 text-zinc-800" />
            ) : (
              <HiSun className="h-3.5 w-3.5 text-amber-300" />
            )}
          </span>
        </button>
      </div>
    </div>
  );
}
