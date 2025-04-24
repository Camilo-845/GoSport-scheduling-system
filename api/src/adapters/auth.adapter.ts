import { Auth, User } from "../models";

export interface AuthAdapter {
  email: string;
  password: string;
}
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

export const authAdapter = (authAdapter: AuthAdapter) => {
  return new Auth(authAdapter.email, authAdapter.password);
};
