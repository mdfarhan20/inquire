import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Loader2 as Loading } from "lucide-react";
import { ButtonHTMLAttributes } from "react";

interface FormSubmitButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string,
  pendingText: string
  variant?: "ghost" | "secondary" | "outline"
}

export default function FormSubmitButton({ text, pendingText, variant, ...props }: FormSubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} { ...props } variant={variant} >
      { pending ? (
        <>
          <Loading className="mr-2 h-4 w-4 animate-spin" />
          {pendingText}
        </>
      ) : text }
    </Button>
  );
}