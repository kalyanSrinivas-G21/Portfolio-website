import { useState, useEffect, useMemo } from 'react';

// Monochrome level colors matching Apple dark aesthetic
const LEVEL_COLORS_DARK = [
  '#161618', // 0: empty
  '#3f3f46', // 1: low
  '#71717a', // 2: medium
  '#d4d4d8', // 3: high
  '#ffffff', // 4: peak
];

// Refined grayscale level colors for light aesthetic
const LEVEL_COLORS_LIGHT = [
  '#e4e4e7', // 0: empty
  '#a1a1aa', // 1: low
  '#71717a', // 2: medium
  '#3f3f46', // 3: high
  '#18181b', // 4: peak
];

export default function GithubHeatmap({ theme = 'dark' }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hoveredDay, setHoveredDay] = useState(null);

  const isLight = theme === 'light';
  const levelColors = isLight ? LEVEL_COLORS_LIGHT : LEVEL_COLORS_DARK;

  // Fetch real GitHub contribution data for kalyanSrinivas-G21
  useEffect(() => {
    let isMounted = true;
    fetch('https://github-contributions-api.jogruber.de/v4/kalyanSrinivas-G21?y=last')
      .then((res) => {
        if (!res.ok) throw new Error('Network response error');
        return res.json();
      })
      .then((json) => {
        if (isMounted && json && json.contributions) {
          setData(json);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Process contributions into 52 weeks x 7 days
  const { weeks, totalCount, months } = useMemo(() => {
    const monthNames = ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];
    
    if (data && data.contributions && data.contributions.length > 0) {
      const allDays = data.contributions;
      const weekCols = [];
      const total = data.total?.lastYear || 171;
      
      for (let i = 0; i < allDays.length; i += 7) {
        weekCols.push(allDays.slice(i, i + 7));
      }
      
      return {
        weeks: weekCols.slice(-52),
        totalCount: `${total} contributions in the last year`,
        months: monthNames
      };
    }

    // Default fallback matrix if offline or loading
    const fallbackWeeks = [];
    for (let w = 0; w < 52; w++) {
      const days = [];
      for (let d = 0; d < 7; d++) {
        const seed = (w * 13 + d * 17) % 100;
        let lvl = 0;
        if (w >= 36) {
          if (seed > 65) lvl = 1;
          if (seed > 82) lvl = 2;
          if (seed > 93) lvl = 3;
          if (seed > 97) lvl = 4;
        } else if (w >= 18) {
          if (seed > 75) lvl = 1;
          if (seed > 88) lvl = 2;
          if (seed > 96) lvl = 3;
        } else {
          if (seed > 85) lvl = 1;
          if (seed > 95) lvl = 2;
        }
        days.push({
          date: `2025-W${w}-D${d}`,
          count: lvl * 2,
          level: lvl
        });
      }
      fallbackWeeks.push(days);
    }

    return {
      weeks: fallbackWeeks,
      totalCount: '171 contributions in the last year',
      months: monthNames
    };
  }, [data]);

  return (
    <div className="w-full pt-1 pb-4">
      {/* Direct inline display: fits perfectly into website width with zero layout shift */}
      <div className="w-full relative min-h-[135px]">
        <svg
          viewBox="0 0 680 135"
          className="w-full h-auto overflow-visible select-none"
          aria-label="GitHub Contributions Heatmap"
        >
          {/* Month Labels Across Top */}
          <g className={`text-[10px] font-mono ${isLight ? 'fill-zinc-500' : 'fill-zinc-500'}`}>
            {months.map((m, idx) => {
              const xPos = 4 + idx * 56;
              return (
                <text key={m} x={xPos} y="13">
                  {m}
                </text>
              );
            })}
          </g>

          {/* 52-Week Contribution Matrix (0 to 680 responsive coordinates) */}
          <g transform="translate(2, 22)">
            {weeks.map((week, wIdx) => {
              const x = wIdx * 12.9;
              return (
                <g key={wIdx}>
                  {week.map((day, dIdx) => {
                    const y = dIdx * 12.7;
                    const level = day.level ?? 0;
                    const color = levelColors[level] || levelColors[0];
                    return (
                      <rect
                        key={dIdx}
                        x={x}
                        y={y}
                        width="10.2"
                        height="10.2"
                        rx="2.5"
                        fill={color}
                        stroke={isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.05)'}
                        strokeWidth="0.5"
                        className={`transition-all duration-150 ${isLight ? 'hover:stroke-black/50' : 'hover:stroke-white/60'} hover:opacity-100 cursor-pointer`}
                        onMouseEnter={() => setHoveredDay(day)}
                        onMouseLeave={() => setHoveredDay(null)}
                      >
                        <title>{`${day.count || 0} contributions on ${day.date || 'day'}`}</title>
                      </rect>
                    );
                  })}
                </g>
              );
            })}
          </g>

          {/* Bottom Row: Total Contributions & Dynamic Hover Status on Left, Legend on Right */}
          <g transform="translate(4, 128)">
            {/* Total Contributions / Active Hover Info */}
            <text x="0" y="0" className={`text-[11px] font-mono ${isLight ? 'fill-zinc-600' : 'fill-zinc-400'}`}>
              {hoveredDay 
                ? `${hoveredDay.count || 0} contributions on ${hoveredDay.date || 'this date'}`
                : totalCount}
            </text>

            {/* Legend */}
            <g transform="translate(535, -9)">
              <text x="0" y="9" className="text-[10px] font-mono fill-zinc-500">
                Less
              </text>
              {levelColors.map((col, i) => (
                <rect
                  key={i}
                  x={30 + i * 14}
                  y="0"
                  width="10"
                  height="10"
                  rx="2"
                  fill={col}
                  stroke={isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.06)'}
                  strokeWidth="0.5"
                />
              ))}
              <text x={30 + 5 * 14 + 4} y="9" className="text-[10px] font-mono fill-zinc-500">
                More
              </text>
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}
