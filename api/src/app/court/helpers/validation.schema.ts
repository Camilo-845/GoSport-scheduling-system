import { z } from "zod";

export const courtCreateSchema = z.object({
  nombre: z.string(),
  capacidad: z.number(),
  id_deporte: z.number(),
});
