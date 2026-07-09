import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const getDashboardLink = (role) => {
    switch (role) {
      case 'principal': return '/principal';
      case 'teacher': return '/teacher';
      case 'bus_driver': return '/bus';
      case 'student': return '/student';
      default: return '/';
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav style={{
      backgroundColor: 'var(--primary-blue)',
      color: 'white',
      padding: '1rem 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: 'var(--shadow-md)',
      position: 'sticky',
      top: 0,
      zIndex: 50
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '1rem', textDecoration: 'none', color: 'white' }}>
          <div style={{ width: '40px', height: '40px', backgroundColor: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: 'var(--primary-green)', fontWeight: 'bold' }}>BHM</span>
          </div>
          <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 600 }}>Bidayathul Hidaya Madrasa</h1>
        </Link>
      </div>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        {user ? (
          <>
            <span style={{ fontSize: '0.9rem', opacity: 0.85 }}>Hello, {user.name}</span>
            <Link to={getDashboardLink(user.role)}>
              <button className="btn btn-green">Dashboard</button>
            </Link>
            <button className="btn btn-outline" onClick={handleLogout} style={{ borderColor: 'white', color: 'white' }}>
              Logout
            </button>
          </>
        ) : (
          <Link to="/login">
            <button className="btn btn-orange" style={{ padding: '0.6rem 1.5rem', fontSize: '0.9rem' }}>
              Login
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
