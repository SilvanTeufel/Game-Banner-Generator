
import React from 'react';

interface RobotIconProps {
  className?: string;
}

export const RobotIcon: React.FC<RobotIconProps> = ({ className }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      className={className}
    >
      <rect x="2" y="7" width="20" height="10" rx="2" ry="2"></rect>
      <path d="M7 17v-4"></path>
      <path d="M17 17v-4"></path>
      <path d="M12 17v-4"></path>
      <path d="M7 7V5c0-1.1.9-2 2-2h6c1.1 0 2 .9 2 2v2"></path>
      <circle cx="12" cy="12" r="1.5"></circle>
    </svg>
  );
};
