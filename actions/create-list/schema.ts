import { z } from "zod";

export const CreateListSchema = z.object({
  title: z.string().min(3, {
    message: "Minimum length of 3 is required",
  }),
  boardId: z.string(),
});
