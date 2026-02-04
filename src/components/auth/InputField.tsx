import { forwardRef, type ChangeEvent, type ForwardedRef } from "react";
import classes from "./InputField.module.css";

export interface InputFieldProps {
  type?: "text" | "email" | "password" | "number";
  label: string;
  name: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  hasError: boolean;
  errorMessage?: string;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>((props, ref: ForwardedRef<HTMLInputElement | null>) => {
  const inputClasses = props.hasError ? "invalid" : "";

  return (
    <div className={`${classes.control} ${classes[inputClasses]}`}>
      <label htmlFor={props.name}>{props.label}</label>
      <input
        type={props.type ? props.type : "text"}
        id={props.name}
        onChange={props.onChange}
        onBlur={props.onBlur}
        value={props.value}
        ref={ref}
      />
      {props.hasError && (
        <p className={classes["error-text"]}>
          {props.errorMessage ? props.errorMessage : "Invalid input"}
        </p>
      )}
    </div>
  );
});

export default InputField;
