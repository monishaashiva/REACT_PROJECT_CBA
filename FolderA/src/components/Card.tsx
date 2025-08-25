import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ children, className = '', onClick }) => {
  const baseClasses = "bg-white rounded-lg shadow-sm border border-gray-200 p-6";
  const classes = onClick ? `${baseClasses} cursor-pointer hover:shadow-md transition-shadow` : baseClasses;
  
  const Component = onClick ? motion.div : 'div';
  const props = onClick ? {
    onClick,
    whileHover: { y: -2 },
    whileTap: { scale: 0.98 }
  } : {};

  return (
    <Component className={`${classes} ${className}`} {...props}>
      {children}
    </Component>
  );
};

export default Card;
