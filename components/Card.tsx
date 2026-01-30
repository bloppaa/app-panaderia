import React, { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = "" }) => {
  return (
    <div
      className={`
        bg-white rounded-lg border-2 border-gray-200 p-6
        shadow-sm
        ${className}
      `}
    >
      {children}
    </div>
  );
};
