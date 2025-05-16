import { z } from "zod";
export const bookingCreateSchema = z.object({
  fecha: z.string().date(),
  hora_inicio: z.string(),
  hora_fin: z.string(),
  id_usuario: z.number(),
  id_cancha: z.number(),
});
