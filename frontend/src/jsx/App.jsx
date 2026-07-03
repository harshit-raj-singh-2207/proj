import React, { useEffect, Suspense, lazy, Component } from 'react';
import { Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom';
import '../css/global.css';

/* ─── Simple Auth (replace with AuthContext later) ─────── */
const getUser = () => {
  try { return JSON.parse(localStorage.getItem('cc_user')); }
  catch { return null; }
};

/* ─── Error Boundary for unbuilt pages ─────────────────── */
class PageBoundary extends Component {
  state = { err: false };
  static getDerivedStateFromError() { return { err: true }; }
  render() {
    if (this.state.err) return (
      <div style={S.coming}>
        <span style={{ fontSize: 52 }}>🚧</span>
        <h3 style={S.comingTitle}>Coming Soon</h3>
        <p style={S.comingText}>This page is under construction.</p>
      </div>
    );
    return this.props.children;
  }
}

/* ─── Lazy Pages ────────────────────────────────────────── */
const Home           = lazy(() => import('./pages/Home/index'));
const Login          = lazy(() => import('./pages/Login/index'));
const Register       = lazy(() => import('./pages/Register/index'));
const Dashboard      = lazy(() => import('./pages/Dashboard/index'));
const Resume         = lazy(() => import('./pages/Resume/index'));
const ATS            = lazy(() => import('./pages/ATS/index'));
const Interview      = lazy(() => import('./pages/Interview/index'));
const Coding         = lazy(() => import('./pages/Coding/index'));
const Jobs           = lazy(() => import('./pages/Jobs/index'));
const Roadmap        = lazy(() => import('./pages/Roadmap/index'));
const Analytics      = lazy(() => import('./pages/Analytics/index'));
const DigitalTwin    = lazy(() => import('./pages/DigitalTwin/index'));
const RecruiterArena = lazy(() => import('./pages/RecruiterArena/index'));
const TrendRadar     = lazy(() => import('./pages/TrendRadar/index'));
const Profile        = lazy(() => import('./pages/Profile/index'));
const Settings       = lazy(() => import('./pages/Settings/index'));

/* ─── Page Loader ───────────────────────────────────────── */
const PageLoader = () => (
  <div style={S.loader}>
    <div style={S.loaderRing} />
  </div>
);

/* ─── Protected Route ───────────────────────────────────── */
const ProtectedRoute = ({ children }) =>
  getUser() ? children : <Navigate to="/login" replace />;

/* ─── Inline Navbar (swap for: import Navbar from './components/Navbar') ── */
const NAV_LINKS = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/jobs',      label: 'Jobs' },
  { to: '/resume',    label: 'Resume' },
  { to: '/roadmap',   label: 'Roadmap' },
];

