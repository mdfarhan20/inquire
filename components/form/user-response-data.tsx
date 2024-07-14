import { fetchUserFieldResponse } from "@/lib/form/data";
import { FormFieldWithOptions, FormSubmitters } from "@/lib/form/types";
import { CiMail as MailIcon } from "react-icons/ci";

interface UserResponseDataProps {
  user: FormSubmitters,
  formFields: FormFieldWithOptions[]
}

export default async function UserResponseData({ user, formFields }: UserResponseDataProps) {
  return (
    <div>
      <div className="flex justify-between items-center mb-4 py-2 px-4 bg-secondary rounded-lg">
        <p>{ user.email }</p>
        <MailIcon size="1.2rem" />
      </div>

      <div className="grid gap-4">
        { formFields.map((field, index) => (
          <UserFieldResponse
            key={index}
            field={field}
            userId={user.id}
          />
        )) }
      </div>
    </div>
  )
}

interface UserFieldResponseProps {
  field: FormFieldWithOptions,
  userId: string
}

async function UserFieldResponse({ field, userId }: UserFieldResponseProps) {
  const responses = await fetchUserFieldResponse(userId, field.id);

  return (
    <div className="border-1 border-secondary rounded-md p-4">
      <div className="flex justify-between">
        <p className="mb-2">{ field.question }</p>
        <p className="uppercase text-sm text-zinc-600">{ field.type }</p>
      </div>
      {responses.length === 0 ? (
        <p className="text-secondary">No response</p>
      ): (
        <ul className="grid gap-2">
          { responses.map((response, index) => (
            <li
              key={index}
              className="py-2 px-4 border-secondary border-1 rounded-md text-sm"
            >
              { response.answer ? response.answer : "No response" }
            </li>
          )) }
        </ul>
      )}
    </div>
  )
}