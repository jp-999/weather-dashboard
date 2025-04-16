import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const Card = ({ 
  children, 
  variant = 'glass', 
  className = '', 
  hoverable = false,
  animate = false,
  onClick,
  ...props 
}) => {
  const baseClasses = 'card overflow-hidden';
  const variantClasses = {
    glass: 'card-glass backdrop-blur-md',
    neumorphic: 'card-neumorphic',
    flat: 'bg-background/50 border border-white/5 rounded-2xl backdrop-blur-sm'
  };
  
  const hoverClass = hoverable ? 'transform hover:scale-102 hover:shadow-lg transition-all duration-300 hover:backdrop-blur-lg' : '';
  
  // Animation variants with improved transitions
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 20, 
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.6, 
        ease: "easeOut",
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    },
    hover: {
      scale: 1.02,
      boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
      transition: {
        duration: 0.3
      }
    }
  };
  
  const cardContent = animate ? (
    <motion.div
      initial="hidden"
      animate="visible"
      whileHover={hoverable ? "hover" : undefined}
      variants={cardVariants}
      className={`${baseClasses} ${variantClasses[variant]} ${className} ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
      layout
      {...props}
    >
      {children}
    </motion.div>
  ) : (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${className} ${hoverClass} ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
  
  return cardContent;
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['glass', 'neumorphic', 'flat']),
  className: PropTypes.string,
  hoverable: PropTypes.bool,
  animate: PropTypes.bool,
  onClick: PropTypes.func
};

export default Card; 