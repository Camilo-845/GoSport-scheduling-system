import { GetSportResponse, Sport } from '@/private/sports/models';

export const getSportsRepose = (sport: GetSportResponse) => {
  const adaptedSport: Sport = {
    nombre: sport.nombre,
    id_deporte: sport.idDeporte,
  };
  return adaptedSport;
};
