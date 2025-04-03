import { Response } from "express";
import { SQL_AUTH } from "../repository/sql_auth";
import pool from "../../../config/connection/dbConnection";
import * as bcrypt from "bcryptjs"; // Cambiado a import *
import jwt from "jsonwebtoken";

class Auth_DAO {
    protected static async registrarUsuario(data: any[], res: Response) {
        try {
            // Hash de la contraseña
            const salt = await bcrypt.genSalt(10);
            data[5] = await bcrypt.hash(data[5], salt);

            await pool.one(SQL_AUTH.REGISTER_USER, data)
                .then((result) => {
                    res.status(201).json({
                        result: {
                            cedula: result.cedula,
                            user_name: result.user_name,
                            correoElectronico: result.correoElectronico
                        }
                    });
                })
                .catch((error) => {
                    this.handleError(error, res, "Error al registrar el usuario");
                });
        } catch (error) {
            console.log({ "Error interno": error });
            res.status(500).json({ result: "Error interno del servidor" });
        }
    }

    protected static async iniciarSesion(data: any[], res: Response) {
        try {
            await pool.one(SQL_AUTH.FIND_USER_BY_EMAIL, [data[0]])
                .then(async (user) => {
                    if (!user) throw new Error('Credenciales inválidas');

                    const isMatch = await bcrypt.compare(data[1], user.contrasena);
                    if (!isMatch) throw new Error('Credenciales inválidas');

                    const payload = {
                        user: {
                            id: user.cedula,
                            username: user.user_name
                        }
                    };

                    const token = jwt.sign(
                        payload, 
                        process.env.JWT_SECRET as jwt.Secret, 
                        {
                            expiresIn: process.env.JWT_EXPIRES_IN || '1h'
                        } as jwt.SignOptions
                    );

                    res.status(200).json({
                        result: {
                            token,
                            user_id: user.cedula,
                            username: user.user_name
                        }
                    });
                })
                .catch((error) => {
                    this.handleError(error, res, "Credenciales inválidas");
                });
        } catch (error) {
            console.log({ "Error interno": error });
            res.status(500).json({ result: "Error interno del servidor" });
        }
    }

    private static handleError(error: any, res: Response, customMessage: string) {
        console.log({ "Error autenticación": error });
        res.status(400).json({
            result: customMessage,
        });
    }
}

export default Auth_DAO;