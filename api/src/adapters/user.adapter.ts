import { User } from "../models";
import { AuthAdapter } from "./auth.adapter";

export interface DbUserResponse extends AuthAdapter {
  idUsuario: number;
  nombre: string;
  apellido: string;
  telefono: number;
}

export const userAdapter = (dbUserResponse: DbUserResponse) => {
  return new User(
    dbUserResponse.nombre,
    dbUserResponse.apellido,
    dbUserResponse.email,
    dbUserResponse.telefono,
    dbUserResponse.password,
    dbUserResponse.idUsuario,
  );
};
