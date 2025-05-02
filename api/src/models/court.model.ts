// models/Cancha.ts
export class Court {
  id_cancha?: number;
  nombre: string;
  capacidad: number;
  id_deporte: number;
  constructor(
    nombre: string,
    capacidad: number,
    id_deporte: number,
    id_cancha?: number,
  ) {
    this.id_cancha = id_cancha;
    this.nombre = nombre;
    this.capacidad = capacidad;
    this.id_deporte = id_deporte;
  }
  toArray() {
    return [this.nombre, this.capacidad, this.id_deporte];
  }
}
