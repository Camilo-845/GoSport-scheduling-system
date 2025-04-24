import { Request, Response, NextFunction, raw } from "express";
import { SQL_AUTH } from "./auth.sql";
import pool from "../../config/connection/dbConnection";
import {
  authRegisterSchema,
  authLoginSchema,
} from "./helpers/validation-schema";
import { ZodError } from "zod";
import createHttpError, { HttpError } from "http-errors";
import { signToken } from "./helpers/jwt_helper";
import {
  AuthAdapter,
  DbUserResponse,
  userAdapter,
} from "../../adapters/auth.adapter";
import { inspect } from "util";

class Auth_Controller {
  public async registerUser(req: Request, res: Response, _next: NextFunction) {
    try {
      // Manejo de exepciones
      const parsed = authRegisterSchema.safeParse(req.body);
      if (!parsed.success) {
        throw parsed.error;
      }
      const userExist = await pool
        .oneOrNone<DbUserResponse>(
          SQL_AUTH.FIND_USER_BY_EMAIL,
          parsed.data.email,
        )
        .catch((error) => {
          throw error;
        });
      if (userExist) {
        throw createHttpError.Conflict(
          `${parsed.data.email} is already been registered`,
        );
      }
      // Registro de Usuario
      const user = userAdapter(parsed.data as DbUserResponse);
      await user.encrytPassword();
      const savedUser = await pool
        .oneOrNone<DbUserResponse>(SQL_AUTH.REGISTER_USER, user.toArray())
        .catch((error) => {
          throw error;
        });
      if (!savedUser || !savedUser.idUsuario) {
        console.error("user Id not returned");
        throw new Error("user Id not returned");
      }
      const token = await signToken(savedUser.idUsuario);
      res.status(200).send({ token });
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(422).send(error);
      } else if (error instanceof HttpError) {
        _next(error);
      } else {
        console.error(error);
        res.status(500).json({ error: "Error Interno" });
      }
    }
  }

  public async loginUser(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = authLoginSchema.safeParse(req.body);
      if (!parsed.success) {
        throw parsed.error;
      }
      const user = await pool.oneOrNone<DbUserResponse>(
        SQL_AUTH.FIND_USER_BY_EMAIL,
        parsed.data.email,
      );
      if (!user) {
        throw createHttpError.NotFound("User not registered");
      }
      const isMatch = await userAdapter(user).isValidPassword(
        parsed.data.password,
      );
      if (!isMatch) {
        throw createHttpError.Unauthorized("Username / password no valid");
      }
      const token = await signToken(user.idUsuario);

      res.status(200).send({ token });
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(422).send(error);
      } else {
        next(error);
      }
    }
  }
}

const authController = new Auth_Controller();
export default authController;
