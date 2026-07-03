import React, { useEffect, useState, useRef } from 'react';
import Hero     from './Hero';
import Features from './Features';
import About    from './About';
import Contact  from './Contact';

/* ══════════════════════════════════════════════════════════
   SCROLL PROGRESS BAR
══════════════════════════════════════════════════════════ */
function ScrollBar() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el  = document.documentElement;
      setPct((el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div style={{ position:'fixed', top:0, left:0, zIndex:999, height:3,
      width:`${pct}%`, background:'linear-gradient(90deg,#7c3aed,#06b6d4)',
      transition:'width 0.1s linear', pointerEvents:'none' }} />
  );
}

/* ══════════════════════════════════════════════════════════
   HOW IT WORKS
══════════════════════════════════════════════════════════ */
const STEPS = [
  { n:'01', icon:'📤', title:'Upload Your Resume',    desc:'Drop your PDF or paste your LinkedIn URL. Our AI parses every detail in seconds.' },
  { n:'02', icon:'🤖', title:'AI Analyses & Scores',  desc:'Get a 12-dimension score, keyword gaps, and role-matched insights instantly.' },
  { n:'03', icon:'🚀', title:'Land Your Dream Role',  desc:'Apply smarter, practise interviews, and track your progress to the offer letter.' },
];

