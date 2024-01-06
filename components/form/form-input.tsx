import { InputHTMLAttributes } from "react";

export function FormInput(
  { 
    name,
    placeholder,
    required=false,
    className,
    defaultValue,
    value,
    onClick,
    onChange,
  } : InputHTMLAttributes<HTMLInputElement>
) {
  return (
    <input 
      name={name}
      placeholder={placeholder}
      defaultValue={defaultValue}
      required={required}
      className={`
        bg-transparent outline-none pb-2 focus:border-b-2
        focus:border-zinc-400 transition-all duration-100

        ${className}
      `}
      value={value}
      onClick={onClick}
      onChange={onChange}
    />
  )
}