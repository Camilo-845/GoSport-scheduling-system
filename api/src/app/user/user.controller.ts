import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import pool from "../../config/connection/dbConnection";
import { SQL_USER } from "./user.sql";
import createHttpError from "http-errors";
import { DbUserResponse, userAdapter } from "../../adapters/user.adapter";

class UserController {
  public async getUserDetails(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.payload?.userId;
      if (!userId) {
        throw new Error("userId not found on req payload");
      }
      const userExist = await pool.oneOrNone<DbUserResponse>(
        SQL_USER.GET_USER_DETAILS_BY_ID,
        userId,
      );
      if (!userExist) {
        throw createHttpError.NotFound("User not registered");
      }
      const user = userAdapter(userExist);
      res.status(200).send(JSON.stringify(user));
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(422).send(error.format());
      } else {
        next(error);
      }
    }
  }
}

const userController = new UserController();
export default userController;
