import {
  createEventSchema,
  Event_model,
  GetEventResponse,
} from '@/private/events/models/event.model';

export const getEventsResponse = (getEventsResponse: GetEventResponse) => {
  const adaptedEvent: Event_model = {
    nombre: getEventsResponse.nombre,
    fecha: getEventsResponse.fecha,
    hora_inicio: getEventsResponse.horaInicio,
    id_evento: getEventsResponse.idEvento,
    id_cancha: getEventsResponse.idCancha,
    esParticipante: getEventsResponse.esParticipante,
  };
  return adaptedEvent;
};

export const createEventAdapter = (event: createEventSchema) => {
  return {
    nombre: event.nombre,
    fecha: event.fecha,
    hora_inicio: event.horaInicio,
    id_cancha: Number(event.idCancha),
  };
};
