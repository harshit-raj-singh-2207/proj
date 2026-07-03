import React, { useState } from 'react';

/* ── Data ─────────────────────────────────────────────────── */
const STATS = [
  { icon:'💼', label:'Active Roles',      value:'12',    delta:'+3 this week',   up:true  },
  { icon:'👥', label:'Total Applicants',  value:'1,847', delta:'+214 today',     up:true  },
  { icon:'🤖', label:'AI Screened',       value:'1,204', delta:'65% auto-scored', up:null },
  { icon:'✅', label:'Offers Extended',   value:'34',    delta:'+8 this month',  up:true  },
];

const JOBS = [
  { id:1, title:'Senior Frontend Engineer',  dept:'Engineering', applicants:142, stage:'Active',  match:94, posted:'2d ago',  salary:'₹28–40 LPA' },
  { id:2, title:'Product Manager – Growth',  dept:'Product',     applicants:89,  stage:'Active',  match:88, posted:'5d ago',  salary:'₹25–35 LPA' },
  { id:3, title:'ML Engineer – NLP',         dept:'AI/ML',       applicants:67,  stage:'Active',  match:91, posted:'1w ago',  salary:'₹30–45 LPA' },
  { id:4, title:'DevOps / SRE Lead',         dept:'Infra',       applicants:44,  stage:'Draft',   match:0,  posted:'—',       salary:'₹22–32 LPA' },
  { id:5, title:'UX Designer – Mobile',      dept:'Design',      applicants:203, stage:'Closed',  match:0,  posted:'3w ago',  salary:'₹15–22 LPA' },
  { id:6, title:'Backend Engineer (Go)',      dept:'Engineering', applicants:118, stage:'Active',  match:87, posted:'3d ago',  salary:'₹24–38 LPA' },
];

const CANDIDATES = [
  { name:'Priya Sharma',  role:'Sr. Frontend Eng.',  score:96, status:'Shortlisted', avatar:'PS', bg:'linear-gradient(135deg,#7c3aed,#8b5cf6)', skills:['React','TypeScript','System Design'] },
  { name:'Arjun Mehta',   role:'ML Engineer',         score:93, status:'Interview',   avatar:'AM', bg:'linear-gradient(135deg,#06b6d4,#22d3ee)', skills:['Python','NLP','PyTorch'] },
  { name:'Sneha Kapoor',  role:'Product Manager',     score:89, status:'Shortlisted', avatar:'SK', bg:'linear-gradient(135deg,#ec4899,#f472b6)', skills:['Roadmapping','SQL','Figma'] },
  { name:'Rohan Verma',   role:'Backend (Go)',         score:85, status:'New',         avatar:'RV', bg:'linear-gradient(135deg,#22c55e,#4ade80)', skills:['Go','Kubernetes','gRPC'] },
  { name:'Divya Nair',    role:'DevOps Lead',          score:82, status:'New',         avatar:'DN', bg:'linear-gradient(135deg,#f59e0b,#fbbf24)', skills:['Terraform','AWS','CI/CD'] },
  { name:'Karan Singh',   role:'UX Designer',          score:79, status:'Rejected',    avatar:'KS', bg:'linear-gradient(135deg,#ef4444,#f87171)', skills:['Figma','Prototyping','iOS'] },
];

const PIPELINE = ['New','Shortlisted','Interview','Offer','Rejected'];
const STATUS_COLOR = { New:'#64748b', Shortlisted:'#7c3aed', Interview:'#06b6d4', Offer:'#22c55e', Rejected:'#ef4444' };

const TABS = ['Job Postings','Candidate Pipeline','AI Screening','Analytics'];

/* ── Sub-components ──────────────────────────────────────── */
function StatCard({ s }) {
  return (
    <div style={st.statCard}>
      <span style={st.statIcon}>{s.icon}</span>
      <div style={st.statVal}>{s.value}</div>
      <div style={st.statLabel}>{s.label}</div>
      <div style={{ ...st.statDelta, color: s.up ? '#22c55e' : s.up===false ? '#ef4444' : '#64748b' }}>{s.delta}</div>
    </div>
  );
}

