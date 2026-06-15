import { useState } from 'react';
import { profileData } from '../data/portfolioData';
import { 
  RiCalendarLine, 
  RiMailLine, 
  RiArrowRightUpLine, 
  RiArrowRightLine,
  RiTimeLine, 
  RiCheckboxCircleLine 
} from 'react-icons/ri';
import { SiX, SiGithub, SiDiscord } from 'react-icons/si';

export default function ContactFooter() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [sent, setSent] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    const subject = encodeURIComponent(`Project Inquiry from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:${profileData.email}?subject=${subject}&body=${body}`;

    setSent(true);
    setTimeout(() => setSent(false), 3500);
  };

  const handleEmailClick = () => {
    navigator.clipboard?.writeText(profileData.email);
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2500);
    window.location.href = `mailto:${profileData.email}`;
  };

  return (
    <section id="contact" className="space-y-6 pt-8 pb-4 relative">
      {/* Standout Section Header */}
      <div className="flex items-center gap-3">
        <h2 className="font-mono text-xs sm:text-[13px] font-bold uppercase tracking-[0.24em] text-zinc-950 dark:text-white">
          LET'S WORK TOGETHER
        </h2>
        <div className="flex-1 h-[1px] bg-gradient-to-r from-zinc-300 dark:from-white/20 via-zinc-200 dark:via-white/5 to-transparent" />
      </div>

      {/* 2-Column Main Contact Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Left Card: Get in Touch */}
        <div className="rounded-2xl bg-zinc-100/80 dark:bg-[#0c0c0e] border border-zinc-200 dark:border-zinc-800/80 p-5 sm:p-6 flex flex-col justify-between shadow-xs">
          <div>
            <h3 className="font-heading text-lg sm:text-xl font-semibold text-zinc-900 dark:text-white tracking-tight">
              Get in Touch
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400 text-xs sm:text-sm mt-1.5 leading-relaxed">
              Choose your preferred method to connect and let's discuss your project.
            </p>

            {/* Interactive Rows */}
            <div className="divide-y divide-zinc-200 dark:divide-zinc-800/70 mt-5 border-t border-zinc-200 dark:border-zinc-800/70">
              {/* Row 1: Schedule a free call */}
              <a
                href={profileData.calUrl || "https://cal.com/kalyansrinivas-gurugubelli-ui9p4n/30min"}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between py-3.5 group cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0 pr-2">
                  <RiCalendarLine className="w-5 h-5 text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors flex-shrink-0" />
                  <div className="min-w-0">
                    <div className="text-xs sm:text-sm font-medium text-zinc-900 dark:text-white group-hover:text-zinc-700 dark:group-hover:text-zinc-200 truncate">
                      Schedule a free call
                    </div>
                    <div className="text-[11px] text-zinc-600 dark:text-zinc-400 truncate">
                      30-minute strategy session
                    </div>
                  </div>
                </div>
                <RiArrowRightUpLine className="w-4 h-4 text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all flex-shrink-0" />
              </a>

              {/* Row 2: Email */}
              <div
                onClick={handleEmailClick}
                className="flex items-center justify-between py-3.5 group cursor-pointer transition-colors"
                title="Click to copy & open email"
              >
                <div className="flex items-center gap-3 min-w-0 pr-2">
                  <RiMailLine className="w-5 h-5 text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors flex-shrink-0" />
                  <div className="min-w-0">
                    <div className="text-xs sm:text-sm font-medium text-zinc-900 dark:text-white group-hover:text-zinc-700 dark:group-hover:text-zinc-200 truncate">
                      {profileData.email}
                    </div>
                    <div className="text-[11px] text-zinc-600 dark:text-zinc-400 truncate">
                      {emailCopied ? 'Copied to clipboard!' : 'Quick inquiries & questions'}
                    </div>
                  </div>
                </div>
                <RiArrowRightUpLine className="w-4 h-4 text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all flex-shrink-0" />
              </div>

              {/* Row 3: Connect on X */}
              <a
                href={profileData.twitter}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between py-3.5 group cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0 pr-2">
                  <SiX className="w-4 h-4 text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors flex-shrink-0 ml-0.5 mr-0.5" />
                  <div className="min-w-0">
                    <div className="text-xs sm:text-sm font-medium text-zinc-900 dark:text-white group-hover:text-zinc-700 dark:group-hover:text-zinc-200 truncate">
                      Connect on X
                    </div>
                    <div className="text-[11px] text-zinc-600 dark:text-zinc-400 truncate">
                      Follow for updates &amp; insights
                    </div>
                  </div>
                </div>
                <RiArrowRightUpLine className="w-4 h-4 text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all flex-shrink-0" />
              </a>
            </div>
          </div>

          {/* Bottom status badges */}
          <div className="border-t border-zinc-200 dark:border-zinc-800/70 pt-4 mt-4 space-y-2">
            <div className="flex items-center gap-2 text-[11px] sm:text-xs text-zinc-600 dark:text-zinc-400">
              <RiTimeLine className="w-3.5 h-3.5 text-zinc-500 flex-shrink-0" />
              <span>Replies within 24 hours</span>
            </div>
            <div className="flex items-center gap-2 text-[11px] sm:text-xs text-zinc-600 dark:text-zinc-400">
              <RiCheckboxCircleLine className="w-3.5 h-3.5 text-zinc-500 flex-shrink-0" />
              <span>Open to remote, freelance &amp; full-time</span>
            </div>
          </div>
        </div>

        {/* Right Card: Send a Message */}
        <div className="rounded-2xl bg-zinc-100/80 dark:bg-[#0c0c0e] border border-zinc-200 dark:border-zinc-800/80 p-5 sm:p-6 flex flex-col justify-between shadow-xs">
          <div>
            <h3 className="font-heading text-lg sm:text-xl font-semibold text-zinc-900 dark:text-white tracking-tight">
              Send a Message
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400 text-xs sm:text-sm mt-1.5 leading-relaxed">
              Have a question or want to collaborate? Drop me a direct note below.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3 mt-5">
              <div>
                <input
                  type="text"
                  required
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-white dark:bg-[#121215] border border-zinc-300 dark:border-zinc-800/90 focus:border-zinc-500 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-zinc-900 dark:text-white placeholder-zinc-500 dark:placeholder-zinc-500 focus:outline-none transition-colors font-sans"
                />
              </div>
              <div>
                <input
                  type="email"
                  required
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-white dark:bg-[#121215] border border-zinc-300 dark:border-zinc-800/90 focus:border-zinc-500 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-zinc-900 dark:text-white placeholder-zinc-500 dark:placeholder-zinc-500 focus:outline-none transition-colors font-sans"
                />
              </div>
              <div>
                <textarea
                  required
                  rows={4}
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-white dark:bg-[#121215] border border-zinc-300 dark:border-zinc-800/90 focus:border-zinc-500 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-zinc-900 dark:text-white placeholder-zinc-500 dark:placeholder-zinc-500 focus:outline-none transition-colors resize-none font-sans"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-zinc-900 hover:bg-zinc-800 dark:bg-[#16161a] dark:hover:bg-[#202026] border border-zinc-800 dark:border-zinc-700/80 hover:border-zinc-600 rounded-xl py-2.5 sm:py-3 text-xs sm:text-sm font-medium text-white flex items-center justify-center gap-2 transition-all cursor-pointer group mt-2"
              >
                <span>{sent ? 'Opening Mail Client...' : 'Send Message'}</span>
                <RiArrowRightLine className="w-4 h-4 text-zinc-400 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Minimalist Bottom Footer Bar (Plain Vibes - No About, Services, Components) */}
      <footer className="pt-8 pb-10 border-t border-zinc-200 dark:border-zinc-800/80 mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 dark:text-zinc-400 font-sans">
        <div className="flex items-center gap-2">
          <span>© 2026 {profileData.name || 'Kalyan Srinivas Gurugubelli'}.</span>
        </div>

        <div className="flex items-center gap-4 text-zinc-500 dark:text-zinc-400">
          <a
            href={profileData.twitter}
            target="_blank"
            rel="noreferrer"
            aria-label="X (Twitter)"
            className="hover:text-zinc-900 dark:hover:text-white transition-colors p-1"
          >
            <SiX className="w-4 h-4" />
          </a>
          <a
            href={`mailto:${profileData.email}`}
            aria-label="Email"
            className="hover:text-zinc-900 dark:hover:text-white transition-colors p-1"
          >
            <RiMailLine className="w-4.5 h-4.5" />
          </a>
          <a
            href={profileData.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="hover:text-zinc-900 dark:hover:text-white transition-colors p-1"
          >
            <SiGithub className="w-4 h-4" />
          </a>
          <a
            href={profileData.discord}
            target="_blank"
            rel="noreferrer"
            aria-label="Discord"
            className="hover:text-zinc-900 dark:hover:text-white transition-colors p-1"
          >
            <SiDiscord className="w-4 h-4" />
          </a>
        </div>
      </footer>
    </section>
  );
}
