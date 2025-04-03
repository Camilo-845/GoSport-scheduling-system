import { Request, Response } from "express";
import Auth_DAO from "../dao/auth_DAO";

class Auth_Controller extends Auth_DAO {
    public async registerUser(req: Request, res: Response) {
        const {
            nombre,
            apellido,
            correoElectronico,
            telefono,
            user_name,
            contrasena
        } = req.body;

        const data = [
            nombre,
            apellido,
            correoElectronico,
            telefono,
            user_name,
            contrasena
        ];

        Auth_Controller.registrarUsuario(data, res);
    }

    public async loginUser(req: Request, res: Response) {
        const {
            correoElectronico,
            contrasena
        } = req.body;

        const data = [correoElectronico, contrasena];
        Auth_Controller.iniciarSesion(data, res);
    }
}

const authController = new Auth_Controller();
export default authController;
