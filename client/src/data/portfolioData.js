export const profileData = {
  name: "Kalyan Srinivas Gurugubelli",
  fullName: "Kalyan Srinivas Gurugubelli",
  eyebrow: "Hey It's me",
  location: "Kakinada, India",
  pronouns: "he/him",
  email: "gurugubelikalyansrinivas@gmail.com",
  twitter: "https://x.com/OopaQuest",
  github: "https://github.com/kalyanSrinivas-G21",
  linkedin: "https://www.linkedin.com/in/kalyan-srinivas-gurugubelli-755625377/",
  discord: "https://discordapp.com/users/1126438117059072000",
  calUrl: "https://cal.com/kalyansrinivas-gurugubelli-ui9p4n/30min",
  resume: "mailto:gurugubelikalyansrinivas@gmail.com?subject=Resume%20Request%20-%20Kalyan%20Srinivas&body=Hi%20Kalyan%2C%0A%0AI%20would%20love%20to%20review%20your%20resume.%0A%0AThanks!",
  
  bio: {
    paragraph1: "I'm an AI & Backend Engineer with a Full Stack Developer at heart. Put them together, and you get an AI Full Stack Engineer. And yes, I freelance too!",
    paragraph2: "I love design & development, so that means I can create beautiful websites and intelligent systems. Currently doing research in Computer Vision & NLP; they make me explore new things. let's talk"
  },

  socialLinks: [
    { label: "Twitter", icon: "x", href: "https://x.com/OopaQuest" },
    { label: "Github", icon: "github", href: "https://github.com/kalyanSrinivas-G21" },
    { label: "Resume", icon: "file", href: "#" },
    { label: "Linkedin", icon: "linkedin", href: "https://www.linkedin.com/in/kalyan-srinivas-gurugubelli-755625377/" },
    { label: "Discord", icon: "discord", href: "https://discordapp.com/users/1126438117059072000" },
  ],

  projects: [
    {
      id: "agentflow",
      title: "AgentFlow",
      badge: "SOVEREIGN AI WORKBENCH",
      tagline: "Local-First Multi-Agent Orchestration & Sandbox",
      description: "Sovereign AI workbench built on top of locally running LLMs. Engineered for autonomous agentic workflows, multi-document analysis, and safe sandboxed code execution without relying on cloud APIs. Built for SIH26117 Problem Statement.",
      demoUrl: "https://agentflow-three.vercel.app/",
      githubUrl: "https://github.com/kalyanSrinivas-G21/AgentFlow-AI",
      stack: ["python", "fastapi", "ollama", "react", "docker", "tailwind"],
      preview: {
        headline: "AgentFlow Engine",
        subtext: "Sovereign execution with local LLMs and isolated Python sandbox.",
        theme: "agentflow"
      }
    },
    {
      id: "spec2assert",
      title: "Spec2Assert",
      badge: "EDA & FORMAL VERIFICATION",
      tagline: "Natural Language Specs to SVA & cocotb Testbenches",
      description: "Deterministic AI-driven EDA workbench converting natural-language hardware protocol specifications into formal SystemVerilog Assertions (SVA) and executable cocotb testbenches using structured multi-agent LLM orchestration.",
      demoUrl: "https://spec2-assert.vercel.app/",
      githubUrl: "https://github.com/kalyanSrinivas-G21/Spec2Assert",
      stack: ["typescript", "next", "python", "cpu", "testtube", "tailwind"],
      preview: {
        headline: "Spec2Assert EDA",
        subtext: "Deterministic hardware assertions & cocotb validation pipelines.",
        theme: "spec2assert"
      }
    },
    {
      id: "pocket-qc",
      title: "Pocket-QC",
      badge: "ON-DEVICE EDGE VISION",
      tagline: "Industrial Edge Quality Control System on ARM64 NPU",
      description: "Automated industrial quality control platform powered by local on-device computer vision models, optimized for real-time YOLO object detection and defect classification directly on Qualcomm ARM64 NPUs.",
      demoUrl: "https://qc-phone.vercel.app/",
      githubUrl: "https://github.com/kalyanSrinivas-G21/Pocket-QC",
      stack: ["kotlin", "android", "opencv", "onnx"],
      preview: {
        headline: "Pocket-QC Industrial",
        subtext: "On-device defect detection with sub-15ms NPU inference.",
        theme: "pocketqc"
      }
    },
    {
      id: "cairo-ui",
      title: "CAIRO UI",
      badge: "SYSTEMS & UI ENGINE",
      tagline: "From-Scratch Java UI Framework & Pipeline",
      description: "From-scratch Java UI framework engineered on an N-ary component tree, observer-driven reactive state management, and a dirty-flag render pipeline. Zero external dependencies, built entirely on pure Java2D.",
      demoUrl: null,
      githubUrl: "https://github.com/kalyanSrinivas-G21/CAIRO-UI",
      stack: ["java", "openjdk", "linux"],
      preview: {
        headline: "CAIRO Java2D Engine",
        subtext: "Dirty-flag render pipeline & N-ary tree reactive state architecture.",
        theme: "cairo"
      }
    },
    {
      id: "ai-sim",
      title: "AI-Simulation",
      badge: "MULTI-AGENT RESEARCH",
      tagline: "Interactive Swarm & Policy Evolution Visualizer",
      description: "Split-architecture interactive simulation platform visualizing complex emergent multi-agent artificial intelligence behaviors, exploring rule-based swarms, boids flocking, and reinforcement learning policy evolution.",
      demoUrl: null,
      githubUrl: "https://github.com/kalyanSrinivas-G21/AI-Simulation",
      stack: ["typescript", "react", "python", "vite", "brain"],
      preview: {
        headline: "AI Simulation Algo's",
        subtext: "Real-time canvas rendering of swarm intelligence and RL behaviors.",
        theme: "aisim"
      }
    }
  ],

  techStack: {
    core: [
      { name: 'Java', icon: 'java' },
      { name: 'Python', icon: 'python' },
      { name: 'JavaScript', icon: 'javascript' },
      { name: 'TypeScript', icon: 'typescript' },
      { name: 'Flutter', icon: 'flutter' },
      { name: 'Kotlin', icon: 'kotlin' },
      { name: 'SQL', icon: 'sql' },
    ],
    frameworks: [
      { name: 'FastAPI', icon: 'fastapi' },
      { name: 'Pydantic AI', icon: 'pydantic' },
      { name: 'LangChain', icon: 'langchain' },
      { name: 'React', icon: 'react' },
      { name: 'Next.js', icon: 'next' },
      { name: 'Express.js', icon: 'express' },
      { name: 'Node.js', icon: 'node' },
      { name: 'Tailwind CSS', icon: 'tailwind' },
      { name: 'Three.js', icon: 'threejs' },
      { name: 'LibGDX', icon: 'libgdx' },
    ],
    tools: [
      { name: 'Git', icon: 'git' },
      { name: 'Docker', icon: 'docker' },
      { name: 'MongoDB', icon: 'mongodb' },
      { name: 'MySQL', icon: 'mysql' },
      { name: 'PostgreSQL', icon: 'postgresql' },
      { name: 'Figma', icon: 'figma' },
      { name: 'VS Code', icon: 'vscode' },
      { name: 'Linux', icon: 'linux' },
    ]
  },

  experience: [
    {
      id: 'krify',
      company: 'Krify',
      role: 'Software Intern — Backend & Systems',
      mode: 'Hybrid',
      period: 'Apr 2025 – Aug 2025',
      location: 'Kakinada, AP',
      description: 'Built internal tooling and high-throughput backend services that streamlined task management for engineering teams.',
      bullets: [
        'Architected a Java & Spring Boot REST API with role-based access control, cutting manual task-logging time by 30%.',
        'Deployed backend services on Ubuntu Linux with Nginx reverse proxying.',
        'Optimized MySQL schemas handling 10,000+ weekly entries with sub-second latency.',
      ],
      tags: ['Java', 'Spring Boot', 'MySQL', 'REST APIs', 'Ubuntu'],
    },
    {
      id: 'freelance',
      company: 'Freelance',
      role: 'Full Stack Engineer & AI Developer',
      mode: 'Remote',
      period: 'Oct 2024 – Present',
      location: 'Remote',
      description: 'Designing and shipping production web applications and AI-integrated tools for clients across industries.',
      bullets: [
        'Built responsive client websites with React, Next.js, and Tailwind CSS.',
        'Integrated OpenAI APIs for intelligent content generation and data analysis pipelines.',
        'Delivered 5+ production projects with modern CI/CD and deployment workflows.',
      ],
      tags: ['React', 'Next.js', 'OpenAI', 'Tailwind CSS', 'Vercel'],
    }
  ],

  education: {
    institution: 'Pragati University',
    degree: 'BTech in Computer Science & Engineering',
    location: 'Kakinada, Andhra Pradesh',
    period: '2024 — Expected May 2028',
    gpa: '8.95 / 10.00',
    coursework: [
      'Data Structures & Algorithms',
      'Operating Systems',
      'Database Management',
      'Computer Networks',
      'OOP & Design Patterns',
      'AI/ML Foundations',
    ],
  },
};
