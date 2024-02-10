import ResponseForm from "@/components/form/response-form";
import TitleCard from "@/components/form/title-card";
import { fetchFormById, fetchFormFields } from "@/lib/form/data";

export default async function FormPage({ params }: { params: { id: string }}) {
  const formId = params.id;
  const [ form, formFields ] = await Promise.all([
    fetchFormById(formId),
    fetchFormFields(formId) 
  ]);


  return (
    <main className="grow grid place-items-center p-4">
      <div className="max-w-95 w-full md:w-3/4 lg:w-1/2 flex flex-col gap-4 h-full">
        <TitleCard
          title={form.title}
          description={form.description}
        />
        
        <ResponseForm
          formFields={formFields}
          formId={formId}
        />
      </div>
    </main>
  );
}