import { z } from "zod";
export const eventCreateSchema = z.object({
  nombre: z.string(),
  fecha: z.string().date(),
  hora_inicio: z.string().time(),
  id_cancha: z.number(),
});
