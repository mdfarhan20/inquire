import { fetchResponseByField } from "@/lib/form/data";
import { FormField } from "@prisma/client";
import type { ResponseWithCount } from "@/lib/form/types";
import { ReactElement } from "react";
import { BarChart } from "@/components/ui/charts";

interface FieldResponseDataProps {
  formField: FormField
}

export default async function FieldResponseData({ formField }: FieldResponseDataProps) {
  const responses = await fetchResponseByField(formField.id);

  const ResponseData = (): ReactElement => {
    if (formField.type === "CHECKBOX" || formField.type === "MCQ") {
      const labels = responses.map((response) => response.answer);
      const datasets = [{
        label: "Responses",
        data: responses.map((response) => response._count)
      }];
      return <BarChart labels={labels} datasets={datasets} />
    }

    return <TextResponseDataView responses={responses} />
  }

  return (
    <div className="grid gap-2 p-4 border-1 border-border rounded-md">
      <p>{ formField.question }</p>
      <ResponseData />
    </div>
  )
}

function TextResponseDataView({ responses }: { responses: ResponseWithCount[] }) {
  return (
    <div className="grid gap-2">
      { responses.map((response: ResponseWithCount, index: number) => (
        <p key={index} className="border-1 border-border rounded-md p-2 flex">
          { response.answer }
          <span className="ml-auto px-2 bg-border rounded-md">{ response._count }</span>
        </p>
      )) }
    </div>
  );
}