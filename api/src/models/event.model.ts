// models/Evento.ts
export interface Event {
  id_evento: number;
  nombre: string;
  fecha: string; // ISO format: YYYY-MM-DD
  hora_inicio: string; // Format: HH:mm:ss
  id_cancha: number;
}