function JobRow({ j, selected, onSelect }) {
  const stageColor = { Active:'#22c55e', Draft:'#f59e0b', Closed:'#ef4444' }[j.stage];
  return (
    <div onClick={() => onSelect(j.id)} style={{ ...st.jobRow, background: selected ? 'rgba(124,58,237,0.08)' : 'transparent',
      borderColor: selected ? 'rgba(124,58,237,0.35)' : 'rgba(148,163,184,0.1)' }}>
      <div style={{ flex:1 }}>
        <div style={st.jobTitle}>{j.title}</div>
        <div style={st.jobMeta}>{j.dept} · {j.salary} · {j.posted}</div>
      </div>
      <div style={{ display:'flex', alignItems:'center', gap:20 }}>
        <div style={{ textAlign:'right' }}>
          <div style={{ fontSize:13, color:'#f8fafc', fontWeight:700 }}>{j.applicants}</div>
          <div style={{ fontSize:11, color:'#64748b' }}>Applicants</div>
        </div>
        {j.stage === 'Active' && (
          <div style={{ textAlign:'right' }}>
            <div style={{ fontSize:13, color:'#a78bfa', fontWeight:700 }}>{j.match}%</div>
            <div style={{ fontSize:11, color:'#64748b' }}>AI Match</div>
          </div>
        )}
        <span style={{ ...st.badge, background:`${stageColor}20`, color:stageColor, borderColor:`${stageColor}40` }}>{j.stage}</span>
        <button style={st.actionBtn}>View →</button>
      </div>
    </div>
  );
}

function CandidateCard({ c }) {
  const sc = STATUS_COLOR[c.status];
  return (
    <div style={st.cCard}>
      <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:14 }}>
        <div style={{ ...st.cAvatar, background:c.bg }}>{c.avatar}</div>
        <div style={{ flex:1 }}>
          <div style={st.cName}>{c.name}</div>
          <div style={st.cRole}>{c.role}</div>
        </div>
        <div style={{ textAlign:'right' }}>
          <div style={{ fontSize:20, fontWeight:900, color: c.score>=90?'#22c55e':c.score>=80?'#f59e0b':'#ef4444' }}>{c.score}</div>
          <div style={{ fontSize:10, color:'#64748b' }}>AI Score</div>
        </div>
      </div>
      <div style={{ display:'flex', flexWrap:'wrap', gap:6, marginBottom:14 }}>
        {c.skills.map(sk => <span key={sk} style={st.skillChip}>{sk}</span>)}
      </div>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <span style={{ ...st.badge, background:`${sc}18`, color:sc, borderColor:`${sc}40` }}>{c.status}</span>
        <div style={{ display:'flex', gap:8 }}>
          <button style={st.iconBtn} title="Schedule">📅</button>
          <button style={st.iconBtn} title="Message">💬</button>
          <button style={{ ...st.actionBtn, fontSize:12 }}>Profile →</button>
        </div>
      </div>
    </div>
  );
}

