import React, { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  size?: "small" | "medium" | "large";
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, size = "large", className = "", ...props }, ref) => {
    const sizeClasses = {
      small: "px-3 py-2 text-base",
      medium: "px-4 py-3 text-lg",
      large: "px-4 py-4 text-2xl",
    };

    return (
      <div className="w-full">
        {label && (
          <label className="block text-lg font-semibold text-gray-900 mb-2">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`
            w-full border-2 rounded-lg transition-colors duration-200
            focus:outline-none focus:ring-2 focus:ring-green-500
            ${error ? "border-red-500" : "border-gray-300"}
            ${sizeClasses[size]}
            ${className}
          `}
          {...props}
        />
        {error && <p className="text-red-600 text-base mt-1">{error}</p>}
      </div>
    );
  },
);

Input.displayName = "Input";
