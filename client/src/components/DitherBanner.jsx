import PixelFishCanvas from './PixelFishCanvas';

export default function DitherBanner({ theme = 'dark' }) {
  const isLight = theme === 'light';

  return (
    <div 
      className={`relative w-full h-[260px] sm:h-[320px] overflow-hidden select-none transition-colors duration-300 ${
        isLight ? 'bg-[#fafafa]' : 'bg-black'
      }`}
    >
      {/* 1. ASCII cell grid + glyph-shaded creatures */}
      <PixelFishCanvas height={320} interactive={true} theme={theme} />

      {/* 2. Soft side vignette so creatures dissolve at the edges */}
      <div
        className="absolute inset-0 pointer-events-none z-10 transition-all duration-300"
        style={{
          background: isLight
            ? 'linear-gradient(to right, #fafafa 0%, transparent 8%, transparent 92%, #fafafa 100%)'
            : 'linear-gradient(to right, #000000 0%, transparent 8%, transparent 92%, #000000 100%)',
        }}
      />

      {/* 3. Fade into the page background */}
      <div 
        className="absolute inset-x-0 bottom-0 h-36 pointer-events-none z-10 transition-all duration-300" 
        style={{
          background: isLight
            ? 'linear-gradient(to top, #fafafa, rgba(250, 250, 250, 0.85), transparent)'
            : 'linear-gradient(to top, #000000, rgba(0, 0, 0, 0.85), transparent)',
        }}
      />
    </div>
  );
}
