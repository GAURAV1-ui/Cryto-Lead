import React from 'react';

interface PageHeaderProps {
  title: string;
  className?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title
}) => {
  return (
    <div className="mb-10 text-center">
      <h1 className="text-3xl text-white font-bold bg-clip-text">
        {title}
      </h1>
    </div>
  );
};

export default PageHeader; 