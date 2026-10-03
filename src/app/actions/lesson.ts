"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function createLesson(formData: FormData) {
  const trailId = formData.get("trailId") as string;
  const title = formData.get("title") as string;
  const type = formData.get("type") as string;
  const duration = formData.get("duration") as string;
  const xpReward = parseInt(formData.get("xpReward") as string, 10);

  if (!title || !type || !duration) {
    throw new Error("Preencha todos os campos da aula.");
  }

  // Get current max order
  const existingLessons = await prisma.lesson.findMany({
    where: { trailId }
  });
  const newOrder = existingLessons.length;

  await prisma.lesson.create({
    data: {
      trailId,
      title,
      type,
      duration,
      xpReward: isNaN(xpReward) ? 200 : xpReward,
      order: newOrder,
    },
  });

  revalidatePath(`/professor/trilhas/${trailId}/aulas`);
}
