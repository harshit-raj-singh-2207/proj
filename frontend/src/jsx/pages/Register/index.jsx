import React, { useState } from 'react';

/* ── Constants ───────────────────────────────────────────── */
const ROLES = ['Student / Fresher','Working Professional','Career Switcher','Recruiter / HR','Freelancer'];
const GOALS = [
  { icon:'📄', label:'Improve my Resume' },
  { icon:'🎤', label:'Ace Interviews' },
  { icon:'💻', label:'Coding Practice' },
  { icon:'💼', label:'Find Better Jobs' },
  { icon:'🗺️', label:'Plan Career Path' },
  { icon:'📊', label:'Salary Insights' },
];

const STEPS = ['Account','Profile','Goals'];

/* ── Password strength ───────────────────────────────────── */
function pwStrength(pw) {
  let s = 0;
  if (pw.length >= 8)            s++;
  if (/[A-Z]/.test(pw))          s++;
  if (/[0-9]/.test(pw))          s++;
  if (/[^A-Za-z0-9]/.test(pw))  s++;
  return s; // 0-4
}
const PW_LABELS = ['Too short','Weak','Fair','Good','Strong'];
const PW_COLORS = ['#ef4444','#ef4444','#f59e0b','#22c55e','#22c55e'];

/* ── Step indicator ──────────────────────────────────────── */
function StepDots({ current }) {
  return (
    <div style={s.steps}>
      {STEPS.map((label, i) => {
        const done    = i < current;
        const active  = i === current;
        return (
          <React.Fragment key={label}>
            <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:6 }}>
              <div style={{ ...s.dot,
                background: done ? '#22c55e' : active ? 'linear-gradient(135deg,#7c3aed,#06b6d4)' : 'rgba(30,41,59,0.8)',
                border: active ? 'none' : done ? '2px solid #22c55e' : '2px solid rgba(148,163,184,0.2)',
                boxShadow: active ? '0 0 16px rgba(124,58,237,0.5)' : 'none',
              }}>
                {done ? '✓' : i + 1}
              </div>
              <span style={{ fontSize:11, color: active ? '#a78bfa' : done ? '#22c55e' : '#475569',
                fontWeight: active ? 700 : 500 }}>{label}</span>
            </div>
            {i < STEPS.length - 1 && (
              <div style={{ flex:1, height:2, marginTop:-18,
                background: done ? '#22c55e' : 'rgba(148,163,184,0.12)',
                transition:'background 0.4s ease' }} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

/* ── Step 1 — Account ────────────────────────────────────── */
function StepAccount({ data, setData, errors }) {
  const [show, setShow] = useState(false);
  const [foc, setFoc]   = useState('');
  const strength = pwStrength(data.password);

  return (
    <div style={s.fields}>
      <div style={s.row}>
        <Field label="First Name" id="reg-fname" placeholder="Arjun" value={data.firstName}
          onChange={v => setData(d => ({ ...d, firstName: v }))}
          error={errors.firstName} foc={foc} setFoc={setFoc} />
        <Field label="Last Name" id="reg-lname" placeholder="Sharma" value={data.lastName}
          onChange={v => setData(d => ({ ...d, lastName: v }))}
          error={errors.lastName} foc={foc} setFoc={setFoc} />
      </div>

      <Field label="Email Address" id="reg-email" type="email" placeholder="you@example.com"
        value={data.email} onChange={v => setData(d => ({ ...d, email: v }))}
        error={errors.email} foc={foc} setFoc={setFoc} />

      <div>
        <label style={s.label}>Password</label>
        <div style={{ position:'relative' }}>
          <input id="reg-password" type={show ? 'text' : 'password'} placeholder="Min. 8 characters"
            value={data.password}
            onChange={e => setData(d => ({ ...d, password: e.target.value }))}
            onFocus={() => setFoc('password')} onBlur={() => setFoc('')}
            style={{ ...s.input,
              borderColor: errors.password ? '#ef4444' : foc==='password' ? '#7c3aed' : 'rgba(148,163,184,0.15)',
              boxShadow: foc==='password' ? '0 0 0 3px rgba(124,58,237,0.18)' : 'none',
              paddingRight: 44 }} />
          <button type="button" onClick={() => setShow(v => !v)}
            style={{ position:'absolute', right:12, top:'50%', transform:'translateY(-50%)',
              background:'none', border:'none', color:'#64748b', cursor:'pointer', fontSize:16 }}>
            {show ? '🙈' : '👁'}
          </button>
        </div>
        {data.password && (
          <div style={{ marginTop:8 }}>
            <div style={{ display:'flex', gap:4, marginBottom:4 }}>
              {[0,1,2,3].map(i => (
                <div key={i} style={{ flex:1, height:3, borderRadius:99,
                  background: i < strength ? PW_COLORS[strength] : 'rgba(30,41,59,0.8)',
                  transition:'background 0.3s ease' }} />
              ))}
            </div>
            <span style={{ fontSize:11, color: PW_COLORS[strength] }}>{PW_LABELS[strength]}</span>
          </div>
        )}
        {errors.password && <span style={s.err}>{errors.password}</span>}
      </div>

      <Field label="Confirm Password" id="reg-confirm" type="password" placeholder="Repeat password"
        value={data.confirm} onChange={v => setData(d => ({ ...d, confirm: v }))}
        error={errors.confirm} foc={foc} setFoc={setFoc} />

      <label style={{ display:'flex', alignItems:'flex-start', gap:10, cursor:'pointer' }}>
        <input id="reg-terms" type="checkbox" checked={data.terms}
          onChange={e => setData(d => ({ ...d, terms: e.target.checked }))}
          style={{ marginTop:3, accentColor:'#7c3aed', width:15, height:15 }} />
        <span style={{ fontSize:13, color:'#94a3b8', lineHeight:1.6 }}>
          I agree to the{' '}
          <a href="#" style={{ color:'#a78bfa', textDecoration:'none', fontWeight:600 }}>Terms of Service</a>
          {' '}and{' '}
          <a href="#" style={{ color:'#a78bfa', textDecoration:'none', fontWeight:600 }}>Privacy Policy</a>
        </span>
      </label>
      {errors.terms && <span style={s.err}>{errors.terms}</span>}
    </div>
  );
}

/* ── Step 2 — Profile ────────────────────────────────────── */
function StepProfile({ data, setData, errors }) {
  const [foc, setFoc] = useState('');
  return (
    <div style={s.fields}>
      <div>
        <label style={s.label}>Current Role</label>
        <div style={{ display:'flex', flexWrap:'wrap', gap:8, marginTop:4 }}>
          {ROLES.map(r => (
            <button type="button" key={r} onClick={() => setData(d => ({ ...d, role: r }))}
              style={{ ...s.chip, ...(data.role === r ? s.chipActive : {}) }}>{r}</button>
          ))}
        </div>
        {errors.role && <span style={s.err}>{errors.role}</span>}
      </div>

      <Field label="Job Title / Course" id="reg-jobtitle" placeholder="e.g. Software Engineer / B.Tech CS"
        value={data.jobTitle} onChange={v => setData(d => ({ ...d, jobTitle: v }))}
        error={errors.jobTitle} foc={foc} setFoc={setFoc} />

      <Field label="Location" id="reg-location" placeholder="e.g. Bangalore, India"
        value={data.location} onChange={v => setData(d => ({ ...d, location: v }))}
        error={errors.location} foc={foc} setFoc={setFoc} />

      <div>
        <label style={s.label}>Years of Experience</label>
        <select id="reg-exp" value={data.experience}
          onChange={e => setData(d => ({ ...d, experience: e.target.value }))}
          style={{ ...s.input, color: data.experience ? '#f8fafc' : '#64748b' }}>
          <option value="">Select experience…</option>
          {['0–1 yrs (Fresher)','1–3 yrs','3–5 yrs','5–8 yrs','8–12 yrs','12+ yrs'].map(o => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

/* ── Step 3 — Goals ──────────────────────────────────────── */
function StepGoals({ data, setData, errors }) {
  const toggle = (label) => {
    setData(d => ({
      ...d,
      goals: d.goals.includes(label) ? d.goals.filter(g => g !== label) : [...d.goals, label],
    }));
  };
  return (
    <div style={s.fields}>
      <p style={{ color:'#94a3b8', fontSize:14, lineHeight:1.7, margin:0 }}>
        Choose what you want to achieve — we'll personalise your CareerCopilot experience around your goals.
      </p>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
        {GOALS.map(g => {
          const active = data.goals.includes(g.label);
          return (
            <button type="button" key={g.label} onClick={() => toggle(g.label)}
              style={{ ...s.goalCard, ...(active ? s.goalActive : {}) }}>
              <span style={{ fontSize:24 }}>{g.icon}</span>
              <span style={{ fontSize:13, fontWeight:600, color: active ? '#f8fafc' : '#94a3b8' }}>{g.label}</span>
              {active && <span style={s.goalCheck}>✓</span>}
            </button>
          );
        })}
      </div>
      {errors.goals && <span style={s.err}>{errors.goals}</span>}
      <p style={{ fontSize:12, color:'#475569', textAlign:'center', margin:0 }}>Select at least one goal to continue</p>
    </div>
  );
}

/* ── Reusable Field ──────────────────────────────────────── */
function Field({ label, id, type='text', placeholder, value, onChange, error, foc, setFoc }) {
  return (
    <div>
      <label style={s.label} htmlFor={id}>{label}</label>
      <input id={id} type={type} placeholder={placeholder} value={value}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFoc(id)} onBlur={() => setFoc('')}
        style={{ ...s.input,
          borderColor: error ? '#ef4444' : foc===id ? '#7c3aed' : 'rgba(148,163,184,0.15)',
          boxShadow: foc===id ? '0 0 0 3px rgba(124,58,237,0.18)' : 'none' }} />
      {error && <span style={s.err}>{error}</span>}
    </div>
  );
}

/* ── Main Component ──────────────────────────────────────── */
const INIT = { firstName:'', lastName:'', email:'', password:'', confirm:'', terms:false,
               role:'', jobTitle:'', location:'', experience:'', goals:[] };

export default function Register() {
  const [step, setStep]     = useState(0);
  const [data, setData]     = useState(INIT);
  const [errors, setErrors] = useState({});
  const [done, setDone]     = useState(false);

  const validate = () => {
    const e = {};
    if (step === 0) {
      if (!data.firstName.trim())               e.firstName = 'First name required.';
      if (!data.lastName.trim())                e.lastName  = 'Last name required.';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) e.email = 'Valid email required.';
      if (data.password.length < 8)             e.password  = 'Minimum 8 characters.';
      if (data.password !== data.confirm)       e.confirm   = 'Passwords do not match.';
      if (!data.terms)                          e.terms     = 'You must accept the terms.';
    }
    if (step === 1) {
      if (!data.role)                           e.role     = 'Please select your role.';
      if (!data.jobTitle.trim())                e.jobTitle = 'Job title / course required.';
      if (!data.location.trim())                e.location = 'Location required.';
    }
    if (step === 2) {
      if (data.goals.length === 0)              e.goals = 'Select at least one goal.';
    }
    return e;
  };

  const next = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    if (step < 2) { setStep(s => s + 1); return; }
    /* Final submit */
    localStorage.setItem('cc_user', JSON.stringify({ name:`${data.firstName} ${data.lastName}`, email:data.email }));
    setDone(true);
  };

  if (done) return (
    <div style={s.wrap}>
      <div style={{ ...s.card, textAlign:'center', padding:'56px 40px' }}>
        <div style={{ fontSize:64, marginBottom:20 }}>🎉</div>
        <h2 style={{ color:'#f8fafc', fontSize:26, fontWeight:900, marginBottom:12 }}>
          Welcome, {data.firstName}!
        </h2>
        <p style={{ color:'#94a3b8', fontSize:15, lineHeight:1.7, maxWidth:360, margin:'0 auto 32px' }}>
          Your CareerCopilot account is ready. Let's land that dream role.
        </p>
        <a href="/dashboard" style={s.primaryBtn}>Go to Dashboard →</a>
      </div>
    </div>
  );

  return (
    <div style={s.wrap}>
      {/* Glow */}
      <div style={s.glow} aria-hidden />

      <div style={s.card}>
        {/* Logo */}
        <div style={s.logoRow}>
          <div style={s.logoMark}>CC</div>
          <span style={s.logoText}>CareerCopilot</span>
        </div>

        <h1 style={s.title}>Create your account</h1>
        <p style={s.subtitle}>Join 2.4M+ professionals accelerating their careers with AI</p>

        {/* OAuth */}
        <div style={s.oauthRow}>
          {[['G','#ea4335','Continue with Google'],['in','#0077b5','Continue with LinkedIn']].map(([icon, col, label]) => (
            <button key={label} type="button" style={s.oauthBtn}>
              <span style={{ color:col, fontWeight:900, fontSize:14 }}>{icon}</span>
              <span>{label}</span>
            </button>
          ))}
        </div>

        <div style={s.divider}><span>or register with email</span></div>

        {/* Steps */}
        <StepDots current={step} />

        {/* Content */}
        <form onSubmit={e => { e.preventDefault(); next(); }} style={{ marginTop:28 }}>
          {step === 0 && <StepAccount data={data} setData={setData} errors={errors} />}
          {step === 1 && <StepProfile data={data} setData={setData} errors={errors} />}
          {step === 2 && <StepGoals   data={data} setData={setData} errors={errors} />}

          <div style={s.navRow}>
            {step > 0
              ? <button type="button" onClick={() => setStep(s => s - 1)} style={s.backBtn}>← Back</button>
              : <div />}
            <button id="reg-next" type="submit" style={s.primaryBtn}>
              {step < 2 ? 'Continue →' : '🚀 Create Account'}
            </button>
          </div>
        </form>

        <p style={s.loginNote}>
          Already have an account?{' '}
          <a href="/login" style={{ color:'#a78bfa', fontWeight:700, textDecoration:'none' }}>Sign in</a>
        </p>
      </div>
    </div>
  );
}

/* ── Styles ───────────────────────────────────────────────── */
const s = {
  wrap: {
    minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center',
    background:'#030712', fontFamily:'Inter,sans-serif', padding:'40px 16px', position:'relative', overflow:'hidden',
  },
  glow: {
    position:'fixed', top:'-20%', left:'50%', transform:'translateX(-50%)',
    width:700, height:500, pointerEvents:'none',
    background:'radial-gradient(ellipse,rgba(124,58,237,0.18) 0%,transparent 70%)',
  },
  card: {
    position:'relative', zIndex:2, width:'100%', maxWidth:520,
    background:'rgba(15,23,42,0.9)', border:'1px solid rgba(148,163,184,0.12)',
    borderRadius:24, padding:'40px 36px',
    backdropFilter:'blur(20px)', WebkitBackdropFilter:'blur(20px)',
    boxShadow:'0 24px 80px rgba(0,0,0,0.5)',
    animation:'fadeInUp 0.5s ease both',
  },

  logoRow: { display:'flex', alignItems:'center', gap:10, justifyContent:'center', marginBottom:24 },
  logoMark: { width:36, height:36, borderRadius:10, background:'linear-gradient(135deg,#7c3aed,#06b6d4)',
    display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontWeight:900, fontSize:14 },
  logoText: { color:'#f8fafc', fontWeight:800, fontSize:18, letterSpacing:'-0.02em' },

  title:    { fontSize:22, fontWeight:900, color:'#f8fafc', textAlign:'center', letterSpacing:'-0.03em', marginBottom:6 },
  subtitle: { fontSize:13, color:'#64748b', textAlign:'center', marginBottom:24 },

  oauthRow: { display:'flex', gap:10, marginBottom:20 },
  oauthBtn: {
    flex:1, display:'flex', alignItems:'center', justifyContent:'center', gap:8,
    padding:'10px 16px', borderRadius:10, border:'1px solid rgba(148,163,184,0.18)',
    background:'rgba(30,41,59,0.5)', color:'#cbd5e1', fontSize:13, fontWeight:600, cursor:'pointer',
    transition:'all 0.2s ease',
  },

  divider: {
    display:'flex', alignItems:'center', gap:12, color:'#334155', fontSize:12,
    marginBottom:24,
    '::before': { content:'""', flex:1, height:1, background:'rgba(148,163,184,0.1)' },
  },

  steps: { display:'flex', alignItems:'center', gap:0 },
  dot: {
    width:32, height:32, borderRadius:'50%',
    display:'flex', alignItems:'center', justifyContent:'center',
    fontSize:12, fontWeight:800, color:'#fff', flexShrink:0, transition:'all 0.3s ease',
  },

  fields: { display:'flex', flexDirection:'column', gap:18 },
  row:    { display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 },
  label:  { display:'block', fontSize:12, fontWeight:700, color:'#94a3b8',
    textTransform:'uppercase', letterSpacing:'0.05em', marginBottom:6 },
  input: {
    width:'100%', background:'rgba(30,41,59,0.6)', color:'#f8fafc',
    border:'1px solid rgba(148,163,184,0.15)', borderRadius:10,
    padding:'11px 14px', fontSize:14, fontFamily:'Inter,sans-serif',
    outline:'none', transition:'all 0.2s ease', boxSizing:'border-box',
    WebkitAppearance:'none', appearance:'none',
  },
  err: { display:'block', fontSize:11, color:'#ef4444', marginTop:5, fontWeight:500 },

  chip: {
    padding:'7px 16px', borderRadius:999, border:'1px solid rgba(148,163,184,0.15)',
    background:'rgba(30,41,59,0.5)', color:'#94a3b8', fontSize:13, fontWeight:600,
    cursor:'pointer', transition:'all 0.2s ease',
  },
  chipActive: { background:'rgba(124,58,237,0.15)', borderColor:'rgba(124,58,237,0.4)', color:'#a78bfa' },

  goalCard: {
    display:'flex', flexDirection:'column', alignItems:'center', gap:10,
    padding:'18px 12px', borderRadius:14, border:'1px solid rgba(148,163,184,0.12)',
    background:'rgba(30,41,59,0.4)', cursor:'pointer', transition:'all 0.2s ease',
    position:'relative',
  },
  goalActive: { background:'rgba(124,58,237,0.12)', borderColor:'rgba(124,58,237,0.4)' },
  goalCheck:  {
    position:'absolute', top:8, right:10, fontSize:11, fontWeight:800, color:'#22c55e',
    background:'rgba(34,197,94,0.15)', border:'1px solid rgba(34,197,94,0.3)',
    borderRadius:'50%', width:18, height:18, display:'flex', alignItems:'center', justifyContent:'center',
  },

  navRow: { display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:28, gap:12 },
  primaryBtn: {
    display:'inline-flex', alignItems:'center', justifyContent:'center', gap:8,
    padding:'12px 28px', borderRadius:12, border:'none',
    background:'linear-gradient(135deg,#7c3aed,#06b6d4)',
    color:'#fff', fontSize:14, fontWeight:700, cursor:'pointer', textDecoration:'none',
    boxShadow:'0 0 24px rgba(124,58,237,0.35)',
  },
  backBtn: {
    padding:'12px 20px', borderRadius:12, border:'1px solid rgba(148,163,184,0.2)',
    background:'rgba(30,41,59,0.4)', color:'#94a3b8', fontSize:14, fontWeight:600, cursor:'pointer',
  },

  loginNote: { textAlign:'center', color:'#475569', fontSize:13, marginTop:24 },
};

/* ── Keyframe injection ──────────────────────────────────── */
if (typeof document !== 'undefined' && !document.getElementById('reg-kf')) {
  const el = document.createElement('style');
  el.id = 'reg-kf';
  el.textContent = `@keyframes fadeInUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}`;
  document.head.appendChild(el);
}
