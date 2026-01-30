import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
  size?: "small" | "medium" | "large";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "large", className = "", ...props }, ref) => {
    const variantClasses = {
      primary: "bg-green-600 hover:bg-green-700 text-white",
      secondary: "bg-gray-600 hover:bg-gray-700 text-white",
      danger: "bg-red-600 hover:bg-red-700 text-white",
    };

    const sizeClasses = {
      small: "px-3 py-2 text-base",
      medium: "px-4 py-3 text-lg",
      large: "px-6 py-4 text-xl min-h-[60px]",
    };

    return (
      <button
        ref={ref}
        className={`
          rounded-lg font-semibold transition-colors duration-200
          disabled:opacity-50 disabled:cursor-not-allowed
          ${variantClasses[variant]}
          ${sizeClasses[size]}
          ${className}
        `}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";
