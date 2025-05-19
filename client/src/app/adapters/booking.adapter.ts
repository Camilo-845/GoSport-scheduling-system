import { createBookingSchema } from '@/private/bookings/models';

export const createBookingAdapter = (booking: createBookingSchema) => {
  return {
    fecha: booking.fecha,
    hora_inicio: booking.horaInicio,
    hora_fin: booking.horaFin,
    id_cancha: Number(booking.idCancha),
    id_usuario: Number(booking.idUsuario),
  };
};