const Navbar = () => {
  const user = getUser();
  const { pathname } = useLocation();
  return (
    <nav style={S.nav}>
      <div style={S.navInner}>
        <a href="/" style={S.logo}>
          <span style={S.logoMark}>CC</span>
          <span style={S.logoText}>CareerCopilot</span>
        </a>
        <div style={S.navLinks}>
          {NAV_LINKS.map(l => (
            <a key={l.to} href={l.to}
              style={{ ...S.navLink, ...(pathname === l.to ? S.navLinkActive : {}) }}>
              {l.label}
            </a>
          ))}
        </div>
        <div style={S.navActions}>
          {user ? (
            <>
              <a href="/profile" style={S.navBtn}>{user.name?.[0] ?? 'U'}</a>
              <button style={S.navBtnOutline}
                onClick={() => { localStorage.removeItem('cc_user'); window.location.href = '/'; }}>
                Logout
              </button>
            </>
          ) : (
            <>
              <a href="/login"    style={S.navBtnOutline}>Sign In</a>
              <a href="/register" style={S.navBtnPrimary}>Get Started</a>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

/* ─── Inline Sidebar (swap for: import Sidebar from './components/Sidebar') */
const SIDEBAR_LINKS = [
  { to: '/dashboard',    icon: '🏠', label: 'Overview' },
  { to: '/resume',       icon: '📄', label: 'Resume Analyzer' },
  { to: '/ats',          icon: '🎯', label: 'ATS Checker' },
  { to: '/interview',    icon: '🎤', label: 'Mock Interview' },
  { to: '/coding',       icon: '💻', label: 'Coding Practice' },
  { to: '/jobs',         icon: '💼', label: 'Job Recommendations' },
  { to: '/roadmap',      icon: '🗺️',  label: 'Career Roadmap' },
  { to: '/analytics',    icon: '📊', label: 'Analytics' },
  { to: '/twin',         icon: '🤖', label: 'AI Career Twin' },
  { to: '/recruiter',    icon: '🏢', label: 'Recruiter Arena' },
  { to: '/trends',       icon: '📡', label: 'Trend Radar' },
  { to: '/profile',      icon: '👤', label: 'Profile' },
  { to: '/settings',     icon: '⚙️',  label: 'Settings' },
];

const Sidebar = () => {
  const { pathname } = useLocation();
  return (
    <aside style={S.sidebar}>
      <div style={S.sidebarInner}>
        {SIDEBAR_LINKS.map(l => (
          <a key={l.to} href={l.to}
            style={{ ...S.sideLink, ...(pathname === l.to ? S.sideLinkActive : {}) }}>
            <span style={S.sideIcon}>{l.icon}</span>
            <span style={S.sideLabel}>{l.label}</span>
          </a>
        ))}
      </div>
    </aside>
  );
};

/* ─── Layouts ───────────────────────────────────────────── */
const PublicLayout = () => (
  <div style={{ minHeight: '100vh' }}>
    <Navbar />
    <main>
      <Outlet />
    </main>
  </div>
);

const AuthLayout = () => (
  <div style={S.authWrap}>
    <Outlet />
  </div>
);

const DashboardLayout = () => (
  <div style={{ display: 'flex', minHeight: '100vh' }}>
    <Sidebar />
    <div style={S.dashMain}>
      <Outlet />
    </div>
  </div>
);

/* ─── Wrap page with error boundary ────────────────────── */
const P = ({ C }) => <PageBoundary><C /></PageBoundary>;

/* ─── App ───────────────────────────────────────────────── */
export default function App() {
  useEffect(() => { window.__hideSplash?.(); }, []);

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>

        {/* Public — Landing */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<P C={Home} />} />
        </Route>

        {/* Auth — no nav */}
        <Route element={<AuthLayout />}>
          <Route path="/login"    element={<P C={Login} />} />
          <Route path="/register" element={<P C={Register} />} />
        </Route>

        {/* Dashboard — protected + sidebar */}
        <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
          <Route path="/dashboard" element={<P C={Dashboard} />} />
          <Route path="/resume"    element={<P C={Resume} />} />
          <Route path="/ats"       element={<P C={ATS} />} />
          <Route path="/interview" element={<P C={Interview} />} />
          <Route path="/coding"    element={<P C={Coding} />} />
          <Route path="/jobs"      element={<P C={Jobs} />} />
          <Route path="/roadmap"   element={<P C={Roadmap} />} />
          <Route path="/analytics" element={<P C={Analytics} />} />
          <Route path="/twin"      element={<P C={DigitalTwin} />} />
          <Route path="/recruiter" element={<P C={RecruiterArena} />} />
          <Route path="/trends"    element={<P C={TrendRadar} />} />
          <Route path="/profile"   element={<P C={Profile} />} />
          <Route path="/settings"  element={<P C={Settings} />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </Suspense>
  );
}

/* ─── Inline Styles ─────────────────────────────────────── */
const S = {
  /* Navbar */
  nav: {
    position: 'sticky', top: 0, zIndex: 200,
    height: 68, background: 'rgba(255,255,255,0.95)',
    backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
    borderBottom: '1px solid rgba(37,99,235,0.1)',
    boxShadow: '0 1px 12px rgba(37,99,235,0.06)',
  },
  navInner: {
    maxWidth: 1280, margin: '0 auto', padding: '0 24px',
    height: '100%', display: 'flex', alignItems: 'center', gap: 32,
  },
  logo: { display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', flexShrink: 0 },
  logoMark: {
    width: 36, height: 36, borderRadius: 10,
    background: 'linear-gradient(135deg,#2563eb,#0ea5e9)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    color: '#fff', fontWeight: 900, fontSize: 14,
  },
  logoText: { color: '#0f172a', fontWeight: 800, fontSize: 18, letterSpacing: '-0.02em' },
  navLinks: { display: 'flex', alignItems: 'center', gap: 4, flex: 1 },
  navLink: {
    color: '#64748b', fontWeight: 500, fontSize: 14,
    padding: '6px 14px', borderRadius: 8, textDecoration: 'none',
    transition: 'all 150ms ease',
  },
  navLinkActive: { color: '#2563eb', background: 'rgba(37,99,235,0.08)' },
  navActions: { display: 'flex', alignItems: 'center', gap: 10 },
  navBtnOutline: {
    padding: '8px 18px', borderRadius: 8, border: '1px solid rgba(37,99,235,0.3)',
    background: 'none', color: '#2563eb', fontWeight: 600, fontSize: 13,
    cursor: 'pointer', textDecoration: 'none', transition: 'all 150ms ease',
  },
  navBtnPrimary: {
    padding: '8px 18px', borderRadius: 8, border: 'none',
    background: 'linear-gradient(135deg,#2563eb,#0ea5e9)',
    color: '#fff', fontWeight: 700, fontSize: 13,
    cursor: 'pointer', textDecoration: 'none',
    boxShadow: '0 2px 12px rgba(37,99,235,0.3)',
  },
  navBtn: {
    width: 34, height: 34, borderRadius: '50%',
    background: 'linear-gradient(135deg,#2563eb,#0ea5e9)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    color: '#fff', fontWeight: 700, fontSize: 14, textDecoration: 'none',
  },

  /* Sidebar */
  sidebar: {
    width: 260, flexShrink: 0, minHeight: '100vh',
    background: '#f8faff', borderRight: '1px solid rgba(37,99,235,0.1)',
    position: 'sticky', top: 0, height: '100vh', overflowY: 'auto',
  },
  sidebarInner: { padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: 2 },
  sideLink: {
    display: 'flex', alignItems: 'center', gap: 12,
    padding: '10px 14px', borderRadius: 10,
    color: '#64748b', fontSize: 13, fontWeight: 500,
    textDecoration: 'none', transition: 'all 150ms ease',
  },
  sideLinkActive: {
    background: 'rgba(37,99,235,0.1)', color: '#2563eb',
    borderLeft: '3px solid #2563eb', paddingLeft: 11,
  },
  sideIcon:  { fontSize: 16, width: 20, textAlign: 'center', flexShrink: 0 },
  sideLabel: { whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' },

  /* Dashboard main */
  dashMain: { flex: 1, padding: 32, background: '#f8faff', overflowY: 'auto' },

  /* Auth */
  authWrap: {
    minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
    background: '#f8faff', padding: 24,
  },

  /* Loader */
  loader: { display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' },
  loaderRing: {
    width: 44, height: 44, borderRadius: '50%',
    border: '3px solid rgba(37,99,235,0.15)',
    borderTopColor: '#2563eb',
    animation: 'spin 0.8s linear infinite',
  },

  /* Coming soon */
  coming: {
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    justifyContent: 'center', height: '60vh', gap: 16, textAlign: 'center',
  },
  comingTitle: { color: '#0f172a', fontFamily: 'Inter,sans-serif', fontSize: 22, fontWeight: 700 },
  comingText:  { color: '#64748b', fontFamily: 'Inter,sans-serif', fontSize: 14 },
};
