import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
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
        <div style={{ width: '40px', height: '40px', backgroundColor: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ color: 'var(--primary-green)', fontWeight: 'bold' }}>BHM</span>
        </div>
        <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 600 }}>Bidayathul Hidaya Madrasa</h1>
      </div>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none', padding: '0.5rem 1rem' }}>Home</Link>
        <button className="btn btn-orange">Apply Now</button>
        <button className="btn btn-green">Fee Payment</button>
      </div>
    </nav>
  );
};

export default Navbar;
