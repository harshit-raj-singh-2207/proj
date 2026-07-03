import React, { useEffect, useRef, useState } from 'react';

/* ─── Typewriter words ───────────────────────────────────── */
const WORDS = [
  'Dream Job',
  'FAANG Offer',
  'Senior Role',
  'Salary Hike',
  'Career Pivot',
];

/* ─── Particle canvas ────────────────────────────────────── */
function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let raf;
    let W = 0, H = 0;

    const resize = () => {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const COUNT = 55;
    const pts = Array.from({ length: COUNT }, () => ({
      x:  Math.random() * W,
      y:  Math.random() * H,
      r:  Math.random() * 1.6 + 0.4,
      vx: (Math.random() - 0.5) * 0.28,
      vy: (Math.random() - 0.5) * 0.28,
      o:  Math.random() * 0.5 + 0.15,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      for (const p of pts) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139,92,246,${p.o})`;
        ctx.fill();
      }
      /* connections */
      for (let i = 0; i < COUNT; i++) {
        for (let j = i + 1; j < COUNT; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(124,58,237,${0.13 * (1 - dist / 130)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute', inset: 0,
        width: '100%', height: '100%',
        pointerEvents: 'none', display: 'block',
      }}
    />
  );
}

/* ─── Typewriter hook ────────────────────────────────────── */
function useTypewriter(words, speed = 80, pause = 1800) {
  const [display, setDisplay]   = useState('');
  const [wordIdx, setWordIdx]   = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIdx % words.length];
    let timeout;
    if (!deleting && display === word) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && display === '') {
      setDeleting(false);
      setWordIdx(i => i + 1);
    } else {
      timeout = setTimeout(() => {
        setDisplay(prev =>
          deleting ? prev.slice(0, -1) : word.slice(0, prev.length + 1)
        );
      }, deleting ? speed / 2 : speed);
    }
    return () => clearTimeout(timeout);
  }, [display, deleting, wordIdx, words, speed, pause]);

  return display;
}

/* ─── Social proof avatars ───────────────────────────────── */
const AVATARS = [
  'linear-gradient(135deg,#7c3aed,#8b5cf6)',
  'linear-gradient(135deg,#06b6d4,#22d3ee)',
  'linear-gradient(135deg,#ec4899,#f472b6)',
  'linear-gradient(135deg,#22c55e,#4ade80)',
  'linear-gradient(135deg,#f59e0b,#fbbf24)',
];

/* ─── Floating badge ─────────────────────────────────────── */
function FloatingBadge({ style, icon, text, sub }) {
  return (
    <div style={{ ...s.floatBadge, ...style }}>
      <span style={s.floatIcon}>{icon}</span>
      <div>
        <div style={s.floatText}>{text}</div>
        {sub && <div style={s.floatSub}>{sub}</div>}
      </div>
    </div>
  );
}

/* ─── Main component ─────────────────────────────────────── */
export default function Hero() {
  const typed      = useTypewriter(WORDS);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <section id="hero" aria-label="Hero" style={s.section}>
      {/* ── Animated background ── */}
      <ParticleCanvas />

      {/* ── Radial glows ── */}
      <div style={s.glowPurple} aria-hidden="true" />
      <div style={s.glowCyan}   aria-hidden="true" />
      <div style={s.gridLines}  aria-hidden="true" />

      {/* ── Floating badges ── */}
      <FloatingBadge
        style={{ ...s.badge1, opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(12px)', transition: 'all 0.7s ease 0.5s' }}
        icon="🏆" text="96% Placement Rate" sub="2024 cohort"
      />
      <FloatingBadge
        style={{ ...s.badge2, opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(12px)', transition: 'all 0.7s ease 0.7s' }}
        icon="⚡" text="Resume scored in 8s" sub="Avg. response time"
      />
      <FloatingBadge
        style={{ ...s.badge3, opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(12px)', transition: 'all 0.7s ease 0.9s' }}
        icon="🎯" text="500+ DSA Problems" sub="Curated for FAANG"
      />

      {/* ── Content ── */}
      <div style={s.inner}>

        {/* -- Top pill -- */}
        <div style={{ ...s.pill, opacity: loaded ? 1 : 0, transform: loaded ? 'scale(1)' : 'scale(0.9)', transition: 'all 0.5s ease 0.1s' }}>
          <span style={s.pillDot} />
          <span>Introducing AI Career Digital Twin</span>
          <span style={s.pillArrow}>→</span>
        </div>

        {/* -- Headline -- */}
        <h1 style={{ ...s.h1, opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(24px)', transition: 'all 0.7s ease 0.2s' }}>
          Land Your{' '}
          <span style={s.gradText}>
            {typed}
            <span style={s.cursor}>|</span>
          </span>
          <br />
          with AI as Your{' '}
          <span style={s.underlineText}>Copilot</span>
        </h1>

        {/* -- Subheadline -- */}
        <p style={{ ...s.sub, opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.7s ease 0.35s' }}>
          10 AI-powered tools — resume analysis, mock interviews, ATS matching,
          coding practice, job recommendations and more — unified in one platform
          built for ambitious professionals.
        </p>

        {/* -- CTA buttons -- */}
        <div style={{ ...s.ctaRow, opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(16px)', transition: 'all 0.7s ease 0.45s' }}>
          <CTAButton href="/register" primary>
            Get Started Free
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </CTAButton>
          <CTAButton href="#features" primary={false}>
            See How It Works
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7"/></svg>
          </CTAButton>
        </div>

        {/* -- Social proof -- */}
        <div style={{ ...s.social, opacity: loaded ? 1 : 0, transition: 'opacity 0.7s ease 0.6s' }}>
          <div style={s.avatarRow}>
            {AVATARS.map((bg, i) => (
              <span key={i} style={{ ...s.avatar, background: bg, marginLeft: i === 0 ? 0 : -10, zIndex: AVATARS.length - i }}>
                {['R', 'A', 'S', 'K', 'P'][i]}
              </span>
            ))}
          </div>
          <div>
            <div style={s.socialCount}>
              <strong style={{ color: '#f8fafc' }}>2.4M+</strong> professionals trust CareerCopilot
            </div>
            <div style={s.socialRating}>
              {'★★★★★'}&nbsp;
              <span style={{ color: '#64748b' }}>4.9/5 from 12,000+ reviews</span>
            </div>
          </div>
        </div>

        {/* -- Logos ticker -- */}
        <div style={{ ...s.logoStrip, opacity: loaded ? 1 : 0, transition: 'opacity 0.7s ease 0.75s' }}>
          <span style={s.logoLabel}>Trusted by pros at</span>
          <div style={s.logoRow}>
            {['Google', 'Microsoft', 'Amazon', 'Flipkart', 'Infosys', 'Wipro', 'Razorpay', 'CRED'].map(c => (
              <span key={c} style={s.logoChip}>{c}</span>
            ))}
          </div>
        </div>

      </div>

      {/* ── Scroll indicator ── */}
      <div style={s.scrollCue} aria-hidden="true">
        <div style={s.scrollLine} />
        <span style={s.scrollText}>Scroll to explore</span>
      </div>
    </section>
  );
}

/* ─── CTA Button ─────────────────────────────────────────── */
function CTAButton({ href, primary, children }) {
  const [hov, setHov] = useState(false);
  return (
    <a
      href={href}
      style={{
        ...(primary ? s.btnPrimary : s.btnOutline),
        ...(primary && hov ? s.btnPrimaryHov : {}),
        ...(!primary && hov ? s.btnOutlineHov : {}),
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {children}
    </a>
  );
}

/* ─── Styles ─────────────────────────────────────────────── */
const s = {
  /* Section */
  section: {
    position: 'relative',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    background: '#030712',
    fontFamily: 'Inter, sans-serif',
    padding: '120px 24px 80px',
  },

  /* Glows */
  glowPurple: {
    position: 'absolute',
    top: '-10%', left: '50%',
    transform: 'translateX(-50%)',
    width: 900, height: 600,
    background: 'radial-gradient(ellipse at center, rgba(124,58,237,0.18) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  glowCyan: {
    position: 'absolute',
    bottom: '-5%', right: '-5%',
    width: 600, height: 500,
    background: 'radial-gradient(ellipse at center, rgba(6,182,212,0.12) 0%, transparent 70%)',
    pointerEvents: 'none',
  },

  /* Grid overlay */
  gridLines: {
    position: 'absolute', inset: 0,
    backgroundImage:
      'linear-gradient(rgba(148,163,184,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.035) 1px, transparent 1px)',
    backgroundSize: '60px 60px',
    pointerEvents: 'none',
  },

  /* Floating badges */
  floatBadge: {
    position: 'absolute',
    display: 'flex', alignItems: 'center', gap: 10,
    background: 'rgba(15,23,42,0.85)',
    border: '1px solid rgba(148,163,184,0.15)',
    borderRadius: 14,
    padding: '10px 16px',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
    zIndex: 10,
  },
  badge1: { top: '18%',  left: '6%',  animation: 'float1 6s ease-in-out infinite' },
  badge2: { top: '22%',  right: '6%', animation: 'float2 7s ease-in-out infinite' },
  badge3: { bottom: '18%', right: '5%', animation: 'float1 8s ease-in-out infinite reverse' },
  floatIcon: { fontSize: 22 },
  floatText: { fontSize: 13, fontWeight: 700, color: '#f8fafc' },
  floatSub:  { fontSize: 11, color: '#64748b', marginTop: 1 },

  /* Inner */
  inner: {
    position: 'relative', zIndex: 5,
    maxWidth: 820,
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', textAlign: 'center',
    gap: 28,
  },

  /* Pill */
  pill: {
    display: 'inline-flex', alignItems: 'center', gap: 8,
    padding: '7px 18px', borderRadius: 999,
    background: 'rgba(124,58,237,0.12)',
    border: '1px solid rgba(124,58,237,0.3)',
    color: '#a78bfa', fontSize: 13, fontWeight: 600,
    cursor: 'default',
  },
  pillDot: {
    width: 7, height: 7, borderRadius: '50%',
    background: '#a78bfa',
    boxShadow: '0 0 6px #a78bfa',
    animation: 'pulse 2s ease-in-out infinite',
  },
  pillArrow: { opacity: 0.7 },

  /* Headline */
  h1: {
    fontSize: 'clamp(36px, 6vw, 72px)',
    fontWeight: 900,
    lineHeight: 1.1,
    letterSpacing: '-0.035em',
    color: '#f8fafc',
    margin: 0,
  },
  gradText: {
    background: 'linear-gradient(135deg, #a78bfa 0%, #22d3ee 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  cursor: {
    display: 'inline-block',
    animation: 'blink 1s step-end infinite',
    WebkitTextFillColor: '#a78bfa',
  },
  underlineText: {
    position: 'relative',
    display: 'inline-block',
    color: '#f8fafc',
    /* SVG underline added via pseudo would need CSS class; kept simple here */
    textDecoration: 'underline',
    textDecorationColor: 'rgba(124,58,237,0.6)',
    textDecorationThickness: 3,
    textUnderlineOffset: 6,
  },

  /* Sub */
  sub: {
    fontSize: 'clamp(15px, 2vw, 19px)',
    color: '#94a3b8',
    lineHeight: 1.75,
    maxWidth: 640,
    margin: 0,
  },

  /* CTA */
  ctaRow: {
    display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center',
  },
  btnPrimary: {
    display: 'inline-flex', alignItems: 'center', gap: 8,
    padding: '14px 32px', borderRadius: 12,
    background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
    color: '#fff', fontSize: 15, fontWeight: 700,
    textDecoration: 'none',
    boxShadow: '0 0 30px rgba(124,58,237,0.4)',
    transition: 'all 0.2s ease',
  },
  btnPrimaryHov: {
    transform: 'translateY(-2px)',
    boxShadow: '0 0 44px rgba(124,58,237,0.55)',
  },
  btnOutline: {
    display: 'inline-flex', alignItems: 'center', gap: 8,
    padding: '14px 32px', borderRadius: 12,
    border: '1px solid rgba(148,163,184,0.25)',
    background: 'rgba(30,41,59,0.4)',
    color: '#cbd5e1', fontSize: 15, fontWeight: 600,
    textDecoration: 'none',
    backdropFilter: 'blur(8px)',
    transition: 'all 0.2s ease',
  },
  btnOutlineHov: {
    borderColor: 'rgba(124,58,237,0.5)',
    background: 'rgba(124,58,237,0.08)',
    color: '#f8fafc',
    transform: 'translateY(-2px)',
  },

  /* Social proof */
  social: {
    display: 'flex', alignItems: 'center', gap: 14,
  },
  avatarRow: { display: 'flex', alignItems: 'center' },
  avatar: {
    width: 34, height: 34, borderRadius: '50%',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 12, fontWeight: 800, color: '#fff',
    border: '2px solid #030712',
    flexShrink: 0,
  },
  socialCount: { fontSize: 13, color: '#94a3b8', fontWeight: 500 },
  socialRating: { fontSize: 12, color: '#f59e0b', marginTop: 2 },

  /* Logo strip */
  logoStrip: {
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12,
    width: '100%',
  },
  logoLabel: { fontSize: 11, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 },
  logoRow: {
    display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 8,
  },
  logoChip: {
    padding: '5px 16px',
    background: 'rgba(30,41,59,0.5)',
    border: '1px solid rgba(148,163,184,0.12)',
    borderRadius: 999,
    color: '#475569',
    fontSize: 12, fontWeight: 600,
  },

  /* Scroll cue */
  scrollCue: {
    position: 'absolute', bottom: 32, left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
    zIndex: 5,
    animation: 'fadeInUp 1s ease 1.2s both',
  },
  scrollLine: {
    width: 1, height: 48,
    background: 'linear-gradient(180deg, rgba(124,58,237,0.6), transparent)',
    animation: 'scrollPulse 2s ease-in-out infinite',
  },
  scrollText: {
    fontSize: 10, color: '#475569', letterSpacing: '0.12em',
    textTransform: 'uppercase', fontWeight: 600,
  },
};

/* ─── Keyframes injected once ────────────────────────────── */
if (typeof document !== 'undefined' && !document.getElementById('hero-kf')) {
  const style = document.createElement('style');
  style.id = 'hero-kf';
  style.textContent = `
    @keyframes blink       { 0%,100%{opacity:1} 50%{opacity:0} }
    @keyframes pulse       { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.6;transform:scale(0.85)} }
    @keyframes float1      { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-10px)} }
    @keyframes float2      { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-14px)} }
    @keyframes fadeInUp    { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
    @keyframes scrollPulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
    @media (max-width:900px){
      .hero-badge1,.hero-badge2,.hero-badge3{display:none}
    }
  `;
  document.head.appendChild(style);
}
