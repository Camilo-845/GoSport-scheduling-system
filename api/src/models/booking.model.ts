// models/Reserva.ts
export interface Booking {
  id_reserva: number;
  fecha: string; // ISO format
  hora_inicio: string;
  hora_fin: string;
  id_usuario: number;
  id_cancha: number;
}
