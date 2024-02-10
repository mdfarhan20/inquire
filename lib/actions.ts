"use server";

import { hash } from "bcrypt";
import prisma from "@/prisma/client";
import { redirect } from "next/navigation";


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