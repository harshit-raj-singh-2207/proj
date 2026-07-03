import React, { useState } from 'react';

/* ─── Mock Data ─────────────────────────────────────────── */
const SKILLS = [
  { name: 'React',       value: 85 },
  { name: 'Node.js',     value: 72 },
  { name: 'Python',      value: 65 },
  { name: 'SQL',         value: 78 },
  { name: 'System Design',value: 55 },
  { name: 'DSA',         value: 70 },
  { name: 'Leadership',  value: 58 },
  { name: 'Communication',value: 88 },
];

const SCENARIOS = [
  { id: 1, title: 'Current Path',      role: 'Senior Frontend Dev', salary: '₹28L', match: 78, time: '18 mo', color: '#22c55e' },
  { id: 2, title: 'Full-Stack Pivot',  role: 'Full Stack Engineer', salary: '₹34L', match: 62, time: '24 mo', color: '#06b6d4' },
  { id: 3, title: 'Data Science Shift',role: 'ML Engineer',         salary: '₹42L', match: 40, time: '36 mo', color: '#a78bfa' },
];

const INSIGHTS = [
  { icon: '🎯', tag: 'Strength',   text: 'React skills rank in top 15% of candidates in your region.', clr: '#22c55e' },
  { icon: '⚠️', tag: 'Gap',        text: 'System Design is your weakest area — 4 hrs/week for 3 months will close the gap.', clr: '#f59e0b' },
  { icon: '🚀', tag: 'Opportunity',text: 'Adding an AWS certification could boost salary potential by ~22%.', clr: '#06b6d4' },
  { icon: '📈', tag: 'Growth',     text: 'Leadership skills gap detected — consider a tech-lead mentorship program.', clr: '#a78bfa' },
];

const MARKET = [
  { label: 'Job Market Fit',    value: 74 },
  { label: 'Salary Positioning',value: 68 },
  { label: 'Skill Completeness',value: 71 },
  { label: 'Interview Readiness',value: 58 },
];

/* ─── SVG Radar Chart ───────────────────────────────────── */
const CX = 130, CY = 130, R = 100;
const angle = (i, n) => (-Math.PI / 2) + (2 * Math.PI * i / n);
const pt    = (i, n, pct) => ({
  x: CX + R * pct * Math.cos(angle(i, n)),
  y: CY + R * pct * Math.sin(angle(i, n)),
});
const toPoly = pts => pts.map(p => `${p.x},${p.y}`).join(' ');

function RadarChart({ skills }) {
  const n = skills.length;
  const levels = [0.25, 0.5, 0.75, 1];
  const skillPts = skills.map((s, i) => pt(i, n, s.value / 100));
  const axes     = skills.map((_, i) => ({ from: { x: CX, y: CY }, to: pt(i, n, 1) }));
  const labels   = skills.map((s, i) => {
    const p = pt(i, n, 1.22);
    return { ...p, name: s.name, value: s.value };
  });

  return (
    <svg viewBox="0 0 260 260" width="100%" style={{ maxWidth: 280 }}>
      {/* Grid polygons */}
      {levels.map((lvl, li) => (
        <polygon key={li}
          points={toPoly(skills.map((_, i) => pt(i, n, lvl)))}
          fill="none" stroke="rgba(148,163,184,0.15)" strokeWidth="1" />
      ))}
      {/* Axis spokes */}
      {axes.map((a, i) => (
        <line key={i} x1={a.from.x} y1={a.from.y} x2={a.to.x} y2={a.to.y}
          stroke="rgba(148,163,184,0.15)" strokeWidth="1" />
      ))}
      {/* Skill polygon fill */}
      <polygon points={toPoly(skillPts)}
        fill="rgba(124,58,237,0.2)" stroke="#7c3aed" strokeWidth="2" strokeLinejoin="round" />
      {/* Skill dots */}
      {skillPts.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="4" fill="#8b5cf6" stroke="#030712" strokeWidth="1.5" />
      ))}
      {/* Labels */}
      {labels.map((l, i) => (
        <text key={i} x={l.x} y={l.y}
          textAnchor="middle" dominantBaseline="middle"
          fontSize="9" fontFamily="Inter,sans-serif" fill="#94a3b8" fontWeight="600">
          {l.name}
        </text>
      ))}
    </svg>
  );
}