function PipelineView() {
  const grouped = Object.fromEntries(PIPELINE.map(s => [s, CANDIDATES.filter(c => c.status === s)]));
  return (
    <div style={{ display:'flex', gap:16, overflowX:'auto', paddingBottom:8 }}>
      {PIPELINE.map(col => (
        <div key={col} style={st.pipeCol}>
          <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:14 }}>
            <span style={{ width:10, height:10, borderRadius:'50%', background:STATUS_COLOR[col], display:'inline-block', flexShrink:0 }} />
            <span style={{ fontSize:12, fontWeight:700, color:'#94a3b8', textTransform:'uppercase', letterSpacing:'0.06em' }}>{col}</span>
            <span style={{ marginLeft:'auto', fontSize:11, color:'#475569', background:'rgba(30,41,59,0.8)', padding:'2px 8px', borderRadius:999 }}>{grouped[col]?.length || 0}</span>
          </div>
          {(grouped[col] || []).map(c => (
            <div key={c.name} style={st.pipeCard}>
              <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:8 }}>
                <div style={{ ...st.cAvatar, width:32, height:32, fontSize:11, background:c.bg }}>{c.avatar}</div>
                <div>
                  <div style={{ fontSize:13, fontWeight:700, color:'#f8fafc' }}>{c.name}</div>
                  <div style={{ fontSize:11, color:'#64748b' }}>{c.role}</div>
                </div>
              </div>
              <div style={{ fontSize:12, color: c.score>=90?'#22c55e':c.score>=80?'#f59e0b':'#94a3b8', fontWeight:700 }}>
                AI Score: {c.score}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function AIScreening() {
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
      <div style={st.aiHeader}>
        <div>
          <h3 style={{ color:'#f8fafc', fontSize:16, fontWeight:800, margin:0 }}>AI Screening Results</h3>
          <p style={{ color:'#64748b', fontSize:13, margin:'4px 0 0' }}>Candidates ranked by composite AI score across 8 dimensions</p>
        </div>
        <button style={st.primaryBtn}>Export CSV</button>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))', gap:16 }}>
        {CANDIDATES.sort((a,b) => b.score - a.score).map((c,i) => (
          <div key={c.name} style={st.aiCard}>
            <div style={{ display:'flex', alignItems:'center', gap:3, marginBottom:14 }}>
              <span style={{ fontSize:11, color:'#475569', fontWeight:700, minWidth:20 }}>#{i+1}</span>
              <div style={{ ...st.cAvatar, width:36, height:36, fontSize:12, background:c.bg }}>{c.avatar}</div>
              <div style={{ flex:1, marginLeft:8 }}>
                <div style={{ fontSize:14, fontWeight:700, color:'#f8fafc' }}>{c.name}</div>
                <div style={{ fontSize:12, color:'#64748b' }}>{c.role}</div>
              </div>
              <div style={{ fontSize:24, fontWeight:900, color: c.score>=90?'#22c55e':c.score>=80?'#f59e0b':'#94a3b8' }}>{c.score}</div>
            </div>
            {[['Skills Match','92%','#7c3aed'],['Experience Fit','88%','#06b6d4'],['Culture Score','85%','#22c55e'],['Communication','79%','#f59e0b']].map(([label, pct, col]) => (
              <div key={label} style={{ marginBottom:8 }}>
                <div style={{ display:'flex', justifyContent:'space-between', marginBottom:4 }}>
                  <span style={{ fontSize:11, color:'#64748b' }}>{label}</span>
                  <span style={{ fontSize:11, color:'#94a3b8', fontWeight:600 }}>{pct}</span>
                </div>
                <div style={{ height:4, background:'rgba(30,41,59,0.8)', borderRadius:99 }}>
                  <div style={{ height:'100%', width:pct, background:col, borderRadius:99, transition:'width 0.6s ease' }} />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function Analytics() {
  const metrics = [
    { label:'Time to Hire (avg)',      value:'18 days',  note:'↓ 3 days vs last month', color:'#22c55e' },
    { label:'Offer Acceptance Rate',   value:'74%',       note:'↑ 6% vs last month',    color:'#22c55e' },
    { label:'Cost per Hire',           value:'₹42,000',  note:'↓ ₹8k vs last month',    color:'#22c55e' },
    { label:'Candidate Drop-off Rate', value:'22%',       note:'↑ 2% — needs attention', color:'#ef4444' },
  ];
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:24 }}>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))', gap:16 }}>
        {metrics.map(m => (
          <div key={m.label} style={st.metricCard}>
            <div style={{ fontSize:11, color:'#64748b', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:8 }}>{m.label}</div>
            <div style={{ fontSize:28, fontWeight:900, color:'#f8fafc', letterSpacing:'-0.03em', marginBottom:6 }}>{m.value}</div>
            <div style={{ fontSize:12, color:m.color, fontWeight:600 }}>{m.note}</div>
          </div>
        ))}
      </div>
      <div style={st.chartBox}>
        <h4 style={{ color:'#f8fafc', fontSize:15, fontWeight:800, marginBottom:20 }}>Applications by Department (Last 30 Days)</h4>
        {[['Engineering',142,0.72,'#7c3aed'],['Product',89,0.45,'#06b6d4'],['AI/ML',67,0.34,'#22c55e'],['Design',203,1,'#ec4899'],['Infra',44,0.22,'#f59e0b']].map(([dept,count,pct,col]) => (
          <div key={dept} style={{ marginBottom:14 }}>
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:6 }}>
              <span style={{ fontSize:13, color:'#94a3b8' }}>{dept}</span>
              <span style={{ fontSize:13, fontWeight:700, color:'#f8fafc' }}>{count}</span>
            </div>
            <div style={{ height:8, background:'rgba(30,41,59,0.8)', borderRadius:99 }}>
              <div style={{ height:'100%', width:`${pct*100}%`, background:col, borderRadius:99 }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Page ─────────────────────────────────────────────────── */
export default function RecruiterArena() {
  const [tab, setTab]   = useState(0);
  const [sel, setSel]   = useState(null);
  const [filter, setFilter] = useState('All');

  const stageFilters = ['All','Active','Draft','Closed'];
  const filteredJobs = filter === 'All' ? JOBS : JOBS.filter(j => j.stage === filter);

  return (
    <div style={st.page}>
      {/* ── Header ── */}
      <div style={st.pageHeader}>
        <div>
          <div style={st.breadcrumb}>Dashboard / <span style={{ color:'#a78bfa' }}>Recruiter Arena</span></div>
          <h1 style={st.pageTitle}>Recruiter Arena</h1>
          <p style={st.pageSubtitle}>AI-powered hiring platform — post roles, screen candidates, hire 3× faster.</p>
        </div>
        <div style={{ display:'flex', gap:12, flexShrink:0 }}>
          <button style={st.outlineBtn}>📥 Import Candidates</button>
          <button style={st.primaryBtn}>+ Post New Role</button>
        </div>
      </div>

      {/* ── Stats ── */}
      <div style={st.statsRow}>
        {STATS.map(s => <StatCard key={s.label} s={s} />)}
      </div>

      {/* ── Tabs ── */}
      <div style={st.tabBar}>
        {TABS.map((t,i) => (
          <button key={t} onClick={() => setTab(i)}
            style={{ ...st.tabBtn, ...(tab===i ? st.tabActive : {}) }}>
            {t}
          </button>
        ))}
      </div>

      {/* ── Tab Content ── */}
      <div style={st.content}>
        {tab === 0 && (
          <>
            <div style={{ display:'flex', gap:8, marginBottom:20, flexWrap:'wrap' }}>
              {stageFilters.map(f => (
                <button key={f} onClick={() => setFilter(f)}
                  style={{ ...st.filterBtn, ...(filter===f ? st.filterActive : {}) }}>{f}</button>
              ))}
              <div style={{ marginLeft:'auto' }}>
                <input placeholder="Search roles…" style={st.searchInput} />
              </div>
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
              {filteredJobs.map(j => <JobRow key={j.id} j={j} selected={sel===j.id} onSelect={setSel} />)}
            </div>
          </>
        )}
        {tab === 1 && <PipelineView />}
        {tab === 2 && <AIScreening />}
        {tab === 3 && <Analytics />}
      </div>
    </div>
  );
}

/* ── Styles ───────────────────────────────────────────────── */
const st = {
  page:      { padding:32, background:'#030712', minHeight:'100vh', fontFamily:'Inter,sans-serif', color:'#f8fafc' },
  pageHeader:{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:24, marginBottom:28, flexWrap:'wrap' },
  breadcrumb:{ fontSize:12, color:'#475569', marginBottom:6 },
  pageTitle: { fontSize:28, fontWeight:900, color:'#f8fafc', letterSpacing:'-0.03em', margin:'0 0 6px' },
  pageSubtitle:{ fontSize:14, color:'#64748b', margin:0 },

  statsRow:  { display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:16, marginBottom:28 },
  statCard:  { background:'#0f172a', border:'1px solid rgba(148,163,184,0.1)', borderRadius:16, padding:24,
               display:'flex', flexDirection:'column', gap:4 },
  statIcon:  { fontSize:24, marginBottom:4 },
  statVal:   { fontSize:28, fontWeight:900, color:'#f8fafc', letterSpacing:'-0.03em', lineHeight:1 },
  statLabel: { fontSize:12, color:'#64748b', fontWeight:600 },
  statDelta: { fontSize:12, fontWeight:600, marginTop:2 },

  tabBar:    { display:'flex', gap:4, marginBottom:24, borderBottom:'1px solid rgba(148,163,184,0.1)', paddingBottom:0 },
  tabBtn:    { padding:'10px 20px', borderRadius:'8px 8px 0 0', border:'none', background:'none',
               color:'#64748b', fontSize:13, fontWeight:600, cursor:'pointer', transition:'all 0.2s ease' },
  tabActive: { background:'rgba(124,58,237,0.12)', color:'#a78bfa', borderBottom:'2px solid #7c3aed' },

  content:   { background:'#0f172a', border:'1px solid rgba(148,163,184,0.1)', borderRadius:16, padding:24 },

  filterBtn: { padding:'6px 16px', borderRadius:999, border:'1px solid rgba(148,163,184,0.15)',
               background:'rgba(30,41,59,0.4)', color:'#94a3b8', fontSize:12, fontWeight:600, cursor:'pointer' },
  filterActive:{ background:'rgba(124,58,237,0.15)', borderColor:'rgba(124,58,237,0.4)', color:'#a78bfa' },
  searchInput:{ background:'rgba(30,41,59,0.6)', border:'1px solid rgba(148,163,184,0.15)', borderRadius:8,
                padding:'7px 14px', color:'#f8fafc', fontSize:13, outline:'none', width:220,
                fontFamily:'Inter,sans-serif' },

  jobRow:    { display:'flex', alignItems:'center', gap:20, padding:'16px 20px',
               border:'1px solid', borderRadius:12, cursor:'pointer', transition:'all 0.2s ease' },
  jobTitle:  { fontSize:14, fontWeight:700, color:'#f8fafc', marginBottom:4 },
  jobMeta:   { fontSize:12, color:'#64748b' },

  badge:     { display:'inline-flex', padding:'3px 10px', borderRadius:999, fontSize:11, fontWeight:700, border:'1px solid' },

  actionBtn: { padding:'7px 14px', borderRadius:8, border:'1px solid rgba(124,58,237,0.4)',
               background:'rgba(124,58,237,0.1)', color:'#a78bfa', fontSize:12, fontWeight:700, cursor:'pointer' },

  cCard:     { background:'rgba(15,23,42,0.8)', border:'1px solid rgba(148,163,184,0.1)',
               borderRadius:16, padding:20, transition:'border-color 0.2s ease' },
  cAvatar:   { width:42, height:42, borderRadius:'50%', display:'flex', alignItems:'center',
               justifyContent:'center', fontSize:14, fontWeight:800, color:'#fff', flexShrink:0 },
  cName:     { fontSize:14, fontWeight:700, color:'#f8fafc' },
  cRole:     { fontSize:12, color:'#64748b', marginTop:2 },
  skillChip: { padding:'3px 10px', background:'rgba(30,41,59,0.8)', border:'1px solid rgba(148,163,184,0.12)',
               borderRadius:999, fontSize:11, color:'#94a3b8', fontWeight:500 },
  iconBtn:   { width:32, height:32, borderRadius:8, border:'1px solid rgba(148,163,184,0.15)',
               background:'rgba(30,41,59,0.5)', cursor:'pointer', fontSize:14 },

  pipeCol:   { minWidth:200, flex:'0 0 200px', background:'rgba(15,23,42,0.6)',
               border:'1px solid rgba(148,163,184,0.08)', borderRadius:12, padding:14 },
  pipeCard:  { background:'#0f172a', border:'1px solid rgba(148,163,184,0.1)',
               borderRadius:10, padding:12, marginBottom:10 },

  aiHeader:  { display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:4, flexWrap:'wrap', gap:12 },
  aiCard:    { background:'rgba(15,23,42,0.8)', border:'1px solid rgba(148,163,184,0.1)', borderRadius:16, padding:20 },

  metricCard:{ background:'#0f172a', border:'1px solid rgba(148,163,184,0.1)', borderRadius:16, padding:24 },
  chartBox:  { background:'#0f172a', border:'1px solid rgba(148,163,184,0.1)', borderRadius:16, padding:28 },

  primaryBtn:{ padding:'10px 20px', borderRadius:10, border:'none',
               background:'linear-gradient(135deg,#7c3aed,#06b6d4)',
               color:'#fff', fontSize:13, fontWeight:700, cursor:'pointer' },
  outlineBtn:{ padding:'10px 20px', borderRadius:10,
               border:'1px solid rgba(148,163,184,0.25)', background:'rgba(30,41,59,0.4)',
               color:'#cbd5e1', fontSize:13, fontWeight:600, cursor:'pointer' },
};
