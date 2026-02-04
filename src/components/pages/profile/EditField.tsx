import { type ForwardedRef, forwardRef } from "react";
import InputField, { type InputFieldProps } from "../../auth/InputField";

interface EditFieldProps extends InputFieldProps {
  type?: "text" | "email" | "password" | "number";
  label: string;
  name: string;
  errorMessage?: string;
  isEditing: boolean;
  validator: (value: string) => boolean;
  initialValue?: string;
}

const EditField = forwardRef(
  (props: EditFieldProps, ref: ForwardedRef<HTMLInputElement | null>) => {
    return (
      <>
        {props.isEditing ? (
          <InputField
            type={props.type ? props.type : "text"}
            label={props.label}
            name={props.name}
            value={props.value}
            onChange={props.onChange}
            onBlur={props.onBlur}
            hasError={props.hasError}
            errorMessage={props.errorMessage}
            ref={ref}
          />
        ) : (
          <div>
            <h1>{props.label}</h1>
            <p>{props.value}</p>
          </div>
        )}
      </>
    );
  }
);

export default EditField;