/* ─── Component ─────────────────────────────────────────── */
export default function DigitalTwin() {
  const [activeScenario, setActiveScenario] = useState(1);
  const active = SCENARIOS.find(s => s.id === activeScenario);

  return (
    <div style={{ fontFamily: 'Inter,sans-serif', color: '#f8fafc', padding: '0 0 40px' }}>

      {/* ── Page Header ── */}
      <div style={s.header}>
        <div>
          <h1 style={s.title}>AI Career Digital Twin</h1>
          <p style={s.subtitle}>A living simulation of your career — powered by AI</p>
        </div>
        <div style={s.syncBadge}>🔄 Last synced: just now</div>
      </div>

      {/* ── Identity Card ── */}
      <div style={s.identityCard}>
        <div style={s.avatar}>AJ</div>
        <div style={{ flex: 1 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>Arjun Joshi</h2>
          <p style={{ color: '#94a3b8', fontSize: 13, marginBottom: 12 }}>Frontend Developer · 2.5 yrs exp · Bangalore</p>
          <div style={s.quickStats}>
            {[['Market Fit', '74%'], ['Skills', `${SKILLS.length} tracked`], ['Paths Sim.', '3 active'], ['AI Score', '8.2/10']].map(([k, v]) => (
              <div key={k} style={s.qStat}>
                <span style={s.qVal}>{v}</span>
                <span style={s.qKey}>{k}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={s.twinGlow}>
          <div style={s.twinScore}>74</div>
          <div style={{ fontSize: 11, color: '#94a3b8', textAlign: 'center' }}>Digital Twin<br />Score</div>
        </div>
      </div>

      {/* ── Main Grid ── */}
      <div style={s.mainGrid}>

        {/* Radar Chart */}
        <div style={s.card}>
          <h3 style={s.cardTitle}>Skill Radar</h3>
          <p style={s.cardSub}>Proficiency across 8 dimensions</p>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 8 }}>
            <RadarChart skills={SKILLS} />
          </div>
          <div style={s.skillLegend}>
            {SKILLS.slice(0, 4).map(sk => (
              <div key={sk.name} style={s.legendRow}>
                <span style={{ color: '#94a3b8', fontSize: 11 }}>{sk.name}</span>
                <div style={s.miniBar}>
                  <div style={{ ...s.miniBarFill, width: `${sk.value}%` }} />
                </div>
                <span style={{ color: '#a78bfa', fontSize: 11, fontWeight: 700 }}>{sk.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Career Scenarios */}
        <div style={s.card}>
          <h3 style={s.cardTitle}>Career Simulation</h3>
          <p style={s.cardSub}>Click a scenario to explore outcomes</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 16 }}>
            {SCENARIOS.map(sc => (
              <button key={sc.id} onClick={() => setActiveScenario(sc.id)}
                style={{ ...s.scenarioBtn, ...(activeScenario === sc.id ? { borderColor: sc.color, background: `${sc.color}18` } : {}) }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: activeScenario === sc.id ? sc.color : '#f8fafc' }}>{sc.title}</div>
                    <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 2 }}>{sc.role}</div>
                  </div>
                  <span style={{ fontSize: 14, fontWeight: 800, color: sc.color }}>{sc.salary}</span>
                </div>
                <div style={s.probRow}>
                  <div style={s.probTrack}>
                    <div style={{ ...s.probFill, width: `${sc.match}%`, background: sc.color }} />
                  </div>
                  <span style={{ fontSize: 11, color: '#64748b', whiteSpace: 'nowrap' }}>{sc.match}% match · {sc.time}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Scenario Detail */}
          {active && (
            <div style={{ ...s.scenarioDetail, borderColor: active.color }}>
              <div style={{ color: active.color, fontWeight: 700, fontSize: 13, marginBottom: 8 }}>
                📊 {active.title} Projection
              </div>
              <div style={s.detailGrid}>
                {[['Target Role', active.role], ['Est. Salary', active.salary], ['Timeline', active.time], ['Probability', `${active.match}%`]].map(([k, v]) => (
                  <div key={k}>
                    <div style={{ color: '#64748b', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{k}</div>
                    <div style={{ color: '#f8fafc', fontWeight: 700, fontSize: 14, marginTop: 2 }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Market Positioning ── */}
      <div style={s.card}>
        <h3 style={s.cardTitle}>Market Positioning</h3>
        <div style={s.marketGrid}>
          {MARKET.map(m => (
            <div key={m.label} style={s.marketItem}>
              <div style={s.marketHeader}>
                <span style={{ fontSize: 12, color: '#94a3b8' }}>{m.label}</span>
                <span style={{ fontSize: 14, fontWeight: 800, color: m.value >= 70 ? '#22c55e' : m.value >= 55 ? '#f59e0b' : '#ef4444' }}>{m.value}%</span>
              </div>
              <div style={s.mTrack}>
                <div style={{
                  ...s.mFill,
                  width: `${m.value}%`,
                  background: m.value >= 70 ? 'linear-gradient(90deg,#22c55e,#4ade80)' : m.value >= 55 ? 'linear-gradient(90deg,#f59e0b,#fbbf24)' : 'linear-gradient(90deg,#ef4444,#f87171)'
                }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── AI Insights ── */}
      <div style={s.card}>
        <h3 style={s.cardTitle}>AI Insights</h3>
        <p style={s.cardSub}>Generated from your profile, activity & market data</p>
        <div style={s.insightsGrid}>
          {INSIGHTS.map((ins, i) => (
            <div key={i} style={{ ...s.insightCard, borderColor: `${ins.clr}40`, background: `${ins.clr}0d` }}>
              <div style={s.insightTop}>
                <span style={{ fontSize: 18 }}>{ins.icon}</span>
                <span style={{ ...s.insightTag, color: ins.clr, borderColor: `${ins.clr}50`, background: `${ins.clr}15` }}>{ins.tag}</span>
              </div>
              <p style={{ fontSize: 13, color: '#cbd5e1', lineHeight: 1.6, margin: 0 }}>{ins.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Skill Gaps ── */}
      <div style={s.card}>
        <h3 style={s.cardTitle}>Skill Breakdown</h3>
        <div style={s.gapGrid}>
          {SKILLS.map(sk => (
            <div key={sk.name} style={s.gapRow}>
              <span style={{ fontSize: 12, color: '#94a3b8', width: 120, flexShrink: 0 }}>{sk.name}</span>
              <div style={s.gapTrack}>
                <div style={{
                  ...s.gapFill,
                  width: `${sk.value}%`,
                  background: sk.value >= 80 ? 'linear-gradient(90deg,#22c55e,#4ade80)' :
                               sk.value >= 65 ? 'linear-gradient(90deg,#7c3aed,#8b5cf6)' :
                               'linear-gradient(90deg,#f59e0b,#fbbf24)',
                }} />
              </div>
              <span style={{ fontSize: 12, fontWeight: 700, width: 36, textAlign: 'right',
                color: sk.value >= 80 ? '#22c55e' : sk.value >= 65 ? '#a78bfa' : '#f59e0b' }}>
                {sk.value}%
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

/* ─── Styles ────────────────────────────────────────────── */
const s = {
  header:   { display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:24 },
  title:    { fontSize:26, fontWeight:800, letterSpacing:'-0.03em', marginBottom:4 },
  subtitle: { color:'#64748b', fontSize:13, margin:0 },
  syncBadge:{ background:'rgba(6,182,212,0.1)', border:'1px solid rgba(6,182,212,0.3)', color:'#22d3ee', padding:'6px 14px', borderRadius:999, fontSize:12, fontWeight:600, whiteSpace:'nowrap' },

  identityCard: { background:'#0f172a', border:'1px solid rgba(148,163,184,0.12)', borderRadius:16, padding:'24px', display:'flex', alignItems:'center', gap:24, marginBottom:24 },
  avatar: { width:72, height:72, borderRadius:999, background:'linear-gradient(135deg,#7c3aed,#06b6d4)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:24, fontWeight:900, color:'#fff', flexShrink:0 },
  quickStats: { display:'flex', gap:24 },
  qStat: { display:'flex', flexDirection:'column', gap:2 },
  qVal: { fontSize:18, fontWeight:800, color:'#f8fafc' },
  qKey: { fontSize:10, color:'#64748b', textTransform:'uppercase', letterSpacing:'0.06em' },
  twinGlow: { display:'flex', flexDirection:'column', alignItems:'center', gap:8, padding:'16px 24px', background:'rgba(124,58,237,0.1)', border:'1px solid rgba(124,58,237,0.3)', borderRadius:12 },
  twinScore:{ fontSize:36, fontWeight:900, background:'linear-gradient(135deg,#a78bfa,#22d3ee)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' },

  mainGrid: { display:'grid', gridTemplateColumns:'1fr 1fr', gap:20, marginBottom:20 },
  card:     { background:'#0f172a', border:'1px solid rgba(148,163,184,0.12)', borderRadius:16, padding:24, marginBottom:20 },
  cardTitle:{ fontSize:16, fontWeight:700, marginBottom:4 },
  cardSub:  { fontSize:12, color:'#64748b', margin:0 },

  skillLegend: { marginTop:12, display:'flex', flexDirection:'column', gap:8 },
  legendRow:   { display:'flex', alignItems:'center', gap:8 },
  miniBar:     { flex:1, height:4, background:'rgba(148,163,184,0.1)', borderRadius:999, overflow:'hidden' },
  miniBarFill: { height:'100%', background:'linear-gradient(90deg,#7c3aed,#06b6d4)', borderRadius:999, transition:'width 1s ease' },

  scenarioBtn:  { background:'rgba(30,41,59,0.5)', border:'1px solid rgba(148,163,184,0.15)', borderRadius:12, padding:'14px 16px', cursor:'pointer', textAlign:'left', transition:'all 200ms ease' },
  probRow:      { display:'flex', alignItems:'center', gap:10 },
  probTrack:    { flex:1, height:4, background:'rgba(148,163,184,0.1)', borderRadius:999, overflow:'hidden' },
  probFill:     { height:'100%', borderRadius:999, transition:'width 1s ease' },
  scenarioDetail:{ marginTop:16, padding:16, borderRadius:12, border:'1px solid', background:'rgba(30,41,59,0.4)' },
  detailGrid:   { display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 },

  marketGrid:  { display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginTop:16 },
  marketItem:  { display:'flex', flexDirection:'column', gap:8 },
  marketHeader:{ display:'flex', justifyContent:'space-between', alignItems:'center' },
  mTrack:      { height:6, background:'rgba(148,163,184,0.1)', borderRadius:999, overflow:'hidden' },
  mFill:       { height:'100%', borderRadius:999, transition:'width 1s ease' },

  insightsGrid:{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, marginTop:16 },
  insightCard: { padding:16, borderRadius:12, border:'1px solid', display:'flex', flexDirection:'column', gap:10 },
  insightTop:  { display:'flex', alignItems:'center', gap:10 },
  insightTag:  { fontSize:11, fontWeight:700, padding:'3px 10px', borderRadius:999, border:'1px solid', letterSpacing:'0.04em' },

  gapGrid: { display:'flex', flexDirection:'column', gap:12, marginTop:16 },
  gapRow:  { display:'flex', alignItems:'center', gap:12 },
  gapTrack:{ flex:1, height:6, background:'rgba(148,163,184,0.1)', borderRadius:999, overflow:'hidden' },
  gapFill: { height:'100%', borderRadius:999, transition:'width 1s ease' },
};
