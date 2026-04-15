import { TechIcon } from './Icons';
import { profileData } from '../data/portfolioData';

export default function TechStack() {
  const { techStack } = profileData;

  const categories = [
    { key: 'core', tag: '<CORE/>', items: techStack?.core || [] },
    { key: 'frameworks', tag: '<FRAMEWORKS/>', items: techStack?.frameworks || [] },
    { key: 'tools', tag: '<TOOLS/>', items: techStack?.tools || [] },
  ];

  return (
    <section id="skills" className="space-y-6 pt-4 pb-2">
      {/* Bright Standout Section Header */}
      <div className="flex items-center gap-3">
        <h2 className="font-mono text-xs sm:text-[13px] font-bold uppercase tracking-[0.24em] text-zinc-950 dark:text-white">
          TECH STACK
        </h2>
        <div className="flex-1 h-[1px] bg-gradient-to-r from-zinc-300 dark:from-white/20 via-zinc-200 dark:via-white/5 to-transparent" />
      </div>

      {/* Categories matching Reference (No Blocks or Boxes) */}
      <div className="space-y-6">
        {categories.map((cat) => (
          <div key={cat.key} className="space-y-2.5">
            {/* Category Code Tag (e.g. <CORE/>, <FRAMEWORKS/>, <TOOLS/>) */}
            <div className="font-mono text-xs text-zinc-600 dark:text-zinc-400 font-semibold tracking-wide">
              {cat.tag}
            </div>

            {/* Pill Badges on open canvas */}
            <div className="flex flex-wrap gap-2 sm:gap-2.5">
              {cat.items.map((tech) => (
                <div
                  key={tech.name}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-100 dark:bg-[#131316] border border-zinc-200 dark:border-white/10 hover:border-zinc-300 dark:hover:border-white/20 hover:bg-zinc-200/80 dark:hover:bg-[#1a1a1f] hover:-translate-y-0.5 transition-all duration-180 cursor-default group shadow-xs select-none"
                >
                  <TechIcon
                    name={tech.icon || tech.name}
                    className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:scale-110"
                  />
                  <span className="text-[13px] font-sans font-medium text-zinc-800 dark:text-zinc-200 group-hover:text-zinc-950 dark:group-hover:text-white">
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Playful reference closing line */}
      <div className="pt-2 font-mono text-xs text-zinc-600 dark:text-zinc-500 select-none">
        Few more ... but secret hehehe :3
      </div>
    </section>
  );
}
