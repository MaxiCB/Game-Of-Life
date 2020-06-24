import React from "react";

interface ButtonProps {
  title: string;
  action: () => void;
}

const Button: React.FC<ButtonProps> = ({ title, action }) => {
  return (
    <button className="button" onClick={(_) => action()}>
      {title}
    </button>
  );
};

export default Button;
