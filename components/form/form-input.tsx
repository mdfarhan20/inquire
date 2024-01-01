import { title } from "process"

interface FormInputProps {
  name: string,
  placeholder?: string,
  required?: boolean,
  defaultValue?: string,
  className?: string
}

export function FormInput(
  { 
    name,
    placeholder="",
    required=false,
    className="",
    defaultValue=""
  } : FormInputProps
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
    />
  )
}