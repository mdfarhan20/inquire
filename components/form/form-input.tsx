import { InputHTMLAttributes } from "react";

export function FormInput(props : InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input 
      { ...props }
      className={`
        bg-transparent outline-none pb-2 focus:border-b-2
        focus:border-zinc-400 transition-all duration-100
        
        ${props.className}
      `}
      autoComplete={props.autoComplete || "off"}
    />
  )
}