"use server";

import { hash } from "bcrypt";
import prisma from "@/prisma/client";
import { redirect } from "next/navigation";
import { FormDataType, FormFieldType } from "./form/types";
import { getSession } from "./get-session";

export async function createUser(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const hashedPassword = await hash(password, 10);
  const user = await prisma.user.create({
    data: {
      name, email,
      password: hashedPassword
    },
  });

  console.log(user);
  redirect("/auth/login");
}

export async function createForm(formData: FormDataType) {
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

  redirect("/")
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