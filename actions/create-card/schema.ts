import { z } from "zod";

export const CreateCardSchema = z.object({
  title: z.string().min(3, {
    message: "Minimum length of 3 is required",
  }),
  boardId: z.string(),
  listId: z.string(),
});
