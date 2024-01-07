import { InputHTMLAttributes } from "react";

export function FormInput(props : InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input 
      name={props.name}
      placeholder={props.placeholder}
      defaultValue={props.defaultValue}
      required={props.required}
      className={`
        bg-transparent outline-none pb-2 focus:border-b-2
        focus:border-zinc-400 transition-all duration-100

        ${props.className}
      `}
      value={props.value}
      onClick={props.onClick}
      onChange={props.onChange}
    />
  )
}