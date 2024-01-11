import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Loader2 as Loading } from "lucide-react";
import { ButtonHTMLAttributes } from "react";

interface FormSubmitButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string,
  pendingText: string
}

export default function FormSubmitButton({ text, pendingText, ...props }: FormSubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} { ...props } >
      { pending ? (
        <>
          <Loading className="mr-2 h-4 w-4 animate-spin" />
          {pendingText}
        </>
      ) : text }
    </Button>
  );
}