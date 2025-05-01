import { NextFunction, Request, Response } from "express";
import pool from "../../config/connection/dbConnection";
import { SQL_SPORT } from "./sport.sql";
import { ZodError } from "zod";
import { sportRegisterSchema } from "./helpers/validation.schema";
import { Sport } from "../../models";

class SportController {
  public async getAllSports(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await pool.manyOrNone(SQL_SPORT.GET_ALL_SPORTS);
      res.status(200).send(data);
    } catch (error) {
      next(error);
    }
  }

  public async createSport(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = sportRegisterSchema.safeParse(req.body);
      if (!parsed.success) {
        throw parsed.error;
      }
      const result = await pool.one<Sport>(
        SQL_SPORT.ADD_SPORT,
        parsed.data.nombre,
      );
      res.status(200).send(result);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(422).send(error.format());
      } else {
        next(error);
      }
    }
  }
}

const sportController = new SportController();
export default sportController;
