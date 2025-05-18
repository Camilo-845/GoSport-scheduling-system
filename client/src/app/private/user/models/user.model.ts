export interface User {
  idUsuario: number;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
}

export interface UpdateUser {
  nombre: string;
  apellido: string;
  telefono: string;
}
