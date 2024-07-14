
import Pagination from "@/components/form/pagination";
import UserResponseData from "@/components/form/user-response-data";
import { fetchFormFields, fetchFormById, fetchFormSubmitters } from "@/lib/form/data";

interface FormResponsesPageProps {
  params: { id: string },
  searchParams: { 
    submission?: string 
  }
}

export default async function FormResponsesPage({ params, searchParams }: FormResponsesPageProps) {
  const formId = params.id;
  const [form, formFields, users] = await Promise.all([ 
    fetchFormById(formId),
    fetchFormFields(formId),
    fetchFormSubmitters(formId)
  ]);
  const submission = Number(searchParams.submission) || 1;

  return (
    <main className="grow grid place-items-center p-4">
      <div className="max-w-95 w-full md:w-3/4 lg:w-1/2 flex flex-col gap-4 h-full">
        <section className="border-1 border-secondary p-4 rounded-lg">
          <h1 className="text-3xl mb-4">{ form.title }</h1>
          <p className="text-zinc-400">{ form.description }</p>
        </section>
        <section className="grid gap-4">
          <UserResponseData 
            user={users[submission - 1]}
            formFields={formFields}
          />

          <Pagination className="ml-auto mr-auto" totalPages={users.length} />
        </section>
      </div>
    </main>
  )
}