import { profileData } from '../data/portfolioData';

/**
 * Compact Architectural Ledger Education Section
 * - Ultra-compact vertical footprint (Zero bloat)
 * - Zero repetition (Timeline & Degree mentioned exactly once)
 * - No "Status Active Enrollment"
 * - Open canvas (No heavy cards or enclosing blocks)
 * - Strict monochrome palette (Zero green)
 * - Distinct from Experience timeline
 */
export default function Education() {
  const { education } = profileData;

  if (!education) return null;

  return (
    <section id="education" className="space-y-3.5 pt-2 pb-1">
      {/* Standout Section Header */}
      <div className="flex items-center gap-3">
        <h2 className="font-mono text-xs sm:text-[13px] font-bold uppercase tracking-[0.24em] text-zinc-950 dark:text-white">
          EDUCATION
        </h2>
        <div className="flex-1 h-[1px] bg-gradient-to-r from-zinc-300 dark:from-white/20 via-zinc-200 dark:via-white/5 to-transparent" />
      </div>

      {/* Main Compact Spec */}
      <div className="space-y-2.5">
        
        {/* 1. Unified Single-Row Identity Bar (Zero Repetition) */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 pb-2 border-b border-zinc-200 dark:border-white/10">
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
            <h3 className="font-design text-base sm:text-[17px] font-bold text-zinc-950 dark:text-white tracking-tight">
              {education.institution}
            </h3>
            <span className="text-zinc-400 dark:text-zinc-600 select-none hidden sm:inline">·</span>
            <span className="font-sans text-xs sm:text-[13px] font-medium text-zinc-600 dark:text-zinc-400">
              {education.degree}
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-zinc-600 dark:text-zinc-400 self-start sm:self-auto shrink-0 pt-0.5 sm:pt-0">
            <span className="font-semibold text-zinc-900 dark:text-zinc-200">
              GPA {education.gpa}
            </span>
            <span className="text-zinc-300 dark:text-zinc-700 select-none">|</span>
            <span>{education.period}</span>
          </div>
        </div>

        {/* 2. Compact Core Coursework Grid (2 rows x 3 cols, Zero Bloat) */}
        {education.coursework && education.coursework.length > 0 && (
          <div className="space-y-1.5 pt-0.5">
            <div className="font-mono text-[10.5px] font-semibold text-zinc-600 dark:text-zinc-400 tracking-wider uppercase">
              &lt;CORE_COURSEWORK/&gt;
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-5 gap-y-1.5">
              {education.coursework.map((course, idx) => {
                const num = String(idx + 1).padStart(2, '0');
                return (
                  <div 
                    key={course}
                    className="flex items-center gap-2 py-1 border-b border-zinc-200/50 dark:border-white/5 group transition-colors"
                  >
                    <span className="font-mono text-[10px] text-zinc-400 dark:text-zinc-500 select-none group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors">
                      {num}
                    </span>
                    <span className="text-zinc-300 dark:text-zinc-700 select-none">·</span>
                    <span className="font-sans text-xs font-medium text-zinc-700 dark:text-zinc-300 group-hover:text-zinc-950 dark:group-hover:text-white transition-colors truncate">
                      {course}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
