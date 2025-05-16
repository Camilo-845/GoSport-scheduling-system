export class Event {
  id_evento?: number;
  nombre: string;
  fecha: string; // ISO format: YYYY-MM-DD
  hora_inicio: string; // Format: HH:mm:ss
  id_cancha: number;

  constructor(
    nombre: string,
    fecha: string,
    hora_inicio: string,
    id_cancha: number,
    id_evento?: number,
  ) {
    this.id_evento = id_evento;
    this.nombre = nombre;
    this.fecha = fecha;
    this.hora_inicio = hora_inicio;
    this.id_cancha = id_cancha;
  }
  toArray() {
    return [this.nombre, this.fecha, this.hora_inicio, this.id_cancha];
  }
}
