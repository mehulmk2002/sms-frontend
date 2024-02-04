import clsx from "clsx";
import React, { FC, ChangeEvent, FocusEvent } from "react";

interface InputTextFieldProps {

    id: string;
    name: string;
    label: string;
    value: string;
    valueArray:string[],
    onChange?: (event: ChangeEvent<any>) => void;
    onBlur: (event: FocusEvent<any>) => void;
    error?: boolean;
    helperText?: string | boolean;
    isvalid?: boolean;
}
const OptionSelectField: FC<InputTextFieldProps> = ({
  
    id,
    name,
    label,
    value,
    valueArray,
    onChange,
    onBlur,
    error,
    helperText,
    isvalid,
}) => {
    return (
        <div className="fv-row mb-3">
            <label htmlFor={id} className="form-label fw-bolder text-dark fs-6 mb-0">
                {label}
            </label>
            <select className={clsx(
                "form-select bg-transparent",
                {
                    "is-invalid": error,
                },
                {
                    "is-valid": isvalid,
                }
            )} id="gender"value={value} name={name} onChange={onChange}
            onBlur={onBlur} >
                
                <option value="">Select</option>
                {
                    valueArray.map((value)=>(<option value={value}>{value}</option>))
                }
            </select>

            {error && (
                <div className="fv-plugins-message-container">
                    <div className="fv-help-block text-danger">
                        <span role="alert">{helperText}</span>
                    </div>
                </div>
            )}
        </div>

    )
}

export default OptionSelectField