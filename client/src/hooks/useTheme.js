import { useState, useEffect, useCallback } from 'react';

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('portfolio-theme');
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  });

  const applyThemeToDOM = useCallback((newTheme) => {
    document.documentElement.setAttribute('data-theme', newTheme);
    document.documentElement.style.colorScheme = newTheme;
    
    if (newTheme === 'light') {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    }

    localStorage.setItem('portfolio-theme', newTheme);
    window.dispatchEvent(new CustomEvent('theme-change', { detail: { theme: newTheme } }));
  }, []);

  useEffect(() => {
    applyThemeToDOM(theme);
  }, [theme, applyThemeToDOM]);

  const toggleTheme = useCallback((e) => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';

    // Respect user's motion preferences
    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;

    // If View Transitions API is not available or reduced motion is preferred, fallback to standard CSS transition
    if (!document.startViewTransition || prefersReducedMotion) {
      applyThemeToDOM(nextTheme);
      setTheme(nextTheme);
      return;
    }

    // Determine circular expansion epicenter from click coordinates or element bounds
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;

    if (e && typeof e.clientX === 'number' && e.clientX > 0 && typeof e.clientY === 'number' && e.clientY > 0) {
      x = e.clientX;
      y = e.clientY;
    } else if (e?.currentTarget?.getBoundingClientRect) {
      const rect = e.currentTarget.getBoundingClientRect();
      x = rect.left + rect.width / 2;
      y = rect.top + rect.height / 2;
    }

    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    document.documentElement.classList.add('theme-transitioning');

    // Start View Transition
    const transition = document.startViewTransition(() => {
      applyThemeToDOM(nextTheme);
      setTheme(nextTheme);
    });

    transition.ready
      .then(() => {
        // Animate circular clip-path expanding out from click position
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${endRadius}px at ${x}px ${y}px)`
            ]
          },
          {
            duration: 560,
            easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
            pseudoElement: '::view-transition-new(root)'
          }
        );
      })
      .catch(() => {});

    transition.finished
      .finally(() => {
        document.documentElement.classList.remove('theme-transitioning');
      });
  }, [theme, applyThemeToDOM]);

  return { theme, toggleTheme };
}
