import { FormField } from "@/components/form/form-field";
import TitleCard from "@/components/form/title-card";

export default function CreateFormPage() {
  

  return (
    <main className="grid place-items-center p-4">
      <div className="max-w-95 w-full md:w-3/4 lg:w-1/2 grid gap-4">
        <TitleCard />

        <FormField />
      </div>
    </main>
  );
}