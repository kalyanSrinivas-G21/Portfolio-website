import { useState } from 'react';
import { TwitterIcon, GithubIcon, LinkedinIcon, DiscordIcon, FileTextIcon, MailIcon } from './Icons';
import { RiCheckLine } from 'react-icons/ri';
import { profileData } from '../data/portfolioData';

export default function BioSection() {
  const [copied, setCopied] = useState(false);

  const handleEmailClick = () => {
    navigator.clipboard.writeText(profileData.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    window.location.href = `mailto:${profileData.email}`;
  };

  return (
    <div className="space-y-6 text-[15px] leading-relaxed text-zinc-600 dark:text-[#a1a1aa] font-sans pb-8 border-b border-zinc-200 dark:border-white/5">
      {/* Paragraph 1 (User requested bio) */}
      <p>
        I’m an <strong className="text-zinc-950 dark:text-white font-semibold">AI &amp; Backend Engineer</strong> with a <strong className="text-zinc-950 dark:text-white font-semibold">Full Stack Developer</strong> at heart. Put them together, and you get an <strong className="text-zinc-950 dark:text-white font-semibold">AI Full Stack Engineer</strong>. And yes, I <strong className="text-zinc-950 dark:text-white font-semibold">freelance</strong> too!
      </p>

      {/* Paragraph 2 with inline Email Me button */}
      <p>
        I love <strong className="text-zinc-950 dark:text-white font-semibold">design &amp; development</strong>, so that means I can create beautiful websites and intelligent systems. Currently doing research in <strong className="text-zinc-950 dark:text-white font-semibold">Computer Vision</strong> &amp; <strong className="text-zinc-950 dark:text-white font-semibold">NLP</strong>; they make me explore new things. let's talk{' '}
        <button
          onClick={handleEmailClick}
          className="apple-button !py-1 !px-2.5 !text-xs !gap-1.5 align-baseline ml-1 cursor-pointer"
        >
          <span className="apple-icon-badge !w-4.5 !h-4.5 !rounded-md">
            {copied ? (
              <RiCheckLine className="h-3 w-3 text-emerald-400" />
            ) : (
              <MailIcon className="h-3 w-3 text-zinc-600 dark:text-zinc-300" />
            )}
          </span>
          <span className="text-zinc-900 dark:text-white font-medium">{copied ? 'Copied' : 'Email Me'}</span>
        </button>
      </p>

      {/* Section 3: Links Prompt & Apple-Grade Social Pills */}
      <div className="space-y-3 pt-2">
        <p className="text-zinc-500 dark:text-zinc-400 text-sm">
          You can check these <strong className="text-zinc-950 dark:text-white font-semibold">links</strong> if you wish to
        </p>

        {/* Horizontal Row of 5 Apple-style Social Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Twitter */}
          <a
            href={profileData.twitter}
            target="_blank"
            rel="noreferrer"
            className="apple-button !py-1.5 !px-3 !text-xs !gap-2"
          >
            <TwitterIcon className="h-3.5 w-3.5 text-zinc-700 dark:text-zinc-300" />
            <span>Twitter</span>
          </a>

          {/* Github */}
          <a
            href={profileData.github}
            target="_blank"
            rel="noreferrer"
            className="apple-button !py-1.5 !px-3 !text-xs !gap-2"
          >
            <GithubIcon className="h-3.5 w-3.5 text-zinc-700 dark:text-zinc-300" />
            <span>Github</span>
          </a>

          {/* Resume */}
          <a
            href={profileData.resume}
            target={profileData.resume.startsWith('http') ? "_blank" : undefined}
            rel="noreferrer"
            className="apple-button !py-1.5 !px-3 !text-xs !gap-2"
          >
            <FileTextIcon className="h-3.5 w-3.5 text-zinc-700 dark:text-zinc-300" />
            <span>Resume</span>
          </a>

          {/* Linkedin */}
          <a
            href={profileData.linkedin}
            target="_blank"
            rel="noreferrer"
            className="apple-button !py-1.5 !px-3 !text-xs !gap-2"
          >
            <LinkedinIcon className="h-3.5 w-3.5 text-zinc-700 dark:text-zinc-300" />
            <span>Linkedin</span>
          </a>

          {/* Discord */}
          <a
            href={profileData.discord}
            target="_blank"
            rel="noreferrer"
            className="apple-button !py-1.5 !px-3 !text-xs !gap-2"
          >
            <DiscordIcon className="h-3.5 w-3.5 text-zinc-700 dark:text-zinc-300" />
            <span>Discord</span>
          </a>
        </div>
      </div>
    </div>
  );
}
