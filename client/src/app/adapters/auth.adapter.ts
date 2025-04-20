import { LoginResponse } from '@/models';

export const AuthAdapter = (loginRespose: LoginResponse) => loginRespose.token;
