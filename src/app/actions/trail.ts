"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

export async function createTrail(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const classGroupId = formData.get("classGroupId") as string;

  if (!title || !classGroupId) {
    throw new Error("Título e Turma são obrigatórios.");
  }

  const trail = await prisma.trail.create({
    data: {
      title,
      description,
      classGroupId,
    },
  });

  revalidatePath("/professor/trilhas");
  redirect(`/professor/trilhas/${trail.id}/aulas`);
}
