export interface Booking {
  idReserva: number;
  fecha: string;
  horaInicio: string;
  horaFin: string;
  idUsuario: number;
  idCancha: number;
  nombreCancha: string;
  nombreUsuario: string;
  apellidoUsuario: string;
}

export interface createBookingSchema {
  fecha: string;
  horaInicio: string;
  horaFin: string;
  idCancha: number;
  idUsuario: number;
}
