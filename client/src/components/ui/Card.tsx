import { HTMLAttributes, ReactNode } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

const Card = ({ children, className = '', ...props }: CardProps) => {
  return (
    <div
      className={`rounded-lg shadow-lg border border-gray-700 overflow-hidden ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card; 