import React, { ButtonHTMLAttributes, ReactNode } from "react";

import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "outline" | "call";
  children?: ReactNode;
}
const ClassButton: React.FC<ButtonProps> = ({
  className,
  variant = "primary",
  children,
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
  return (
    <button
      {...props}
      className={clsx("text-white rounded-md shadow", variantClass[variant])}
    >
      {children}
    </button>
  );
};

export default ClassButton;
