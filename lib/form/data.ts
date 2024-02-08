
import prisma from "@/prisma/client";
import type { Form, FormFieldOption, FormFieldResponse, User } from "@prisma/client";
import type { FormFieldWithOptions, FormSubmissionWithUser, ResponseWithCount } from "./types";

export async function fetchFormById(formId: string) {
  const form: Form = await prisma.form.findUnique({
    where: { id: formId } 
  });

  return form;
}

export async function fetchFormFields(formId: string) {
  const formFields: FormFieldWithOptions[] = await prisma.formField.findMany({
    where: { formId },
    include: { options: true },
    orderBy: { index: "asc" }
  });

  return formFields;
}

export async function fetchFormFieldOptions(fieldId: string) {
  const options: FormFieldOption[] | null = await prisma.formFieldOption.findMany({
    where: { formFieldId: fieldId },
  });

  return options;
}

export async function fetchResponseByField(fieldId: string) {
  const responses: ResponseWithCount[] = await prisma.formFieldResponse.groupBy({
    by: "answer",
    where: {
      formFieldId: fieldId
    },
    _count: true
  });

  return responses;
}

export async function fetchFormSubmitters(formId: string) {
  const submissions: FormSubmissionWithUser[] = await prisma.formSubmission.findMany({
    select: {
      user: {
        select: {
          id: true,
          email: true,
        }
      }
    },
    where: { formId },
  });

  const users = submissions.map((submission) => submission.user);
  return users;
}

export async function fetchUserFieldResponse(userId: string, fieldId: string) {
  const responses: FormFieldResponse[] = await prisma.formFieldResponse.findMany({
    where: {
      userId,
      formFieldId: fieldId
    }
  });

  return responses;
}