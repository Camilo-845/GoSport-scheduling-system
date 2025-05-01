import { z } from "zod";

export const sportRegisterSchema = z.object({
  nombre: z.string(),
});
