import React from 'react';

const AddStudentIcon = ({ size = 48, onClick }) => {
  return (
    <div
      onClick={onClick}
      style={{
        width: size,
        height: size,
        borderRadius: `${size * 0.28}px`,
        background: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 6px 12px rgba(255, 107, 107, 0.2)',
        cursor: 'pointer',
        transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
        boxSizing: 'border-box',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)';
        e.currentTarget.style.boxShadow = '0 10px 20px rgba(255, 107, 107, 0.35)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0) scale(1)';
        e.currentTarget.style.boxShadow = '0 6px 12px rgba(255, 107, 107, 0.2)';
      }}
    >
      <svg
        width="52%"
        height="52%"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ display: 'block' }}
      >
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <line x1="19" y1="8" x2="19" y2="14" />
        <line x1="16" y1="11" x2="22" y2="11" />
      </svg>
    </div>
  );
};

export default AddStudentIcon;
