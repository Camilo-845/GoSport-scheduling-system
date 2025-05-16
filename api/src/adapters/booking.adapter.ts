import { Booking } from "../models";

export interface BookingAdapter {
  id_reserva: number;
  fecha: string;
  hora_inicio: string;
  hora_fin: string;
  id_usuario: number;
  id_cancha: number;
}

export interface DbBookingResponse extends BookingAdapter {}
export const BookingObjectAdapter = (bookingAdapter: BookingAdapter) => {
  if (bookingAdapter.id_reserva) {
    return new Booking(
      bookingAdapter.fecha,
      bookingAdapter.hora_inicio,
      bookingAdapter.hora_fin,
      bookingAdapter.id_usuario,
      bookingAdapter.id_cancha,
      bookingAdapter.id_reserva,
    );
  }
  return new Booking(
    bookingAdapter.fecha,
    bookingAdapter.hora_inicio,
    bookingAdapter.hora_fin,
    bookingAdapter.id_usuario,
    bookingAdapter.id_cancha,
  );
};
