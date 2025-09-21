import React, { ButtonHTMLAttributes, ReactNode, memo } from "react";

import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "outline" | "call";
  size?: "xs" | "md" | "lg";
  icon?: ReactNode;
  children?: ReactNode;
  iconPosition?: "right" | "left";
}
const Button: React.FC<ButtonProps> = ({
  className,
  variant = "primary",
  size = "lg",
  icon,
  children,
  iconPosition = "left",
  ...props
}) => {
  const variantClass = {
    primary: "bg-blue-500 hover:bg-blue-800",
    secondary: "bg-gray-500 hover:bg-gray-800",
    danger: "bg-red-500 hover:bg-red-800",
    outline:
      "outline-2 outline-offset-2 outline-blue-500 hover:outline-blue-800",
    call: "bg-green-500 hover:bg-green-800",
  };

  const sizeClass = {
    xs: "px-2 py-2 text-sm",
    md: "px-4 py-3 text-base",
    lg: "px-6 py-4 text-lg",
  };
  return (
    <button
      {...props}
      className={clsx(
        "text-white rounded-md shadow",
        variantClass[variant],
        sizeClass[size],
        className,
      )}
    >
      {icon && iconPosition === "left" && (
        <span className="inline-flex">{icon}</span>
      )}
      <span>{children}</span>
      {icon && iconPosition === "right" && (
        <span className="inline-flex">{icon}</span>
      )}
    </button>
  );
};

export default memo(Button);
