"use server";
import { auth } from "@/auth";
import prisma from "@/prisma/connection";
import { Mark } from "@/types/Mark";

export const getUserMarks = async () => {
  const session = await auth();

  const marksArray: Mark[] = await prisma.marks.findMany({
    where: {
      user: {
        email: { equals: session?.user.email ?? "" },
      },
    },
    orderBy: {
      last_listen: "desc",
    },
  });

  return marksArray;
};

export const deleteMark = async (markId: string) => {
  const session = await auth();

  await prisma.marks.delete({
    where: {
      id: markId,

      user: {
        email: { equals: session?.user.email ?? "" },
      },
    },
  });
};
