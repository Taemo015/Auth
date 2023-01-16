import React, { ChangeEvent, forwardRef } from "react";

enum InputVariant {
  input = "input",
  textarea = "textarea",
}

enum InputType {
  text = "text",
  email = "email",
  password = "password",
}

interface InputProps
  extends React.HTMLProps<HTMLInputElement | HTMLTextAreaElement> {
  placeholder: string;
  className?: string;
  variant?: string;
  value?: string;
}

const Input = forwardRef<HTMLInputElement & HTMLTextAreaElement, InputProps>(
  (props, ref) => {
    const {
      type = InputType.text,
      placeholder,
      className,
      variant,
      value,
      onChange,
    } = props;

    const Component = variant ? InputVariant.input : InputVariant.textarea;

    return (
      <Component
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        className={className}
        type={type}
        ref={ref}
      />
    );
  }
);

export default Input;
