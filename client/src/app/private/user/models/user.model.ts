export interface User {
  id_usuario: number;
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
