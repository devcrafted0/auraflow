import { z } from "zod";

export const CreateBoardSchema = z.object({
  title: z.string().min(3, {
    message: "Minimum length of 3 is required",
  }),
});
