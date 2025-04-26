import { z } from "zod";
export const userUpdateSchema = z.object({
  nombre: z.string(),
  apellido: z.string(),
  telefono: z.number().gte(0).lte(9999999999),
});
