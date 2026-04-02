import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailingRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    const trail = trailingRef.current;
    if (!cursor || !trail) return;

    let rafId: number;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;

    let trailX = targetX;
    let trailY = targetY;
    let isVisible = false;

    const onMouseMove = (e: MouseEvent) => {
      if (!isVisible) {
        cursor.style.opacity = '1';
        trail.style.opacity = '1';
        trailX = e.clientX;
        trailY = e.clientY;
        isVisible = true;
      }
      targetX = e.clientX;
      targetY = e.clientY;

      if (cursor) {
        cursor.style.transform = `translate3d(calc(${targetX}px - 2px), calc(${targetY}px - 2px), 0)`;
      }
    };

    const updateCursor = () => {
      trailX += (targetX - trailX) * 0.18;
      trailY += (targetY - trailY) * 0.18;

      if (trail) {
        trail.style.transform = `translate3d(calc(${trailX}px - 2px), calc(${trailY}px - 2px), 0)`;
      }

      rafId = requestAnimationFrame(updateCursor);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true, capture: true });
    rafId = requestAnimationFrame(updateCursor);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target && typeof target.closest === 'function') {
        if (target.closest('a, button, [role="button"], input, select, textarea, [tabindex], [data-cursor="pointer"]')) {
          setIsHovering(true);
        } else {
          setIsHovering(false);
        }
      }
    };

    window.addEventListener('mouseover', handleMouseOver, { passive: true, capture: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove, { capture: true });
      window.removeEventListener('mouseover', handleMouseOver, { capture: true });
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      {/* Trailing Orbit Ring */}
      <div
        ref={trailingRef}
        className="fixed top-0 left-0 z-[9998] pointer-events-none opacity-0 mix-blend-screen"
        style={{ transition: 'opacity 0.4s ease' }}
      >
        <svg
          width="48"
          height="48"
          viewBox="-16 -16 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`transition-all duration-300 origin-[10px_10px]
            ${isHovering ? 'scale-[0.8] rotate-90 opacity-80' : 'scale-[1.2] opacity-30'}
          `}
          style={{ animation: isHovering ? 'spin 1.5s linear infinite' : 'spin 8s linear infinite' }}
        >
          <style>{`
            @keyframes spin {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
          `}</style>
          <circle cx="10" cy="10" r="16" stroke="#f35516" strokeWidth="1" strokeDasharray="3 7" strokeLinecap="round" />
          <path d="M 0 0 L 10 24 L 24 10 Z" stroke="white" strokeWidth="0.5" strokeOpacity="0.2" fill="none" />
        </svg>
      </div>

      {/* Primary Cursor — Arrow or Hand */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 z-[10000] pointer-events-none opacity-0"
        style={{ transition: 'opacity 0.2s ease' }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 32 34"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            transformOrigin: '2px 2px',
            transition: 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1)',
            transform: isHovering ? 'scale(1.1)' : 'scale(1)',
            filter: 'drop-shadow(0 0 8px rgba(243,85,22,0.7))',
          }}
        >
          {isHovering ? (
            /* ── Mãozinha — design limpo e clássico ── */
            <g>
              {/* Dedo indicador (apontando para cima) */}
              <rect x="9" y="1" width="5.5" height="16" rx="2.75" fill="white" />

              {/* Demais dedos (médio, anelar, mínimo) — agrupados levemente menores */}
              <rect x="15.5" y="6"  width="4.5" height="11" rx="2.25" fill="white" />
              <rect x="20.5" y="8"  width="4"   height="9"  rx="2"    fill="white" />
              <rect x="25"   y="10" width="3.5" height="7"  rx="1.75" fill="white" />

              {/* Palma — conecta todos os dedos na base */}
              <path
                d="M8 14 C6 14 5 15 5 17 L5 24 C5 27.9 8.1 31 12 31 L22 31 C25.9 31 29 27.9 29 24 L29 17 C29 15 28 14 26 14 Z"
                fill="white"
              />

              {/* Polegar — saindo da palma à esquerda */}
              <path
                d="M8 16 C8 16 4 16 3 19 C2 22 5 24 8 23"
                fill="white"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          ) : (
            /* ── Delta Stealth Arrow ── */
            <g>
              <path
                d="M 0 0 L 8 20 L 11 11 L 20 8 Z"
                fill="#f35516"
                stroke="white"
                strokeWidth="1.2"
                strokeLinejoin="miter"
                strokeMiterlimit="5"
              />
              <circle cx="0" cy="0" r="1.5" fill="white" />
            </g>
          )}
        </svg>
      </div>
    </>
  );
}