function HowItWorks() {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <section id="how-it-works" ref={ref} style={s.section}>
      <div style={s.container}>
        <div style={s.hdr}>
          <span style={s.pill}>How It Works</span>
          <h2 style={s.h2}>Three steps to your <span style={s.grad}>next offer</span></h2>
          <p style={s.lead}>No setup, no learning curve. Start in under 60 seconds.</p>
        </div>
        <div style={{ display:'flex', gap:24, flexWrap:'wrap', justifyContent:'center' }}>
          {STEPS.map((st, i) => (
            <div key={st.n} style={{ ...s.stepCard,
              opacity: vis ? 1 : 0,
              transform: vis ? 'translateY(0)' : 'translateY(28px)',
              transition: `all 0.6s ease ${i * 0.15}s` }}>
              <div style={s.stepNum}>{st.n}</div>
              <div style={s.stepIcon}>{st.icon}</div>
              <h3 style={s.stepTitle}>{st.title}</h3>
              <p style={s.stepDesc}>{st.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   TESTIMONIALS
══════════════════════════════════════════════════════════ */
const TESTIMONIALS = [
  { name:'Priya R.',    role:'SDE-2 @ Google',      avatar:'PR', bg:'linear-gradient(135deg,#7c3aed,#8b5cf6)',
    text:'Went from 3 rejections to 2 FAANG offers in 6 weeks. The ATS checker alone is worth it — I had no idea how many keywords I was missing.' },
  { name:'Arjun M.',   role:'Product @ Razorpay',   avatar:'AM', bg:'linear-gradient(135deg,#06b6d4,#22d3ee)',
    text:'The mock interview AI is scary good. It asked me follow-ups I wasn\'t expecting, and the feedback was more useful than any human mock I\'d done.' },
  { name:'Sneha K.',   role:'Data Analyst @ Swiggy', avatar:'SK', bg:'linear-gradient(135deg,#ec4899,#f472b6)',
    text:'Negotiated a 40% salary hike using the salary analytics section. I knew exactly what to ask for with real data to back it up.' },
  { name:'Rohan V.',   role:'Backend Dev @ CRED',    avatar:'RV', bg:'linear-gradient(135deg,#22c55e,#4ade80)',
    text:'Career roadmap feature mapped out exactly which skills I needed and in what order. Saved me months of random Googling.' },
  { name:'Ananya T.',  role:'Frontend @ Flipkart',   avatar:'AT', bg:'linear-gradient(135deg,#f59e0b,#fbbf24)',
    text:'The AI resume analyser caught formatting issues that were silently killing my applications. Fixed them in an hour, got callbacks the same week.' },
  { name:'Karan S.',   role:'ML Engineer @ Microsoft', avatar:'KS', bg:'linear-gradient(135deg,#ef4444,#f87171)',
    text:'CareerCopilot is what a career platform should be. Everything is AI-first, not just slapped on as a gimmick.' },
];

function Testimonials() {
  return (
    <section id="testimonials" style={{ ...s.section, background:'#030712' }}>
      <div style={s.container}>
        <div style={s.hdr}>
          <span style={s.pill}>Testimonials</span>
          <h2 style={s.h2}>Loved by <span style={s.grad}>2.4M+ professionals</span></h2>
          <p style={s.lead}>Real results from real people — not cherry-picked marketing copy.</p>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(320px,1fr))', gap:20 }}>
          {TESTIMONIALS.map((t, i) => (
            <div key={t.name} style={{ ...s.tCard, animationDelay:`${i*0.07}s` }}>
              <p style={s.tText}>"{t.text}"</p>
              <div style={{ display:'flex', alignItems:'center', gap:12, marginTop:16 }}>
                <div style={{ ...s.tAvatar, background:t.bg }}>{t.avatar}</div>
                <div>
                  <div style={s.tName}>{t.name}</div>
                  <div style={s.tRole}>{t.role}</div>
                </div>
              </div>
              <div style={s.tStars}>★★★★★</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   PRICING
══════════════════════════════════════════════════════════ */
const PLANS = [
  { name:'Free',    price:'₹0',   period:'forever',  color:'#64748b', cta:'Get Started',
    features:['Resume Analyzer (3/mo)','ATS Checker (5/mo)','Job Recommendations','Community Access'], },
  { name:'Pro',     price:'₹499', period:'/month',   color:'#7c3aed', cta:'Start Free Trial', popular:true,
    features:['Everything in Free','Unlimited Resume Scans','Mock Interviews (AI)','Coding Practice (500+)','Career Roadmap','Placement Analytics'], },
  { name:'Teams',   price:'₹999', period:'/user/mo', color:'#06b6d4', cta:'Contact Sales',
    features:['Everything in Pro','Recruiter Arena','AI Career Twin','Team Analytics','Priority Support','Dedicated CSM'], },
];

function Pricing() {
  const [hov, setHov] = useState(null);
  return (
    <section id="pricing" style={{ ...s.section, background:'#0a0f1e' }}>
      <div style={s.container}>
        <div style={s.hdr}>
          <span style={s.pill}>Pricing</span>
          <h2 style={s.h2}>Simple, <span style={s.grad}>transparent</span> pricing</h2>
          <p style={s.lead}>No hidden fees. Cancel anytime. 14-day free trial on Pro.</p>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:24, maxWidth:1000, margin:'0 auto' }}>
          {PLANS.map((plan, i) => (
            <div key={plan.name}
              onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)}
              style={{ ...s.priceCard,
                border:`1px solid ${hov===i||plan.popular ? plan.color+'80' : 'rgba(148,163,184,0.12)'}`,
                background: plan.popular ? `radial-gradient(ellipse at top,${plan.color}18,#0f172a 70%)` : '#0f172a',
                transform: hov===i ? 'translateY(-6px)' : 'none' }}>
              {plan.popular && <div style={{ ...s.popularBadge, background:plan.color }}>Most Popular</div>}
              <div style={{ fontSize:13, fontWeight:700, color:plan.color, marginBottom:8 }}>{plan.name}</div>
              <div style={s.priceNum}>{plan.price}<span style={s.pricePer}> {plan.period}</span></div>
              <ul style={s.featureList}>
                {plan.features.map(f => (
                  <li key={f} style={s.featureItem}>
                    <span style={{ color:plan.color }}>✓</span> {f}
                  </li>
                ))}
              </ul>
              <a href={plan.name==='Teams'?'/contact':'/register'}
                style={{ ...s.priceBtn, background: plan.popular?`linear-gradient(135deg,${plan.color},#06b6d4)`:'rgba(30,41,59,0.8)',
                  color: plan.popular?'#fff':'#cbd5e1',
                  border: plan.popular?'none':`1px solid ${plan.color}60` }}>
                {plan.cta} →
              </a>
            </div>
          ))}
        </div>
        <p style={{ textAlign:'center', color:'#475569', fontSize:13, marginTop:32 }}>
          🔒 Secure checkout via Razorpay · GST Invoice included · 14-day money-back guarantee
        </p>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   FINAL CTA BANNER
══════════════════════════════════════════════════════════ */
function CTABanner() {
  return (
    <section style={{ padding:'80px 24px', background:'#030712', fontFamily:'Inter,sans-serif' }}>
      <div style={{ maxWidth:860, margin:'0 auto', textAlign:'center',
        background:'linear-gradient(135deg,rgba(124,58,237,0.18),rgba(6,182,212,0.12))',
        border:'1px solid rgba(124,58,237,0.3)', borderRadius:28, padding:'60px 40px',
        position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', top:'-30%', left:'50%', transform:'translateX(-50%)',
          width:500, height:300, background:'radial-gradient(ellipse,rgba(124,58,237,0.2),transparent 70%)',
          pointerEvents:'none' }} />
        <span style={s.pill}>Limited Time</span>
        <h2 style={{ fontSize:'clamp(28px,4vw,48px)', fontWeight:900, color:'#f8fafc',
          letterSpacing:'-0.035em', margin:'20px 0 16px', lineHeight:1.15 }}>
          Start your career transformation<br />
          <span style={s.grad}>completely free</span>
        </h2>
        <p style={{ color:'#94a3b8', fontSize:17, lineHeight:1.7, maxWidth:520, margin:'0 auto 36px' }}>
          Join 2.4M+ professionals. No credit card required. Cancel anytime.
        </p>
        <div style={{ display:'flex', gap:14, justifyContent:'center', flexWrap:'wrap' }}>
          <a href="/register" style={{ padding:'15px 36px', borderRadius:12,
            background:'linear-gradient(135deg,#7c3aed,#06b6d4)',
            color:'#fff', fontSize:16, fontWeight:700, textDecoration:'none',
            boxShadow:'0 0 36px rgba(124,58,237,0.45)' }}>
            Get Started Free →
          </a>
          <a href="#features" style={{ padding:'15px 36px', borderRadius:12,
            border:'1px solid rgba(148,163,184,0.25)', background:'rgba(30,41,59,0.5)',
            color:'#cbd5e1', fontSize:16, fontWeight:600, textDecoration:'none' }}>
            See All Features
          </a>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   FOOTER
══════════════════════════════════════════════════════════ */
const FOOTER_LINKS = {
  Product:  ['Resume Analyzer','ATS Checker','Mock Interview','Coding Practice','Job Recommendations','Career Roadmap'],
  Company:  ['About Us','Blog','Careers','Press Kit','Partners','Contact'],
  Resources:['Documentation','Help Center','Community','API','Status','Changelog'],
  Legal:    ['Privacy Policy','Terms of Service','Cookie Policy','GDPR','Security'],
};

function Footer() {
  return (
    <footer style={{ background:'#030712', borderTop:'1px solid rgba(148,163,184,0.1)', fontFamily:'Inter,sans-serif' }}>
      <div style={{ maxWidth:1200, margin:'0 auto', padding:'64px 24px 32px' }}>
        {/* Top row */}
        <div style={{ display:'grid', gridTemplateColumns:'260px repeat(4,1fr)', gap:40, marginBottom:56, flexWrap:'wrap' }}>
          {/* Brand */}
          <div>
            <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:16 }}>
              <div style={{ width:36, height:36, borderRadius:10,
                background:'linear-gradient(135deg,#7c3aed,#06b6d4)',
                display:'flex', alignItems:'center', justifyContent:'center',
                color:'#fff', fontWeight:900, fontSize:14 }}>CC</div>
              <span style={{ color:'#f8fafc', fontWeight:800, fontSize:17 }}>CareerCopilot</span>
            </div>
            <p style={{ color:'#475569', fontSize:13, lineHeight:1.75, marginBottom:20 }}>
              AI-powered career platform helping professionals land better roles, faster.
            </p>
            <div style={{ display:'flex', gap:10 }}>
              {['in','𝕏','▶','◈'].map((icon, i) => (
                <a key={i} href="#" style={{ width:32, height:32, borderRadius:'50%',
                  background:'rgba(30,41,59,0.8)', border:'1px solid rgba(148,163,184,0.15)',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  color:'#64748b', fontSize:12, fontWeight:700, textDecoration:'none' }}>{icon}</a>
              ))}
            </div>
          </div>
          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([cat, links]) => (
            <div key={cat}>
              <p style={{ fontSize:11, fontWeight:700, color:'#64748b', textTransform:'uppercase',
                letterSpacing:'0.08em', marginBottom:16 }}>{cat}</p>
              {links.map(l => (
                <a key={l} href="#" style={{ display:'block', color:'#475569', fontSize:13,
                  textDecoration:'none', marginBottom:10, transition:'color 0.2s ease' }}
                  onMouseEnter={e => e.target.style.color='#a78bfa'}
                  onMouseLeave={e => e.target.style.color='#475569'}>{l}</a>
              ))}
            </div>
          ))}
        </div>
        {/* Bottom bar */}
        <div style={{ borderTop:'1px solid rgba(148,163,184,0.08)', paddingTop:24,
          display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:12 }}>
          <p style={{ color:'#334155', fontSize:13, margin:0 }}>
            © {new Date().getFullYear()} CareerCopilot AI Pvt. Ltd. · Made with ❤️ in Bangalore
          </p>
          <div style={{ display:'flex', gap:20 }}>
            {['Privacy','Terms','Cookies'].map(l => (
              <a key={l} href="#" style={{ color:'#334155', fontSize:13, textDecoration:'none' }}>{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ══════════════════════════════════════════════════════════
   HOME PAGE
══════════════════════════════════════════════════════════ */
export default function Home() {
  return (
    <>
      <ScrollBar />
      <Hero />
      <HowItWorks />
      <Features />
      <Testimonials />
      <Pricing />
      <About />
      <CTABanner />
      <Contact />
      <Footer />
    </>
  );
}

/* ══════════════════════════════════════════════════════════
   SHARED STYLES
══════════════════════════════════════════════════════════ */
const s = {
  section:   { padding:'100px 0', background:'#0f172a', fontFamily:'Inter,sans-serif' },
  container: { maxWidth:1200, margin:'0 auto', padding:'0 24px' },
  hdr:       { textAlign:'center', marginBottom:56 },
  pill: {
    display:'inline-block', padding:'6px 18px', borderRadius:999,
    background:'rgba(124,58,237,0.12)', border:'1px solid rgba(124,58,237,0.3)',
    color:'#a78bfa', fontSize:12, fontWeight:700, letterSpacing:'0.06em',
    textTransform:'uppercase', marginBottom:20,
  },
  h2: {
    fontSize:'clamp(28px,4vw,44px)', fontWeight:900, color:'#f8fafc',
    letterSpacing:'-0.035em', lineHeight:1.2, marginBottom:16,
  },
  grad: {
    background:'linear-gradient(135deg,#a78bfa,#22d3ee)',
    WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text',
  },
  lead: { color:'#94a3b8', fontSize:17, maxWidth:560, margin:'0 auto', lineHeight:1.7 },

  /* How It Works */
  stepCard: {
    flex:'1 1 280px', maxWidth:340,
    background:'#0f172a', border:'1px solid rgba(148,163,184,0.1)',
    borderRadius:20, padding:32, position:'relative',
  },
  stepNum:   { fontSize:12, fontWeight:800, color:'rgba(124,58,237,0.5)', letterSpacing:'0.1em', marginBottom:16 },
  stepIcon:  { fontSize:36, marginBottom:16 },
  stepTitle: { fontSize:18, fontWeight:800, color:'#f8fafc', marginBottom:10 },
  stepDesc:  { fontSize:14, color:'#94a3b8', lineHeight:1.7, margin:0 },

  /* Testimonials */
  tCard: {
    background:'#0f172a', border:'1px solid rgba(148,163,184,0.1)',
    borderRadius:18, padding:28, display:'flex', flexDirection:'column',
    animation:'fadeInUp 0.5s ease both',
  },
  tText:   { fontSize:14, color:'#94a3b8', lineHeight:1.75, margin:0, flex:1 },
  tAvatar: { width:42, height:42, borderRadius:'50%', display:'flex', alignItems:'center',
    justifyContent:'center', fontSize:13, fontWeight:800, color:'#fff', flexShrink:0 },
  tName:   { fontSize:14, fontWeight:700, color:'#f8fafc' },
  tRole:   { fontSize:12, color:'#64748b', marginTop:2 },
  tStars:  { color:'#f59e0b', fontSize:13, marginTop:16 },

  /* Pricing */
  priceCard: {
    background:'#0f172a', borderRadius:20, padding:32,
    display:'flex', flexDirection:'column', gap:12,
    position:'relative', transition:'all 0.25s ease', cursor:'default',
  },
  popularBadge: {
    position:'absolute', top:20, right:20,
    padding:'4px 12px', borderRadius:999,
    fontSize:11, fontWeight:700, color:'#fff',
  },
  priceNum:    { fontSize:36, fontWeight:900, color:'#f8fafc', lineHeight:1 },
  pricePer:    { fontSize:14, fontWeight:500, color:'#64748b' },
  featureList: { listStyle:'none', padding:0, margin:'8px 0', display:'flex', flexDirection:'column', gap:8, flex:1 },
  featureItem: { fontSize:13, color:'#94a3b8', display:'flex', gap:8, alignItems:'center' },
  priceBtn: {
    display:'block', textAlign:'center', padding:'13px 24px',
    borderRadius:10, fontSize:14, fontWeight:700,
    textDecoration:'none', marginTop:8, transition:'opacity 0.2s ease',
  },
};
