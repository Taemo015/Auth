import React from "react";

export enum ButtonType {
  button = "button",
  submit = "submit",
}

interface ButtonProps {
  className?: string;
  type: ButtonType;
  children: React.ReactNode;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = (props) => {
  const { className, type = ButtonType.button, children, onClick } = props;

  return (
    <button onClick={onClick} type={type} className={className}>
      {children}
    </button>
  );
};

export default Button;
