import { UpdateUser } from '@/private/user/models';

export const updateUserRequestAdapter = (userData: UpdateUser) => {
  return {
    nombre: userData.nombre,
    apellido: userData.apellido,
    telefono: Number(userData.telefono),
  };
};
