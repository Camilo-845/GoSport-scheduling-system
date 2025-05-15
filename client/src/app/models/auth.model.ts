interface tokenContainer {
  token: string;
}

export interface LoginResponse extends tokenContainer {}

export interface Auth extends tokenContainer {}

export interface AuthData {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  number: string;
  firstName: string;
  lastName: string;
}

export interface NewPassword {
  oldPassword: string;
  newPassword: string;
}
