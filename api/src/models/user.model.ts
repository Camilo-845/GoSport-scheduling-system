import bcrypt from "bcryptjs";

export class Auth {
  email: string;
  password: string;

  constructor(email: string, password: string) {
    (this.email = email), (this.password = password);
  }
  toArray(): (string | number)[] {
    return [this.email, this.password];
  }
  async encrytPassword() {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  async isValidPassword(password: string) {
    return await bcrypt.compare(password, this.password);
  }
}
export class User extends Auth {
  id_usuario?: number;
  nombre: string;
  apellido: string;
  telefono: number;
  constructor(
    nombre: string,
    apellido: string,
    email: string,
    telefono: number,
    password: string,
    id_usuario?: number,
  ) {
    super(email, password);
    this.id_usuario = id_usuario;
    this.nombre = nombre;
    this.apellido = apellido;
    this.telefono = telefono;
  }
  toArray() {
    return [
      this.nombre,
      this.apellido,
      this.email,
      this.telefono,
      this.password,
    ];
  }
  toJSON() {
    return {
      id_usuario: this.id_usuario,
      nombre: this.nombre,
      email: this.email,
      apellido: this.apellido,
      telefono: this.telefono,
    };
  }
}
