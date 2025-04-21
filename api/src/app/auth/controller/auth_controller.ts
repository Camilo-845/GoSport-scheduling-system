import { Request, Response } from "express";
import Auth_DAO from "../dao/auth_DAO";

class Auth_Controller extends Auth_DAO {
  public async registerUser(req: Request, res: Response) {
    const { nombre, apellido, email, telefono, password } = req.body;

    const data = [nombre, apellido, email, telefono, password];
    console.log("data", data);
    Auth_Controller.registrarUsuario(data, res);
  }

  public async loginUser(req: Request, res: Response) {
    const { email, password } = req.body;

    const data = [email, password];
    Auth_Controller.iniciarSesion(data, res);
  }
}

const authController = new Auth_Controller();
export default authController;
