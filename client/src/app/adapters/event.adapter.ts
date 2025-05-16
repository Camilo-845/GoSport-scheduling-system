import {
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
