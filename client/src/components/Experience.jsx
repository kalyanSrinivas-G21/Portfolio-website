import { useState } from 'react';
import { 
  RiCodeSSlashLine, 
  RiTerminalBoxLine,
  RiArrowUpDownLine,
  RiGlobalLine
} from 'react-icons/ri';
import { TechIcon } from './Icons';
import krifyLogo from '../assets/krify-logo.jpg';

export default function Experience() {
  const [expandedIds, setExpandedIds] = useState({
    krify: true,
    freelance: true
  });

  const toggleExpand = (id) => {
    setExpandedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const companies = [
    {
      id: 'krify',
      company: 'Krify Software Solutions',
      displayName: 'krify',
      url: 'https://krify.com',
      location: 'Kakinada, India',
      mode: 'Hybrid',
      iconType: 'krify',
      roles: [
        {
          id: 'krify-backend',
          title: 'Backend & Systems Engineer',
          type: 'Full-time',
          period: '04.2025 — 06.2025',
          duration: '5m',
          bullets: [
            'Architected and implemented high-throughput REST APIs using Java & Spring Boot with role-based access control.',
            'Optimized relational MySQL database schemas handling 10,000+ weekly entries with sub-second latency.',
            'Configured Linux production servers (Ubuntu) with Nginx reverse proxying and automated system tooling.',
            'Reduced engineering task logging time by 30% through internal productivity CLI tooling.'
          ],
          tags: ['Java', 'Spring Boot', 'MySQL', 'REST APIs', 'Ubuntu', 'Nginx', 'Docker']
        }
      ]
    },
    {
      id: 'freelance',
      company: 'Freelance & Independent Projects',
      displayName: 'freelance',
      url: '#contact',
      location: 'Remote',
      mode: 'Remote',
      iconType: 'freelance',
      roles: [
        {
          id: 'freelance-fullstack',
          title: 'Full Stack Engineer & AI Developer',
          type: 'Freelance',
          period: '01.2024 — Present',
          duration: '1y+',
          bullets: [
            'Designing and deploying end-to-end production web applications and AI workflows for international clients.',
            'Architecting responsive, high-performance UI components with React, Next.js, and Tailwind CSS.',
            'Integrating local and cloud LLM pipelines (Ollama, OpenAI, LangChain) for document reasoning and automated workflows.',
            'Delivering 5+ production repositories with modern CI/CD, Docker containerization, and edge deployment on Vercel.'
          ],
          tags: ['React', 'Next.js', 'FastAPI', 'LangChain', 'Python', 'Tailwind CSS', 'Docker']
        }
      ]
    }
  ];

  return (
    <section id="experience" className="space-y-7 pt-4 pb-2">
      {/* Bright Standout Section Header */}
      <div className="flex items-center gap-3">
        <h2 className="font-mono text-xs sm:text-[13px] font-bold uppercase tracking-[0.24em] text-zinc-950 dark:text-white">
          EXPERIENCE
        </h2>
        <div className="flex-1 h-[1px] bg-gradient-to-r from-zinc-300 dark:from-white/20 via-zinc-200 dark:via-white/5 to-transparent" />
      </div>

      {/* Experience Tree-Node Timeline */}
      <div className="space-y-10">
        {companies.map((comp) => (
          <div key={comp.id} className="space-y-4">
            
            {/* 1. Company Level Header */}
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                {/* Logo Squircle */}
                {comp.iconType === 'krify' ? (
                  <div className="w-6 h-6 rounded-md bg-white border border-zinc-200 dark:border-white/20 flex items-center justify-center shrink-0 overflow-hidden shadow-xs">
                    <img 
                      src={krifyLogo || "/krify-logo.jpg"} 
                      alt="Krify Logo" 
                      width="24"
                      height="24"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-contain p-0.5"
                    />
                  </div>
                ) : (
                  <div className="w-6 h-6 rounded-md bg-zinc-100 dark:bg-[#161619] border border-zinc-200 dark:border-white/10 flex items-center justify-center shrink-0 shadow-xs text-zinc-800 dark:text-white">
                    <RiGlobalLine className="w-3.5 h-3.5 text-zinc-700 dark:text-zinc-100" title="Freelance Remote" />
                  </div>
                )}

                {/* Company Name with Subtle Underline */}
                <a
                  href={comp.url}
                  target={comp.url.startsWith('http') ? "_blank" : undefined}
                  rel={comp.url.startsWith('http') ? "noreferrer" : undefined}
                  className="font-heading font-bold text-base text-zinc-900 dark:text-white tracking-tight underline underline-offset-4 decoration-zinc-400 dark:decoration-zinc-600 hover:decoration-zinc-900 dark:hover:decoration-white transition-colors cursor-pointer"
                >
                  {comp.displayName}
                </a>
              </div>

              {/* Location + Remote with Glowing Blue Dot indicator */}
              <div className="flex items-center gap-1.5 text-xs text-zinc-600 dark:text-zinc-400 font-sans">
                <span>
                  {comp.location} ({comp.mode})
                </span>
                <span className="w-2 h-2 rounded-full bg-[#0091ff] shadow-[0_0_8px_#0091ff] shrink-0" />
              </div>
            </div>

            {/* 2. Roles Nested under Tree Node Spine */}
            <div className="space-y-6">
              {comp.roles.map((role) => {
                const isExpanded = expandedIds[comp.id] !== false;

                return (
                  <div key={role.id} className="relative">
                    
                    {/* Vertical connector line from Company Icon down to Role Icon */}
                    <div className="absolute left-[11.5px] -top-3 h-3 w-[1px] bg-zinc-300 dark:bg-zinc-800 pointer-events-none" />

                    {/* Single Continuous L-Shaped Branch Line */}
                    <div className="absolute left-[11.5px] top-[26px] bottom-[15px] w-5 border-l border-b border-zinc-300 dark:border-zinc-700/80 rounded-bl-lg pointer-events-none" />

                    {/* Role Icon */}
                    <div className="absolute left-0 top-0 w-6 h-6 rounded-md bg-zinc-100 dark:bg-[#121215] border border-zinc-200 dark:border-white/10 flex items-center justify-center text-zinc-600 dark:text-zinc-400 shrink-0 z-10">
                      {comp.iconType === 'freelance' ? (
                        <RiTerminalBoxLine className="h-3.5 w-3.5 text-zinc-700 dark:text-zinc-300" />
                      ) : (
                        <RiCodeSSlashLine className="h-3.5 w-3.5 text-zinc-700 dark:text-zinc-300" />
                      )}
                    </div>

                    {/* Role Content Column */}
                    <div className="pl-9 space-y-3">
                      {/* Role Title Row with Expand/Collapse Icon */}
                      <div 
                        onClick={() => toggleExpand(comp.id)}
                        className="flex items-center justify-between gap-3 cursor-pointer group select-none min-h-[24px]"
                      >
                        <h3 className="font-heading font-bold text-[15px] sm:text-base text-zinc-900 dark:text-white tracking-tight group-hover:text-zinc-700 dark:group-hover:text-zinc-200 transition-colors">
                          {role.title}
                        </h3>

                        {/* Expand / Collapse Chevron indicator */}
                        <button
                          className="text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-800 dark:group-hover:text-white transition-colors p-0.5 cursor-pointer"
                          title={isExpanded ? 'Collapse details' : 'Expand details'}
                        >
                          <RiArrowUpDownLine className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      {/* Meta info: Type | Period | Duration */}
                      <div className="flex items-center gap-2 text-xs font-mono text-zinc-600 dark:text-zinc-400">
                        <span>{role.type}</span>
                        <span className="text-zinc-400 dark:text-zinc-600">|</span>
                        <span>{role.period}</span>
                        <span className="text-zinc-400 dark:text-zinc-600">|</span>
                        <span className="text-zinc-600 dark:text-zinc-400">{role.duration}</span>
                      </div>

                      {/* Expandable Bullets Content */}
                      {isExpanded && (
                        <ul className="space-y-2 pt-1 animate-fadeIn">
                          {role.bullets.map((bullet, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-2.5 text-xs sm:text-[13px] text-zinc-800 dark:text-zinc-300 font-sans leading-relaxed"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 dark:bg-zinc-600 mt-2 shrink-0 select-none" />
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {/* Tech Stack Pills Row (Hooked directly to the L-branch line) */}
                      <div className="pt-2">
                        <div className="flex flex-wrap items-center gap-1.5">
                          {role.tags.map((tag) => (
                            <span
                              key={tag}
                              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-[#141416] border border-zinc-200 dark:border-white/10 hover:border-zinc-300 dark:hover:border-white/20 text-[11px] font-mono text-zinc-800 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white transition-all select-none shadow-xs"
                            >
                              <TechIcon name={tag} className="h-3 w-3 shrink-0" />
                              <span>{tag}</span>
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>

          </div>
        ))}
      </div>
    </section>
  );
}
