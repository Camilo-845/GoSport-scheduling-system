import { Auth, User } from "../models";

export interface AuthAdapter {
  email: string;
  password: string;
}
export const authAdapter = (authAdapter: AuthAdapter) => {
  return new Auth(authAdapter.email, authAdapter.password);
};
