import clsx from "clsx";
import React, { FC, ChangeEvent, FocusEvent } from "react";

interface InputTextFieldProps {
  type: string;
  placeholder: string;
  id: string;
  name: string;
  label: string;
  value: string;
  onChange?: (event: ChangeEvent<any>) => void;
  onBlur: (event: FocusEvent<any>) => void;
  error?: boolean;
  helperText?: string | boolean;
  isvalid?: boolean;
}

const InputTextField: FC<InputTextFieldProps> = ({
  type,
  placeholder,
  id,
  name,
  label,
  value,
  onChange,
  onBlur,
  error,
  helperText,
  isvalid,
}) => {
  return (
    // <div className="form-group col-md-4">
    //     <label htmlFor="middle_name">Middle Name</label>
    //     <input type="text" className="form-control" id="middle_name" name="middle_name" value={""} />
    // </div>
    <div className="fv-row mb-3">
      <label htmlFor={id} className="form-label fw-bolder text-dark fs-6 mb-0">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        autoComplete="off"
        className={clsx(
          "form-control bg-transparent",
          {
            "is-invalid": error,
          },
          {
            "is-valid": isvalid,
          }
        )}
      />
      {error && (
        <div className="fv-plugins-message-container">
          <div className="fv-help-block text-danger">
            <span role="alert">{helperText}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default InputTextField;


