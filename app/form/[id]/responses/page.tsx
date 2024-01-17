
import FieldResponseData from "@/components/form/field-response-data";
import { fetchFormFields, fetchFormById } from "@/lib/form/data";

export default async function FormResponsesPage({ params }: { params: { id: string } }) {
  const formId = params.id;
  const [form, formFields] = await Promise.all([ 
    fetchFormById(formId),
    fetchFormFields(formId)
  ]);

  return (
    <main className="grow grid place-items-center p-4">
      <div className="max-w-95 w-full md:w-3/4 lg:w-1/2 flex flex-col gap-4 h-full">
        <section>
          <h1>{ form.title }</h1>
          <p>{ form.description }</p>
        </section>
        <section className="grid gap-4">
          { formFields.map((field) => (
            <FieldResponseData
              key={field.id}
              formField={field}
            />
          )) }
        </section>
      </div>
      
    </main>
  )
}