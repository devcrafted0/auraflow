"use server";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const CreateBoardSchema = z.object({
  title: z.string().min(3, {
    message: "Minimum length of 3 is required",
  }),
});

export type State = {
  errors?: { title?: string[] };
  message?: string | null;
};

export const createBoard = async (prevState: State, formData: FormData) => {
  const validatedValues = CreateBoardSchema.safeParse({
    title: formData.get("title"),
  });

  if (!validatedValues.success) {
    return {
      errors: validatedValues.error.flatten().fieldErrors,
      message: "Missing fields",
    };
  }
  const { title } = validatedValues.data;

  try {
    await db.board.create({
      data: {
        title,
      },
    });
  } catch {
    return {
      message: "Database Error",
    };
  }

  revalidatePath("/organization/org_3841BUqIPa0EvIuehPTcrLcc4Lk");
  redirect("/organization/org_3841BUqIPa0EvIuehPTcrLcc4Lk");
};
