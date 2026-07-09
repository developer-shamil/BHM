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
        gap: '4px'
      }}
    >
      <svg width={size * 0.5} height={size * 0.4} viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="40" cy="20" r="14" stroke="white" strokeWidth="8" />
        <path d="M10,70 Q10,45 40,45 L60,45" stroke="white" strokeWidth="8" fill="none" strokeLinecap="round" />
        <path d="M10,70 L45,70" stroke="white" strokeWidth="8" fill="none" strokeLinecap="round" />
        
        <circle cx="75" cy="55" r="22" fill="white" />
        <path d="M75,40 L75,70 M60,55 L90,55" stroke="#FF4D4D" strokeWidth="6" strokeLinecap="round" />
      </svg>
      <div style={{
        fontFamily: 'sans-serif', 
        fontWeight: 800, 
        fontSize: size * 0.15, 
        textAlign: 'center',
        lineHeight: 1.1
      }}>
        ADD<br/>STUDENT
      </div>
    </div>
  );
};

export default AddStudentIcon;
