// models/Reserva.ts
export class Booking {
  id_reserva?: number;
  fecha: string;
  hora_inicio: string;
  hora_fin: string;
  id_usuario: number;
  id_cancha: number;

  constructor(
    fecha: string,
    hora_inicio: string,
    hora_fin: string,
    id_usuario: number,
    id_cancha: number,
    id_reserva?: number,
  ) {
    (this.id_reserva = id_reserva),
      (this.fecha = fecha),
      (this.hora_inicio = hora_inicio),
      (this.hora_fin = hora_fin),
      (this.id_usuario = id_usuario),
      (this.id_cancha = id_cancha);
  }
  toArray() {
    return [
      this.fecha,
      this.hora_inicio,
      this.hora_fin,
      this.id_usuario,
      this.id_cancha,
    ];
  }
}
