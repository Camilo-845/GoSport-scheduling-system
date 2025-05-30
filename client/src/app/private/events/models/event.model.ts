export interface Event_model {
  id_evento: number;
  nombre: string;
  fecha: string; // ISO format: YYYY-MM-DD
  hora_inicio: string; // Format: HH:mm:ss
  id_cancha: number;
  esParticipante: boolean;
}

export interface GetEventResponse {
  nombre: string;
  fecha: string;
  idEvento: number;
  horaInicio: string;
  idCancha: number;
  esParticipante: boolean;
}

export interface createEventSchema {
  nombre: string;
  fecha: string;
  horaInicio: string;
  idCancha: string;
}
