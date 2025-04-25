import { Request, Response, NextFunction } from "express";
import { SQL_AUTH } from "./auth.sql";
import pool from "../../config/connection/dbConnection";
import {
  authRegisterSchema,
  authLoginSchema,
  authChangePasswordSchema,
  authDeleteUserSchema,
} from "./helpers/validation-schema";
import { ZodError } from "zod";
import createHttpError, { HttpError } from "http-errors";
import { signToken } from "./helpers/jwt_helper";
import { DbUserResponse, userAdapter } from "../../adapters/auth.adapter";

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
        res.status(422).send(error.format());
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
        res.status(422).send(error.format());
      } else {
        next(error);
      }
    }
  }

  public async changePassword(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.payload?.userId;
      if (!userId) {
        throw new Error("userId not found on req payload");
      }
      const parsed = authChangePasswordSchema.safeParse(req.body);
      if (!parsed.success) {
        throw parsed.error;
      }
      const userExist = await pool.oneOrNone<DbUserResponse>(
        SQL_AUTH.FIND_USER_BY_ID,
        userId,
      );
      if (!userExist) {
        throw createHttpError.NotFound("User not registered");
      }
      const user = userAdapter(userExist);
      const isMatch = await user.isValidPassword(parsed.data.oldPassword);
      if (!isMatch) {
        throw createHttpError.Unauthorized("Username / password no valid");
      }
      user.password = parsed.data.newPassword;
      await user.encrytPassword();
      await pool.none(SQL_AUTH.UPDATE_USER_PASSWORD_BY_ID, [
        userExist.idUsuario,
        user.password,
      ]);
      res.status(200).send("ok");
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(422).send(error.format());
      } else {
        next(error);
      }
    }
  }

  public async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.payload?.userId;
      if (!userId) {
        throw new Error("userId not found on req payload");
      }
      const reqBody = authDeleteUserSchema.safeParse(req.body);
      if (!reqBody.success) {
        throw reqBody.error;
      }

      const userExist = await pool.oneOrNone<DbUserResponse>(
        SQL_AUTH.FIND_USER_BY_ID,
        userId,
      );
      if (!userExist) {
        throw createHttpError.NotFound("User not registered");
      }
      const user = userAdapter(userExist);
      const isMatch = await user.isValidPassword(reqBody.data.password);
      if (!isMatch) {
        throw createHttpError.Unauthorized("Username / password no valid");
      }
      await pool.none(SQL_AUTH.DELETE_USER_BY_ID, [userId]);
      res.status(200).send("ok");
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(422).send(error.format());
      } else {
        next(error);
      }
    }
  }
}

const authController = new Auth_Controller();
export default authController;
