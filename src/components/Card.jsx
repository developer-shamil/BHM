import React from 'react';

const Card = ({ children, style, className = '' }) => {
  return (
    <div className={`card ${className}`} style={style}>
      {children}
    </div>
  );
};

export default Card;
