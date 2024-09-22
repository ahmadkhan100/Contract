import React from 'react';

export const Alert = ({ children, variant = 'default', className = '', ...props }) => {
  const baseStyle = 'p-4 rounded-md';
  const variantStyles = {
    default: 'bg-gray-100 text-gray-800',
    destructive: 'bg-red-100 text-red-800',
  };

  return (
    <div className={`${baseStyle} ${variantStyles[variant]} ${className}`} {...props}>
      {children}
    </div>
  );
};

export const AlertTitle = ({ children, className = '', ...props }) => (
  <h5 className={`font-medium mb-1 ${className}`} {...props}>{children}</h5>
);

export const AlertDescription = ({ children, className = '', ...props }) => (
  <div className={`text-sm ${className}`} {...props}>{children}</div>
);
