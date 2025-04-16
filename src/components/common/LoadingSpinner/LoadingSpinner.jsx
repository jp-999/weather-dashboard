import React from 'react';
import PropTypes from 'prop-types';

const LoadingSpinner = ({ size = 'md', color = 'accent', className = '' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-2',
    lg: 'w-12 h-12 border-3'
  };
  
  const colorClasses = {
    primary: 'border-primary/20 border-t-primary',
    secondary: 'border-secondary/20 border-t-secondary',
    accent: 'border-accent/20 border-t-accent',
    white: 'border-white/20 border-t-white'
  };
  
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div
        className={`animate-spin rounded-full ${sizeClasses[size]} ${colorClasses[color]}`}
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

LoadingSpinner.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  color: PropTypes.oneOf(['primary', 'secondary', 'accent', 'white']),
  className: PropTypes.string
};

export default LoadingSpinner; 