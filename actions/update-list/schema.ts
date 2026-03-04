import { z } from "zod";

export const UpdateListSchema = z.object({
  title: z.string().min(3, {
    message: "Minimum length of 3 is required",
  }),
  id: z.string(),
  boardId: z.string(),
});
