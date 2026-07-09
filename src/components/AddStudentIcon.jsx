import React from 'react';

const AddStudentIcon = ({ size = 120, onClick }) => {
  return (
    <div 
      className="add-student-icon-wrapper"
      onClick={onClick}
      style={{
        width: size,
        height: size,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        padding: `${size * 0.08}px`,
        boxSizing: 'border-box',
        borderRadius: `${size * 0.22}px`, /* Squircle shape */
      }}
    >
      <svg 
        width="100%" 
        height="100%" 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: 'block' }}
      >
        {/* Head Ring */}
        <circle 
          cx="50" 
          cy="26" 
          r="10" 
          stroke="white" 
          strokeWidth="6.5" 
          fill="none" 
        />
        
        {/* Body Outline */}
        <path 
          d="M28,54 C28,42 38,39 50,39 C62,39 72,42 72,54" 
          stroke="white" 
          strokeWidth="6.5" 
          strokeLinecap="round" 
          fill="none" 
        />
        <path 
          d="M28,54 L46,54" 
          stroke="white" 
          strokeWidth="6.5" 
          strokeLinecap="round" 
        />

        {/* Plus Badge */}
        <circle 
          cx="69" 
          cy="52" 
          r="14" 
          fill="white" 
        />
        
        {/* Plus Sign inside badge */}
        <path 
          d="M69,45.5 L69,58.5 M62.5,52 L75.5,52" 
          stroke="#FF3B30" 
          strokeWidth="4" 
          strokeLinecap="round" 
        />

        {/* Text */}
        <text 
          x="50" 
          y="76" 
          textAnchor="middle" 
          fill="white" 
          fontSize="11" 
          fontWeight="900" 
          fontFamily="system-ui, -apple-system, sans-serif"
          letterSpacing="0.5"
        >
          ADD
        </text>
        <text 
          x="50" 
          y="89" 
          textAnchor="middle" 
          fill="white" 
          fontSize="11" 
          fontWeight="900" 
          fontFamily="system-ui, -apple-system, sans-serif"
          letterSpacing="0.5"
        >
          STUDENT
        </text>
      </svg>
    </div>
  );
};

export default AddStudentIcon;
