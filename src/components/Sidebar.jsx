import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, UserCircle, Bus, LogOut, Settings } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { ROLES } from '../data/mockUsers';

// Role → nav items map (each role only sees its own section)
const NAV_MAP = {
  [ROLES.PRINCIPAL]: [
    { path: '/principal', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
  ],
  [ROLES.TEACHER]: [
    { path: '/teacher', icon: <Users size={20} />, label: 'My Class' },
  ],
  [ROLES.BUS_DRIVER]: [
    { path: '/bus', icon: <Bus size={20} />, label: 'Bus Panel' },
  ],
  [ROLES.STUDENT]: [
    { path: '/student', icon: <UserCircle size={20} />, label: 'My Profile' },
  ],
};

const ROLE_BADGE = {
  [ROLES.PRINCIPAL]:  { label: 'Principal',   bg: '#3B82F6' },
  [ROLES.TEACHER]:    { label: 'Teacher',      bg: '#10B981' },
  [ROLES.BUS_DRIVER]: { label: 'Bus Driver',   bg: '#F97316' },
  [ROLES.STUDENT]:    { label: 'Student',      bg: '#8B5CF6' },
};

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  if (!user) return null;

  const menuItems = NAV_MAP[user.role] || [];
  const badge     = ROLE_BADGE[user.role] || { label: 'User', bg: '#6B7280' };

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <aside style={{
      width: '240px',
      minWidth: '240px',
      backgroundColor: '#111827',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      minHeight: 'calc(100vh - 72px)',
      padding: '1.5rem 0',
    }}>
      {/* User info */}
      <div style={{ padding: '0 1.25rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem', backgroundColor: 'rgba(255,255,255,0.07)', borderRadius: '12px' }}>
          <img
            src={user.avatar}
            alt={user.name}
            style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover', border: `2px solid ${badge.bg}` }}
          />
          <div style={{ overflow: 'hidden' }}>
            <div style={{ fontWeight: 700, fontSize: '0.88rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user.name}</div>
            <span style={{
              display: 'inline-block',
              backgroundColor: badge.bg,
              color: 'white',
              fontSize: '0.68rem',
              fontWeight: 700,
              padding: '2px 8px',
              borderRadius: '20px',
              marginTop: '3px',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
            }}>{badge.label}</span>
            {user.assignedClass && (
              <div style={{ fontSize: '0.72rem', color: '#9CA3AF', marginTop: '2px' }}>{user.assignedClass}</div>
            )}
          </div>
        </div>
      </div>

      {/* Nav items */}
      <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.25rem', padding: '0 0.75rem' }}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.7rem 1rem',
                color: isActive ? 'white' : '#9CA3AF',
                backgroundColor: isActive ? badge.bg : 'transparent',
                borderRadius: '10px',
                textDecoration: 'none',
                fontWeight: isActive ? 600 : 400,
                fontSize: '0.9rem',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => { if (!isActive) e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.07)'; }}
              onMouseLeave={e => { if (!isActive) e.currentTarget.style.backgroundColor = 'transparent'; }}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom: Settings + Logout */}
      <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1rem' }}>
        <button
          style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#9CA3AF', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.88rem', padding: '0.5rem 0', fontFamily: 'Inter, sans-serif' }}
          onMouseEnter={e => e.currentTarget.style.color = 'white'}
          onMouseLeave={e => e.currentTarget.style.color = '#9CA3AF'}
        >
          <Settings size={18} /> Settings
        </button>
        <button
          onClick={handleLogout}
          style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#F87171', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.88rem', padding: '0.5rem 0', fontWeight: 600, fontFamily: 'Inter, sans-serif' }}
          onMouseEnter={e => e.currentTarget.style.color = '#EF4444'}
          onMouseLeave={e => e.currentTarget.style.color = '#F87171'}
        >
          <LogOut size={18} /> Log Out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
