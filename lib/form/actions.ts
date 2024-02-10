"use server";

import prisma from "@/prisma/client";
import { redirect } from "next/navigation";
import { FieldResponseType, FormDataType, FormFieldType } from "@/lib/form/types";
import { getSession } from "@/lib/get-session";

export type FormState = {
  success: boolean,
  message?: string,
  formId?: string,
}

export async function createForm(formData: FormDataType, state: FormState) {
  const session = await getSession();

  const form = await prisma.form.create({
    data: {
      title: formData.title,
      description: formData.description || null,
      userId: session?.userId
    }
  });

  formData.fields.forEach( async (field, index) => {
    await createFormField(field, form.id, index)
  });

  return {
    success: true,
    message: "Form Created Successfully",
    formId: form.id
  };
}

export async function createFormField(fieldData: FormFieldType, formId: string, index: number) {
  try {
    const formField = await prisma.formField.create({
      data: {
        question: fieldData.question,
        type: fieldData.type,
        required: fieldData.required,
        formId: formId,
        index: index
      }
    });

    fieldData.options.forEach(async (option) => {
      await createFieldOption(option, formField.id)
    })
  } catch(err) {
    console.log(err);
  }
}

export async function createFieldOption(optionText: string, fieldId: string) {
  try {
    await prisma.formFieldOption.create({
      data: {
        text: optionText,
        formFieldId: fieldId,
      }
    });
  } catch (err) {
    console.log(err);
  }
}


export async function submitFormResponse(formId: string, formResponse: FieldResponseType[], prevState: FormState) {
  const session = await getSession();

  try {
    await prisma.formSubmission.create({
      data: {
        userId: session?.userId,
        formId
      }
    });
  } catch (err) {
    console.log(err);
  }

  formResponse.forEach(async (response) => {
    if (response.answer instanceof Array) {
      response.answer.forEach(async (answer) => {
        await prisma.formFieldResponse.create({
          data: {
            answer,
            userId: session?.userId,
            formFieldId: response.formFieldId
          }
        });
      });
    } else {
      await prisma.formFieldResponse.create({
        data: {
          answer: response.answer,
          userId: session?.userId,
          formFieldId: response.formFieldId
        }
      })
    }
  });

  return {
    success: true,
    message: "Response Submitted"
  }
}