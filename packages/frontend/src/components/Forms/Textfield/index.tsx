"use client";
import { useFormContext } from "react-hook-form";

export interface ITextFieldProps {
  id: string;
  helperText?: string;
  placeholderText: string;
  label: string;
  required: boolean;
  isPassword?: boolean;
}

export const TextField = ({
  id,
  helperText,
  label,
  placeholderText,
  required,
  isPassword = false,
}: ITextFieldProps) => {
  const { register } = useFormContext();
  return (
    <div className="field">
      <label className="label">{label}</label>
      <div className="control">
        <input
          {...register(id, { required })}
          className="input"
          type={isPassword ? "password" : "text"}
          placeholder={placeholderText}
        />
      </div>
    </div>
  );
};
