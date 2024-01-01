import { Card, CardContent } from "@/components/ui/card";
import { FormInput } from "@/components/form/form-input";

export default function TitleCard() {
  return (
    <section>
      <Card className="border-t-4 border-t-primary">
        <CardContent className="p-6 grid gap-6">
          <FormInput 
            name="title"
            placeholder="Form Title"
            defaultValue="Untitled Form"
            className="text-3xl"
            required
          />          
          <FormInput 
            name="description"
            placeholder="Form description"
            required
            className="text-sm"
          />          
        </CardContent>
      </Card>
    </section>
  )
}