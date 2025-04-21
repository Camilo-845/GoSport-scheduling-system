import { LoginResponse, RegisterData } from '@/models';

export const AuthAdapter = (loginRespose: LoginResponse) => loginRespose.token;
export const RegisterRequestAdapter = (registerRequest: RegisterData) => ({
  nombre: registerRequest.firstName,
  apellido: registerRequest.lastName,
  telefono: Number(registerRequest.number),
  email: registerRequest.email,
  password: registerRequest.password,
});
