import { z } from "zod";

export const eventJoinParticipantSchema = z.object({
  id_usuario: z.number(),
});
