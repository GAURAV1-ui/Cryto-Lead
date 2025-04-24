import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  color = 'purple',
  className = '',
}) => {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-12 w-12',
    lg: 'h-16 w-16',
  };

  const colorClasses = {
    purple: 'border-purple-400 border-t-transparent',
    white: 'border-white border-t-transparent',
    pink: 'border-pink-400 border-t-transparent',
  };

  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div
        className={`animate-spin ${sizeClasses[size]} border-4 ${colorClasses[color as keyof typeof colorClasses]} rounded-full`}
      />
    </div>
  );
};

export default LoadingSpinner; 