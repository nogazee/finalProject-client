import type { PropsWithChildren } from "react";
import classes from "./Button.module.css";

interface ButtonProps
  extends PropsWithChildren<{
    type?: "button" | "submit" | "reset" | undefined;
    className?: string;
    onClick?: () => void;
    disabled?: boolean;
  }> {}

const Button: React.FC<ButtonProps> = (props) => {
  return (
    <button
      className={`${classes.button} ${props.className}`}
      type={props.type || "button"}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
