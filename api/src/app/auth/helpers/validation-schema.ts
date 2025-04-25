import { z } from "zod";

export const authRegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(2),
  nombre: z.string(),
  apellido: z.string(),
  telefono: z.number().gte(0).lte(9999999999),
});

export const authLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(2),
});

export const authChangePasswordSchema = z.object({
  oldPassword: z.string().min(2),
  newPassword: z.string().min(2),
});

export const authDeleteUserSchema = z.object({
  password: z.string().min(2),
});
