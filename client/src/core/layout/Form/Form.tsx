import React, { FormEvent } from "react";

interface FormProps {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  className?: string;
  children: React.ReactNode;
}

const Form: React.FC<FormProps> = ({
  onSubmit,
  className,
  children,
}): React.ReactElement => {
  return (
    <form className={className} onSubmit={onSubmit}>
      {children}
    </form>
  );
};

export default Form;
