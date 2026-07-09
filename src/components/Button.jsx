import React from 'react';

const Button = ({ children, variant = 'primary', className = '', onClick, style, ...props }) => {
  return (
    <button 
      className={`btn btn-${variant} ${className}`} 
      onClick={onClick}
      style={style}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
