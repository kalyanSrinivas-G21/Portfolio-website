import { useState } from 'react';
import { GlobeIcon, TechIcon, GithubIcon } from './Icons';
import { profileData } from '../data/portfolioData';
import { RiArrowDownSLine, RiExternalLinkLine, RiTerminalBoxLine, RiCpuLine } from 'react-icons/ri';

const TECH_LABELS = {
  python: 'Python',
  fastapi: 'FastAPI',
  ollama: 'Ollama (Local LLM)',
  react: 'React',
  docker: 'Docker',
  tailwind: 'Tailwind CSS',
  typescript: 'TypeScript',
  next: 'Next.js',
  cpu: 'SystemVerilog',
  testtube: 'cocotb',
  kotlin: 'Kotlin',
  android: 'Android',
  opencv: 'OpenCV',
  onnx: 'ONNX Runtime',
  java: 'Java',
  openjdk: 'Java2D',
  linux: 'Linux',
  vite: 'Vite',
  brain: 'Reinforcement Learning',
  robot: 'Autonomous Agent'
};

export default function FeaturedProjects() {
  const { projects } = profileData;
  const [showAll, setShowAll] = useState(false);

  const visibleProjects = showAll ? projects : projects.slice(0, 2);

  return (
    <div id="work" className="space-y-5 pt-2">
      {/* Standout Section Header */}
      <div className="flex items-center gap-3">
        <h2 className="font-mono text-xs sm:text-[13px] font-bold uppercase tracking-[0.24em] text-zinc-950 dark:text-white">
          FEATURED PROJECTS
        </h2>
        <div className="flex-1 h-[1px] bg-gradient-to-r from-zinc-300 dark:from-white/20 via-zinc-200 dark:via-white/5 to-transparent" />
      </div>

      {/* 2-Column Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {visibleProjects.map((proj) => {
          return (
            <div
              key={proj.id}
              className="apple-card p-4 sm:p-5 flex flex-col justify-between group transition-all duration-200"
            >
              <div>
                {/* Visual Preview Thumbnail Frame */}
                <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden border border-white/8 dark:border-white/10 mb-4 select-none shadow-md bg-zinc-950">
                  {proj.id === 'agentflow' ? (
                    /* AgentFlow: Sovereign AI Workbench */
                    <div className="w-full h-full bg-gradient-to-b from-[#0a0f1d] via-[#0d1424] to-[#080b14] p-3.5 flex flex-col justify-between text-left relative overflow-hidden font-mono">
                      {/* Grid overlay */}
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(56,189,248,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(56,189,248,0.05)_1px,transparent_1px)] bg-[size:16px_16px]" />
                      
                      {/* Top Header Status */}
                      <div className="relative z-10 flex items-center justify-between text-[8px] text-cyan-400 border-b border-cyan-500/20 pb-1.5">
                        <span className="font-bold flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          AGENTFLOW // SOVEREIGN AI
                        </span>
                        <span className="px-1.5 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/30 text-[7px] text-cyan-300">
                          LOCAL SANDBOX
                        </span>
                      </div>

                      {/* Center Node Workflow Visual */}
                      <div className="relative z-10 my-auto py-1 space-y-1.5">
                        <div className="flex items-center justify-between gap-1 text-[7.5px]">
                          <div className="px-2 py-1 rounded bg-slate-900/90 border border-slate-700/80 text-zinc-200 shadow-xs">
                            📄 Ingest Spec
                          </div>
                          <span className="text-cyan-400 text-[9px]">➔</span>
                          <div className="px-2 py-1 rounded bg-indigo-950/90 border border-indigo-500/40 text-cyan-200 shadow-xs font-semibold">
                            🦙 Ollama Llama-3
                          </div>
                          <span className="text-cyan-400 text-[9px]">➔</span>
                          <div className="px-2 py-1 rounded bg-emerald-950/90 border border-emerald-500/40 text-emerald-200 shadow-xs">
                            ⚡ Isolated Sandbox
                          </div>
                        </div>

                        {/* Mock Terminal Output */}
                        <div className="rounded bg-black/70 border border-white/10 p-1.5 text-[7px] text-zinc-300 leading-tight">
                          <span className="text-emerald-400">&gt;</span> agent.run_workflow(mode=<span className="text-amber-300">"offline_sovereign"</span>)
                          <br />
                          <span className="text-zinc-500">[INFO] Zero outbound cloud telemetry.</span>
                        </div>
                      </div>

                      {/* Bottom Tag */}
                      <div className="relative z-10 flex items-center justify-between text-[7px] text-zinc-400 pt-1 border-t border-white/5">
                        <span>SIH'24 PROBLEM STATEMENT</span>
                        <span className="text-cyan-300 font-bold">100% PRIVATE</span>
                      </div>
                    </div>
                  ) : proj.id === 'spec2assert' ? (
                    /* Spec2Assert: EDA & Formal Verification Engine */
                    <div className="w-full h-full bg-gradient-to-b from-[#080d1a] via-[#091226] to-[#040812] p-3.5 flex flex-col justify-between text-left relative overflow-hidden font-mono">
                      {/* Circuit waveform grid */}
                      <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:12px_12px] opacity-15" />

                      {/* Header */}
                      <div className="relative z-10 flex items-center justify-between text-[8px] text-blue-400 border-b border-blue-500/20 pb-1.5">
                        <span className="font-bold flex items-center gap-1.5">
                          <RiCpuLine className="w-3 h-3 text-blue-400" />
                          SPEC2ASSERT // EDA ENGINE
                        </span>
                        <span className="px-1.5 py-0.5 rounded bg-blue-950/80 border border-blue-500/30 text-[7px] text-blue-300">
                          SVA + cocotb
                        </span>
                      </div>

                      {/* Spec -> Assertion transformation */}
                      <div className="relative z-10 my-auto py-1 space-y-1">
                        <div className="bg-slate-900/80 border border-slate-700/60 rounded p-1.5 text-[7px] text-zinc-300">
                          <span className="text-blue-400 font-semibold">SPEC:</span> "Grant must assert within 2 clock cycles of Request"
                        </div>
                        <div className="bg-blue-950/70 border border-blue-500/40 rounded p-1.5 text-[7px] text-blue-200">
                          <span className="text-emerald-400 font-semibold">SVA:</span> assert property (@(posedge clk) req |-&gt; ##[1:2] gnt);
                        </div>
                        {/* Clock Waveform Visual */}
                        <div className="text-[6.5px] text-zinc-500 flex items-center justify-between px-1">
                          <span>CLK: ⎍⎍⎍⎍⎍</span>
                          <span>REQ: ⎍¯¯___</span>
                          <span>GNT: ___⎍¯_</span>
                        </div>
                      </div>

                      {/* Bottom Footer */}
                      <div className="relative z-10 flex items-center justify-between text-[7px] text-zinc-400 pt-1 border-t border-white/5">
                        <span>DETERMINISTIC VERIFICATION</span>
                        <span className="text-blue-300 font-bold">FORMAL PASS</span>
                      </div>
                    </div>
                  ) : proj.id === 'pocket-qc' ? (
                    /* Pocket-QC: Industrial Edge Quality Control Viewfinder */
                    <div className="w-full h-full bg-gradient-to-b from-[#06140d] via-[#091a11] to-[#040d08] p-3.5 flex flex-col justify-between text-left relative overflow-hidden font-mono">
                      {/* Camera viewfinder reticle */}
                      <div className="absolute inset-2 border border-emerald-500/20 rounded pointer-events-none" />
                      <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-emerald-400" />
                      <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-emerald-400" />
                      <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-emerald-400" />
                      <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-emerald-400" />

                      {/* Header HUD */}
                      <div className="relative z-10 flex items-center justify-between text-[8px] text-emerald-400">
                        <span className="font-bold">● REC [LIVE QC FEED]</span>
                        <span className="text-[7.5px] text-emerald-300">NPU: 14ms · 30 FPS</span>
                      </div>

                      {/* Center Bounding Box Detection */}
                      <div className="relative z-10 my-auto flex flex-col items-center">
                        <div className="border border-emerald-400/80 bg-emerald-500/10 rounded px-2.5 py-1 text-center shadow-[0_0_12px_rgba(16,185,129,0.2)]">
                          <div className="text-[7.5px] font-bold text-emerald-300">
                            [OBJECT: SURFACE-DEFECT 98.4%]
                          </div>
                          <div className="text-[6.5px] text-zinc-300">
                            YOLOv8 On-Device Inference
                          </div>
                        </div>
                      </div>

                      {/* Bottom Specs */}
                      <div className="relative z-10 flex items-center justify-between text-[7px] text-emerald-500/90 border-t border-emerald-500/20 pt-1">
                        <span>ARM64 QUALCOMM NPU</span>
                        <span className="text-emerald-300 font-semibold">ONNX ACCELERATED</span>
                      </div>
                    </div>
                  ) : proj.id === 'cairo-ui' ? (
                    /* CAIRO UI: Java2D Engine */
                    <div className="w-full h-full bg-gradient-to-b from-[#181106] via-[#1f1508] to-[#120a03] p-3.5 flex flex-col justify-between text-left relative overflow-hidden font-mono">
                      {/* Top Header */}
                      <div className="relative z-10 flex items-center justify-between text-[8px] text-amber-400 border-b border-amber-500/20 pb-1.5">
                        <span className="font-bold flex items-center gap-1.5">
                          <RiTerminalBoxLine className="w-3 h-3 text-amber-400" />
                          CAIRO // JAVA2D UI FRAMEWORK
                        </span>
                        <span className="px-1.5 py-0.5 rounded bg-amber-950/80 border border-amber-500/30 text-[7px] text-amber-300">
                          ZERO-DEP
                        </span>
                      </div>

                      {/* Center Pipeline Visual */}
                      <div className="relative z-10 my-auto py-1 space-y-1.5">
                        <div className="bg-black/60 border border-amber-500/25 rounded p-1.5 text-[7px] text-amber-200">
                          <code>N-ary Tree ➔ DirtyFlagVisitor ➔ Graphics2D</code>
                        </div>
                        {/* Custom Rendered UI controls mockup */}
                        <div className="flex items-center gap-2 pt-0.5">
                          <div className="h-4 px-2 rounded bg-amber-500/20 border border-amber-500/40 text-[7px] text-amber-300 flex items-center">
                            ButtonWidget()
                          </div>
                          <div className="h-4 w-16 rounded bg-zinc-900 border border-zinc-700 relative overflow-hidden flex items-center px-1">
                            <div className="h-2 w-8 bg-amber-400/80 rounded" />
                          </div>
                          <div className="text-[7px] text-zinc-400">60 FPS</div>
                        </div>
                      </div>

                      {/* Bottom Footer */}
                      <div className="relative z-10 flex items-center justify-between text-[7px] text-zinc-400 pt-1 border-t border-white/5">
                        <span>OBSERVER STATE MANAGEMENT</span>
                        <span className="text-amber-300 font-bold">PURE JAVA</span>
                      </div>
                    </div>
                  ) : (
                    /* AI-Simulation: Multi-Agent Swarm Visualizer */
                    <div className="w-full h-full bg-gradient-to-b from-[#140b24] via-[#1a0f30] to-[#0c0517] p-3.5 flex flex-col justify-between text-left relative overflow-hidden font-mono">
                      {/* Top Header */}
                      <div className="relative z-10 flex items-center justify-between text-[8px] text-purple-400 border-b border-purple-500/20 pb-1.5">
                        <span className="font-bold">AI-SIM // MULTI-AGENT SWARM</span>
                        <span className="px-1.5 py-0.5 rounded bg-purple-950/80 border border-purple-500/30 text-[7px] text-purple-300">
                          128 AGENTS
                        </span>
                      </div>

                      {/* Particle simulation canvas mockup */}
                      <div className="relative z-10 my-auto py-1">
                        <div className="h-12 w-full rounded bg-black/60 border border-purple-500/20 relative overflow-hidden flex items-center justify-center">
                          {/* Simulated Swarm Vectors */}
                          <div className="absolute top-2 left-6 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#38bdf8]" />
                          <div className="absolute top-4 left-10 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#38bdf8]" />
                          <div className="absolute top-3 left-16 w-1.5 h-1.5 rounded-full bg-purple-400 shadow-[0_0_6px_#c084fc]" />
                          <div className="absolute bottom-2 right-8 w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.15),transparent_70%)]" />
                          <span className="text-[7px] text-purple-200/90 font-semibold z-10">
                            PPO Policy: Reward +248.6 · Epoch 4,200
                          </span>
                        </div>
                      </div>

                      {/* Bottom Footer */}
                      <div className="relative z-10 flex items-center justify-between text-[7px] text-zinc-400 pt-1 border-t border-white/5">
                        <span>BOIDS &amp; REINFORCEMENT LEARNING</span>
                        <span className="text-purple-300 font-bold">CANVAS / VITE</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Header Title & External Links */}
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <div>
                    <h3 className="font-heading font-semibold text-base sm:text-[17px] text-zinc-950 dark:text-white group-hover:text-zinc-800 dark:group-hover:text-zinc-100 transition-colors tracking-tight">
                      {proj.title}
                    </h3>
                    <div className="text-[10.5px] font-mono text-zinc-600 dark:text-zinc-400 mt-0.5">
                      {proj.tagline}
                    </div>
                  </div>

                  {/* Action Link Icons */}
                  <div className="flex items-center gap-1.5 shrink-0 pt-0.5">
                    {proj.demoUrl && (
                      <a
                        href={proj.demoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900/80 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-white/10 text-zinc-700 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white transition-all cursor-pointer shadow-xs"
                        title={`Open Live Demo: ${proj.title}`}
                      >
                        <GlobeIcon className="h-3.5 w-3.5" />
                      </a>
                    )}
                    {proj.githubUrl && (
                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900/80 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-white/10 text-zinc-700 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white transition-all cursor-pointer shadow-xs"
                        title={`View GitHub Repository: ${proj.title}`}
                      >
                        <GithubIcon className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-zinc-600 dark:text-[#a1a1aa] leading-relaxed font-sans mt-2">
                  {proj.description}
                </p>
              </div>

              {/* Tech Stack Pills (Official Brand Icons from GitHub Repos) */}
              <div className="flex items-center gap-1.5 pt-3.5 mt-3 border-t border-zinc-200 dark:border-white/5 flex-wrap">
                {proj.stack.map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-[#131316] border border-zinc-200 dark:border-white/10 hover:border-zinc-300 dark:hover:border-white/20 transition-all text-[10.5px] font-mono text-zinc-800 dark:text-zinc-300 shadow-xs select-none"
                  >
                    <TechIcon name={tech} className="h-3 w-3 shrink-0" />
                    <span>{TECH_LABELS[tech.toLowerCase()] || tech}</span>
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* See More / Show Fewer Expand Button */}
      {projects.length > 2 && (
        <div className="flex justify-center pt-2">
          <button
            onClick={() => setShowAll((prev) => !prev)}
            className="apple-button !py-2 !px-5 !text-xs font-mono !gap-2 cursor-pointer group shadow-md"
            title={showAll ? "Collapse project list" : "Expand to view all engineering projects"}
          >
            <span>{showAll ? 'Show Fewer Projects' : `Show More Projects (${projects.length - 2})`}</span>
            <RiArrowDownSLine
              className={`w-4 h-4 transition-transform duration-200 text-zinc-400 group-hover:text-white ${
                showAll ? 'rotate-180' : ''
              }`}
            />
          </button>
        </div>
      )}
    </div>
  );
}
