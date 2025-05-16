import { Event } from "../models";
export interface EventAdapter {
  id_evento: number;
  nombre: string;
  fecha: string;
  hora_inicio: string;
  id_cancha: number;
}

export interface DbEventReponse extends EventAdapter {}
export const EventObjectAdapter = (eventAdapter: EventAdapter) => {
  if (eventAdapter.id_evento) {
    return new Event(
      eventAdapter.nombre,
      eventAdapter.fecha,
      eventAdapter.hora_inicio,
      eventAdapter.id_cancha,
      eventAdapter.id_evento,
    );
  }
  return new Event(
    eventAdapter.nombre,
    eventAdapter.fecha,
    eventAdapter.hora_inicio,
    eventAdapter.id_cancha,
  );
};
