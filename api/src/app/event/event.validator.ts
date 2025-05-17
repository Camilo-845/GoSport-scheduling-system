import { z } from "zod";

const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

export const eventCreateSchema = z.object({
  nombre: z.string(),
  fecha: z.string().date(),
  hora_inicio: z
    .string()
    .refine((val) => timeRegex.test(val), { message: "Invalid Time Format" }),
  id_cancha: z.number(),
});
