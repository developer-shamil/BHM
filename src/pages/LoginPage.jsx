import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ROLE_HOME } from '../components/ProtectedRoute';
import { ROLES } from '../data/mockUsers';
import { Eye, EyeOff, LogIn, BookOpen, GraduationCap } from 'lucide-react';

// Credential hints shown below the form
const DEMO_CREDS = [
  { role: 'Principal',   username: 'principal',    password: 'admin123',    color: '#3B82F6', icon: '👨‍💼' },
  { role: 'Teacher 10A', username: 'teacher_10',   password: 'teacher123',  color: '#10B981', icon: '👩‍🏫' },
  { role: 'Teacher 7A',  username: 'teacher_7',    password: 'teacher123',  color: '#10B981', icon: '👩‍🏫' },
  { role: 'Teacher 5B',  username: 'teacher_5',    password: 'teacher123',  color: '#10B981', icon: '👩‍🏫' },
  { role: 'Bus Driver',  username: 'driver1',       password: 'driver123',   color: '#F97316', icon: '🚌' },
  { role: 'Student',     username: 'ahmed_farhan',  password: 'student123',  color: '#8B5CF6', icon: '🎓' },
];

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError]     = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate a tiny network delay for realism
    await new Promise(r => setTimeout(r, 600));

    const err = login(username.trim(), password);
    setLoading(false);

    if (err) {
      setError(err);
      return;
    }

    // Re-read user from context after login
    // We need to read role from login result — call login again just to get the user
    // Actually login() sets context; we read it from useAuth after re-render.
    // We use a small trick: read from sessionStorage directly for the redirect.
    const stored = JSON.parse(sessionStorage.getItem('bhm_auth_user'));
    navigate(ROLE_HOME[stored.role] || '/', { replace: true });
  };

  const fillCreds = (cred) => {
    setUsername(cred.username);
    setPassword(cred.password);
    setError('');
  };

  const inputBase = {
    width: '100%',
    padding: '0.75rem 1rem',
    borderRadius: '10px',
    border: '1.5px solid #D1D5DB',
    fontSize: '0.95rem',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    fontFamily: 'Inter, sans-serif',
    backgroundColor: '#F9FAFB',
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0F2057 0%, #1E3A8A 40%, #0E7490 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Decorative blobs */}
      {[
        { top: '-120px', left: '-120px', size: '350px', opacity: 0.08 },
        { bottom: '-100px', right: '-80px', size: '300px', opacity: 0.06 },
        { top: '40%', left: '5%', size: '180px', opacity: 0.05 },
      ].map((b, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: b.size, height: b.size,
          borderRadius: '50%',
          backgroundColor: 'white',
          opacity: b.opacity,
          top: b.top, bottom: b.bottom,
          left: b.left, right: b.right,
          pointerEvents: 'none',
        }} />
      ))}

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '460px', position: 'relative', zIndex: 2 }}>

        {/* Logo / Branding */}
        <div style={{ textAlign: 'center', marginBottom: '2rem', color: 'white' }}>
          <div style={{ width: '72px', height: '72px', borderRadius: '20px', background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}>
            <GraduationCap size={36} color="white" />
          </div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0, letterSpacing: '-0.02em' }}>Bidayathul Hidaya Madrasa</h1>
          <p style={{ margin: '0.35rem 0 0', opacity: 0.75, fontSize: '0.9rem' }}>School Management System</p>
        </div>

        {/* Login Card */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '20px',
          padding: '2.25rem',
          width: '100%',
          boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
        }}>
          <h2 style={{ margin: '0 0 0.25rem', fontSize: '1.25rem', fontWeight: 700, color: '#111827' }}>Welcome back 👋</h2>
          <p style={{ margin: '0 0 1.75rem', color: '#6B7280', fontSize: '0.88rem' }}>Sign in to your account to continue</p>

          {error && (
            <div style={{ backgroundColor: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '10px', padding: '0.75rem 1rem', marginBottom: '1.25rem', color: '#DC2626', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#374151', marginBottom: '0.4rem' }}>Username</label>
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Enter your username"
                required
                autoComplete="username"
                style={inputBase}
                onFocus={e => { e.target.style.borderColor = '#3B82F6'; e.target.style.boxShadow = '0 0 0 3px rgba(59,130,246,0.12)'; e.target.style.backgroundColor = 'white'; }}
                onBlur={e => { e.target.style.borderColor = '#D1D5DB'; e.target.style.boxShadow = 'none'; e.target.style.backgroundColor = '#F9FAFB'; }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#374151', marginBottom: '0.4rem' }}>Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPwd ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  autoComplete="current-password"
                  style={{ ...inputBase, paddingRight: '3rem' }}
                  onFocus={e => { e.target.style.borderColor = '#3B82F6'; e.target.style.boxShadow = '0 0 0 3px rgba(59,130,246,0.12)'; e.target.style.backgroundColor = 'white'; }}
                  onBlur={e => { e.target.style.borderColor = '#D1D5DB'; e.target.style.boxShadow = 'none'; e.target.style.backgroundColor = '#F9FAFB'; }}
                />
                <button type="button" onClick={() => setShowPwd(s => !s)}
                  style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#9CA3AF', display: 'flex' }}>
                  {showPwd ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading}
              style={{
                marginTop: '0.5rem',
                padding: '0.85rem',
                borderRadius: '10px',
                border: 'none',
                background: loading ? '#93C5FD' : 'linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%)',
                color: 'white',
                fontWeight: 700,
                fontSize: '0.95rem',
                cursor: loading ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                transition: 'all 0.2s',
                boxShadow: '0 4px 12px rgba(59,130,246,0.35)',
                fontFamily: 'Inter, sans-serif',
              }}
            >
              {loading ? (
                <><span style={{ display: 'inline-block', width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.4)', borderTopColor: 'white', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} /> Signing in…</>
              ) : (
                <><LogIn size={18} /> Sign In</>
              )}
            </button>
          </form>
        </div>

        {/* Demo credentials panel */}
        <div style={{
          marginTop: '1.25rem',
          backgroundColor: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(8px)',
          borderRadius: '16px',
          padding: '1.25rem',
          width: '100%',
          border: '1px solid rgba(255,255,255,0.15)',
        }}>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.78rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 0.75rem' }}>
            Demo Accounts — click to fill
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
            {DEMO_CREDS.map((c, i) => (
              <button key={i} onClick={() => fillCreds(c)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.5rem',
                  padding: '0.5rem 0.75rem',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.2)',
                  backgroundColor: 'rgba(255,255,255,0.08)',
                  color: 'white',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  fontWeight: 500,
                  textAlign: 'left',
                  transition: 'background 0.15s',
                  fontFamily: 'Inter, sans-serif',
                }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.18)'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)'}
              >
                <span>{c.icon}</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.78rem' }}>{c.role}</div>
                  <div style={{ opacity: 0.65, fontSize: '0.72rem' }}>{c.username}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Spinner keyframe */}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

export default LoginPage;
