import { Court } from "../models";

export interface CourtAdapter {
  id_cancha: number;
  nombre: string;
  capacidad: number;
  id_deporte: number;
}

export interface DbCourtResponse extends CourtAdapter {}

export const CourtObjectAdapter = (courtAdapter: CourtAdapter) => {
  if (courtAdapter.id_cancha) {
    return new Court(
      courtAdapter.nombre,
      courtAdapter.capacidad,
      courtAdapter.id_deporte,
      courtAdapter.id_cancha,
    );
  }
  return new Court(
    courtAdapter.nombre,
    courtAdapter.capacidad,
    courtAdapter.id_deporte,
  );
};
